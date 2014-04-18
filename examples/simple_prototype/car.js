var num = 1;
var Car = function() {}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car ' + num++;
}

module.exports = Car;