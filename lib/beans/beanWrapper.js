/*
 * props, args Object Wrapper
 */
var logger = require('pomelo-logger').getLogger('bearcar', 'BeanWrapper');

var constant = require('../util/constant');

var BeanWrapper = function() {
	this.name = null;
	this.type = null;
	this.value = null;
	this.ref = null;
	this.role = null; // DEPENDS_ARGS, DEPENDS_PROPS
	this.bean = null; // bean di instance
}

module.exports = BeanWrapper;

BeanWrapper.prototype.getDependType = function() {
	return this.role;
}

BeanWrapper.prototype.getName = function() {
	return this.name;
}

BeanWrapper.prototype.setName = function(name) {
	this.name = name;
}

BeanWrapper.prototype.getType = function() {
	return this.type;
}

BeanWrapper.prototype.setType = function(type) {
	this.type = type;
}

BeanWrapper.prototype.getValue = function() {
	return this.value;
}

BeanWrapper.prototype.setValue = function(value) {
	this.value = value;
}

// prototype bean may share DEPEND_TYPE_VAR value
BeanWrapper.prototype.getValueOnce = function() {
	var value = this.value;
	this.value = null;
	// logger.debug("%j", this.value);
	return value;
}

BeanWrapper.prototype.getRef = function() {
	return this.ref;
}

BeanWrapper.prototype.setRef = function(ref) {
	this.ref = ref;
}

BeanWrapper.prototype.getRole = function() {
	return this.role;
}

BeanWrapper.prototype.setRole = function() {
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
		role = constant.DEPEND_TYPE_VAR;
	}

	this.role = role;
}

BeanWrapper.prototype.getBean = function() {
	return this.bean;
}

BeanWrapper.prototype.setBean = function(bean) {
	this.bean = bean;
}

BeanWrapper.prototype.toString = function() {
	return this.name + " : " + this.type + " : " + this.value + " : " + this.ref + " : " + this.role;
}