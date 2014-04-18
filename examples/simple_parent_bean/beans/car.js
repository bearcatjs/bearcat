var n = 1;

var Car = function(engine, wheel, num) {
	this.engine = engine;
	this.wheel = wheel;
	this.num = num;
	n++;
};

Car.prototype.run = function() {
	this.engine.start();
	this.wheel.run();
	console.log(this.num);
}

module.exports = {
	func: Car,
	id: "car",
	args: [{
		name: "engine",
		ref: "engine"
	}, {
		name: "num",
		value: 100
	}, {
		name: "wheel",
		ref: "wheel"
	}],
	order: 1
};