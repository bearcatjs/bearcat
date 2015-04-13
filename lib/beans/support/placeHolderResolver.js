/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat PlaceHolderResolver
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */
var Utils = require('../../util/utils');

var DEFAULT_PLACEHOLDER_PREFIX = "${";
var DEFAULT_PLACEHOLDER_SUFFIX = "}";
var DEFAULT_VALUE_SEPARATOR = ":";

/**
 * PlaceHolderResolver constructor function.
 *
 * @param  {Array} properties
 * @api public
 */
var PlaceHolderResolver = function(properties) {
	this.placeholderPrefix = DEFAULT_PLACEHOLDER_PREFIX;
	this.placeholderSuffix = DEFAULT_PLACEHOLDER_SUFFIX;
	this.valueSeparator = DEFAULT_VALUE_SEPARATOR;
	this.properties = properties;
}

/**
 * PlaceHolderResolver resolve string value.
 *
 * @param  {String} strVal string value
 * @api public
 */
PlaceHolderResolver.prototype.resolveStringValue = function(strVal) {
	if (!Utils.checkString(strVal)) {
		return null;
	}

	var resolvedValue = this.doReplace(strVal);

	if (!Utils.isNotNull(resolvedValue)) {
		resolvedValue = strVal;
	}

	return resolvedValue;
}

/**
 * PlaceHolderResolver set properties.
 *
 * @param  {Array} properties
 * @api public
 */
PlaceHolderResolver.prototype.setProperties = function(properties) {
	this.properties = properties;
}

/**
 * PlaceHolderResolver get properties.
 *
 * @return  {Array} properties
 * @api public
 */
PlaceHolderResolver.prototype.getProperties = function() {
	return this.properties;
}

/**
 * PlaceHolderResolver replace string value.
 *
 * @param  {String} strVal string value
 * @api private
 */
PlaceHolderResolver.prototype.doReplace = function(strVal) {
	var properties = this.getProperties();
	if (!strVal || !properties) {
		return null;
	}

	var ptn = /\$\{(.*?)\}/g;
	var m, placeHolder, res = '',
		lastIndex = 0,
		head;
	var flag = true;
	var count = 0;
	while ((m = ptn.exec(strVal))) {
		placeHolder = m[1];

		head = strVal.substring(lastIndex, m.index);
		if (head.length) {
			res += head;
		}
		lastIndex = ptn.lastIndex;
		if (count == 0 && !head.length) {
			res = properties[placeHolder];
		} else {
			res += properties[placeHolder];
		}
		flag = false;
	}

	if (lastIndex < strVal.length) {
		res += strVal.substring(lastIndex);
	}

	if (flag) {
		return null;
	}
	return res;
}

module.exports = PlaceHolderResolver;