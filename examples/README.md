these are examples of Bearcat framework  

run examples will be like this:  

```
copy examples source directory into your project
```

```
var Bearcat = require('bearcat');
var contextPath = require.resolve('./simple/context.json');  // to run simple example

var bearcat = Bearcat.createApp([contextPath]);
bearcat.start(function(){
   var helloBearcat = bearcat.getBean('helloBearcat'); // get bean
   helloBearcat.hello(); // call the method
});
```