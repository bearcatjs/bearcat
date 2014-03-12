var path = require('path');

module.exports.checkArray = function(array) {
	return array && array.length;
}

module.exports.checkFunction = function(func) {
	return func && (typeof func === 'function');
}

module.exports.isNotNull = function(value) {
	return value !== null && typeof value !== 'undefined' && value;
}

module.exports.myRequire = function(cpath) {
	var context = null;
	try {
		context = require(cpath);
		return context;
	} catch (e) {
		console.log(e);
		return context;
	}
}

module.exports.getLoadPath = function(spath, cpath) {

	spath = spath.replace(/\./g, "/");

	cpath = require.resolve(cpath);

	var dpath = path.dirname(cpath);

	return dpath + "/" + spath;
}