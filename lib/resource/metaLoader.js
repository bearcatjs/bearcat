var logger = require('pomelo-logger').getLogger('bearcat', 'metaLoader');
var path = require('path');
var fs = require('fs');

var loader = function() {
	this.metaObjects = {};
}

module.exports = loader;

loader.prototype.load = function(mpath) {
	if (!mpath) {
		throw new Error('opts or opts.path should not be empty.');
	}

	mpath = fs.realpathSync(mpath);

	if (!fs.existsSync(mpath)) {
		throw new Error('path not exist, path:' + mpath);
	}

	if (!isDir(mpath)) {
		throw new Error('path should be directory.');
	}

	loadPath(this.metaObjects, mpath);
	return this.metaObjects;
};

var loadFile = function(fp) {
	var m = requireUncached(fp);
	if (!m) {
		return;
	}

	if (typeof m === 'function') {
		// if the module provides a factory function 
		// then invoke it to get a instance
		// continue;
		return;
		// m = m(context);
	}

	if (!m.func) {
		return;
	}

	return m;
};

var loadPath = function(res, path) {
	var files = fs.readdirSync(path);
	if (files.length === 0) {
		console.warn('path is empty, path:' + path);
		return;
	}

	if (path.charAt(path.length - 1) !== '/') {
		path += '/';
	}

	var fp, fn, m;
	for (var i = 0, l = files.length; i < l; i++) {
		fn = files[i];
		fp = path + fn;

		if (isDir(fp)) {
			loadPath(res, fp);
		}

		if (!isFile(fp) || !checkFileType(fn, '.js')) {
			// only load js file type
			continue;
		}

		m = loadFile(fp);
		if (!m) {
			continue;
		}

		var id = getFileName(fn, '.js'.length);
		if (m.id) {
			id = m.id;
		}

		res[id] = m;
	}
	return res;
};

/**
 * Check file suffix
 
 * @param fn {String} file name
 * @param suffix {String} suffix string, such as .js, etc.
 */
var checkFileType = function(fn, suffix) {
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

var isFile = function(path) {
	return fs.statSync(path).isFile();
};

var isDir = function(path) {
	return fs.statSync(path).isDirectory();
};

var getFileName = function(fp, suffixLength) {
	var fn = path.basename(fp);
	if (fn.length > suffixLength) {
		return fn.substring(0, fn.length - suffixLength);
	}

	return fn;
};

var requireUncached = function(module) {
	delete require.cache[require.resolve(module)]
	return require(module)
}