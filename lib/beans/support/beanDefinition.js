/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * |   _  )  |   ____)   /   \     |   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * |______)  |_______/__/     \__\ | _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanDefinition
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
var BeanDefinition = function() {
	this.argsOn = {};
	this.propsOn = {};
	this.order = null;
	this.proxy = true;
	this.lazyInit = false;
	this.asyncInit = false;
	this.aspect = false;
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

module.exports = BeanDefinition;

BeanDefinition.prototype.getParentName = function() {
	return this.parentName;
}

BeanDefinition.prototype.setParentName = function(parentName) {
	this.parentName = parentName;
}

BeanDefinition.prototype.hasParentBean = function() {
	return this.getParentName() && !this.getParentBean();
}

BeanDefinition.prototype.getParentBean = function() {
	return this.parentBean;
}

BeanDefinition.prototype.setParentBean = function(parentBean) {
	this.parentBean = parentBean;
}

BeanDefinition.prototype.getBeanName = function() {
	return this.beanClassName;
}

BeanDefinition.prototype.setBeanName = function(beanClassName) {
	return this.beanClassName = beanClassName;
}

BeanDefinition.prototype.getFactoryBeanName = function() {
	if (this.factoryBeanName) {
		return this.factoryBeanName;
	} else {
		if (this.parentBean) {
			return this.parentBean.factoryBeanName;
		}
	}
}

BeanDefinition.prototype.setFactoryBeanName = function(factoryBeanName) {
	this.factoryBeanName = factoryBeanName;
}

BeanDefinition.prototype.getFactoryMethodName = function() {
	if (this.factoryMethodName) {
		return this.factoryMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.factoryMethodName;
		}
	}
}

BeanDefinition.prototype.setFactoryMethodName = function(factoryMethodName) {
	this.factoryMethodName = factoryMethodName;
}

BeanDefinition.prototype.getScope = function() {
	if (this.scope) {
		return this.scope;
	} else {
		if (this.parentBean) {
			return this.parentBean.scope;
		}
	}
}

BeanDefinition.prototype.setScope = function(scope) {
	this.scope = scope;
}

BeanDefinition.prototype.isLazyInit = function() {
	if (this.lazyInit) {
		return this.lazyInit;
	} else {
		if (this.parentBean) {
			return this.parentBean.lazyInit;
		}
	}
}

BeanDefinition.prototype.setLazyInit = function(lazyInit) {
	this.lazyInit = lazyInit;
}

BeanDefinition.prototype.needProxy = function() {
	if (this.proxy) {
		return this.proxy;
	} else {
		if (this.parentBean) {
			return this.parentBean.proxy;
		}
	}
}

BeanDefinition.prototype.setProxy = function(proxy) {
	this.proxy = proxy;
}

BeanDefinition.prototype.isAsyncInit = function() {
	if (this.asyncInit) {
		return this.asyncInit;
	} else {
		if (this.parentBean) {
			return this.parentBean.asyncInit;
		}
	}
}

BeanDefinition.prototype.setAsyncInit = function(asyncInit) {
	this.asyncInit = asyncInit;
}

BeanDefinition.prototype.setAspect = function(aspect) {
	this.aspect = aspect;
}

BeanDefinition.prototype.isAspect = function() {
	if (this.aspect) {
		return this.aspect;
	} else {
		if (this.parentBean) {
			return this.parentBean.aspect;
		}
	}
}

BeanDefinition.prototype.getProps = function() {
	return this.propsOn;
}

BeanDefinition.prototype.getPropsOn = function() {
	// var r = [];
	// for (var name in this.propsOn) {
	// 	r.push(this.propsOn[name]);
	// }

	// return r;
	return this.propsOn;
}

// array
BeanDefinition.prototype.setPropsOn = function(propsOn) {
	this.propsOn = propsOn;
}

BeanDefinition.prototype.updatePropsOn = function(parentPropsOn) {
	this.updateSettingsOn(this, "propsOn", parentPropsOn);
}

BeanDefinition.prototype.getArgs = function() {
	return this.argsOn;
}

BeanDefinition.prototype.getArgsOn = function() {
	// var r = [];
	// for (var name in this.argsOn) {
	// 	r.push(this.argsOn[name]);
	// }

	// return r;
	return this.argsOn;
}

// array
BeanDefinition.prototype.setArgsOn = function(argsOn) {
	this.argsOn = argsOn;
}

BeanDefinition.prototype.updateArgsOn = function(parentArgsOn) {
	this.updateSettingsOn(this, "argsOn", parentArgsOn);
}

BeanDefinition.prototype.getFactoryArgs = function() {
	return this.factoryArgsOn;
}

BeanDefinition.prototype.getFactoryArgsOn = function() {
	var r = [];
	for (var name in this.factoryArgsOn) {
		r.push(this.factoryArgsOn[name]);
	}

	return r;
}

// array
BeanDefinition.prototype.setFactoryArgsOn = function(factoryArgsOn) {
	this.factoryArgsOn = factoryArgsOn;
}

BeanDefinition.prototype.updateFactoryArgsOn = function(parentFactoryArgsOn) {
	this.updateSettingsOn(this, "factoryArgsOn", parentFactoryArgsOn);
}

BeanDefinition.prototype.getInitMethodName = function() {
	if (this.initMethodName) {
		return this.initMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.initMethodName;
		}
	}
}

BeanDefinition.prototype.setInitMethodName = function(initMethodName) {
	this.initMethodName = initMethodName;
}

BeanDefinition.prototype.getDestroyMethodName = function() {
	if (this.destroyMethodName) {
		return this.destroyMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.destroyMethodName;
		}
	}
}

BeanDefinition.prototype.setDestroyMethodName = function(destroyMethodName) {
	this.destroyMethodName = destroyMethodName;
}

BeanDefinition.prototype.getOrder = function() {
	if (this.order) {
		return this.order;
	} else {
		if (this.parentBean) {
			return this.parentBean.order;
		}
	}
}

BeanDefinition.prototype.setOrder = function(order) {
	this.order = order;
}

BeanDefinition.prototype.isSingleton = function() {
	if (this.scope) {
		return this.scope === constant.SCOPE_SINGLETON;
	} else {
		if (this.parentBean) {
			return this.parentBean.scope === constant.SCOPE_SINGLETON;
		}
	}
}

BeanDefinition.prototype.isPrototype = function() {
	if (this.scope) {
		return this.scope === constant.SCOPE_PROTOTYPE;
	} else {
		if (this.parentBean) {
			return this.parentBean.scope === constant.SCOPE_PROTOTYPE;
		}
	}
}

BeanDefinition.prototype.hasFactoryBean = function() {
	return utils.isNotNull(this.factoryBeanName) && utils.isNotNull(this.factoryMethodName);
}

BeanDefinition.prototype.hasInitMethod = function() {
	return utils.isNotNull(this.initMethodName);
}

BeanDefinition.prototype.hasParent = function() {
	return utils.isNotNull(this.parentName);
}

BeanDefinition.prototype.updateSettingsOn = function(BeanDefinition, key, settingsOn) {
	var settings = BeanDefinition[key];

	for (var name in settingsOn) {
		if (!settings[name])
			settings[name] = settingsOn[name];
	}

	BeanDefinition[key] = settings;
}

BeanDefinition.prototype.toString = function() {
	return this.scope + " : " + this.lazyInit + " : " + this.beanClassName;
}