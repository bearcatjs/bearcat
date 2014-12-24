var Car = function(num) {
	this.$id = "car";
	this.$scope = "prototype";
	this.$Tnum = num;
}

Car.prototype.run = function() {
	console.log('run car: ' + this.$Tnum);
	return 'car ' + this.$Tnum;
}

module.exports = Car;