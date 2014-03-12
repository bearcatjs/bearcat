var MetaLoader = require('./metaLoader');
var utils = require('../util/utils');

var configLoader = function() {

}

module.exports = configLoader;

configLoader.prototype.getResources = function(cpath) {
	var context = utils.myRequire(cpath);
	if (!context) {
		return null;
	}

	var scan = context.scan;
	var scanPath = utils.getLoadPath(scan, cpath);

	var metaObjects = this.getMetaLoader().load(scanPath);

	return metaObjects;
}

configLoader.prototype.getMetaLoader = function() {
	return new MetaLoader();
}