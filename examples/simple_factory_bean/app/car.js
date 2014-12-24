var Car = function() {
	this.$id = "car";
	this.$factoryBean = "carFactory";
	this.$factoryMethod = "createCar";
	this.num = 0;
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car ' + this.num;
}

module.exports = Car;