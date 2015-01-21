/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat RequireUtils
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var ShimBuiltins = require('../../shim/builtins');
var RequireUtils = {};

var Root;
(function() {
	Root = this;
}());

if (!Root.process) {
	Root.process = ShimBuiltins.process;
}

/**
 * RequireUtils require os shim.
 *
 * @api public
 */
RequireUtils.requireOs = function() {
	var os = require('os');
	if (os) {
		return os;
	} else {
		return ShimBuiltins.os;
	}
}

/**
 * RequireUtils require path shim.
 *
 * @api public
 */
RequireUtils.requirePath = function() {
	var path = require('path');
	if (path) {
		return path;
	} else {
		return ShimBuiltins.path;
	}
}

/**
 * RequireUtils require util shim.
 *
 * @api public
 */
RequireUtils.requireUtil = function() {
	var util = require('util');
	if (util) {
		return util;
	} else {
		return ShimBuiltins.util;
	}
}

module.exports = RequireUtils;