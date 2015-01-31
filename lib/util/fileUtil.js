/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat FileUtil
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var fs = require('fs');

var FileUtil = {};

/**
 * FileUtil existsSync.
 *
 * @api public
 */
FileUtil.existsSync = function() {
	return false;
}

/**
 * FileUtil watch shim.
 *
 * @api public
 */
FileUtil.watch = function() {

}

/**
 * FileUtil realpathSync shim.
 *
 * @api public
 */
FileUtil.realpathSync = function() {

}

/**
 * FileUtil readdirSync shim.
 *
 * @api public
 */
FileUtil.readdirSync = function() {

}

if (fs) {
	for (var method in fs) {
		FileUtil[method] = fs[method];
	}
}

module.exports = FileUtil;