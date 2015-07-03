var Car = function() {
	this.$id = "car";
	this.$Vnum = "${car.num}";
	this.$Vonum = "${car.onum}";
	this.xnum = "${car.xnum}";
	this.xnum2 = '${car.xnum}';
}

Car.prototype.run = function() {
	console.log('run car' + this.$Vnum);
	return 'car' + this.$Vnum;
}

Car.prototype.runo = function() {
	console.log(this.$Vonum);
}

Car.prototype.runx = function() {
	console.log(this.xnum);
}

Car.prototype.runx2 = function() {
	console.log(this.xnum2);
}

module.exports = Car;