var bearcat = require('../../lib/bearcat');

var contextPath = require.resolve('./context.json'); // to run simple example
// var contextPath = require.resolve('./context-config.json'); // to run simple example

bearcat.createApp([contextPath]);
bearcat.start(function() {
	var car = bearcat.getBean('car'); // get bean
	var r = car.run(); // call the method

	var car2 = bearcat.getBean('car'); // get bean
	var r = car2.run(); // call the method

	// console.log(bearcat.getBeanFactory());
});