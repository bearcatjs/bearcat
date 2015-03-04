var Utils = require('../../util/utils');

var Constraints = {};
if (!Utils.checkBrowser()) {
	var fs = require('fs');
	var path = require('path');

	fs.readdirSync(__dirname).forEach(function(filename) {
		if (!/\.js$/.test(filename)) {
			return;
		}

		if (filename === 'index.js') {
			return;
		}

		var name = path.basename(filename, '.js');

		function load() {
			return require(__dirname + '/' + name);
		}

		Constraints.__defineGetter__(name, load);
	});
}

module.exports = Constraints;