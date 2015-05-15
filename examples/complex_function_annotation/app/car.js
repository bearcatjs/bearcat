var num = 1;

var Car = function() {
	this.$id = "car";
	// this.$scope = "singleton";
	this.$scope = "prototype";
	this["$engine"] = null; // use []
	var wheelName = "$wheel";
	this[wheelName] = null; // use variable
	this.num = num++;
};

Car.prototype["$light"] = null; // use variable in prototype

Car.prototype.run = function() {
	this.$engine.run();
	this.$light.shine();
	this.$wheel.run();
	console.log('car run %d ...', this.num);
}

module.exports = Car;