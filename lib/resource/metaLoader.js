/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * |   _  )  |   ____)   /   \     |   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * |______)  |_______/__/     \__\ | _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat MetaLoader
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'metaLoader');
var utils = require('../util/utils');
var path = require('path');
var fs = require('fs');

var MetaLoader = function() {
	this.metaObjects = {};
}

module.exports = MetaLoader;

MetaLoader.prototype.load = function(mpath) {
	if (!mpath) {
		throw new Error('opts or opts.path should not be empty.');
	}

	mpath = fs.realpathSync(mpath);

	if (!fs.existsSync(mpath)) {
		throw new Error('path not exist, path:' + mpath);
	}

	if (!utils.isDir(mpath)) {
		throw new Error('path should be directory.');
	}

	this.loadPath(this.metaObjects, mpath);
	return this.metaObjects;
};

MetaLoader.prototype.setMetaObject = function(beanName, metaObject) {
	var originMeta = this.metaObjects[beanName];
	this.metaObjects[beanName] = mergeMeta(metaObject, originMeta);
}

MetaLoader.prototype.getMetaObejcts = function() {
	return this.metaObjects;
}

MetaLoader.prototype.loadFile = function(fp) {
	var m = utils.requireUncached(fp);
	if (!m) {
		return;
	}

	if (typeof m === 'function') {
		// if the module provides a factory function 
		// then invoke it to get a instance
		// continue;
		return;
		// m = m(context);
	}

	if (!m.func) {
		return;
	}

	return m;
};

MetaLoader.prototype.loadPath = function(res, path) {
	var files = fs.readdirSync(path);
	if (files.length === 0) {
		console.warn('path is empty, path:' + path);
		return;
	}

	if (path.charAt(path.length - 1) !== '/') {
		path += '/';
	}

	var fp, fn, m;
	for (var i = 0, l = files.length; i < l; i++) {
		fn = files[i];
		fp = path + fn;

		if (utils.isDir(fp)) {
			this.loadPath(res, fp);
		}

		if (!utils.isFile(fp) || !utils.checkFileType(fn, '.js')) {
			// only load js file type
			continue;
		}

		m = this.loadFile(fp);
		if (!m) {
			continue;
		}

		var id = utils.getFileName(fn, '.js'.length);
		if (m.id) {
			id = m.id;
			var originMeta = res[id];
			// res[id] = m;
			res[id] = mergeMeta(m, originMeta);
		}
	}
	return res;
};

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