var a = {
	get: function() {
		return 'aaa';
	}
}

var Car = function() {
	this.$id = "car";
	a.get();
	delete a['get'];
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car';
}

module.exports = Car;