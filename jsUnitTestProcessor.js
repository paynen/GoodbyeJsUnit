function JsUnitTestProcessor() {
  this._testFunctionRegex = /function (test\w+|setUp|tearDown)\(\) {[\s\S]+?}\s+(?=(fun|<|var))/g;
}

JsUnitTestProcessor.prototype._testFunctionRegex = null;

JsUnitTestProcessor.prototype.process = function(inputString) {
  var match,
      name,
      lastMatch,
      lastMatchingIndex,
      tests = [],
      otherCode = null;

  while( (match = this._testFunctionRegex.exec(inputString)) != null ) {
    name = match[1];
    tests.push({"name": name, "code":  match[0].replace(name, "")});
    lastMatch = match[0].length;
    lastMatchingIndex = this._testFunctionRegex.lastIndex;
  }

  console.log(lastMatchingIndex, inputString.lastIndexOf("</script>"));
  otherCode = inputString.substring(lastMatchingIndex,
                                    inputString.lastIndexOf("</script>")).trim();
  console.log("othercode", otherCode);

  return {
    "tests": tests,
    "otherCode": otherCode
  };
}

module.exports = JsUnitTestProcessor;
