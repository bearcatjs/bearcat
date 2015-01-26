var Car = function() {
	this.$id = "car";
	this.$bus = null;
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car';
}

module.exports = Car;