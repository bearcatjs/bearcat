var Util = require('util');

var SizeConstraint = function() {
	this.$cid = "carSize";
	this.$constraint = "$notNull";
	this.message = "key %s value %s length over max %d";
	this.max = null;
}

SizeConstraint.prototype.validate = function(key, value) {
	console.log('validate %s %s', key, value);

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