var car = function() {
	this.order = null;
	this.aspect = 0;
}

module.exports = car;

car.prototype.getOrder = function() {
	return this.order;
}

car.prototype.setOrder = function(order) {
	this.order = order;
}

car.prototype.isAspect = function() {
	return this.aspect;
}