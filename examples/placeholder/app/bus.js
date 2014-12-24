var Bus = function() {
	this.$id = "bus";
	this.$Vnum = "${car.num}";
}

Bus.prototype.run = function() {
	console.log('run bus' + this.$Vnum);
	return 'bus' + this.$Vnum;
}

module.exports = Bus;