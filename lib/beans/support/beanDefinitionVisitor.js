/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanDefinitionVisitor
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */
var logger = require('pomelo-logger').getLogger('bearcat', 'BeanDefinitionVisitor');
var Constant = require('../../util/constant');
var Utils = require('../../util/utils');

/**
 * BeanDefinitionVisitor constructor function.
 *
 * @api public
 */
var BeanDefinitionVisitor = function(valueResolver) {
	this.valueResolver = valueResolver;
}

/**
 * BeanDefinitionVisitor set valueResolver.
 *
 * @param  {Object} valueResolver
 * @api public
 */
BeanDefinitionVisitor.prototype.setValueResolver = function(valueResolver) {
	this.valueResolver = valueResolver;
}

/**
 * BeanDefinitionVisitor get valueResolver.
 *
 * @return  {Object} valueResolver
 * @api public
 */
BeanDefinitionVisitor.prototype.getValueResolver = function() {
	return this.valueResolver;
}

/**
 * BeanDefinitionVisitor resolve string value.
 *
 * @param  {String} strVal string value
 * @api public
 */
BeanDefinitionVisitor.prototype.resolveStringValue = function(strVal) {
	if (!this.valueResolver) {
		logger.error('No StringValueResolver specified');
		return;
	}

	var resolvedValue = this.getValueResolver().resolveStringValue(strVal);

	return resolvedValue;
}

/**
 * BeanDefinitionVisitor visit beanDefinition.
 *
 * @param  {Object} beanDefinition
 * @api public
 */
BeanDefinitionVisitor.prototype.visitBeanDefinition = function(beanDefinition) {
	this.visitParentName(beanDefinition);
	this.visitPropertyValues(beanDefinition);
	this.visitArgumentsValues(beanDefinition);
}

/**
 * BeanDefinitionVisitor visit parentName in beanDefinition.
 *
 * @param  {Object} beanDefinition
 * @api private
 */
BeanDefinitionVisitor.prototype.visitParentName = function(beanDefinition) {
	var parentName = beanDefinition.getParentName();

	if (Utils.isNotNull(parentName)) {
		var resolvedName = this.resolveStringValue(parentName);
		if (parentName !== resolvedName && Utils.isNotNull(resolvedName)) {
			beanDefinition.setParentName(resolvedName);
		}
	}
}

/**
 * BeanDefinitionVisitor visit properties values in beanDefinition.
 *
 * @param  {Object} beanDefinition
 * @api private
 */
BeanDefinitionVisitor.prototype.visitPropertyValues = function(beanDefinition) {
	var props = beanDefinition.getProps();
	for (var i = 0; i < props.length; i++) {
		var wbean = props[i];
		if (wbean.getDependType() === Constant.DEPEND_TYPE_VALUE) {
			var value = wbean.getValue();
			var resolvedValue = this.resolveStringValue(value);
			if (value !== resolvedValue && Utils.isNotNull(resolvedValue)) {
				wbean.setValue(resolvedValue);
			}
		}
	}
}

/**
 * BeanDefinitionVisitor visit argument values in beanDefinition.
 *
 * @param  {Object} beanDefinition
 * @api private
 */
BeanDefinitionVisitor.prototype.visitArgumentsValues = function(beanDefinition) {
	var args = beanDefinition.getArgs();
	for (var i = 0; i < args.length; i++) {
		var wbean = args[i];
		if (wbean.getDependType() === Constant.DEPEND_TYPE_VALUE) {
			var value = wbean.getValue();
			var resolvedValue = this.resolveStringValue(value);
			if (value !== resolvedValue && Utils.isNotNull(resolvedValue)) {
				wbean.setValue(resolvedValue);
			}
		}
	}
}

module.exports = BeanDefinitionVisitor;