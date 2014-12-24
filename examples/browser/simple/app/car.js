var Car = function() {
	this.$id = "car";
}

Car.prototype.run = function() {
	console.log('run car...');
}

bearcat.module(Car, typeof module !== 'undefined' ? module : {});