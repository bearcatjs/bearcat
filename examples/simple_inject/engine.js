var Engine = function() {}

Engine.prototype.run = function() {
	console.log('run engine...');
	return 'engine';
}

module.exports = Engine;