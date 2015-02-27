var Engine = function() {
	this.$id = "engine";
	this.$init = "init";
	this.$async = true;
}

Engine.prototype.init = function(cb) {
	console.log('engine init');
	cb();
}

Engine.prototype.run = function() {
	console.log('run engine...');
	return 'engine';
}

module.exports = Engine;