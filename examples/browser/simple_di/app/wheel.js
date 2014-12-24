var Wheel = function() {
	this.$id = "wheel";
}

Wheel.prototype.run = function() {
	console.log('run wheel...');
}

bearcat.module(Wheel, typeof module !== 'undefined' ? module : {});