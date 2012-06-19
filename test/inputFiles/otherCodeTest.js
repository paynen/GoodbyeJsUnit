(function(){
TestCase("otherCodeTest", {
  "testOne" : function () {
                if (true) {
                    doSomething();
                }
                assertTrue("blah");
            }

            ,
  "testTwo" : function () {
                assertEqual(getValue(), "foo");
            }
            
            

})

}());
