/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanDefinition
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Constant = require('../../util/constant');
var BeanUtils = require('../../util/beanUtil');
var Utils = require('../../util/utils');

/**
 * BeanDefinition constructor function.
 *
 * @api public
 */
var BeanDefinition = function() {
	this.argsOn = [];
	this.propsOn = [];
	this.func = null;
	this.order = null;
	this.proxy = true;
	this.aspect = false;
	this.abstract = false;
	this.lazyInit = false;
	this.asyncInit = false;
	this.parentName = null;
	this.parentBean = null;
	this.beanName = null;
	this.factoryArgsOn = {};
	this.factoryBeanName = null;
	this.factoryMethodName = null;
	this.initMethodName = null;
	this.destroyMethodName = null;
	this.scope = Constant.SCOPE_DEFAULT;
}

/**
 * BeanDefinition get parentName.
 *
 * @return  {String} parentName
 * @api public
 */
BeanDefinition.prototype.getParentName = function() {
	return this.parentName;
}

/**
 * BeanDefinition set parentName.
 *
 * @param  {String} parentName
 * @api public
 */
BeanDefinition.prototype.setParentName = function(parentName) {
	if (!parentName) {
		return;
	}
	this.parentName = parentName;
}

/**
 * BeanDefinition check whether has parent bean.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.hasParentBean = function() {
	return this.getParentName() && !this.getParentBean();
}

/**
 * BeanDefinition get parent bean.
 *
 * @return  {Object} parent bean
 * @api public
 */
BeanDefinition.prototype.getParentBean = function() {
	return this.parentBean;
}

/**
 * BeanDefinition set parent bean.
 *
 * @param  {Object} parentBean parent bean
 * @api public
 */
BeanDefinition.prototype.setParentBean = function(parentBean) {
	if (!parentBean) {
		return;
	}
	this.parentBean = parentBean;
}

/**
 * BeanDefinition get beanName.
 *
 * @return  {String} beanName
 * @api public
 */
BeanDefinition.prototype.getBeanName = function() {
	return this.beanName;
}

/**
 * BeanDefinition set beanName.
 *
 * @param  {String} beanName
 * @api public
 */
BeanDefinition.prototype.setBeanName = function(beanName) {
	if (!beanName) {
		return;
	}
	return this.beanName = beanName;
}

/**
 * BeanDefinition get factoryBeanName.
 *
 * @return  {String} factoryBeanName
 * @api public
 */
BeanDefinition.prototype.getFactoryBeanName = function() {
	if (this.factoryBeanName) {
		return this.factoryBeanName;
	} else {
		if (this.parentBean) {
			return this.parentBean.factoryBeanName;
		}
	}
}

/**
 * BeanDefinition set factoryBeanName.
 *
 * @param  {String} factoryBeanName
 * @api public
 */
BeanDefinition.prototype.setFactoryBeanName = function(factoryBeanName) {
	if (!factoryBeanName) {
		return;
	}
	this.factoryBeanName = factoryBeanName;
}

/**
 * BeanDefinition get factoryMethodName.
 *
 * @return  {String} factoryMethodName
 * @api public
 */
BeanDefinition.prototype.getFactoryMethodName = function() {
	if (this.factoryMethodName) {
		return this.factoryMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.factoryMethodName;
		}
	}
}

/**
 * BeanDefinition set factoryMethodName.
 *
 * @param  {String} factoryMethodName
 * @api public
 */
BeanDefinition.prototype.setFactoryMethodName = function(factoryMethodName) {
	if (!factoryMethodName) {
		return;
	}
	this.factoryMethodName = factoryMethodName;
}

/**
 * BeanDefinition get bean scope: singleton(default), prototype.
 *
 * @return  {String} scope
 * @api public
 */
BeanDefinition.prototype.getScope = function() {
	return this.scope;
}

/**
 * BeanDefinition set bean scope: singleton(default), prototype.
 *
 * @param  {String} scope
 * @api public
 */
BeanDefinition.prototype.setScope = function(scope) {
	if (!scope) {
		return;
	}
	this.scope = scope;
}

/**
 * BeanDefinition check whether is abstract.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isAbstract = function() {
	return this.abstract;
}

/**
 * BeanDefinition set abstract.
 *
 * @param  {Boolean} lazyInit true|false
 * @api public
 */
