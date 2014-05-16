var Engine = function() {}

Engine.prototype.init = function() {
	console.log('init engine...');
}

Engine.prototype.destroy = function() {
	console.log('destroy engine...');
}

Engine.prototype.start = function() {
	console.log('starting engine...');
}

module.exports = {
	id: "engine",
	order: 2,
	func: Engine,
	initMethod: "init",
	destroyMethod: "destroy"
};