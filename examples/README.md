these are examples of Bearcat framework  

just examples will be like this:  
```
var Bearcat = require('bearcat');
var contextPath = require.resolve('./context.json');

var bearcat = Bearcat.createApp([contextPath]);
bearcat.start(function(){
   var helloBearcat = bearcat.getBean('helloBearcat'); // get bean
   helloBearcat.hello(); // call the method
});
```