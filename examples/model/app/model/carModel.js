var CarModel = function() {
	this.$mid = "car";
	this.$table = "ba_car";
	this.num = "$type:Long;notNull";
	this.len = "$type:String;size(max=5)";
	this.$utils = null;
}

CarModel.prototype.before = function() {
	return ["checkNum"];
}

CarModel.prototype.checkNum = function(key, value) {
	console.log('checkNum~~~ %s %s', key, value);
	if (typeof value !== 'number') {
		return new Error('num must be number');
	}
}

CarModel.prototype.transform = function() {
	console.log('transform~~~');
	this.num = 10000;
}

module.exports = CarModel;