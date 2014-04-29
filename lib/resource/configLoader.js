/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ConfigLoader
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */
var logger = require('pomelo-logger').getLogger('bearcat', 'ConfigLoader');
var MetaUtil = require('../util/metaUtil');
var MetaLoader = require('./metaLoader');
var Utils = require('../util/utils');
var path = require('path');

/**
 * ConfigLoader constructor function.
 *
 * @api public
 */
var ConfigLoader = function() {

}

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

	return metaLoader.getMetaObejcts();
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
	var imports = context.imports;
	var dependencies = context.dependencies;

	// context.json defined bean metas
	if (beans) {
		for (var i = 0; i < beans.length; i++) {
			var bean = beans[i];
			var beanName = bean['id'];
			var funcPath = Utils.getLoadPath(bean['func'], cpath);
			var beanObject = Utils.myRequire(funcPath);
			if (beanObject) {
				if (Utils.checkFunction(beanObject)) {
					bean['func'] = beanObject;
				} else if (Utils.checkObject(beanObject)) {
					if (beanObject['id'] && beanObject['id'] === beanName) {
						// meta defined in js file override context.json
						bean = MetaUtil.mergeMeta(beanObject, bean);
					} else {
						logger.error('meta defined in file %j %j mismatch with that defined in context %j', funcPath, beanObject, bean);
						continue;
					}
				}
			}

			if (beanName) {
				var originMeta = metaObjects[beanName];
				metaObjects[beanName] = MetaUtil.mergeMeta(bean, originMeta);
			}
		}
	}

	if (scan) {
		var scanPath = Utils.getLoadPath(scan, cpath);
		scanPaths.push(scanPath);
	}

	var dpath = path.dirname(cpath);
	for (var dependency in dependencies) {
		this.getRecursiveScanPath(dpath + '/node_modules/' + dependency + '/context.json', scanPaths, metaObjects);
	}

	if (Array.isArray(imports)) {
		for (var j = 0; j < imports.length; j++) {
			this.getRecursiveScanPath(dpath + '/' + imports[j], scanPaths, metaObjects);
		}
	}
}