var Bus = function() {
	this.$id = "bus";
	this.$car = null;
}

Bus.prototype.run = function() {
	console.log('run bus...');
	return 'bus';
}

module.exports = Bus;