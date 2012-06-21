var cheerio = require("cheerio");

function JsUnitTestProcessor() {
  this._testFunctionRegex = /function (test\w+|setUp|tearDown)\(\)\s?{[\s\S]+?}\s+(?=(fun|\/|<|var|$)+?)/g;
}

JsUnitTestProcessor.prototype._testFunctionRegex = null;

JsUnitTestProcessor.prototype.process = function(testName, inputString) {
  var match,
      name,
      firstMatchIndex,
      lastMatchingIndex,
      precedingCode = "",
      tests = [],
      otherCode = null,
      $ = cheerio.load(inputString),
      scriptText = $("body script").remove().text(),
      domText = $("body").html().replace(/[\n\r\s\t]/g,"");
  
  while( (match = this._testFunctionRegex.exec(scriptText)) != null ) {
    name = match[1];
    tests.push({"name": name, "code":  match[0].replace(name, "")});
    firstMatchIndex = firstMatchIndex || match.index;
    lastMatchingIndex = this._testFunctionRegex.lastIndex;
  }

  if (domText) {
    var setUp = tests.filter(function(test){return test.name == "setUp"}).pop();

    if (setUp) {
      setUp.code = setUp.code.replace("{", "{\n\r jQuery('body').append('" + domText + "');");
    } else {
      tests.push({"name": "setUp", "code": "function() {\n\r jQuery('body').append(" + domText + ");\n\r }"});
    }
  }

  tests[tests.length - 1].last = true;
  otherCode = scriptText.substring(lastMatchingIndex).trim();

  return {
    "testName": testName,
    "tests": tests,
    "otherCode": otherCode
  };
}

module.exports = JsUnitTestProcessor;
