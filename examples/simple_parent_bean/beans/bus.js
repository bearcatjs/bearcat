var Bus = function(engine, wheel, num) {
	this.engine = engine;
	this.wheel = wheel;
	this.num = num;
}

Bus.prototype.run = function() {
	return 'bus ' + this.num;
}

module.exports = {
	func: Bus,
	id: "bus",
	parent: "car",
	args: [{
		name: "engine",
		ref: "engine"
	}, {
		name: "wheel",
		ref: "wheel"
	}]
};