var Car = function(num) {
	this.num = num;
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car ' + this.num;
}

module.exports = Car;