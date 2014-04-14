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
		throw new Error('No StringValueResolver specified');
		return;
	}

	var resolvedValue = this.valueResolver.resolveStringValue(strVal);

	return resolvedValue;
}

BeanDefinitionVisitor.prototype.visitBeanDefinition = function(beanDefinition) {
	this.visitParentName(beanDefinition);
	this.visitBeanName(beanDefinition);
	this.visitFactoryBeanName(beanDefinition);
	this.visitFactoryMethodName(beanDefinition);
	this.visitScope(beanDefinition);
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

BeanDefinitionVisitor.prototype.visitBeanName = function(beanDefinition) {
	var beanName = beanDefinition.getBeanName();

	if (Utils.isNotNull(beanName)) {
		var resolvedName = this.resolveStringValue(beanName);
		if (beanName !== resolvedName) {
			beanDefinition.setBeanName(resolvedName);
		}
	}
}

BeanDefinitionVisitor.prototype.visitFactoryBeanName = function(beanDefinition) {
	var factoryBeanName = beanDefinition.getFactoryBeanName();

	if (Utils.isNotNull(factoryBeanName)) {
		var resolvedName = this.resolveStringValue(factoryBeanName);
		if (factoryBeanName !== resolvedName) {
			beanDefinition.setFactoryBeanName(resolvedName);
		}
	}
}

BeanDefinitionVisitor.prototype.visitFactoryMethodName = function(beanDefinition) {
	var factoryMethodName = beanDefinition.getFactoryMethodName();

	if (Utils.isNotNull(factoryMethodName)) {
		var resolvedName = this.resolveStringValue(factoryMethodName);
		if (factoryMethodName !== resolvedName) {
			beanDefinition.setFactoryMethodName(resolvedName);
		}
	}
}

BeanDefinitionVisitor.prototype.visitScope = function(beanDefinition) {
	var scope = beanDefinition.getScope();

	if (Utils.isNotNull(scope)) {
		var resolvedName = this.resolveStringValue(scope);
		if (scope !== resolvedName) {
			beanDefinition.setScope(resolvedName);
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