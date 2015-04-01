var Bus = function() {
	this.$id = "bus";
	this.$scope = "prototype";
	this.$car = null;
	this.num = "${car.num}";
	this.$tank = null;
}

Bus.prototype.run = function() {
	console.log('Bus hot run ~~~~~~~~~~~');
	console.log(this);
	this.$car.run();
	this.$tank.run();
	return 'bus hot';
}

module.exports = Bus;