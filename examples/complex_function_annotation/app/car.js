var Car = function() {
	this.$id = "car";
	this["$engine"] = null; // use []
	var wheelName = "$wheel";
	this[wheelName] = null; // use variable
};

Car.prototype["$light"] = null; // use variable in prototype

Car.prototype.run = function() {
	this.$engine.run();
	this.$light.shine();
	this.$wheel.run();
	console.log('car run...');
}

module.exports = Car;