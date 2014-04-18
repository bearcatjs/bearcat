var Car = function() {
	this.num = null;
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car' + this.num;
}

module.exports = {
	id: "car",
	func: Car,
	scope: "singleton",
	props: [{
		name: "num",
		value: 100
	}]
};