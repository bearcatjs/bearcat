/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanModule
 * modified from seajs module.js
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>, http://seajs.org
 * MIT Licensed
 */

var RequestUtil = require('../../util/requestUtil');
var Utils = require('../../util/utils');

var anonymousMeta;

var fetchingList = {};
var fetchedList = {};
var callbackList = {};

var STATUS = {
	// 0 - init
	INIT: 0,
	// 1 - The `module.uri` is being fetched
	FETCHING: 1,
	// 2 - The meta data has been saved to cachedMods
	SAVED: 2,
	// 3 - The `module.dependencies` are being loaded
	LOADING: 3,
	// 4 - The module are ready to execute
	LOADED: 4,
	// 5 - 404
	ERROR: 5
}

/**
 * BeanModule constructor function.
 *
 * @param  {String}  uri
 * @param  {Array}   dependencies
 * @param  {Object}  loader reference
 * @api public
 */
var BeanModule = function(uri, deps, loader) {
	this.uri = uri;
	this.dependencies = deps || [];
	this.deps = {};
	this.remain = 0;
	this.entries = [];
	this.history = {};
	this.loader = loader;
	this.callback = null;
	this.status = STATUS.INIT;
}

/**
 * BeanModule resolve dependencies uri.
 *
 * @api private
 */
BeanModule.prototype.resolve = function() {
	var mod = this
	var ids = mod.dependencies
	var uris = []

	var loader = this.getLoader();
	var len = ids.length;
	for (var i = 0; i < len; i++) {
		uris[i] = loader.resolve(ids[i], mod.uri);
	}

	return uris
}

/**
 * BeanModule pass entry node into dependencies.
 *
 * @api private
 */
BeanModule.prototype.pass = function() {
	var mod = this

	var len = mod.dependencies.length

	// mod.entries changes dynamiclly
	for (var i = 0; i < mod.entries.length; i++) {
		var entry = mod.entries[i];

		var count = 0
		for (var j = 0; j < len; j++) {
			var m = mod.deps[mod.dependencies[j]]
				// If the module is unload and unused in the entry, pass entry to it
			if (m.status < STATUS.LOADED && !entry.history.hasOwnProperty(m.uri)) {
				entry.history[m.uri] = true
				count++
				m.entries.push(entry)
				if (m.status === STATUS.LOADING) {
					m.pass()
				}
			}
		}
		// If has passed the entry to it's dependencies, modify the entry's count and del it in the module
		if (count > 0) {
			entry.remain += count - 1
			mod.entries.shift()
			i--
		}
	}
}

/**
 * BeanModule load script files.
 *
 * @api private
 */
BeanModule.prototype.load = function() {
	var mod = this;

	if (this.status >= STATUS.LOADING) {
		return;
	}

	var loader = this.getLoader();
	mod.status = STATUS.LOADING;

	var uris = mod.resolve();

	for (var i = 0, len = uris.length; i < len; i++) {
		mod.deps[mod.dependencies[i]] = loader.get(uris[i])
	}

	// Pass entry to it's dependencies
	mod.pass();

	// If module has entries not be passed, call onload
	if (mod.entries.length) {
		mod.onload()
		return
	}

	// Begin parallel loading
	var requestCache = {};
	var m;

	for (i = 0; i < len; i++) {
		m = loader.get(uris[i]);

		if (m.status < STATUS.FETCHING) {
			m.fetch(requestCache)
		} else if (m.status === STATUS.SAVED) {
			m.load()
		}
	}

	// Send all requests at last to avoid cache bug in IE6-9. Issues#808
	for (var requestUri in requestCache) {
		if (requestCache.hasOwnProperty(requestUri)) {
			requestCache[requestUri]()
		}
	}
}

/**
 * BeanModule onload script file event callback.
 *
 * @api private
 */
BeanModule.prototype.onload = function() {
	var mod = this
	mod.status = STATUS.LOADED

	// When sometimes cached in IE, exec will occur before onload, make sure len is an number
	var len = (mod.entries || []).length;
	for (var i = 0; i < len; i++) {
		var entry = mod.entries[i]
		if (--entry.remain === 0) {
			entry.callback()
		}
	}

	delete mod.entries
}

/**
 * BeanModule error callback.
 *
 * @api private
 */
BeanModule.prototype.error = function() {
	var mod = this
	mod.onload()
	mod.status = STATUS.ERROR
}

/**
 * BeanModule fetch script files using async <script> or from webworker.
 *
 * @param  {Object}  request cache
 * @api private
 */
BeanModule.prototype.fetch = function(requestCache) {
	var mod = this
	var uri = mod.uri
	console.log('do fetch ' + uri);

	var loader = this.getLoader();
	mod.status = STATUS.FETCHING

	// Emit `fetch` event for plugins such as combo plugin
	var emitData = {
		uri: uri
	}

	var requestUri = emitData.requestUri || uri

	// Empty uri or have been fetched
	if (!requestUri || fetchedList.hasOwnProperty(requestUri)) {
		mod.load()
		return
	}

	if (fetchingList.hasOwnProperty(requestUri)) {
		callbackList[requestUri].push(mod)
		return
	}

	fetchingList[requestUri] = true
	callbackList[requestUri] = [mod]

	// Emit `request` event for plugins such as text plugin
	emitData = {
		uri: uri,
		requestUri: requestUri,
		onRequest: onRequest,
		// charset: Utils.checkFunction(data.charset) ? data.charset(requestUri) || 'utf-8' : data.charset,
		// crossorigin: Utils.checkFunction(data.crossorigin) ? data.crossorigin(requestUri) : data.crossorigin
		charset: 'utf-8',
		crossorigin: false
	}

	if (!emitData.requested) {
		requestCache ?
			requestCache[emitData.requestUri] = sendRequest :
			sendRequest()
	}

	function sendRequest() {
		RequestUtil.request(emitData.requestUri, emitData.onRequest, emitData.charset, emitData.crossorigin)
	}

	function onRequest(error) {
		delete fetchingList[requestUri]
		fetchedList[requestUri] = true

		// Save meta data of anonymous module
		if (anonymousMeta) {
			loader.save(uri, anonymousMeta)
			anonymousMeta = null
		}

		// Call callbacks
		var m, mods = callbackList[requestUri]
		delete callbackList[requestUri]
		while ((m = mods.shift())) {
			// When 404 occurs, the params error will be true
			if (error === true) {
				m.error()
			} else {
				m.load()
			}
		}
	}
}

/**
 * BeanModule add entry.
 *
 * @param  {Object}  entry node
 * @api public
 */
BeanModule.prototype.addEntry = function(entry) {
	this.entries.push(entry);
}

/**
 * BeanModule set remain number to be loaded.
 *
 * @param  {Number}  remain number
 * @api public
 */
BeanModule.prototype.setRemain = function(remain) {
	this.remain = remain;
}

/**
 * BeanModule set loader.
 *
 * @param  {Object}  loader reference
 * @api public
 */
BeanModule.prototype.setLoader = function(loader) {
	this.loader = loader;
}

/**
 * BeanModule get loader.
 *
 * @return  {Object}  loader reference
 * @api public
 */
BeanModule.prototype.getLoader = function() {
	return this.loader;
}

BeanModule.STATUS = STATUS;
BeanModule.anonymousMeta = anonymousMeta;

module.exports = BeanModule;