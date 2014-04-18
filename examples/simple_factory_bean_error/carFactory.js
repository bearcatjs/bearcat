var Car = require('./car');

var CarFactory = function() {}

CarFactory.prototype.createCar = function() {
	console.log('CarFactory createCar...');
	return new Car();
}

module.exports = CarFactory;