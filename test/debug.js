// var bearcat = require('../lib/bearcat');
// var simplepath = require.resolve('../examples/simple/context.json');
// var paths = [simplepath];

// var Bus = function(num) {
// 	this.$id = "bus";
// 	this.num = num;
// }

// Bus.prototype.run = function() {
// 	return 'bus' + this.num;
// }

// bearcat.createApp(paths);
// bearcat.start(function() {
// 	var bus = bearcat.getBean(Bus, 100);
// 	var r = bus.run();
// 	console.log(r);
// });

var bearcat = require('../lib/bearcat');

var simplepath = require.resolve('../examples/simple/context.json');
var paths = [simplepath];

bearcat.getBeanFactory();
bearcat.getApplicationContext();
bearcat.getBeanByMeta();
bearcat.getBean();
bearcat.getFunction();

bearcat.start();
bearcat.stop();

var Bus = function() {}

bearcat.createApp(paths);
bearcat.start(function() {
	bearcat.getBeanFactory();
	bearcat.getApplicationContext();
	bearcat.getBeanByMeta({
		id: "bus",
		func: Bus
	});

	bearcat.getBean({
		id: "bus",
		func: Bus
	});

	bearcat.getBean();

	bearcat.getFunction('car');
	bearcat.start(function() {
		bearcat.getRoute("car", "run");
		bearcat.stop();
		bearcat.stop();
	});
});