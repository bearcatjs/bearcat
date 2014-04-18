var Car = function() {}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car';
}

module.exports = {
	id: "car",
	func: Car
};