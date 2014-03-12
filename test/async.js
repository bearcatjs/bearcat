var fs = require('fs');
var async = require('async');

var asyncFunc = function(path, cb) {
	fs.readdir(path, function(files) {
		console.log(files);
		cb();
	})
}

var syncFunc = function(path) {

	var wrap = function() {
		asyncFunc(path, function() {

		})
	}

	wrap();
}

// syncFunc(".");
// console.log('done');

async.waterfall([
	function(callback) {
		asyncFunc(".", function(){
			callback();
		})
	}
	], function(){
		console.log('done!')
	});

console.log('done');

