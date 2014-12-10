var Wheel = function() {
	this.$id = "wheel";
}

Wheel.prototype.run = function() {
	console.log('run wheel...');
	return 'wheel';
}

module.exports = Wheel;
// {
// 	id: "wheel",
// 	func: Wheel
// };