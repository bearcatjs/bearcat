var Util = require('util');

var NotNullConstraint = function() {
	this.$cid = "notNull";
	this.message = "%s must be not null for value %s";
}

NotNullConstraint.prototype.validate = function(key, value) {
	var message = this.message;
	if (!value) {
		return new Error(Util.format(message, key, value));
	}
}

module.exports = NotNullConstraint;