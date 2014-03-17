var path = require('path');
var fs = require('fs');

var utils = {};

module.exports = utils;

utils.checkArray = function(array) {
	return Object.prototype.toString.call(array) == '[object Array]';
}

utils.checkFunction = function(func) {
	return func && (typeof func === 'function');
}

utils.checkObject = function(obj) {
	return obj && (typeof obj === 'object');
}

utils.checkType = function(type) {
	if (type === 'Object')
		return true;
	if (type === 'Number')
		return true;
	if (type === 'Array')
		return true;
	if (type === 'Boolean')
		return true;
	if (type === 'Function')
		return true;
	if (type === 'String')
		return true;
	return false;
}

utils.isNotNull = function(value) {
	if (value !== null && typeof value !== 'undefined' && value)
		return true;
	return false;
}

utils.myRequire = function(cpath) {
	var context = null;
	try {
		context = utils.requireUncached(cpath);
		return context;
	} catch (e) {
		console.log(e);
		return context;
	}
}

utils.getLoadPath = function(spath, cpath) {
	if (typeof spath !== 'string') {
		return null;
	}
	spath = spath.replace(/\./g, "/");

	cpath = require.resolve(cpath);

	var dpath = path.dirname(cpath);

	return dpath + "/" + spath;
}

utils.requireUncached = function(module) {
	delete require.cache[require.resolve(module)]
	return require(module)
}

/**
 * Check file suffix
 
 * @param fn {String} file name
 * @param suffix {String} suffix string, such as .js, etc.
 */
utils.checkFileType = function(fn, suffix) {
	if (suffix.charAt(0) !== '.') {
		suffix = '.' + suffix;
	}

	if (fn.length <= suffix.length) {
		return false;
	}

	var str = fn.substring(fn.length - suffix.length).toLowerCase();
	suffix = suffix.toLowerCase();
	return str === suffix;
};


utils.isFile = function(path) {
	return fs.statSync(path).isFile();
};

utils.isDir = function(path) {
	return fs.statSync(path).isDirectory();
};

utils.getFileName = function(fp, suffixLength) {
	var fn = path.basename(fp);
	if (fn.length > suffixLength) {
		return fn.substring(0, fn.length - suffixLength);
	}

	return fn;
};