var Bus = function() {}

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