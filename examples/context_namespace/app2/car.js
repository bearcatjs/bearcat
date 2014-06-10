var Car = function() {
	this.$id = "car2";
	this.$Ncar = "app:car";
}

Car.prototype.run = function() {
	console.log('run car...');
	var r = this.$Ncar.run();
	return 'car ' + r;
}

module.exports = Car;