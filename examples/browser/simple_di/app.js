var bearcat = require('bearcat');

var contextPath = require.resolve('./context.json');

bearcat.createApp([contextPath], {
	BEARCAT_GLOBAL: true // make bearcat as global
});

bearcat.start(function() {
	var car = bearcat.getBean('car'); // get bean
	car.run(); // call the method
});