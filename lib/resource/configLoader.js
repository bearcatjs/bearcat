/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * |   _  )  |   ____)   /   \     |   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * |______)  |_______/__/     \__\ | _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ConfigLoader
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var MetaLoader = require('./metaLoader');
var utils = require('../util/utils');
var path = require('path');

var ConfigLoader = function() {

}

module.exports = ConfigLoader;

ConfigLoader.prototype.getMetaLoader = function() {
	return new MetaLoader();
}

ConfigLoader.prototype.getResources = function(cpath) {
	var scanPaths = [];
	var metaObjects = {};
	var metaLoader = this.getMetaLoader();
	this.getRecuriveScanPath(cpath, scanPaths, metaObjects);

	for (var beanName in metaObjects) {
		metaLoader.setMetaObject(beanName, metaObjects[beanName]);
	}

	for (var i = 0; i < scanPaths.length; i++) {
		metaLoader.load(scanPaths[i]);
	}

	return metaLoader.getMetaObejcts();
}

ConfigLoader.prototype.getRecuriveScanPath = function(cpath, scanPaths, metaObjects) {
	var context = utils.myRequire(cpath);
	if (!context) {
		return null;
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
							if (typeof beanObject[key] === 'undefined' || beanObject[key] === null) {
								continue;
							}
							bean[key] = beanObject[key];
						}
					} else {
						return null;
					}
				}
			}

			if (beanName) {
				var originMeta = metaObjects[beanName];
				metaObjects[beanName] = mergeMeta(bean, originMeta);
			}
		}
	}

	if (scan) {
		var scanPath = utils.getLoadPath(scan, cpath);
		scanPaths.push(scanPath);
	}

	var dpath = path.dirname(cpath);
	for (var dependency in dependencies) {
		this.getRecuriveScanPath(dpath + '/node_modules/' + dependency + '/context.json', scanPaths, metaObjects);
	}
}

var mergeMeta = function(meta, originMeta) {
	if (!originMeta) {
		return meta;
	}
	for (var key in meta) {
		if (typeof meta[key] === 'undefined' || meta[key] === null) {
			continue;
		}
		originMeta[key] = meta[key];
	}

	return originMeta;
}