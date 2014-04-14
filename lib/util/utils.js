/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat Utils
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var path = require('path');
var fs = require('fs');

var Utils = {};

module.exports = Utils;

Utils.checkArray = function(array) {
	return Object.prototype.toString.call(array) == '[object Array]';
}

Utils.checkFunction = function(func) {
	return func && (typeof func === 'function');
}

Utils.checkObject = function(obj) {
	return obj && (typeof obj === 'object');
}

Utils.checkType = function(type) {
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

Utils.isNotNull = function(value) {
	if (value !== null && typeof value !== 'undefined')
		return true;
	return false;
}

Utils.myRequire = function(cpath) {
	var context = null;
	try {
		context = Utils.requireUncached(cpath);
		return context;
	} catch (e) {
		console.log(e);
		return context;
	}
}

Utils.getLoadPath = function(spath, cpath) {
	if (typeof spath !== 'string') {
		return null;
	}
	spath = spath.replace(/\./g, "/");

	cpath = require.resolve(cpath);

	var dpath = path.dirname(cpath);

	return dpath + "/" + spath;
}

Utils.requireUncached = function(module) {
	delete require.cache[require.resolve(module)]
	return require(module)
}

/**
 * Check file suffix
 
 * @param fn {String} file name
 * @param suffix {String} suffix string, such as .js, etc.
 */
Utils.checkFileType = function(fn, suffix) {
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


Utils.isFile = function(path) {
	return fs.statSync(path).isFile();
};

Utils.isDir = function(path) {
	return fs.statSync(path).isDirectory();
};

Utils.getFileName = function(fp, suffixLength) {
	var fn = path.basename(fp);
	if (fn.length > suffixLength) {
		return fn.substring(0, fn.length - suffixLength);
	}

	return fn;
};

Utils.compareByOrder = function(a, b) {
	if (!a.getOrder())
		return 1;
	if (!b.getOrder())
		return -1;
	return a.getOrder() - b.getOrder();
}

Utils.parseArgs = function(args) {
	var argsMap = {};
	var mainPos = 1;

	while (args[mainPos].indexOf('--') > 0) {
		mainPos++;
	}
	argsMap.main = args[mainPos];

	for (var i = (mainPos + 1); i < args.length; i++) {
		var arg = args[i];
		var sep = arg.indexOf('=');
		var key = arg.slice(0, sep);
		var value = arg.slice(sep + 1);
		if (!isNaN(parseInt(value, 10)) && (value.indexOf('.') < 0)) {
			value = parseInt(value, 10);
		}
		argsMap[key] = value;
	}

	return argsMap;
};