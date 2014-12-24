var Engine = require('./engine');
var Wheel = require('./wheel');

var Car = function() {
	this.engine = new Engine();
	this.wheel = new Wheel();
}

Car.prototype.run = function() {
	this.engine.run();
	var res = this.wheel.run();
	console.log('run car...');
	return 'car ' + res;
}

module.exports = Car;