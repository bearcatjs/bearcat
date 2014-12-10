var ApplicationContext = require('../../lib/context/applicationContext');

// var simplepath = require.resolve('../../examples/simple_args_value/context.json');
// var paths = [simplepath];

// var applicationContext = new ApplicationContext(paths);
// applicationContext.refresh();

// var car = applicationContext.getBean('car');
// var r = car.run();
// var simplepath = require.resolve('../../examples/simple_inject/context.json');
// var paths = [simplepath];

// var applicationContext = new ApplicationContext(paths);
// applicationContext.on('finishRefresh', function() {
// 	var car = applicationContext.getBean('car');
// 	var r = car.run();

// });

// applicationContext.refresh();

// var Bearcat = require('../../lib/bearcat');

// var bearcat = Bearcat.createApp([simplepath]);

// bearcat.start(function() {
// 	var car = bearcat.getBean('car');
// 	var r = car.run();
// });

// var simplepath = require.resolve('../../examples/hot_reload/context.json');
// var fs = require('fs');
// var path = require('path');
// var paths = [simplepath];

// var hotPath = path.dirname(simplepath) + '/hot';
// var applicationContext = new ApplicationContext(paths);
// applicationContext.setHotPath(hotPath);
// applicationContext.refresh(function() {
// 	var car = applicationContext.getBean('car');
// 	var r = car.run();
// 	console.log(r);

// 	var hotCarPath = require.resolve('../../examples/hot_reload/hot/car.js');
// 	fs.appendFileSync(hotCarPath, "\n");

// 	setTimeout(function() {
// 		r = car.run();
// 		console.log(r);
// 	}, 2000);
// });

// var simplepath = require.resolve('../../examples/context_namespace/context.json');
// var paths = [simplepath];
// var applicationContext = new ApplicationContext(paths);
// applicationContext.refresh(function() {
// 	var car = applicationContext.getBean('app:car');
// 	var r = car.run();

// 	// r.should.exist;
// 	// r.should.eql('car');

// 	var car1 = applicationContext.getBean('app1:car');
// 	r = car1.run();
// 	// r.should.exist;
// 	// r.should.eql('car');

// 	var car2 = applicationContext.getBean('car2');
// 	r = car2.run();
// 	// r.should.exist;
// 	// r.should.eql('car car');

// 	// done();
// });

// var simplepath = require.resolve('../../examples/relative_scan/context.json');
// var paths = [simplepath];

// var applicationContext = new ApplicationContext(paths);
// applicationContext.on('finishRefresh', function() {
// 	var car = applicationContext.getBean('car');
// 	var r = car.run();

// 	console.log(r);
// 	// r.should.exist;
// 	// r.should.eql('car wheel');

// 	// done();
// })
// applicationContext.refresh();

// var path = require('path');
// var simplepath = require.resolve('../../examples/hot_reload/context.json');
// var hotPath = path.dirname(simplepath) + '/hot';
// var paths = [simplepath];
// var applicationContext = new ApplicationContext(paths);
// applicationContext.setHotPath(hotPath);
// applicationContext.refresh(function() {
// 	var car = applicationContext.getBean('car');
// 	var bus = applicationContext.getBean('bus');
// 	var r = car.run();


// 	r = bus.run();

// 	var hotCarPath = require.resolve('../../examples/hot_reload/hot/car.js');
// 	var hotBusPath = require.resolve('../../examples/hot_reload/hot/bus.js');
// 	require(hotCarPath);
// 	require(hotBusPath);
// 	fs.appendFileSync(hotCarPath, "\n");
// 	fs.appendFileSync(hotBusPath, "\n");

// 	setTimeout(function() {
// 		r = car.run();
// 		r = bus.run();
// 	}, 6000);
// });

function isBrowser() {
	return typeof window !== 'undefined';
}

var simplepath = require.resolve('../../examples/simple_meta_merge/context.json');
if (isBrowser()) {
	require('../../examples/simple_meta_merge/bearcat-bootstrap.js');
}
var paths = [simplepath];

var applicationContext = new ApplicationContext(paths);
applicationContext.refresh();

var car = applicationContext.getBean('car');
var r = car.run();
console.log(r);
// expect(r).to.eql('car wheel');