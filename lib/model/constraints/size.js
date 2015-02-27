/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat SizeConstraint
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Utils = require('../../util/utils');
var Util = require('util');

/**
 * SizeConstraint constructor function.
 *
 * @api public
 */
var SizeConstraint = function() {
	this.$cid = "size";
	this.maxMessage = "[SizeConstraint] key: %s value: %s length bigger than the max length %d";
	this.minMessage = "[SizeConstraint] key: %s value: %s length smaller than the min length %d";
	this.max = null;
	this.min = null;
}

/**
 * SizeConstraint validate function.
 *
 * @param   {String} key
 * @param   {Number} value
 * @return  {Object} Error object
 * @api public
 */
SizeConstraint.prototype.validate = function(key, value) {
	if (!Utils.checkString(value)) {
		return;
	}

	var maxMessage = this.maxMessage;
	var max = this.max;

	if (!Utils.checkNumber(max)) {
		if (value.length > max) {
			return new Error(Util.format(maxMessage, key, value, max));
		}
	}

	var minMessage = this.minMessage;
	var min = this.min;

	if (!Utils.checkNumber(min)) {
		if (value.length < min) {
			return new Error(Util.format(minMessage, key, value, min));
		}
	}
}

module.exports = SizeConstraint;