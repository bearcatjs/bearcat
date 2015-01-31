var Bus = function() {
	this.$id = "bus";
	this.$scope = "prototype";
	this.$engine = null;
	this.$wheel = null;
}

Bus.prototype.run = function() {
	this.$engine.run();
	var res = this.$wheel.run();
	console.log('run bus...');
	return 'bus ' + res;
}

module.exports = Bus;