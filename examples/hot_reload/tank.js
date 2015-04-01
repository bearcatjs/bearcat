var Tank = function() {
	this.$id = "tank";
}

Tank.prototype.run = function() {
	console.log('tank run ...');
	return 'tank run';
}

module.exports = Tank;