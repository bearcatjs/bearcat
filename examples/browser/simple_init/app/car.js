var Car = function() {
	this.$id = "car";
	this.$init = "init";
}

Car.prototype.init = function() {
	console.log('init car...');
}

Car.prototype.run = function() {
	console.log('run car...');
}

bearcat.module(Car, typeof module !== 'undefined' ? module : {});