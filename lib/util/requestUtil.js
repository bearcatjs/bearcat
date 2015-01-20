/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat RequestUtil load async script
 * modified from seajs util-request.js
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>, http://seajs.org
 * MIT Licensed
 */

var Utils = require('./utils');
var RequestUtil = {};
var currentlyAddingScript;

/**
 * RequestUtil request script file from url.
 *
 * @param  {String}   url
 * @param  {Function} callback function
 * @param  {String}   charset code
 * @param  {Boolean}  crossorigin or not
 * @api public
 */
RequestUtil.request = function(url, callback, charset, crossorigin) {
	if (Utils.checkWebWorker()) {
		return this.requestFromWebWorker(url, callback, charset, crossorigin);
	} else {
		return this.requestFromAsyncScript(url, callback, charset, crossorigin);
	}
}

/**
 * RequestUtil request script file from web worker.
 *
 * @param  {String}   url
 * @param  {Function} callback function
 * @param  {String}   charset code
 * @param  {Boolean}  crossorigin or not
 * @api private
 */
RequestUtil.requestFromWebWorker = function(url, callback, charset, crossorigin) {
	// Load with importScripts
	var error;
	try {
		importScripts(url);
	} catch (e) {
		error = e;
	}
	callback(error);
}

/**
 * RequestUtil request script file from async <script> tag.
 *
 * @param  {String}   url
 * @param  {Function} callback function
 * @param  {String}   charset code
 * @param  {Boolean}  crossorigin or not
 * @api private
 */
RequestUtil.requestFromAsyncScript = function(url, callback, charset, crossorigin) {
	var doc = document;
	var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
	var baseElement = head.getElementsByTagName("base")[0];

	var node = doc.createElement("script");

	if (charset) {
		var cs = Utils.checkFunction(charset) ? charset(url) : charset;
		if (cs) {
			node.charset = cs;
		}
	}

	// crossorigin default value is `false`.
	var cors = Utils.checkFunction(crossorigin) ? crossorigin(url) : crossorigin;
	if (cors !== false) {
		node.crossorigin = cors;
	}

	this.addOnload(head, node, callback, url);

	node.async = true;
	node.src = url;

	// For some cache cases in IE 6-8, the script executes IMMEDIATELY after
	// the end of the insert execution, so use `currentlyAddingScript` to
	// hold current node, for deriving url in `define` call
	currentlyAddingScript = node;

	// ref: #185 & http://dev.jquery.com/ticket/2709
	baseElement ?
		head.insertBefore(node, baseElement) :
		head.appendChild(node);

	currentlyAddingScript = null;
}

/**
 * RequestUtil request script file from url.
 *
 * @param  {Object}   head node
 * @param  {Object}   node
 * @param  {Function} callback function
 * @param  {String}   url
 * @api private
 */
RequestUtil.addOnload = function(head, node, callback, url) {
	var supportOnload = "onload" in node;

	if (supportOnload) {
		node.onload = onload
		node.onerror = function() {
			// TODO
			// emit("error", {
			// 	uri: url,
			// 	node: node
			// })
			onload(true)
		}
	} else {
		node.onreadystatechange = function() {
			if (/loaded|complete/.test(node.readyState)) {
				onload()
			}
		}
	}

	function onload(error) {
		// Ensure only run once and handle memory leak in IE
		node.onload = node.onerror = node.onreadystatechange = null

		// Remove the script to reduce memory leak
		// if (!data.debug) {
		if (!false) {
			head.removeChild(node)
		}

		// Dereference the node
		node = null

		callback(error)
	}
}

module.exports = RequestUtil;