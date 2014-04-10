var car = function() {
	this.a = 1;
}

car.prototype.runLog = function(num, cb) {
	console.log('car run... ');
	cb(null, num);
}

car.prototype.runT = function(a, b, next) {

}

module.exports = {
	id: "car",
	func: car
}