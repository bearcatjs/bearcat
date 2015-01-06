var Wheel = function(num) {
	this.$id = "wheel";
	this.$lazy = true;

	// init with arguments
	if (!num) {
		console.error('num must have...');
	}
}

module.exports = Wheel;