var FilterModel = function() {
	this.$mid = "filterModel";
	this.num = 0;
}

FilterModel.prototype.checkNum = function(key, value) {
	if (typeof value !== 'number') {
		return new Error('num must be number');
	}

	if (value > 10) {
		return new Error('num must be small than 10');
	}
}

FilterModel.prototype.transformNum = function() {
	this.num = 12345;
}

module.exports = FilterModel;