BeanDefinition.prototype.setAbstract = function(abstract) {
	if (Utils.isNotNull(abstract)) {
		this.abstract = abstract;
	}
}

/**
 * BeanDefinition check whether is lazyInit.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isLazyInit = function() {
	if (this.lazyInit) {
		return this.lazyInit;
	} else {
		if (this.parentBean) {
			return this.parentBean.lazyInit;
		}
	}
}

/**
 * BeanDefinition  set lazyInit.
 *
 * @param  {Boolean} lazyInit true|false
 * @api public
 */
BeanDefinition.prototype.setLazyInit = function(lazyInit) {
	if (Utils.isNotNull(lazyInit)) {
		this.lazyInit = lazyInit;
	}
}

/**
 * BeanDefinition check whether need to be proxied or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.needProxy = function() {
	return this.proxy;
}

/**
 * BeanDefinition set bean need proxy or not.
 *
 * @param  {Boolean} proxy true|false
 * @api public
 */
BeanDefinition.prototype.setProxy = function(proxy) {
	if (Utils.isNotNull(proxy)) {
		this.proxy = proxy;
	}
}

/**
 * BeanDefinition check whether is asyncInit.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isAsyncInit = function() {
	if (this.asyncInit) {
		return this.asyncInit;
	} else {
		if (this.parentBean) {
			return this.parentBean.asyncInit;
		}
	}
}

/**
 * BeanDefinition set bean asyncInit or not.
 *
 * @param  {Boolean} asyncInit true|false
 * @api public
 */
BeanDefinition.prototype.setAsyncInit = function(asyncInit) {
	if (Utils.isNotNull(asyncInit)) {
		this.asyncInit = asyncInit;
	}
}

/**
 * BeanDefinition set bean an aspect or not.
 *
 * @param  {Boolean} aspect true|false
 * @api public
 */
BeanDefinition.prototype.setAspect = function(aspect) {
	if (Utils.isNotNull(aspect)) {
		this.aspect = aspect;
	}
}

/**
 * BeanDefinition check whether is a aspect.
 * an aspect do not need to be proxied
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isAspect = function() {
	if (this.aspect) {
		return this.aspect;
	} else {
		if (this.parentBean) {
			return this.parentBean.aspect;
		}
	}
}

/**
 * BeanDefinition get bean props settings.
 *
 * @return  {Array} props settings
 * @api public
 */
BeanDefinition.prototype.getProps = function() {
	return this.propsOn;
}

/**
 * BeanDefinition get bean props settings.
 *
 * @return  {Array} props settings
 * @api public
 */
BeanDefinition.prototype.getPropsOn = function() {
	return this.propsOn;
}

/**
 * BeanDefinition set bean props settings.
 *
 * @param  {Array} propsOn props settings
 * @api public
 */
BeanDefinition.prototype.setPropsOn = function(propsOn) {
	if (!propsOn || !Utils.checkArray(propsOn) || !propsOn.length) {
		return;
	}
	this.updateSettingsOn(this, Constant.SETTINGS_PROPS_ON, propsOn);
}

/**
 * BeanDefinition get bean args settings.
 *
 * @return  {Array} args settings
 * @api public
 */
BeanDefinition.prototype.getArgs = function() {
	return this.argsOn;
}

/**
 * BeanDefinition get bean args settings.
 *
 * @return  {Array} args settings
 * @api public
 */
BeanDefinition.prototype.getArgsOn = function() {
	return this.argsOn;
}

/**
 * BeanDefinition set bean args settings.
 *
 * @param  {Array} argsOn args settings
 * @api public
 */
BeanDefinition.prototype.setArgsOn = function(argsOn) {
	if (!argsOn || !Utils.checkArray(argsOn) || !argsOn.length) {
		return;
	}
	this.updateSettingsOn(this, Constant.SETTINGS_ARGS_ON, argsOn);
}

/**
 * BeanDefinition get bean factory args settings.
 *
 * @return  {Array} factory args settings
 * @api public
 */
BeanDefinition.prototype.getFactoryArgs = function() {
	return this.factoryArgsOn;
}

/**
 * BeanDefinition get bean factory args settings.
 *
 * @return  {Array} factory args settings
 * @api public
 */
BeanDefinition.prototype.getFactoryArgsOn = function() {
	return this.factoryArgsOn;
}

