/**
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

var MetaLoader = require('./metaLoader');
var MetaUtil = require('../util/metaUtil');
var utils = require('../util/utils');
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
 * @param   {String} context path
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
 * @param   {String} context path
 * @param   {Array}  scan paths
 * @param   {Object} metaObjects
 * @api public
 */
ConfigLoader.prototype.getRecursiveScanPath = function(cpath, scanPaths, metaObjects) {
	var context = utils.myRequire(cpath);
	if (!context) {
		return;
	}

	var scan = context.scan;
	var beans = context.beans;
	var dependencies = context.dependencies;

	if (beans) {
		for (var i = 0; i < beans.length; i++) {
			var bean = beans[i];
			var beanName = bean['id'];
			var funcPath = utils.getLoadPath(bean['func'], cpath);
			var beanObject = utils.myRequire(funcPath);
			if (beanObject) {
				if (utils.checkFunction(beanObject)) {
					bean['func'] = beanObject;
				} else if (utils.checkObject(beanObject)) {
					if (beanObject['id'] && beanObject['id'] === beanName) {
						// meta override context.json
						for (var key in beanObject) {
							if (utils.isNotNull(beanObject[key])) {
								bean[key] = beanObject[key];
							}
						}
					} else {
						return;
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
		var scanPath = utils.getLoadPath(scan, cpath);
		scanPaths.push(scanPath);
	}

	var dpath = path.dirname(cpath);
	for (var dependency in dependencies) {
		this.getRecursiveScanPath(dpath + '/node_modules/' + dependency + '/context.json', scanPaths, metaObjects);
	}
}