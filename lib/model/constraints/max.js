/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat MaxConstraint
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Utils = require('../../util/utils');
var Util = require('util');

/**
 * MaxConstraint constructor function.
 *
 * @api public
 */
var MaxConstraint = function() {
	this.$cid = "max";
	this.message = "[MaxConstraint] key: %s value %d is bigger than the max value: %d";
	this.max = null;
}

/**
 * MaxConstraint validate function.
 *
 * @param   {String} key
 * @param   {Number} value
 * @return  {Object} Error object
 * @api public
 */
MaxConstraint.prototype.validate = function(key, value) {
	var message = this.message;
	var max = this.max;

	if (!Utils.checkNumber(max)) {
		max = parseInt(max);
		this.max = max;
	}

	if (!Utils.checkNumber(value)) {
		return;
	}

	if (value > max) {
		return new Error(Util.format(message, key, value, max));
	}
}

module.exports = MaxConstraint;