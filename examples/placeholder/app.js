var bearcat = require('../../lib/bearcat');
// var example_dir = 'simple'; // change this to run your examples
var example_dir = 'placeholder';

var contextPath = require.resolve('./context.json'); // to run simple example

bearcat.createApp([contextPath]);
bearcat.start(function() {
	var car = bearcat.getBean('car'); // get bean
	car.run(); // call the method
	car.runo();
});