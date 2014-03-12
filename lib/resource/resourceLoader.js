var ConfigLoader = require('./configLoader');

var resourceLoader = function() {}

module.exports = resourceLoader;

resourceLoader.prototype.getConfigResources = function() {
	var mpath = process.cwd() + '/design/beans';
	return this.load(mpath);
}

resourceLoader.prototype.getDefaultConfigResources = function() {
	var mpath = __dirname + '/../beans/support';
	return this.load(mpath);
}

resourceLoader.prototype.getConfigLoader = function() {
	return new ConfigLoader();
}

resourceLoader.prototype.load = function(cpath) {
	return this.getConfigLoader().getResources(cpath);
}