var Util = require('util');

var NotNullConstraint = function() {
	this.$cid = "myNotNull";
	this.message = "%s must be not null for value %s";
}

NotNullConstraint.prototype.validate = function(key, value) {
	var message = this.message;
	if (value === null || typeof value === 'undefined') {
		return new Error(Util.format(message, key, value));
	}
}

module.exports = NotNullConstraint;