var Utils = require('../../util/utils');
var Util = require('util');

var SizeConstraint = function() {
	this.$cid = "size";
	this.maxMessage = "key %s value %s length bigger than the max length %d";
	this.minMessage = "key %s value %s length smaller than the min length %d";
	this.max = null;
	this.min = null;
}

SizeConstraint.prototype.validate = function(key, value) {
	if (!Utils.checkString(value)) {
		return;
	}

	var maxMessage = this.maxMessage;
	var max = this.max;

	if (!Utils.checkNumber(max)) {
		return;
	}

	if (value.length > max) {
		return new Error(Util.format(maxMessage, key, value, max));
	}

	var minMessage = this.minMessage;
	var min = this.min;

	if (!Utils.checkNumber(min)) {
		return;
	}

	if (value.length < min) {
		return new Error(Util.format(maxMessage, key, value, min));
	}
}

module.exports = SizeConstraint;