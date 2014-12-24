var Car = function() {
	this.$id = "car";
	this.$Vnum = "${car.num}";
	this.$Vonum = "${car.onum}";
}

Car.prototype.run = function() {
	console.log('run car' + this.$Vnum);
	return 'car' + this.$Vnum;
}

Car.prototype.runo = function() {
	console.log(this.$Vonum);
}

module.exports = Car;