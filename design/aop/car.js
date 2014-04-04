var car = function() {
	this.a = 1;
}

car.prototype.runLog = function() {
	console.log('car run... ');
}

car.prototype.runT = function(a, b, next) {

}

module.exports = {
	id: "car",
	func: car
}