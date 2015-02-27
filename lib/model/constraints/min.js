/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat MinConstraint
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Utils = require('../../util/utils');
var Util = require('util');

/**
 * MinConstraint constructor function.
 *
 * @api public
 */
var MinConstraint = function() {
	this.$cid = "min";
	this.message = "[MinConstraint] key: %s value %d is smaller than the min value: %d";
	this.min = null;
}

/**
 * MinConstraint validate function.
 *
 * @param   {String} key
 * @param   {Number} value
 * @return  {Object} Error object
 * @api public
 */
MinConstraint.prototype.validate = function(key, value) {
	var message = this.message;
	var min = this.min;

	if (!Utils.checkNumber(min)) {
		min = parseInt(min);
		this.min = min;
	}

	if (!Utils.checkNumber(value)) {
		return;
	}

	if (value < min) {
		return new Error(Util.format(message, key, value, min));
	}
}

module.exports = MinConstraint;