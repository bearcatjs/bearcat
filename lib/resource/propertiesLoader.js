/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat PropertiesLoader
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'PropertiesLoader');
var FileUtil = require('../util/fileUtil');
var Utils = require('../util/utils');

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
 * @param    {String} lpath load path
 * @param    {String} env environment
 * @return   {Object} properties
 * @api public
 */
PropertiesLoader.prototype.loadProperties = function(lpath, env) {
	var meta = {};

	this.loadDir(meta, lpath, true);
	this.loadDir(meta, lpath + '/' + env);

	return meta;
}

/**
 * PropertiesLoader load properties from directory.
 *
 * @param    {Object}  meta properties
 * @param    {String}  lpath load path
 * @param    {Boolean} lflag if not load subdirectory or not, true not
 * @api private
 */
PropertiesLoader.prototype.loadDir = function(meta, lpath, lflag) {
	if (!FileUtil.existsSync(lpath)) {
		return;
	}

	if (!Utils.isDir(lpath)) {
		return;
	}

	var files = FileUtil.readdirSync(lpath);

	if (lpath.charAt(lpath.length - 1) !== '/') {
		lpath += '/';
	}

	var fp, fn, m;
	for (var i = 0, l = files.length; i < l; i++) {
		fn = files[i];
		fp = lpath + fn;

		if (!lflag && Utils.isDir(fp)) {
			this.loadDir(meta, fp);
		}

		if (!Utils.isFile(fp) || !Utils.checkFileType(fp, 'json')) {
			// only load json properties files
			continue;
		}

		m = Utils.myRequire(fp);
		if (!Utils.isNotNull(m) || !Utils.checkObject(m)) {
			continue;
		}

		for (var key in m) {
			if (Utils.isNotNull(m[key])) {
				meta[key] = m[key];
			}
		}
	}
}