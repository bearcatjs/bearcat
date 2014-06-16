var Car = function() {

}

Car.prototype.run = function() {
	console.log('run hot car...');
	return 'car hot';
}

module.exports = {
	id: "car",
	func: Car
}