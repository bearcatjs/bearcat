var contextPath = require.resolve('./context.json');
var bearcat = require('../../lib/bearcat');
var path = require('path');

var hotPath = path.dirname(contextPath) + '/hot';
var hotPath2 = path.dirname(contextPath) + '/hot2';
bearcat.createApp([contextPath], {
	BEARCAT_HOT: 'on',
	BEARCAT_HPATH: [hotPath, hotPath2]
		// BEARCAT_HPATH: hotPath
});

// bearcat.start(function() {
// 	bearcat.on('reload', function() {
// 		var tank = bearcat.getBean('tank');
// 		console.log(tank.run());
// 	});
// });

// return;
bearcat.start(function() {
	var car = bearcat.getBean('car');
	var bus = bearcat.getBean('bus');

	var Tank = bearcat.getFunction('tank');

	// you can use new to create your objects as long as get the constructor
	// function from bearcat.getFunction
	var tank = new Tank();
	var tank2 = new Tank();

	var r = car.run();
	console.log(r);

	r = bus.run();
	console.log(r);

	r = tank.run();
	console.log(r);

	var hotCarPath = require.resolve('../../examples/hot_reload/hot/car.js');
	var hotBusPath = require.resolve('../../examples/hot_reload/hot/bus.js');
	var hotTankPath = require.resolve('../../examples/hot_reload/hot2/tank.js');
	var fs = require('fs');
	require(hotCarPath);
	require(hotBusPath);
	require(hotTankPath);

	setTimeout(function() {
		fs.appendFileSync(hotCarPath, "\n");
		fs.appendFileSync(hotBusPath, "\n");
		fs.appendFileSync(hotTankPath, "\n");
		setTimeout(function() {
			r = car.run();
			console.log(r);

			r = bus.run();
			r = bus.run();
			console.log(r);

			var bus2 = bearcat.getBean('bus');
			console.log(bus === bus2);
			console.log('bus2~~~~~~');

			r = bus2.run();
			console.log(r);

			r = tank.run();
			console.log(r);

			r = tank2.run();
			console.log(r);
		}, 5000);
	}, 2000);
});