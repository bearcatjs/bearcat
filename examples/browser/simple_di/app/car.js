var Car = function() {
	this.$id = "car";
	this.$wheel = null;
	this.$engine = null;
}

Car.prototype.run = function() {
	this.$wheel.run();
	this.$engine.run();
	console.log('run car...');
}

bearcat.module(Car, typeof module !== 'undefined' ? module : {});