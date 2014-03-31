var Wheel = function() {}

Wheel.prototype.init = function() {
	console.log('init wheel...');
}

Wheel.prototype.destroy = function() {
	console.log('destroy wheel...');
}

Wheel.prototype.run = function() {
	console.log('run wheel...');
}

module.exports = Wheel;
// module.exports = {
// 	id: "wheel",
// 	func: Wheel,
// 	initMethod: "init",
// 	destroyMethod: "destroy",
// 	order: 3
// };