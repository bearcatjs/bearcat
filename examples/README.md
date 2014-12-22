these are examples of Bearcat framework  

run examples will be like this:  

```
node app.js
```

```
modify example_dir parameter to run different bearcat examples
```

```
var bearcat = require('../lib/bearcat');
var example_dir = 'simple'; // change this to run different examples
// var example_dir = 'simple_function_annotation';

var contextPath = require.resolve('./' + example_dir + '/context.json'); // to run simple example

bearcat.createApp([contextPath]);
bearcat.start(function() {
	var car = bearcat.getBean('car'); // get bean
	car.run(); // call the method
});
```