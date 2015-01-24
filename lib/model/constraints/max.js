var Utils = require('../../util/utils');
var Util = require('util');

var MaxConstraint = function() {
	this.$cid = "max";
	this.message = "%s value %d is bigger than the max value %d";
	this.max = null;
}

MaxConstraint.prototype.validate = function(key, value) {
	var message = this.message;
	var max = this.max;

	if (!Utils.checkNumber(max) || !Utils.checkNumber(value)) {
		return;
	}

	if (value > max) {
		return new Error(Util.format(message, key, value, max));
	}
}

module.exports = MaxConstraint;