/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanDefinitionVisitor
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */
var logger = require('pomelo-logger').getLogger('bearcar', 'BeanDefinitionVisitor');
var Constant = require('../../util/constant');
var Utils = require('../../util/utils');

var BeanDefinitionVisitor = function(valueResolver) {
	this.valueResolver = valueResolver;
}

module.exports = BeanDefinitionVisitor;

BeanDefinitionVisitor.prototype.setValueResolver = function(valueResolver) {
	this.valueResolver = valueResolver;
}

BeanDefinitionVisitor.prototype.getValueResolver = function() {
	return this.valueResolver;
}

BeanDefinitionVisitor.prototype.resolveStringValue = function(strVal) {
	if (!this.valueResolver) {
		logger.error('No StringValueResolver specified');
		return;
	}

	var resolvedValue = this.getValueResolver().resolveStringValue(strVal);

	return resolvedValue;
}

BeanDefinitionVisitor.prototype.visitBeanDefinition = function(beanDefinition) {
	this.visitParentName(beanDefinition);
	this.visitPropertyValues(beanDefinition);
	this.visitArgumentsValues(beanDefinition);
}

BeanDefinitionVisitor.prototype.visitParentName = function(beanDefinition) {
	var parentName = beanDefinition.getParentName();

	if (Utils.isNotNull(parentName)) {
		var resolvedName = this.resolveStringValue(parentName);
		if (parentName !== resolvedName) {
			beanDefinition.setParentName(resolvedName);
		}
	}
}

BeanDefinitionVisitor.prototype.visitPropertyValues = function(beanDefinition) {
	var props = beanDefinition.getProps();
	for (var i = 0; i < props.length; i++) {
		var wbean = props[i];
		if (wbean.getDependType() === Constant.DEPEND_TYPE_VALUE) {
			var value = wbean.getValue();
			var resolvedValue = this.resolveStringValue(value);
			if (value !== resolvedValue) {
				wbean.setValue(resolvedValue);
			}
		}
	}
}

BeanDefinitionVisitor.prototype.visitArgumentsValues = function(beanDefinition) {
	var args = beanDefinition.getArgs();
	for (var i = 0; i < args.length; i++) {
		var wbean = args[i];
		if (wbean.getDependType() === Constant.DEPEND_TYPE_VALUE) {
			var value = wbean.getValue();
			var resolvedValue = this.resolveStringValue(value);
			if (value !== resolvedValue) {
				wbean.setValue(resolvedValue);
			}
		}
	}
}