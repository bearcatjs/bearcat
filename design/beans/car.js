var n = 1;

var Car = function(engine, wheel, num) {
	this.engine = engine;
	this.wheel = wheel;
	this.num = num;
	// this.engine = null;
	// this.wheel = null;
	// console.log(this.num);
	// n = this.num;
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
	// scope: "prototype",
	args: [{
		name: "engine",
		ref: "engine"
	}, {
		name: "wheel",
		ref: "wheel"
	}, {
		name: "num",
		value: 100
		// type: "Integer"
	}],
	order: 1
	// props: ["engine", "wheel"]
	// args: ["engine", "wheel"]
};