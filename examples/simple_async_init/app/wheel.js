var Wheel = function() {
	this.$id = "wheel";
	this.$init = "init";
	this.$order = 1;
	this.$async = true;
}

Wheel.prototype.init = function(cb) {
	console.log('init wheel...');
	setTimeout(function() {
		console.log('asyncInit setTimeout');
		cb();
	}, 1000);
}

Wheel.prototype.run = function() {
	console.log('run wheel...');
	return 'wheel';
}

module.exports = Wheel;