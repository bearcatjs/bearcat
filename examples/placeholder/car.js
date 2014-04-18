var Car = function() {
	this.num = null;
}

Car.prototype.run = function() {
	console.log('run car' + this.num);
	return 'car' + this.num;
}

module.exports = Car;