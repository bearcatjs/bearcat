var Cannon = function() {
	this.$id = "cannon";
}

Cannon.prototype.bang = function() {
	console.log("cannon bang ...");
}

module.exports = Cannon;