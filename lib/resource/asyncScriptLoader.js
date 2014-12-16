/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat AsyncScriptLoader
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var BeanModule = require('../beans/support/beanModule');
var Path = require('../util/requireUtil').requirePath();
var ScriptUtil = require('../util/scriptUtil');
var Utils = require('../util/utils');
var cid = 1;

var AsyncScriptLoader = function() {
	this.cacheModules = {};
	this.loaderDir = null;
	this.applicationContext = null;
}

AsyncScriptLoader.prototype.getLoadBeans = function() {
	return this.loadBeans;
}

AsyncScriptLoader.prototype.load = function(ids, cb) {
	this.loaderDir = ScriptUtil.getLoaderDir();

	var uri = this.loaderDir + '_load_' + cid++;
	var mod = this.get(uri, ids);

	mod.addEntry(mod);
	mod.setRemain(1);

	mod.callback = function() {
		if (Utils.checkFunction(cb)) {
			cb();
		}

		delete mod.callback
		delete mod.history
		delete mod.remain
		delete mod.entries;
	}

	mod.load();
}

AsyncScriptLoader.prototype.save = function(uri, meta) {
	var mod = this.get(uri)

	// Do NOT override already saved modules
	if (mod.status < BeanModule.STATUS.SAVED) {
		mod.id = meta.id || uri
		mod.dependencies = meta.deps || []
		mod.factory = meta.factory
		mod.status = BeanModule.STATUS.SAVED
	}
}

AsyncScriptLoader.prototype.module = function(id, beanMeta) {
	var deps = this.resolveDeps(beanMeta);

	var meta = {
		id: id,
		uri: this.resolve(id),
		deps: deps
	};

	meta.uri ? this.save(meta.uri, meta) :
		// Save information for "saving" work in the script onload event
		BeanModule.anonymousMeta = meta
}

AsyncScriptLoader.prototype.resolve = function(id, refUri) {
	// id path map
	var path = this.getPathById(id);
	if (!path) {
		throw new Error('id: ' + id + ' can not be resolved');
	}

	return path;
	// return Path.join(this.loaderDir, path);
	// return this.loaderDir + '/' + path;
}

AsyncScriptLoader.prototype.resolveDeps = function(beanMeta) {
	var propsOn = beanMeta.props;
	if (!Utils.isNotNull(propsOn) || !propsOn) {
		return;
	}

	var deps = [];

	for (var i = 0; i < propsOn.length; i++) {
		var prop = propsOn[i];
		var ref = prop['ref'];

		if (ref) {
			if (this.applicationContext.getBeanDefinition(ref)) {
				continue;
			}
			deps.push(ref);
		}
	}

	return deps;
}

var Root;
(function() {
	Root = this;
}());

AsyncScriptLoader.prototype.getPathById = function(id) {
	if (Root.__bearcatData__ && Root.__bearcatData__.idPaths) {
		return Root.__bearcatData__.idPaths[id];
	}
}

AsyncScriptLoader.prototype.get = function(uri, deps) {
	return this.cacheModules[uri] || (this.cacheModules[uri] = new BeanModule(uri, deps, this));
}

AsyncScriptLoader.prototype.setApplicationContext = function(applicationContext) {
	this.applicationContext = applicationContext;
}

module.exports = AsyncScriptLoader;