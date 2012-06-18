(function(){
TestCase(test\inputFiles\otherCodeTest.html, {
  "testOne" : function () {
                if (true) {
                    doSomething();
                }
                assertTrue(&quot;blah&quot;);
            }

            ,
  "testTwo" : function () {
                assertEqual(getValue(), &quot;foo&quot;);
            }
            
            ,

})

}());
