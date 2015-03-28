var BuiltinModel = function() {
	this.$mid = "builtinModel";
	this.numMax = "$max:20";
	this.numMin = "$min:10";
	this.numNotNull = "$notNull";
	this.numNull = "$null";
	this.numPattern = "$pattern(regexp=test)";
	this.numSize = "$size(max=10,min=3)";
}

module.exports = BuiltinModel;