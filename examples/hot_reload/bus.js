var Bus = function() {
	this.$id = "bus";
	this.$scope = "prototype";
}

Bus.prototype.run = function() {
	return 'bus';
}

module.exports = Bus;