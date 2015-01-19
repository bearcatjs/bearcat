var SizeConstraint = function() {
	this.name = "size";
	this.message = "";
	this.max = null;
	this.min = null;
}

SizeConstraint.prototype.validate = function(key, value) {

}

module.exports = SizeConstraint;