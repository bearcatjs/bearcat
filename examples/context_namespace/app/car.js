var Car = function() {
	this.$id = "car";
}

Car.prototype.run = function() {
	console.log('run namespace: app car...');
	return 'car';
}

module.exports = Car;