/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat NullConstraint
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Utils = require('../../util/utils');
var Util = require('util');

/**
 * NullConstraint constructor function.
 *
 * @api public
 */
var NullConstraint = function() {
	this.$cid = "null";
	this.message = "[NullConstraint] key: %s must be null for value: %s";
}

/**
 * NullConstraint validate function.
 *
 * @param   {String} key
 * @param   {Number} value
 * @return  {Object} Error object
 * @api public
 */
NullConstraint.prototype.validate = function(key, value) {
	var message = this.message;
	if (Utils.isNotNull(value)) {
		return new Error(Util.format(message, key, value));
	}
}

module.exports = NullConstraint;