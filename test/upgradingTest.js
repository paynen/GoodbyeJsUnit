var fs = require("fs"),
    JsUnitTestProcessor = require("../jsUnitTestProcessor.js");

exports.testUpgradingBasicTest = function(test) {
  // Read JsUnit test file
  fs.readFile("./test/inputFiles/basicTest.html",
              "UTF-8",
              function (err, data) {
                if (err) throw err;
                
                // Run through processor
                var result = new JsUnitTestProcessor().process("basicTest", data); 
                
                // Verify it matches expected file
                test.equal(result.testName, "basicTest");
                test.equal(result.tests.length, 2, "There should be two tests");
                test.equal(result.tests[0].name, "testOne");
                test.equal(result.tests[0].code.match("testOne"), null);
                test.equal(result.tests[1].name, "testTwo");
                test.equal(result.otherCode.length, 0, "There should be no other code");
                test.done();
              });
};

exports.testUpgradingTestWithOtherCode = function(test) {
  // Read JsUnit test file
  fs.readFile("./test/inputFiles/otherCodeTest.html",
              "UTF-8",
              function (err, data) {
                if (err) throw err;
                
                // Run through processor
                var result = new JsUnitTestProcessor().process("otherCodeTest", data); 
                
                // Verify it matches expected file
                test.equal(result.tests.length, 2, "There should be two tests");
                test.equal(result.tests[0].name, "testOne");
                test.equal(result.tests[0].code.match("testOne"), null);
                test.equal(result.tests[1].name, "testTwo");
                test.ok(result.otherCode, "There should be other code");
                test.equal(result.otherCode.charAt(0), "/");
                test.done();
              });
};

exports.testUpgradingTestWithDomAroundTheTests = function(test) {
  // Read JsUnit test file
  fs.readFile("./test/inputFiles/domTest.html",
              "UTF-8",
              function (err, data) {
                if (err) throw err;
                
                // Run through processor
                var result = new JsUnitTestProcessor().process("precedingCodeTest", data); 
                
                // Verify it matches expected file
                test.equal(result.tests.length, 3, "There should be three tests");
                test.ok(result.otherCode, "There should be other code");
                test.ok(result.otherCode.indexOf("var one") == 0, "There other code should start with the var statement");
                test.ok(result.tests[2].code.match("<div>before</div><div>after</div>"));
                test.done();
              });
};

exports.testUpgradingTestWithDomAndSetup = function(test) {
  // Read JsUnit test file
  fs.readFile("./test/inputFiles/domWithSetupTest.html",
              "UTF-8",
              function (err, data) {
                if (err) throw err;
                
                // Run through processor
                var result = new JsUnitTestProcessor().process("precedingCodeTest", data); 
                
                // Verify it matches expected file
                test.equal(result.tests.length, 3, "There should be three tests");
                test.ok(result.otherCode, "There should be other code");
                test.ok(result.otherCode.indexOf("var one") == 0, "There other code should start with the var statement");
                test.ok(result.tests[2].code.match("<div>before</div><div>after</div>"));
                test.done();
              });
};