/**
 * BeanDefinition set factory args settings.
 *
 * @param  {Array} factoryArgsOn factory args settings
 * @api public
 */
BeanDefinition.prototype.setFactoryArgsOn = function(factoryArgsOn) {
	if (!factoryArgsOn || !Utils.checkArray(factoryArgsOn) || !factoryArgsOn.length) {
		return;
	}
	this.updateSettingsOn(this, Constant.SETTINGS_FACTORY_ARGS_ON, factoryArgsOn);
}

/**
 * BeanDefinition get bean init method name.
 *
 * @return  {String} bean init method name
 * @api public
 */
BeanDefinition.prototype.getInitMethodName = function() {
	if (this.initMethodName) {
		return this.initMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.initMethodName;
		}
	}
}

/**
 * BeanDefinition set bean init method name.
 *
 * @param  {String} initMethodName bean init method name
 * @api public
 */
BeanDefinition.prototype.setInitMethodName = function(initMethodName) {
	if (!initMethodName) {
		return;
	}
	this.initMethodName = initMethodName;
}

/**
 * BeanDefinition get bean destroy method name.
 *
 * @return  {String} bean destroy method name
 * @api public
 */
BeanDefinition.prototype.getDestroyMethodName = function() {
	if (this.destroyMethodName) {
		return this.destroyMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.destroyMethodName;
		}
	}
}

/**
 * BeanDefinition set bean destroy method name.
 *
 * @param  {String} destroyMethodName bean destroy method name
 * @api public
 */
BeanDefinition.prototype.setDestroyMethodName = function(destroyMethodName) {
	if (!destroyMethodName) {
		return;
	}
	this.destroyMethodName = destroyMethodName;
}

/**
 * BeanDefinition get bean constructor function.
 *
 * @return  {Function} bean constructor function
 * @api public
 */
BeanDefinition.prototype.getFunc = function() {
	return this.func;
}

/**
 * BeanDefinition set bean constructor function.
 *
 * @param  {Function} func bean constructor function
 * @api public
 */
BeanDefinition.prototype.setFunc = function(func) {
	if (!this.func) {
		this.func = func;
	}
}

/**
 * BeanDefinition get bean order.
 *
 * @return  {Number} bean order
 * @api public
 */
BeanDefinition.prototype.getOrder = function() {
	if (this.order || this.order == 0) {
		return this.order;
	} else {
		if (this.parentBean) {
			return this.parentBean.order;
		}
	}
}

/**
 * BeanDefinition set bean order.
 *
 * @param  {Number} order bean order
 * @api public
 */
BeanDefinition.prototype.setOrder = function(order) {
	if (Utils.isNotNull(order)) {
		this.order = order;
	}
}

/**
 * BeanDefinition check bean whether is singleton or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isSingleton = function() {
	return this.scope === Constant.SCOPE_SINGLETON;
}

/**
 * BeanDefinition check bean whether is prototype or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isPrototype = function() {
	return this.scope === Constant.SCOPE_PROTOTYPE;
}

/**
 * BeanDefinition check bean whether has factoryBean or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.hasFactoryBean = function() {
	return Utils.isNotNull(this.factoryBeanName) && Utils.isNotNull(this.factoryMethodName);
}

/**
 * BeanDefinition check bean whether has initMethod or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.hasInitMethod = function() {
	return Utils.isNotNull(this.initMethodName);
}

/**
 * BeanDefinition check bean whether has parent or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.hasParent = function() {
	return Utils.isNotNull(this.parentName);
}

/**
 * BeanDefinition update settings.
 *
 * @param  {Object} beanDefinition
 * @param  {String} key key: propsOn, argsOn, factoryArgsOn
 * @param  {Array}  settingsOn settings
 * @api private
 */
BeanDefinition.prototype.updateSettingsOn = function(BeanDefinition, key, settingsOn) {
	var settings = BeanDefinition[key];

	var settingsMap = BeanUtils.getBeanSettingsMap(settings);
	var settingsOnMap = BeanUtils.getBeanSettingsMap(settingsOn);

	for (var name in settingsOnMap) {
		if (!settingsMap[name]) {
			settingsMap[name] = settingsOnMap[name];
		}
	}

	BeanDefinition[key] = BeanUtils.getBeanSettingsArray(settingsMap);
}

module.exports = BeanDefinition;