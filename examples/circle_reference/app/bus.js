var Bus = function() {
	this.$id = "bus";
}

Bus.prototype.run = function() {
	console.log('run bus...');
	return 'bus';
}

module.exports = Bus;