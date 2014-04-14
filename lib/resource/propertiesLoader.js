/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat PropertiesLoader
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'PropertiesLoader');
var Utils = require('../util/utils');
var fs = require('fs');

/**
 * PropertiesLoader constructor function.
 *
 * @api public
 */
var PropertiesLoader = function() {

}

module.exports = PropertiesLoader;

/**
 * PropertiesLoader load properties from load path with env.
 *
 * @param    {String} load path
 * @param    {String} environment
 * @return   {Object} properties
 * @api public
 */
PropertiesLoader.prototype.loadProperties = function(lpath, env) {
	var meta = {};

	this.loadDir(meta, lpath);
	this.loadDir(meta, lpath + '/' + env);

	return meta;
}

/**
 * PropertiesLoader load properties from directory.
 *
 * @param    {Object} properties
 * @param    {String} load path
 * @api private
 */
PropertiesLoader.prototype.loadDir = function(meta, lpath) {
	if (!Utils.isDir(lpath)) {
		return;
	}

	var files = fs.readdirSync(lpath);
	if (files.length === 0) {
		logger.warn('loadProperties path is empty, path:' + lpath);
		return;
	}

	if (lpath.charAt(lpath.length - 1) !== '/') {
		lpath += '/';
	}

	var fp, fn, m;
	for (var i = 0, l = files.length; i < l; i++) {
		fn = files[i];
		fp = lpath + fn;

		if (Utils.isDir(fp) || !Utils.isFile(fp)) {
			continue;
		}

		m = Utils.requireUncached(fp);
		if (!m || typeof m !== 'object') {
			continue;
		}

		for (var key in m) {
			if (Utils.isNotNull(m[key])) {
				meta[key] = m[key];
			}
		}
	}
}