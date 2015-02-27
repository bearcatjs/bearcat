var CarModel = function() {
	this.$mid = "car";
	this.$table = "ba_car";
	this.id = "$primary;type:Number;";
	this.num = "$type:Number;notNull";
	this.len = "$type:String;carSize(max=5)";
	this.place = "$balance;type:String;default:hangzhou";
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

CarModel.prototype.transformError = function() {
	return new Error('transformError');
}

CarModel.prototype.run = function() {
	console.log('run');
}

module.exports = CarModel;