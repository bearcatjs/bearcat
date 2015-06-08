var bearcat = require('../../lib/bearcat');

var contextPath = require.resolve('./context.json'); // to run simple example

bearcat.createApp([contextPath], {
	BEARCAT_FUNCTION_STRING: true
});

bearcat.start(function() {
	// console.log(bearcat.applicationContext)
	var Bus = bearcat.getFunction('bus');
	var bus = new Bus();
	bus.run();

	console.log('\nthree inherit ~~~\n');
	var Tank = bearcat.getFunction('tank');
	var tank = new Tank();
	tank.run();

	// var tankBean = bearcat.getBean('tank');
	// tank.run();
});