var fs = require("fs"),
    path = require("path"),
    JsUnitTestProcessor = require("./jsUnitTestProcessor.js"),
    hogan = require("hogan"),
    argv = require("optimist").usage("Given a JsUnit test this will generate a JsTestDriver test, with the same tests. \n\nUsage: $0 jsunitTest.html")
                              .demand(1).argv,
    filename = "" + argv._;

fs.readFile(filename,
            "UTF-8",
            function (err, data) {
              if (err) throw err;
              // Run through processor
              var result = new JsUnitTestProcessor().process(path.basename(filename, ".html"), data); 
              fs.readFile("./template/jsTestDriver.mustache",
                          "UTF-8",
                          function (err, data) {
                            if (err) throw err;
                            fs.writeFile(filename.replace(".html", ".js"),
                                         hogan.compile(data).render(result),
                                         "UTF-8",
                                         function (err) {
                                           if (err) throw err;
                                           process.exit(0);
                                         });
                          });
            });
                

