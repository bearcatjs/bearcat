var Bus = function() {
	this.$id = "bus";
	this.$init = "init";
	this.$order = 3;
}

Bus.prototype.init = function(cb) {
	console.log('init Bus...');
	setTimeout(function() {
		console.log('Bus asyncInit setTimeout');
		cb();
	}, 500);
}

Bus.prototype.run = function() {
	console.log('run bus...');
}

module.exports = Bus;