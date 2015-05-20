/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat Utils
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'Utils');
var RequireUtil = require('./requireUtil');
var Constant = require('./constant');
var FileUtil = require('./fileUtil');
var Path = RequireUtil.requirePath();

var Utils = {};

/**
 * Utils normalize type
 *
 * @param  {String}   type
 * @return {String}   normalized type
 * @api public
 */
Utils.normalizeType = function(type) {
	if (!Utils.checkString(type)) {
		return;
	}

	type = type.toLowerCase();
	var Type = type[0].toUpperCase() + type.substr(1);
	return Type;
}

/**
 * Utils check type array
 *
 * @param  {String}    type
 * @return {Boolean}   true|false
 * @api public
 */
Utils.checkTypeArray = function(type) {
	var type = this.normalizeType(type);
	return type === Constant.MODEL_ATTRIBUTE_TYPE_ARRAY;
}

/**
 * Utils check type object
 *
 * @param  {String}    type
 * @return {Boolean}   true|false
 * @api public
 */
Utils.checkTypeObject = function(type) {
	var type = this.normalizeType(type);
	return type === Constant.MODEL_ATTRIBUTE_TYPE_OBJECT;
}

/**
 * Utils check type
 *
 * @param  {String}   type
 * @return {Function} high order function
 * @api public
 */
Utils.isType = function(type) {
	return function(obj) {
		return {}.toString.call(obj) == "[object " + type + "]";
	}
}

/**
 * Utils check array
 *
 * @param  {Array}   array
 * @return {Boolean} true|false
 * @api public
 */
Utils.checkArray = Array.isArray || Utils.isType("Array");

/**
 * Utils check number
 *
 * @param  {Number}  number
 * @return {Boolean} true|false
 * @api public
 */
Utils.checkNumber = Utils.isType("Number");

/**
 * Utils check function
 *
 * @param  {Function}   func function
 * @return {Boolean}    true|false
 * @api public
 */
Utils.checkFunction = Utils.isType("Function");
/**
 * Utils check object
 *
 * @param  {Object}   obj object
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkObject = Utils.isType("Object");

/**
 * Utils check string
 *
 * @param  {String}   string
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkString = Utils.isType("String");

/**
 * Utils check boolean
 *
 * @param  {Object}   obj object
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkBoolean = Utils.isType("Boolean");

/**
 * Utils check object not empty
 *
 * @param  {Object}   obj object
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkObjectEmpty = function(obj) {
	var flag = true;

	for (var key in obj) {
		flag = false;
	}

	return flag;
}

/**
 * Utils check type
 *
 * @param  {String}   type
 * @return {Boolean}  true|false
 * @api public
 */
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

/**
 * Utils check is not null
 *
 * @param  {Object}   value
 * @return {Boolean}  true|false
 * @api public
 */
Utils.isNotNull = function(value) {
	if (typeof value !== 'undefined' && value !== null)
		return true;
	return false;
}

/**
 * Utils myRequire require handle error
 *
 * @param  {String}   cpath require path
 * @return {Object}   require result
 * @api public
 */
Utils.myRequire = function(cpath) {
	if (!Utils.checkString(cpath)) {
		return;
	}

	var context = null;
	try {
		context = require(cpath);
		return context;
	} catch (err) {
		logger.error('myRequire error %s', err.stack);
		// logger.debug('myRequire error file pid %d %s %s', process.pid, cpath, FileUtil.readFileSync(cpath).toString());
		return context;
	}
}

/**
 * Utils myRequireHot require handle error
 *
 * @param  {String}   cpath require path
 * @return {Object}   require result
 * @api public
 */
Utils.myRequireHot = function(cpath) {
	var context = null;
	try {
		context = Utils.requireUncached(cpath);
		return context;
	} catch (err) {
		logger.error('myRequireHot error %s', err.stack);
		// logger.debug('myRequireHot error file pid %d %s %s', process.pid, cpath, FileUtil.readFileSync(cpath).toString());
		return context;
	}
}

/**
 * Utils get load path
 *
 * @param  {String}   spath scan path
 * @param  {String}   cpath context path
 * @return {String}   load path
 * @api public
 */
