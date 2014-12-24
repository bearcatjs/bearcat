var Car = function($engine) {
	this.$id = "car";
	this.$engine = $engine;
	this.$wheel = null;
}

Car.prototype.run = function() {
	this.$engine.run();
	var res = this.$wheel.run();
	console.log('run car...');
	return 'car ' + res;
}

module.exports = Car;