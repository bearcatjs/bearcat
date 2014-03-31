/**
 * Bearcat beanDefinition
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var constant = require('../../util/constant');
var utils = require('../../util/utils');

/**
 * beanDefinition constructor function.
 *
 * @api public
 */
var beanDefinition = function() {
	this.argsOn = {};
	this.propsOn = {};
	this.order = null;
	this.lazyInit = false;
	this.asyncInit = false;
	this.parentName = null;
	this.parentBean = null;
	this.beanClassName = null;
	this.factoryArgsOn = {};
	this.factoryBeanName = null;
	this.factoryMethodName = null;
	this.initMethodName = null;
	this.destroyMethodName = null;
	this.scope = constant.SCOPE_DEFAULT;
}

module.exports = beanDefinition;

beanDefinition.prototype.getParentName = function() {
	return this.parentName;
}

beanDefinition.prototype.setParentName = function(parentName) {
	this.parentName = parentName;
}

beanDefinition.prototype.hasParentBean = function() {
	return this.getParentName() && !this.getParentBean();
}

beanDefinition.prototype.getParentBean = function() {
	return this.parentBean;
}

beanDefinition.prototype.setParentBean = function(parentBean) {
	this.parentBean = parentBean;
}

beanDefinition.prototype.getBeanName = function() {
	return this.beanClassName;
}

beanDefinition.prototype.setBeanName = function(beanClassName) {
	return this.beanClassName = beanClassName;
}

beanDefinition.prototype.getFactoryBeanName = function() {
	if (this.factoryBeanName) {
		return this.factoryBeanName;
	} else {
		if (this.parentBean) {
			return this.parentBean.factoryBeanName;
		}
	}
}

beanDefinition.prototype.setFactoryBeanName = function(factoryBeanName) {
	this.factoryBeanName = factoryBeanName;
}

beanDefinition.prototype.getFactoryMethodName = function() {
	if (this.factoryMethodName) {
		return this.factoryMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.factoryMethodName;
		}
	}
}

beanDefinition.prototype.setFactoryMethodName = function(factoryMethodName) {
	this.factoryMethodName = factoryMethodName;
}

beanDefinition.prototype.getScope = function() {
	if (this.scope) {
		return this.scope;
	} else {
		if (this.parentBean) {
			return this.parentBean.scope;
		}
	}
}

beanDefinition.prototype.setScope = function(scope) {
	this.scope = scope;
}

beanDefinition.prototype.isLazyInit = function() {
	if (this.lazyInit) {
		return this.lazyInit;
	} else {
		if (this.parentBean) {
			return this.parentBean.lazyInit;
		}
	}
}

beanDefinition.prototype.setLazyInit = function(lazyInit) {
	this.lazyInit = lazyInit;
}

beanDefinition.prototype.isAsyncInit = function() {
	if (this.asyncInit) {
		return this.asyncInit;
	} else {
		if (this.parentBean) {
			return this.parentBean.asyncInit;
		}
	}
}

beanDefinition.prototype.setAsyncInit = function(asyncInit) {
	this.asyncInit = asyncInit;
}

beanDefinition.prototype.getProps = function() {
	return this.propsOn;
}

beanDefinition.prototype.getPropsOn = function() {
	// var r = [];
	// for (var name in this.propsOn) {
	// 	r.push(this.propsOn[name]);
	// }

	// return r;
	return this.propsOn;
}

// array
beanDefinition.prototype.setPropsOn = function(propsOn) {
	this.propsOn = propsOn;
}

beanDefinition.prototype.updatePropsOn = function(parentPropsOn) {
	this.updateSettingsOn(this, "propsOn", parentPropsOn);
}

beanDefinition.prototype.getArgs = function() {
	return this.argsOn;
}

beanDefinition.prototype.getArgsOn = function() {
	// var r = [];
	// for (var name in this.argsOn) {
	// 	r.push(this.argsOn[name]);
	// }

	// return r;
	return this.argsOn;
}

// array
beanDefinition.prototype.setArgsOn = function(argsOn) {
	this.argsOn = argsOn;
}

beanDefinition.prototype.updateArgsOn = function(parentArgsOn) {
	this.updateSettingsOn(this, "argsOn", parentArgsOn);
}

beanDefinition.prototype.getFactoryArgs = function() {
	return this.factoryArgsOn;
}

beanDefinition.prototype.getFactoryArgsOn = function() {
	var r = [];
	for (var name in this.factoryArgsOn) {
		r.push(this.factoryArgsOn[name]);
	}

	return r;
}

// array
beanDefinition.prototype.setFactoryArgsOn = function(factoryArgsOn) {
	this.factoryArgsOn = factoryArgsOn;
}

beanDefinition.prototype.updateFactoryArgsOn = function(parentFactoryArgsOn) {
	this.updateSettingsOn(this, "factoryArgsOn", parentFactoryArgsOn);
}

beanDefinition.prototype.getInitMethodName = function() {
	if (this.initMethodName) {
		return this.initMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.initMethodName;
		}
	}
}

beanDefinition.prototype.setInitMethodName = function(initMethodName) {
	this.initMethodName = initMethodName;
}

beanDefinition.prototype.getDestroyMethodName = function() {
	if (this.destroyMethodName) {
		return this.destroyMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.destroyMethodName;
		}
	}
}

beanDefinition.prototype.setDestroyMethodName = function(destroyMethodName) {
	this.destroyMethodName = destroyMethodName;
}

beanDefinition.prototype.getOrder = function() {
	if (this.order) {
		return this.order;
	} else {
		if (this.parentBean) {
			return this.parentBean.order;
		}
	}
}

beanDefinition.prototype.setOrder = function(order) {
	this.order = order;
}

beanDefinition.prototype.isSingleton = function() {
	if (this.scope) {
		return this.scope === constant.SCOPE_SINGLETON;
	} else {
		if (this.parentBean) {
			return this.parentBean.scope === constant.SCOPE_SINGLETON;
		}
	}
}

beanDefinition.prototype.isPrototype = function() {
	if (this.scope) {
		return this.scope === constant.SCOPE_PROTOTYPE;
	} else {
		if (this.parentBean) {
			return this.parentBean.scope === constant.SCOPE_PROTOTYPE;
		}
	}
}

beanDefinition.prototype.hasFactoryBean = function() {
	return utils.isNotNull(this.factoryBeanName) && utils.isNotNull(this.factoryMethodName);
}

beanDefinition.prototype.hasInitMethod = function() {
	return utils.isNotNull(this.initMethodName);
}

beanDefinition.prototype.hasParent = function() {
	return utils.isNotNull(this.parentName);
}

beanDefinition.prototype.updateSettingsOn = function(beanDefinition, key, settingsOn) {
	var settings = beanDefinition[key];

	for (var name in settingsOn) {
		if (!settings[name])
			settings[name] = settingsOn[name];
	}

	beanDefinition[key] = settings;
}

beanDefinition.prototype.toString = function() {
	return this.scope + " : " + this.lazyInit + " : " + this.beanClassName;
}