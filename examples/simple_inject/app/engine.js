var Engine = function() {
	this.$id = "engine";
}

Engine.prototype.run = function() {
	console.log('run engine...');
	return 'engine';
}

module.exports = Engine;