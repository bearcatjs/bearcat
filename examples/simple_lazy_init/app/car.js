var Car = function() {
	this.$id = "car";
	this.$lazy = true;
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car';
}

module.exports = Car;