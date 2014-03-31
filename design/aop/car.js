var car = function() {
	this.a = 1;
}

module.exports = car;

car.prototype.run = function(num) {
	console.log('car run... ' + num);
}