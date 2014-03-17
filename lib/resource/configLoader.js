var MetaLoader = require('./metaLoader');
var utils = require('../util/utils');
var path = require('path');

var configLoader = function() {

}

module.exports = configLoader;

configLoader.prototype.getMetaLoader = function() {
	return new MetaLoader();
}

configLoader.prototype.getResources = function(cpath) {
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

configLoader.prototype.getRecuriveScanPath = function(cpath, scanPaths, metaObjects) {
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
							bean[key] = beanObject[key];
						}
					} else {
						return null;
					}
				}
			}

			if (beanName) {
				metaObjects[beanName] = bean;
			}
		}
	}

	if (scan) {
		var scanPath = utils.getLoadPath(scan, cpath);
		scanPaths.push(scanPath);
	}

	var dpath = path.dirname(cpath);
	for (var dependency in dependencies) {
		this.getRecuriveScanPath(dpath + '/node_modules/' + dependency + '/context.json', scanPaths);
	}
}