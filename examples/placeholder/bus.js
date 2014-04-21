var Bus = function() {
	this.num = null;
}

Bus.prototype.run = function() {
	console.log('run bus' + this.num);
	return 'bus' + this.num;
}

module.exports = Bus;