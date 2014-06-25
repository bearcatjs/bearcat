var Wheel = function() {}

Wheel.prototype.run = function() {
	console.log('run wheel...');
	return 'wheel';
}

module.exports = {
	id: "wheel",
	func: Wheel
};