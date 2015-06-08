var bearcat = require('../../../lib/bearcat');

var Tank = function() {
	bearcat.call("bus", this);
	this.$id = "tank";
}

bearcat.extend("tank", ["bus", "cannon"]);

Tank.prototype.run = function() {
	this._super();
	this.bang();
	console.log('tank run ...');
}

module.exports = Tank;