Utils.getLoadPath = function(spath, cpath) {
	if (!Utils.checkString(spath)) {
		return null;
	}
	spath = spath.replace(/\./g, "/");

	cpath = require.resolve(cpath);

	var dpath = Path.dirname(cpath);

	return dpath + "/" + spath;
}

/**
 * Utils get load path
 *
 * @param  {String}   spath scan path
 * @param  {String}   cpath context path
 * @return {String}   load path
 * @api public
 */
Utils.getLoadPath2 = function(spath, cpath) {
	if (!Utils.checkString(spath)) {
		return null;
	}

	cpath = require.resolve(cpath);

	var dpath = Path.dirname(cpath);

	var rpath = Path.resolve(dpath, spath);
	return rpath;
}

/**
 * Utils require new
 *
 * @param  {String}   module require module
 * @return {object}   require result
 * @api public
 */
Utils.requireUncached = function(module) {
	if (!Utils.checkString(module)) {
		return;
	}

	var modulePath = require.resolve(module);
	if (require.cache[modulePath]) {
		delete require.cache[modulePath];
	}

	return require(modulePath)
}

/**
 * Utils Check file suffix
 
 * @param {String} fn file name
 * @param {String} suffix suffix string, such as .js, etc.
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

/**
 * Utils Check isFile
 
 * @param  {String}  path 
 * @return {Boolean} true|false.
 */
Utils.isFile = function(path) {
	if (FileUtil.existsSync(path)) {
		return FileUtil.statSync(path).isFile();
	}
};

/**
 * Utils Check isDir
 
 * @param  {String}  path 
 * @return {Boolean} true|false.
 */
Utils.isDir = function(path) {
	if (FileUtil.existsSync(path)) {
		return FileUtil.statSync(path).isDirectory();
	}
};

/**
 * Utils get file name
 
 * @param  {String}  fp 
 * @param  {Number}  suffixLength
 * @return {String}  file name
 */
Utils.getFileName = function(fp, suffixLength) {
	var fn = Path.basename(fp);
	if (fn.length > suffixLength) {
		return fn.substring(0, fn.length - suffixLength);
	}

	return fn;
};

/**
 * Utils compare by order
 
 * @param  {Object}  a
 * @param  {Object}  b
 * @return {Number}  
 */
Utils.compareByOrder = function(a, b) {
	if (!a.getOrder())
		return 1;
	if (!b.getOrder())
		return -1;
	return a.getOrder() - b.getOrder();
}

/**
 * Utils compare beans, aspect first, order low first
 
 * @param  {Object}  a
 * @param  {Object}  b
 * @return {Number}  
 */
Utils.compareBeans = function(a, b) {
	if (a.isAspect()) {
		return -1;
	}

	if (b.isAspect()) {
		return 1;
	}

	if (!a.getOrder())
		return 1;
	if (!b.getOrder())
		return -1;
	return a.getOrder() - b.getOrder();
}

/**
 * Utils parseArgs
 
 * @param  {Array}  args
 * @return {Object} argsMap 
 */
Utils.parseArgs = function(args) {
	var argsMap = {};
	var mainPos = 1;

	argsMap.main = args[mainPos];

	for (var i = (mainPos + 1); i < args.length; i++) {
		var arg = args[i];
		var sep = arg.indexOf('=');
		var key = arg.slice(0, sep);
		var value = arg.slice(sep + 1);
		argsMap[key] = value;
	}

	return argsMap;
}

/**
 * Utils check browser
 *
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkBrowser = function() {
	return typeof window !== 'undefined';
}

/**
 * Utils check web worker
 *
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkWebWorker = function() {
	return this.checkBrowser() && typeof importScripts !== 'undefined' && this.checkFunction(importScripts);
}

/**
 * Utils check model filter error
 *
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkModelFilterError = function(r) {
	return r !== true && this.isNotNull(r);
}

/**
 * Utils check cocos2d-js jsb env
 *
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkCocos2dJsb = function() {
	if (typeof cc !== 'undefined' && cc && cc.sys && cc.sys.isNative) {
		return true;
	}

	return false;
}

module.exports = Utils;