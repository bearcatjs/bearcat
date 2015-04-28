/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ConfigLoader
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'ConfigLoader');
var RequireUtil = require('../util/requireUtil');
var MetaUtil = require('../util/metaUtil');
var Constant = require('../util/constant');
var MetaLoader = require('./metaLoader');
var Utils = require('../util/utils');
var Path = RequireUtil.requirePath();

/**
 * ConfigLoader constructor function.
 *
 * @api public
 */
var ConfigLoader = function() {}

module.exports = ConfigLoader;

/**
 * ConfigLoader get meta loader.
 *
 * @return  {Object} meta loader
 * @api public
 */
ConfigLoader.prototype.getMetaLoader = function() {
	return new MetaLoader();
}

/**
 * ConfigLoader get meta objects from context path.
 *
 * @param   {String} cpath context path
 * @return  {Object} meta objects
 * @api public
 */
ConfigLoader.prototype.getResources = function(cpath) {
	var scanPaths = [];
	var metaObjects = {};
	var metaLoader = this.getMetaLoader();
	this.getRecursiveScanPath(cpath, scanPaths, metaObjects);

	for (var beanName in metaObjects) {
		metaLoader.setMetaObject(beanName, metaObjects[beanName]);
	}

	for (var i = 0; i < scanPaths.length; i++) {
		metaLoader.load(scanPaths[i]);
	}

	return metaLoader.getMetaObjects();
}

/**
 * ConfigLoader get recursive scan paths and metaObjects in context.json.
 *
 * @param   {String} cpath context path
 * @param   {Array}  scanPaths scan paths
 * @param   {Object} metaObjects
 * @api public
 */
ConfigLoader.prototype.getRecursiveScanPath = function(cpath, scanPaths, metaObjects) {
	var context = Utils.myRequire(cpath);
	if (!context) {
		return;
	}

	var scan = context.scan;
	var beans = context.beans;
	// var browser = context.browser;
	var imports = context.imports;
	var namespace = context.namespace;
	var dependencies = context.dependencies;

	var dpath = Path.dirname(cpath);

	// if (Utils.checkString(browser)) {
	// 	return this.getRecursiveScanPath(dpath + '/' + browser, scanPaths, metaObjects);
	// } else if (Utils.checkArray(browser)) {
	// 	for (var i = 0; i < browser.length; i++) {
	// 		this.getRecursiveScanPath(dpath + '/' + browser[i], scanPaths, metaObjects);
	// 	}
	// 	return;
	// }

	for (var dependency in dependencies) {
		this.getRecursiveScanPath(dpath + '/node_modules/' + dependency + '/context.json', scanPaths, metaObjects);
	}

	if (Utils.checkArray(imports)) {
		for (var j = 0; j < imports.length; j++) {
			this.getRecursiveScanPath(dpath + '/' + imports[j], scanPaths, metaObjects);
		}
	}

	// context.json defined bean metadatas
	if (beans) {
		for (var i = 0; i < beans.length; i++) {
			var bean = beans[i];
			var beanName = bean['id'];

			if (namespace) {
				beanName = namespace + Constant.NAMESPACE_SEPERATOR + beanName;
			}

			// var loadpath = this.loadedContextBeans[beanName];
			// if (beanName && loadpath) {
			// 	logger.warn("bean %j defined in %j has already defined in %j, please check your configuration metadata files", beanName, cpath, loadpath);
			// 	continue;
			// }

			var beanObject = null;
			var funcPath = "";
			if (Utils.checkString(bean['func'])) {
				// beans from require, may be cached by require when you do with the same context.json
				funcPath = Utils.getLoadPath(bean['func'], cpath);
				beanObject = Utils.myRequire(funcPath);
			}

			if (beanObject) {
				if (Utils.checkFunction(beanObject)) {
					bean['func'] = beanObject;
				} else if (Utils.checkObject(beanObject)) {
					if (beanObject['id'] && beanObject['id'] === beanName) {
						// meta defined in js file override context.json
						bean = MetaUtil.mergeMeta(beanObject, bean);
						bean['ftype'] = 'object';
					} else {
						logger.error('meta defined in file %j %j mismatch with that defined in context %j', funcPath, beanObject, bean);
						continue;
					}
				}
			}

			if (beanName) {
				var originMeta = metaObjects[beanName];
				metaObjects[beanName] = MetaUtil.mergeMeta(bean, originMeta);
				if (funcPath) {
					bean['fpath'] = Path.resolve(process.cwd(), funcPath);
				}
			}
		}
	}

	if (Utils.checkString(scan)) {
		var scanPath = Utils.getLoadPath2(scan, cpath);
		scanPaths.push(scanPath);
	}

	if (Utils.checkArray(scan)) {
		for (var i = 0; i < scan.length; i++) {
			var scanPath = Utils.getLoadPath2(scan[i], cpath);
			scanPaths.push(scanPath);
		}
	}
}