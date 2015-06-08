bearcat.define('car', function(exports) {
	var wheel = bearcat.require('wheel');
	console.log(wheel);
	wheel.run();
	console.log('car run ...');
}, typeof module !== 'undefined' ? module : {});