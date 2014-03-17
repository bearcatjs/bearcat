var ConfigLoader = require('./configLoader');

var resourceLoader = function() {
	this.loadPathMap = {};
	this.loadPaths = [];
}

module.exports = resourceLoader;

resourceLoader.prototype.getConfigLoader = function() {
	return new ConfigLoader();
}

resourceLoader.prototype.addLoadPath = function(cpath) {
	this.loadPaths.push(cpath);
}

resourceLoader.prototype.load = function(cpath) {
	if (this.loadPathMap[cpath]) {
		return this.loadPathMap[cpath];
	}

	var metaObjects = this.getConfigLoader().getResources(cpath);
	this.loadPathMap[cpath] = metaObjects;
	this.loadPaths.push(cpath);

	return metaObjects;
}

resourceLoader.prototype.refresh = function() {
	var paths = this.loadPaths;

	for (var i = 0; i < paths.length; i++) {
		var metaObjects = this.getConfigLoader().getResources(paths[i]);
		this.loadPathMap[cpath] = metaObjects;
	}

	return this.loadPathMap;
}