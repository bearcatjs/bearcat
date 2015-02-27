var Car = function() {
	this.$id = "car";
	this.$init = "init";
	this.$order = 3;
	this.$wheel = null;
	this.$engine = null;
	this.num = 0;
}

Car.prototype.init = function() {
	console.log('init car...');
	this.num = 1;
	return 'init car';
}

Car.prototype.run = function() {
	this.$wheel.run();
	this.$engine.run();
	console.log('run car...');
	return 'car ' + this.num;
}

module.exports = Car;