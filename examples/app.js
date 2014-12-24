var bearcat = require('../lib/bearcat');
// var example_dir = 'simple'; // change this to run your examples
var example_dir = 'simple_factory_bean_error';

var contextPath = require.resolve('./' + example_dir + '/context.json'); // to run simple example

bearcat.createApp([contextPath]);
bearcat.start(function() {
	var car = bearcat.getBean('car'); // get bean
	var r = car.run(); // call the method
	console.log(r);
});