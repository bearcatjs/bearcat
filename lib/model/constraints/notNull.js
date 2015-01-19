var NotNullConstraint = function() {
	this.name = "notNull";
	this.message = "";
}

NotNullConstraint.prototype.validate = function(key, value) {

}

module.exports = NotNullConstraint;