var Engine = function() {}
var fs = require('fs');

Engine.prototype.init = function(cb) {
	console.log('init engine...');
	setTimeout(function() {
		console.log('asyncInit setTimeout 1m');
		cb();
	}, 1000);
}

Engine.prototype.destroy = function() {
	console.log('destroy engine...');
}

Engine.prototype.start = function() {
	console.log('starting engine...');
}

module.exports = {
	id: "engine",
	func: Engine,
	initMethod: "init",
	destroyMethod: "destroy",
	asyncInit: true,
	order: 2
	// props: [{
	// 	name: "car",
	// 	ref: "car"
	// }]
};