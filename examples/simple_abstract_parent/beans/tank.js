var Tank = function(engine, wheel, num) {
	this.engine = engine;
	this.wheel = wheel;
	this.num = num;
}

Tank.prototype.run = function() {
	this.fly();
	return 'tank ' + this.num;
}

module.exports = {
	func: Tank,
	id: "tank",
	scope: "prototype",
	parent: "car",
	args: [{
		name: "engine",
		ref: "engine"
	}, {
		name: "wheel",
		ref: "wheel"
	}]
};