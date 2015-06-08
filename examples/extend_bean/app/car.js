var Car = function(num) {
	this.$id = "car";
	this.num1 = 10;
	this.num2 = num;
}

Car.prototype.run = function() {
	console.log("car run %d ...", this.num2);
}

module.exports = Car;