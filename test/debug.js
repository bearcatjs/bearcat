var bearcat = require('../lib/bearcat');
var simplepath = require.resolve('../examples/simple/context.json');
var paths = [simplepath];

var Bus = function(num) {
	this.$id = "bus";
	this.num = num;
}

Bus.prototype.run = function() {
	return 'bus' + this.num;
}

bearcat.createApp(paths);
bearcat.start(function() {
	var bus = bearcat.getBean(Bus, 100);
	var r = bus.run();
	console.log(r);
});