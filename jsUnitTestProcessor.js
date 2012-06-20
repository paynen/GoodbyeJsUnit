function JsUnitTestProcessor() {
  this._testFunctionRegex = /function\s?(test\w+|setUp|tearDown)\(\)\s?{[\s\S]+?}\s+(?=(fun|\/|<|var)+?)/g;
}

JsUnitTestProcessor.prototype._testFunctionRegex = null;

JsUnitTestProcessor.prototype.process = function(testName, inputString) {
  var match,
      name,
      firstMatchIndex,
      lastMatchingIndex,
      precedingCode = "",
      tests = [],
      otherCode = null;

  while( (match = this._testFunctionRegex.exec(inputString)) != null ) {
    name = match[1];
    tests.push({"name": name, "code":  match[0].replace(name, "")});
    firstMatchIndex = firstMatchIndex || match.index;
    lastMatchingIndex = this._testFunctionRegex.lastIndex;
  }

  tests[tests.length - 1].last = true;
  otherCode = inputString.substring(lastMatchingIndex,
                                    inputString.lastIndexOf("</script>")).trim();
  return {
    "testName": testName,
    "tests": tests,
    "otherCode": otherCode
  };
}

module.exports = JsUnitTestProcessor;
