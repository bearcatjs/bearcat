/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat MetaUtil
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Utils = require('./utils');
var MetaUtil = {};

module.exports = MetaUtil;

/**
 * MetaUtil merge metaObject with originMeta.
 *
 * @param   {Object} meta metaObject
 * @param   {Object} originMeta origin metaObject
 * @param   {Object} merged metaObjects
 * @api public
 */
MetaUtil.mergeMeta = function(meta, originMeta) {
	if (!originMeta) {
		return meta;
	}
	for (var key in meta) {
		originMeta[key] = meta[key];
	}

	return originMeta;
}