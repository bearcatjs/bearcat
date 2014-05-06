/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat PlaceHolderResolver
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
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

module.exports = PlaceHolderResolver;

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

	if (!resolvedValue || !Utils.isNotNull(resolvedValue)) {
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
	if (!strVal) {
		return null;
	}

	var properties = this.getProperties();
	if (!properties) {
		return null;
	}

	var ptn = /\$\{(.*?)\}/g;
	var m, placeHolder, res = '',
		lastIndex = 0;
	var flag = true;
	while ((m = ptn.exec(strVal))) {
		placeHolder = m[1];

		res += strVal.substring(lastIndex, m.index);
		lastIndex = ptn.lastIndex;
		res += properties[placeHolder];
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