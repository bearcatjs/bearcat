/**
 * Bearcat beanWrapper props, args Object Wrapper
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcar', 'beanWrapper');

var constant = require('../../util/constant');
var utils = require('../../util/utils');

/**
 * beanWrapper constructor function.
 *
 * @api public
 */
var beanWrapper = function() {
	this.name = null;
	this.type = null;
	this.value = null;
	this.ref = null;
	this.role = null; // DEPENDS_ARGS, DEPENDS_PROPS
	this.bean = null; // bean di instance
}

module.exports = beanWrapper;

beanWrapper.prototype.getDependType = function() {
	return this.role;
}

beanWrapper.prototype.getName = function() {
	return this.name;
}

beanWrapper.prototype.setName = function(name) {
	this.name = name;
}

beanWrapper.prototype.getType = function() {
	return this.type;
}

beanWrapper.prototype.setType = function(type) {
	this.type = type;
}

beanWrapper.prototype.getValue = function() {
	return this.value;
}

beanWrapper.prototype.setValue = function(value) {
	this.value = value;
}

// prototype bean may share DEPEND_TYPE_VAR value
beanWrapper.prototype.getValueOnce = function() {
	var value = this.value;
	this.value = null;
	return value;
}

beanWrapper.prototype.getRef = function() {
	return this.ref;
}

beanWrapper.prototype.setRef = function(ref) {
	this.ref = ref;
}

beanWrapper.prototype.getRole = function() {
	return this.role;
}

beanWrapper.prototype.setRole = function() {
	var role = constant.DEPEND_TYPE_ERROR;

	if (!this.name) {
		role = constant.DEPEND_TYPE_ERROR;
	}

	if (this.ref) {
		role = constant.DEPEND_TYPE_BEAN;
	}

	if (this.value) {
		role = constant.DEPEND_TYPE_VALUE;
	}

	if (this.type) {
		if (utils.checkType(this.type)) {
			role = constant.DEPEND_TYPE_VAR;
		}
	}

	this.role = role;
}

beanWrapper.prototype.getBean = function() {
	return this.bean;
}

beanWrapper.prototype.setBean = function(bean) {
	this.bean = bean;
}

beanWrapper.prototype.toString = function() {
	return this.name + " : " + this.type + " : " + this.value + " : " + this.ref + " : " + this.role;
}