var Util = require('util');

var SizeConstraint = function() {
	this.$cid = "mySize";
	this.$constraint = "$myNotNull";
	this.message = "key %s value %s length over max %d";
	this.max = null;
}

SizeConstraint.prototype.validate = function(key, value) {
	var message = this.message;
	var maxLen = this.max;
	if (maxLen === null) {
		return;
	}

	if (value && value.length > maxLen) {
		return new Error(Util.format(message, key, value, maxLen));
	}
}

module.exports = SizeConstraint;