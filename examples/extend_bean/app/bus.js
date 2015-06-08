var bearcat = require('../../../lib/bearcat');

var Bus = function() {
	bearcat.call("car", this, 100);
	this.$id = "bus";
	this.num1 = 12;
}

bearcat.extend("bus", ["car"]);
// bearcat.extend("bus", ["car", "tank"]);

Bus.prototype.run = function() {
	this._super();
	console.log("bus run %d ...", this.num1);
}

module.exports = Bus;