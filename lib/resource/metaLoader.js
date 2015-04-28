/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat MetaLoader
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'MetaLoader');
var FileUtil = require('../util/fileUtil');
var MetaUtil = require('../util/metaUtil');
var Constant = require('../util/constant');
var Utils = require('../util/utils');
var path = require('path');

/**
 * MetaLoader constructor function.
 *
 * @api public
 */
var MetaLoader = function() {
	this.metaObjects = {};
}

module.exports = MetaLoader;

/**
 * MetaLoader load metaObjects from meta path.
 *
 * @param   {String} mpath
 * @return  {Object} meta objects
 * @api public
 */
MetaLoader.prototype.load = function(mpath) {
	if (!mpath) {
		logger.error('load path should not be empty.');
		return;
	}

	mpath = FileUtil.realpathSync(mpath);

	if (!Utils.isDir(mpath)) {
		logger.error('path should be directory.');
		return;
	}

	this.loadPath(this.metaObjects, mpath);
	return this.metaObjects;
};

/**
 * MetaLoader set metaObject to beanName.
 *
 * @param   {String} beanName
 * @param   {Object} metaObject
 * @api public
 */
MetaLoader.prototype.setMetaObject = function(beanName, metaObject) {
	var originMeta = this.metaObjects[beanName];
	this.metaObjects[beanName] = MetaUtil.mergeMeta(metaObject, originMeta);
}

/**
 * MetaLoader get metaObjects.
 *
 * @return   {Object} metaObjects
 * @api public
 */
MetaLoader.prototype.getMetaObjects = function() {
	return this.metaObjects;
}

/**
 * MetaLoader load file, require file.
 *
 * @return   {Object} fp file meta
 * @api private
 */
MetaLoader.prototype.loadFile = function(fp) {
	var m = Utils.myRequire(fp);
	if (process.env.BEARCAT_ANNOTATION !== 'off' && Utils.checkFunction(m)) {
		// meta may be $ annotations in function
		return MetaUtil.resolveFuncAnnotation(m, fp);
	}

	if (!Utils.checkObject(m)) {
		// meta must be object	
		return;
	}

	if (!m || !m.id || !m.func) {
		// id, func must have
		return;
	}

	if (fp) {
		m['ftype'] = 'object';
		m['fpath'] = fp;
	}

	return m;
};

/**
 * MetaLoader load meta from path recursively.
 *
 * @param    {Object} meta metaObjects
 * @param    {String} path
 * @return   {Object} metaObjects
 * @api private
 */
MetaLoader.prototype.loadPath = function(meta, path) {
	var files = FileUtil.readdirSync(path);

	if (path.charAt(path.length - 1) !== '/') {
		path += '/';
	}

	var fp, fn, m;
	for (var i = 0, l = files.length; i < l; i++) {
		fn = files[i];
		fp = path + fn;

		if (Utils.isDir(fp)) {
			this.loadPath(meta, fp);
		}

		if (!Utils.isFile(fp) || !Utils.checkFileType(fn, '.js')) {
			// only load js file type
			continue;
		}

		m = this.loadFile(fp);
		if (!m) {
			continue;
		}

		// id by default is the file name
		var id = Utils.getFileName(fn, '.js'.length);
		if (m.id) {
			id = m.id;
		} else if (m.mid) {
			id = m.mid + Constant.BEAN_SPECIAL_MODEL;
		} else if (m.cid) {
			id = m.cid + Constant.BEAN_SPECIAL_CONSTRAINT;
		} else {
			// ignore
			continue;
		}

		var originMeta = meta[id];
		meta[id] = MetaUtil.mergeMeta(m, originMeta);
	}

	return meta;
};