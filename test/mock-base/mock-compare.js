var car = function() {
	this.order = null;
}

module.exports = car;

car.prototype.getOrder = function() {
	return this.order;
}

car.prototype.setOrder = function(order) {
	this.order = order;
}