/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat NotNullConstraint
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Utils = require('../../util/utils');
var Util = require('util');

/**
 * NotNullConstraint constructor function.
 *
 * @api public
 */
var NotNullConstraint = function() {
	this.$cid = "notNull";
	this.message = "[NotNullConstraint] key: %s must be not null for value: %s";
}

/**
 * NotNullConstraint validate function.
 *
 * @param   {String} key
 * @param   {Number} value
 * @return  {Object} Error object
 * @api public
 */
NotNullConstraint.prototype.validate = function(key, value) {
	var message = this.message;
	if (!Utils.isNotNull(value)) {
		return new Error(Util.format(message, key, value));
	}
}

module.exports = NotNullConstraint;