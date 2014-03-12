var constant = require('../util/constant');
var utils = require('../util/utils');

var bean = function() {
	this.scope = constant.SCOPE_DEFAULT;
	this.lazyInit = false;
	this.asyncInit = false;
	this.parentName = null;
	this.parentBean = null;
	this.beanClassName = null;
	this.factoryBeanName = null;
	this.factoryMethodName = null;
	this.factoryArgsOn = {};
	this.initMethodName = null;
	this.destroyMethodName = null;
	this.order = null;
	this.propsOn = {};
	this.argsOn = {};
}

module.exports = bean;

bean.prototype.getParentName = function() {
	return this.parentName;
}

bean.prototype.setParentName = function(parentName) {
	this.parentName = parentName;
}

bean.prototype.getParentBean = function() {
	return this.parentBean;
}

bean.prototype.setParentBean = function(parentBean) {
	this.parentBean = parentBean;
}

bean.prototype.getBeanClassName = function() {
	return this.beanClassName;
}

bean.prototype.setBeanClassName = function(beanClassName) {
	return this.beanClassName = beanClassName;
}

bean.prototype.getFactoryBeanName = function() {
	if (this.factoryBeanName) {
		return this.factoryBeanName;
	} else {
		if (this.parentBean) {
			return this.parentBean.factoryBeanName;
		}
	}
}

bean.prototype.setFactoryBeanName = function(factoryBeanName) {
	this.factoryBeanName = factoryBeanName;
}

bean.prototype.getFactoryMethodName = function() {
	if (this.factoryMethodName) {
		return this.factoryMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.factoryMethodName;
		}
	}
}

bean.prototype.setFactoryMethodName = function(factoryMethodName) {
	this.factoryMethodName = factoryMethodName;
}

bean.prototype.getScope = function() {
	if (this.scope) {
		return this.scope;
	} else {
		if (this.parentBean) {
			return this.parentBean.scope;
		}
	}
}

bean.prototype.setScope = function(scope) {
	this.scope = scope;
}

bean.prototype.isLazyInit = function() {
	if (tihs.lazyInit) {
		return this.lazyInit;
	} else {
		if (this.parentBean) {
			return this.parentBean.lazyInit;
		}
	}
}

bean.prototype.setLazyInit = function(lazyInit) {
	this.lazyInit = lazyInit;
}

bean.prototype.isAsyncInit = function() {
	if (this.asyncInit) {
		return this.asyncInit;
	} else {
		if (this.parentBean) {
			return this.parentBean.asyncInit;
		}
	}
}

bean.prototype.setAsyncInit = function(asyncInit) {
	this.asyncInit = asyncInit;
}

bean.prototype.getProps = function() {
	return this.propsOn;
}

bean.prototype.getPropsOn = function() {
	var r = [];
	for (var name in this.propsOn) {
		r.push(this.propsOn[name]);
	}

	return r;
}

// array
bean.prototype.setPropsOn = function(propsOn) {
	this.propsOn = propsOn;
}

bean.prototype.updatePropsOn = function(parentPropsOn) {
	this.updateSettingsOn(this, "propsOn", parentPropsOn);
}

bean.prototype.getArgs = function() {
	return this.argsOn;
}

bean.prototype.getArgsOn = function() {
	var r = [];
	for (var name in this.argsOn) {
		r.push(this.argsOn[name]);
	}

	return r;
}

// array
bean.prototype.setArgsOn = function(argsOn) {
	this.argsOn = argsOn;
}

bean.prototype.updateArgsOn = function(parentArgsOn) {
	this.updateSettingsOn(this, "argsOn", parentArgsOn);
}

bean.prototype.getFactoryArgs = function() {
	return this.factoryArgsOn;
}

bean.prototype.getFactoryArgsOn = function() {
	var r = [];
	for (var name in this.factoryArgsOn) {
		r.push(this.factoryArgsOn[name]);
	}

	return r;
}

// array
bean.prototype.setFactoryArgsOn = function(factoryArgsOn) {
	this.factoryArgsOn = factoryArgsOn;
}

bean.prototype.updateFactoryArgsOn = function(parentFactoryArgsOn) {
	this.updateSettingsOn(this, "factoryArgsOn", parentFactoryArgsOn);
}

bean.prototype.getInitMethodName = function() {
	if (this.initMethodName) {
		return this.initMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.initMethodName;
		}
	}
}

bean.prototype.setInitMethodName = function(initMethodName) {
	this.initMethodName = initMethodName;
}

bean.prototype.getDestroyMethodName = function() {
	if (this.destroyMethodName) {
		return this.destroyMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.destroyMethodName;
		}
	}
}

bean.prototype.setDestroyMethodName = function(destroyMethodName) {
	this.destroyMethodName = destroyMethodName;
}

bean.prototype.getOrder = function() {
	if (this.order) {
		return this.order;
	} else {
		if (this.parentBean) {
			return this.parentBean.order;
		}
	}
}

bean.prototype.setOrder = function(order) {
	this.order = order;
}

bean.prototype.isSingleton = function() {
	if (this.scope) {
		return this.scope === constant.SCOPE_SINGLETON;
	} else {
		if (this.parentBean) {
			return this.parentBean.scope === constant.SCOPE_SINGLETON;
		}
	}
}

bean.prototype.isPrototype = function() {
	if (this.scope) {
		return this.scope === constant.SCOPE_PROTOTYPE;
	} else {
		if (this.parentBean) {
			return this.parentBean.scope === constant.SCOPE_PROTOTYPE;
		}
	}
}

bean.prototype.hasFactoryBean = function() {
	return utils.isNotNull(this.factoryBeanName) && utils.isNotNull(this.factoryMethodName);
}

bean.prototype.hasInitMethod = function() {
	return utils.isNotNull(this.initMethodName);
}

bean.prototype.hasParent = function() {
	return utils.isNotNull(this.parentName);
}

bean.prototype.toString = function() {
	return this.scope + " : " + this.lazyInit + " : " + this.beanClassName;
}

bean.prototype.updateSettingsOn = function(beanDefinition, key, settingsOn) {
	var settings = beanDefinition[key];

	for (var name in settingsOn) {
		if (!settings[name])
			settings[name] = settingsOn[name];
	}

	beanDefinition[key] = settings;
}