var Utils = require('../../util/utils');
var Util = require('util');

var MinConstraint = function() {
	this.$cid = "min";
	this.message = "%s value %d is smaller than the min value %d";
	this.min = null;
}

MinConstraint.prototype.validate = function(key, value) {
	var message = this.message;
	var min = this.min;

	if (!Utils.checkNumber(min) || !Utils.checkNumber(value)) {
		return;
	}

	if (value < min) {
		return new Error(Util.format(message, key, value, min));
	}
}

module.exports = MinConstraint;