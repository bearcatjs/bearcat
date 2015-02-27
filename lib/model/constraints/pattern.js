/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat PatternConstraint
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Utils = require('../../util/utils');
var Util = require('util');

/**
 * PatternConstraint constructor function.
 *
 * @api public
 */
var PatternConstraint = function() {
	this.$cid = "pattern";
	this.message = "[PatternConstraint] key: %s value: %s is not matched with the pattern %s";
	this.regexp = null;
}

/**
 * PatternConstraint validate function.
 *
 * @param   {String} key
 * @param   {Number} value
 * @return  {Object} Error object
 * @api public
 */
PatternConstraint.prototype.validate = function(key, value) {
	var message = this.message;
	var regexp = this.regexp;

	if (!Utils.checkString(regexp) || !Utils.checkString(value)) {
		return;
	}

	var pattern = new RegExp(regexp);

	if (!value.match(pattern)) {
		return new Error(Util.format(message, key, value, regexp));
	}
}

module.exports = PatternConstraint;