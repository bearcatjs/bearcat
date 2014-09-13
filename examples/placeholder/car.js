var Car = function() {
	this.num = null;
	this.onum = null;
}

Car.prototype.run = function() {
	console.log('run car' + this.num);
	return 'car' + this.num;
}

Car.prototype.runo = function() {
	console.log(this.onum);
}

module.exports = Car;