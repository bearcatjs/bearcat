var Utils = require('../../util/utils');
var Util = require('util');

var PatternConstraint = function() {
	this.$cid = "pattern";
	this.message = "%s value %s is not matched with the pattern %s";
	this.regexp = null;
}

PatternConstraint.prototype.validate = function(key, value) {
	var message = this.message;
	var regexp = this.regexp;

	if (!Utils.checkString(regexp) || !Utils.checkString(value)) {
		return;
	}

	var pattern = new RegExp(regexp);

	if (!value.match(pattern)) {
		return new Error(Util.format(message, key, value, regexp));
	}
}

module.exports = PatternConstraint;