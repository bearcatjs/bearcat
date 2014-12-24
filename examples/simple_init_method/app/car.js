var Car = function() {
	this.$id = "car";
	this.$scope = "prototype";
	this.$init = "init";
	this.num = 0;
}

Car.prototype.init = function() {
	console.log('init car...');
	this.num = 1;
	return 'init car';
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car ' + this.num;
}

module.exports = Car;