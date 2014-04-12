/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ResourceLoader
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var ConfigLoader = require('./configLoader');

/**
 * ResourceLoader constructor function.
 *
 * @api public
 */
var ResourceLoader = function() {
	this.loadPathMap = {};
	this.loadPaths = [];
}

module.exports = ResourceLoader;

/**
 * ResourceLoader get config loader.
 *
 * @return  {Object} config loader
 * @api public
 */
ResourceLoader.prototype.getConfigLoader = function() {
	return new ConfigLoader();
}

/**
 * ResourceLoader add context load path.
 *
 * @param  {String} context load path
 * @api public
 */
ResourceLoader.prototype.addLoadPath = function(cpath) {
	this.loadPaths.push(cpath);
}

/**
 * ResourceLoader load metaObjects from context path.
 *
 * @param   {String} context load path
 * @return  {Object} metaObjects
 * @api public
 */
ResourceLoader.prototype.load = function(cpath) {
	if (this.loadPathMap[cpath]) {
		return this.loadPathMap[cpath];
	}

	var metaObjects = this.getConfigLoader().getResources(cpath);
	this.loadPathMap[cpath] = metaObjects;
	this.loadPaths.push(cpath);

	return metaObjects;
}

/**
 * ResourceLoader refresh with loaded contextPaths.
 *
 * @return  {Object} loadPathMap
 * @api public
 */
ResourceLoader.prototype.refresh = function() {
	var paths = this.loadPaths;

	for (var i = 0; i < paths.length; i++) {
		var metaObjects = this.getConfigLoader().getResources(paths[i]);
		this.loadPathMap[cpath] = metaObjects;
	}

	return this.loadPathMap;
}