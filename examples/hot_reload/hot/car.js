var Car = function() {

}

Car.prototype.run = function() {
	console.log('run hot car...');
	console.log('getNum %d', this.getNum());
	return 'car hot';
}

Car.prototype.getNum = function() {
	if (!this.num) {
		this.num = 100;
	}

	return this.num;
}

module.exports = {
	id: "car",
	func: Car
}