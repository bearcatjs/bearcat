var n = 1;

var Car = function() {
	n++;
};

Car.prototype.run = function() {
	this.engine.start();
	this.wheel.run();
	console.log(this.num);
	console.log(n);
}

Car.prototype.fly = function() {
	console.log('car fly');
}

module.exports = {
	func: Car,
	id: "car",
	abstract: true,
	props: [{
		name: "engine",
		ref: "engine"
	}, {
		name: "num",
		value: 100
	}, {
		name: "wheel",
		ref: "wheel"
	}]
};