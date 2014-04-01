var car = function() {
	this.a = 1;
}

module.exports = car;

car.prototype.runLog = function() {
	console.log('car run... ');
}