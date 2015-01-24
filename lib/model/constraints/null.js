var Utils = require('../../util/utils');
var Util = require('util');

var NullConstraint = function() {
	this.$cid = "null";
	this.message = "%s must be null for value %s";
}

NullConstraint.prototype.validate = function(key, value) {
	var message = this.message;
	if (Utils.isNotNull(value)) {
		return new Error(Util.format(message, key, value));
	}
}

module.exports = NullConstraint;