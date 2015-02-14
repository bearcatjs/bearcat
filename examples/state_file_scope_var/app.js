var bearcat = require('../../lib/bearcat');

var contextPath = require.resolve('./context.json'); // to run simple example

// for using stateful variable, set up BEARCAT_FUNCTION_STRING flag to use funcString to resolve $ props
bearcat.createApp([contextPath], {
	BEARCAT_FUNCTION_STRING: true
});

bearcat.start(function() {
	var car = bearcat.getBean('car'); // get bean
	car.run(); // call the method
});