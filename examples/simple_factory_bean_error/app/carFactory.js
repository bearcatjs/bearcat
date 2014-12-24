var Car = require('./car');

var CarFactory = function() {
	this.$id = "CarFactory";
}

CarFactory.prototype.createCar = function() {
	console.log('CarFactory createCar...');
	return new Car();
}

module.exports = CarFactory;