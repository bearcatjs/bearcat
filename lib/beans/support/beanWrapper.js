/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanWrapper
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'BeanWrapper');

var Constant = require('../../util/constant');
var Utils = require('../../util/utils');

/**
 * BeanWrapper constructor function.
 *
 * @api public
 */
var BeanWrapper = function() {
	this.name = null;
	this.type = null;
	this.value = null;
	this.ref = null;
	this.role = null; // DEPENDS_ARGS, DEPENDS_PROPS
	this.bean = null; // bean dependency inject instance
}

/**
 * BeanWrapper get depend type.
 *
 * @return  {String} depend type
 * @api public
 */
BeanWrapper.prototype.getDependType = function() {
	return this.role;
}

/**
 * BeanWrapper get name.
 *
 * @return  {String} name
 * @api public
 */
BeanWrapper.prototype.getName = function() {
	return this.name;
}

/**
 * BeanWrapper set name.
 *
 * @param  {String} name
 * @api public
 */
BeanWrapper.prototype.setName = function(name) {
	this.name = name;
}

/**
 * BeanWrapper get type.
 *
 * @return  {String} type
 * @api public
 */
BeanWrapper.prototype.getType = function() {
	return this.type;
}

/**
 * BeanWrapper set type.
 *
 * @param  {String} type
 * @api public
 */
BeanWrapper.prototype.setType = function(type) {
	this.type = type;
}

/**
 * BeanWrapper get value.
 *
 * @return  {String} value
 * @api public
 */
BeanWrapper.prototype.getValue = function() {
	return this.value;
}

/**
 * BeanWrapper set value.
 *
 * @param  {String} value
 * @api public
 */
BeanWrapper.prototype.setValue = function(value) {
	this.value = value;
}

/**
 * BeanWrapper get value once.
 *
 * prototype bean may share DEPEND_TYPE_VAR value
 *
 * @return  {String} value
 * @api public
 */
BeanWrapper.prototype.getValueOnce = function() {
	var value = this.value;
	this.value = null;
	return value;
}

/**
 * BeanWrapper get ref bean.
 *
 * @return  {String} ref bean
 * @api public
 */
BeanWrapper.prototype.getRef = function() {
	return this.ref;
}

/**
 * BeanWrapper set ref bean.
 *
 * @param  {String} ref reference bean
 * @api public
 */
BeanWrapper.prototype.setRef = function(ref) {
	this.ref = ref;
}

/**
 * BeanWrapper get role.
 *
 * @return  {String} role
 * @api public
 */
BeanWrapper.prototype.getRole = function() {
	return this.role;
}

/**
 * BeanWrapper set role.
 *
 * @api public
 */
BeanWrapper.prototype.setRole = function() {
	var role = Constant.DEPEND_TYPE_ERROR;

	if (!this.name) {
		role = Constant.DEPEND_TYPE_ERROR;
	}

	if (this.ref) {
		role = Constant.DEPEND_TYPE_BEAN;
	}

	if (this.value) {
		role = Constant.DEPEND_TYPE_VALUE;
	}

	if (this.type) {
		if (Utils.checkType(this.type)) {
			role = Constant.DEPEND_TYPE_VAR;
		}
	}

	this.role = role;
}

/**
 * BeanWrapper get bean.
 *
 * @return  {Object} bean
 * @api public
 */
BeanWrapper.prototype.getBean = function() {
	return this.bean;
}

/**
 * BeanWrapper set bean.
 *
 * @param  {Object} bean
 * @api public
 */
BeanWrapper.prototype.setBean = function(bean) {
	this.bean = bean;
}

module.exports = BeanWrapper;