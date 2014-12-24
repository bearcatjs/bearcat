var num = 1;
var Car = function() {
	this.$id = "car";
	this.$scope = "prototype";
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car ' + num++;
}

module.exports = Car;