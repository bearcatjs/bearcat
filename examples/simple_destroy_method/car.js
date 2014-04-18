var Car = function() {

}

Car.prototype.destroy = function() {
	console.log('destroy car...');
	return 'destroy car';
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car';
}

module.exports = Car;