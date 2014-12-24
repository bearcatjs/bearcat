var Engine = function() {
	this.$id = "engine";
}

Engine.prototype.run = function() {
	console.log('run engine...');
}

bearcat.module(Engine, typeof module !== 'undefined' ? module : {});