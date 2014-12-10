var Car = function() {
	this.$id = "car";
	this.$wheel = null;
}

Car.prototype.run = function() {
	var res = this.$wheel.run();
	console.log('run car...');
	return 'car ' + res;
}

module.exports = Car;
// {
// 	id: "car",
// 	func: Car,
// 	props: [{
// 		name: "wheel",
// 		ref: "wheel"
// 	}]
// };