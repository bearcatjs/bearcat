/**
 * Bearcat beanFactory
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcar', 'beanFactory');
var SingletonBeanFactory = require('./singletonBeanFactory');
var BeanDefinition = require('./support/beanDefinition');
var validatorUtil = require('../util/validatorUtil');
var constant = require('../util/constant');
var beanUtil = require('../util/beanUtil');
var utils = require('../util/utils');
var async = require('async');

/**
 * beanFactory constructor function.
 *
 * @api public
 */
var beanFactory = function() {
	this.initCbMap = {};
	this.beanCurMap = {};
	this.beanFunctions = {};
	this.beanDefinitions = {};
	this.beanPostProcessors = [];
	this.singletonBeanFactory = new SingletonBeanFactory();
}

module.exports = beanFactory;

/**
 * get bean instance through beanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api public
 */
beanFactory.prototype.getBean = function(beanName) {
	if (this.beanCurMap[beanName]) {
		throw new Error("[beanFactory] circle reference beanName " + beanName + " is in creating");
	}

	arguments = Array.prototype.slice.apply(arguments);

	this.beanCurMap[beanName] = true;
	var beanObject = this.doGetBean.apply(this, arguments);
	delete this.beanCurMap[beanName];

	return beanObject;
}

/**
 * do get bean instance through beanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
beanFactory.prototype.doGetBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	if (!beanDefinition) {
		return null;
	}

	arguments = Array.prototype.slice.apply(arguments);

	if (beanDefinition.hasParentBean()) {
		beanDefinition = this.setParentBean(beanName);
	}

	if (beanDefinition.isSingleton()) {
		arguments.push(this);

		return this.singletonBeanFactory.getSingleton.apply(this.singletonBeanFactory, arguments);
	} else if (beanDefinition.isPrototype()) {

		return this.createBean.apply(this, arguments);
	}
}

/**
 * create bean instance through beanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
beanFactory.prototype.createBean = function(beanName) {
	var beanObject = this.doCreateBean.apply(this, arguments);
	this.initBean(beanObject, beanName, this.getInitCb(beanName));

	return beanObject;
}

/**
 * do create bean instance through beanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
beanFactory.prototype.doCreateBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	if (!beanDefinition) {
		return null;
	}

	if (beanDefinition.hasFactoryBean()) {
		return this.getBeanFromFactoryBean.apply(this, arguments);
	}

	var args = Array.prototype.slice.apply(arguments);
	args.shift();

	var argsOn = beanDefinition.getArgsOn();
	var propsOn = beanDefinition.getPropsOn();
	var func = this.getBeanFunction(beanName);
	if (!func) {
		return null;
	}

	var dependsBeans = this.getDependsBeanValues(argsOn, args);
	var dependsApplyArgs = this.getDependsApplyArgs(dependsBeans);

	var beanObject = Object.create(func.prototype);

	if (utils.checkArray(dependsApplyArgs)) {
		func.apply(beanObject, dependsApplyArgs);
	} else {
		func.apply(beanObject);
	}

	dependsBeans = this.getDependsBeanValues(propsOn);
	if (utils.checkArray(dependsBeans)) {
		for (var i = 0; i < dependsBeans.length; i++) {
			var wbean = dependsBeans[i];
			var name = wbean.getName();
			if (wbean.getDependType() === constant.DEPEND_TYPE_BEAN) {
				beanObject[name] = wbean.getBean();
			} else if (wbean.getDependType() === constant.DEPEND_TYPE_VALUE) {
				beanObject[name] = wbean.getValue();
			} else if (wbean.getDependType() === constant.DEPEND_TYPE_VAR) {
				beanObject[name] = wbean.getValueOnce();
			} else {
				// constant.DEPEND_TYPE_ERROR
			}
		}
	}

	return beanObject;
}

/**
 * init bean with init method.
 *
 * @param  {Object} beanObject
 * @param  {String} beanName
 * @param  {Function} async init callback function
 * @api private
 */
beanFactory.prototype.initBean = function(beanObject, beanName, cb) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return;
	}

	this.applyBeanPostProcessorsBeforeInitialization(beanObject, beanName);

	this.invokeInitMethods(beanObject, beanName, cb);

	this.applyBeanPostProcessorsAfterInitialization(beanObject, beanName);
}

beanFactory.prototype.invokeInitMethods = function(beanObject, beanName, cb) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return;
	}

	if (beanDefinition.hasInitMethod()) {
		var initMethodName = beanDefinition.getInitMethodName();

		// run init method
		var initMethod = beanObject[initMethodName];
		if (utils.checkFunction(initMethod)) {
			initMethod.call(beanObject, cb);
		}
	}
}

/**
 * get bean instance from factoryBean's factory method.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
beanFactory.prototype.getBeanFromFactoryBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	var args = Array.prototype.slice.apply(arguments);
	args.shift();

	var factoryBeanName = beanDefinition.getFactoryBeanName();
	var factoryMethodName = beanDefinition.getFactoryMethodName();
	var factoryArgsOn = beanDefinition.getFactoryArgsOn();

	var factoryBean = this.getBean(factoryBeanName);

	if (!factoryBean) {
		return null;
	}

	var factoryMethod = factoryBean[factoryMethodName];

	var dependsBeans = this.getDependsBeanValues(factoryArgsOn, args);

	var dependsApplyArgs = this.getDependsApplyArgs(dependsBeans);

	var beanObject = factoryMethod.apply(null, dependsApplyArgs);

	return beanObject;
}

/**
 * get denpended beans or values.
 *
 * @param  {Array} dependsOn
 * @param {Array} arguments
 * @return {Array} depended bean value list
 * @api private
 */
beanFactory.prototype.getDependsBeanValues = function(dependsOn, args) {
	var r = [];
	if (!utils.checkArray(dependsOn)) {
		return r;
	}

	for (var i = 0; i < dependsOn.length; i++) {
		var wbean = dependsOn[i];
		var beanName = wbean.getRef();

		if (wbean.getDependType() === constant.DEPEND_TYPE_BEAN) {
			var bean = this.getBean(beanName);
			if (bean) {
				wbean.setBean(bean);
			}
		}

		if (utils.checkArray(args)) {
			if (wbean.getDependType() === constant.DEPEND_TYPE_VAR) {
				var value = args.shift();
				wbean.setValue(value);
			}
		}

		r.push(wbean);
	}

	return r;
}

/**
 * get depended apply arguments.
 *
 * @param  {Array} dependsOn
 * @return {Array} depended bean apply list
 * @api private
 */
beanFactory.prototype.getDependsApplyArgs = function(dependsOn) {
	var r = [];

	if (!utils.checkArray(dependsOn)) {
		return r;
	}

	for (var i = 0; i < dependsOn.length; i++) {
		var wbean = dependsOn[i];
		if (wbean.getDependType() === constant.DEPEND_TYPE_BEAN) {
			r.push(wbean.getBean());
		} else if (wbean.getDependType() === constant.DEPEND_TYPE_VALUE) {
			r.push(wbean.getValue());
		} else if (wbean.getDependType() === constant.DEPEND_TYPE_VAR) {
			r.push(wbean.getValueOnce());
		} else {
			// DEPEND_TYPE_ERROR
			throw new Error("[beanFactory] depends args type error");
		}
	}

	return r;
}

/**
 * set parent bean.
 *
 * @param  {String} beanName
 * @return {Object} beanDefinition
 * @api public
 */
beanFactory.prototype.setParentBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return null;
	}

	var parentName = beanDefinition.getParentName();
	var parentBeanDefintion = this.getBeanDefinition(parentName);

	if (parentBeanDefintion) {
		beanDefinition.setParentBean(parentBeanDefintion);
		beanDefinition.updateArgsOn(parentBeanDefintion.getArgs());
		beanDefinition.updatePropsOn(parentBeanDefintion.getProps());
		beanDefinition.updateFactoryArgsOn(parentBeanDefintion.getFactoryArgs());
	}

	return beanDefinition;
}

/**
 * get depends beans.
 *
 * @param  {String} beanName
 * @return {Object} depended beans map
 * @api public
 */
beanFactory.prototype.getDependsBeans = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	var dependMap = {};

	if (!beanDefinition) {
		return dependMap;
	}

	var argsOn = beanDefinition.getArgsOn();
	var propsOn = beanDefinition.getPropsOn();

	var dependsBeans = this.getDependsBeanValues(argsOn, null);

	for (var i = 0; i < dependsBeans.length; i++) {
		var wbean = dependsBeans[i];
		var name = wbean.getName();
		if (wbean.getDependType() === constant.DEPEND_TYPE_BEAN) {
			dependMap[name] = wbean;
		}
	}

	dependsBeans = this.getDependsBeanValues(propsOn);

	for (var i = 0; i < dependsBeans.length; i++) {
		var wbean = dependsBeans[i];
		var name = wbean.getName();
		if (wbean.getDependType() === constant.DEPEND_TYPE_BEAN) {
			dependMap[name] = wbean;
		}
	}

	return dependMap;
}

/**
 * register beans through metaObjects into beanFactory.
 *
 * @param  {Object} metaObjects
 * @api public
 */
beanFactory.prototype.registryBeans = function(metaObjects) {
	for (var beanName in metaObjects) {
		this.registryBean(beanName, metaObjects[beanName]);
	}
}

/**
 * register bean through metaObject into beanFactory.
 *
 * @param  {String} beanName
 * @param  {Object} metaObjects
 * @api public
 */
beanFactory.prototype.registryBean = function(beanName, metaObject) {
	if (metaObject.func && utils.checkFunction(metaObject.func)) {
		this.setBeanFunction(beanName, metaObject.func);
	}

	if (!validatorUtil.metaValidator(metaObject)) {
		logger.error("registryBean %j metaObject %j validate error", beanName, metaObject);
		return;
	}

	var order = metaObject.order;
	var parentName = metaObject.parent;
	var initMethodName = metaObject.initMethod;
	var destroyMethodName = metaObject.destroyMethod;
	var factoryBeanName = metaObject.factoryBean;
	var factoryMethodName = metaObject.factoryMethod;
	var scope = metaObject.scope || constant.SCOPE_DEFAULT;
	var args = metaObject.args || constant.ARGS_DEFAULT;
	var props = metaObject.props || constant.PROPS_DEFAULT;
	var factoryArgsOn = metaObject.factoryArgs || constant.ARGS_DEFAULT;
	var asyncInit = metaObject.asyncInit || constant.ASYNC_INIT_DEFAULT;
	var lazyInit = metaObject.lazyInit || constant.LAZY_INIT_DEFAULT;

	var bean = new BeanDefinition();
	bean.setOrder(order);
	bean.setScope(scope);
	bean.setBeanName(beanName);
	bean.setLazyInit(lazyInit);
	bean.setAsyncInit(asyncInit);
	bean.setParentName(parentName);
	bean.setInitMethodName(initMethodName);
	bean.setFactoryBeanName(factoryBeanName);
	bean.setFactoryMethodName(factoryMethodName);
	bean.setDestroyMethodName(destroyMethodName);
	bean.setArgsOn(beanUtil.buildBeanWrapper(args));
	bean.setPropsOn(beanUtil.buildBeanWrapper(props));
	bean.setFactoryArgsOn(beanUtil.buildBeanWrapper(factoryArgsOn));

	this.beanDefinitions[beanName] = bean;
}

/**
 * instantiating singletion beans in advance.
 *
 * @api public
 */
beanFactory.prototype.preInstantiateSingletons = function(cb) {
	var beanDefinitionOrderList = beanUtil.sortBeanDefinitions(this, this.beanDefinitions);
	var self = this;

	var cur = 0;
	async.whilst(function() {
		return cur < beanDefinitionOrderList.length;
	}, function(_cb) {
		var beanDefinition = beanDefinitionOrderList[cur];
		var beanName = beanDefinition.getBeanName();
		if (beanDefinition.isSingleton()) {

			if (beanDefinition.isAsyncInit()) {
				var initCb = function() {
					cur++;
					_cb();
				}
				self.setInitCb(beanName, initCb);
				self.getBean(beanName);
			} else {
				var initCb = function() {}
				self.setInitCb(beanName, initCb);
				self.getBean(beanName);
				cur++;
				_cb();
			}

		} else {
			cur++;
			_cb();
		}
	}, function() {
		cb();
	});
}

/**
 * add beanPostProcessor to beanFactory.
 * @param  {Object} beanPostProcessor
 *
 * @api public
 */
beanFactory.prototype.addBeanPostProcessor = function(beanPostProcessor) {
	this.beanPostProcessors.push(beanPostProcessor);
}

/**
 * get beanPostProcessors.
 * @return {Object}
 *
 * @api public
 */
beanFactory.prototype.getBeanPostProcessors = function() {
	return this.beanPostProcessors;
}

beanFactory.prototype.applyBeanPostProcessorsBeforeInitialization = function(beanObject, beanName) {
	var result = beanObject;

	var beanPostProcessors = this.getBeanPostProcessors();
	for (var i = 0; i < beanPostProcessors.length; i++) {
		var beanProcessor = beanPostProcessors[i];
		result = beanProcessor.before(result, beanName);
		if (result == null) {
			return result;
		}
	}

	return result;
}

beanFactory.prototype.applyBeanPostProcessorsAfterInitialization = function(beanObject, beanName) {
	var result = beanObject;

	var beanPostProcessors = this.getBeanPostProcessors();
	for (var i = 0; i < beanPostProcessors.length; i++) {
		var beanProcessor = beanPostProcessors[i];
		result = beanProcessor.after(result, beanName);
		if (result == null) {
			return result;
		}
	}

	return result;
}

/**
 * destroy singletons.
 *
 * @api public
 */
beanFactory.prototype.destroySingletons = function() {
	var singletonNames = this.singletonBeanFactory.getSingletonNames();

	for (var i = 0; i < singletonNames.length; i++) {
		this.destroySingleton(singletonNames[i]);
	}
}

/**
 * destroy beanFactory.
 *
 * @api public
 */
beanFactory.prototype.destroyBeanFactory = function() {
	this.initCbMap = null;
	this.beanCurMap = null;
	this.beanFunctions = null;
	this.beanDefinitions = null;
	this.singletonBeanFactory = null;
}

/**
 * destroy singleton.
 *
 * @param  {String} beanName
 * @api public
 */
beanFactory.prototype.destroySingleton = function(beanName) {
	var beanObject = this.getBean(beanName);

	this.destroyBean(beanName, beanObject);

	this.singletonBeanFactory.removeSingleton(beanName);
}

/**
 * destroy bean.
 *
 * @param  {String} beanName
 * @param  {Object} beanObject
 * @api public
 */
beanFactory.prototype.destroyBean = function(beanName, beanObject) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return;
	}

	var dependMap = this.getDependsBeans(beanName);

	for (var name in dependMap) {
		var bean = dependMap[name];
		if (bean && bean.getBean()) {
			this.destroySingleton(name);
		}
	}

	var destroyMethodName = beanDefinition.getDestroyMethodName();

	var destroyMethod = beanObject[destroyMethodName];
	if (utils.checkFunction(destroyMethod)) {
		destroyMethod.call(beanObject);
	}

	this.removeFunction(beanName);
	this.removeBeanDefinition(beanName);
}

/**
 * check bean is a singleton or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
beanFactory.prototype.isSingleton = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (beanDefinition) {
		return beanDefinition.isSingleton();
	} else {
		return false;
	}
}

/**
 * check bean is a prototype or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
beanFactory.prototype.isPrototype = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (beanDefinition) {
		return beanDefinition.isPrototype();
	} else {
		return false;
	}
}

/**
 * check beanFactory contains bean or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
beanFactory.prototype.containsBean = function(beanName) {
	return this.getBeanFunction(beanName) && this.getBeanDefinition(beanName);
}

/**
 * get bean contructor function.
 *
 * @param  {String} beanName
 * @return {Function} bean constructor function
 * @api public
 */
beanFactory.prototype.getBeanFunction = function(beanName) {
	return this.beanFunctions[beanName];
}

/**
 * set bean contructor function.
 *
 * @param  {String} beanName
 * @param {Function} bean constructor function
 * @api public
 */
beanFactory.prototype.setBeanFunction = function(beanName, func) {
	this.beanFunctions[beanName] = func;
}

/**
 * remove bean contructor function from beanFactory.
 *
 * @param  {String} beanName
 * @api public
 */
beanFactory.prototype.removeFunction = function(beanName) {
	delete this.beanFunctions[beanName];
}

/**
 * get init method.
 *
 * @param  {String} beanName
 * @return {Function} bean init method
 * @api public
 */
beanFactory.prototype.getInitCb = function(beanName) {
	if (!this.initCbMap[beanName]) {
		this.initCbMap[beanName] = constant.INIT_CB_DEFAULT;
	}

	return this.initCbMap[beanName];
}

/**
 * set init method.
 *
 * @param  {String} beanName
 * @param {Function} bean init method
 * @api public
 */
beanFactory.prototype.setInitCb = function(beanName, initCb) {
	this.initCbMap[beanName] = initCb;
}

/**
 * get beanDefinition.
 *
 * @param  {String} beanName
 * @return {Object} beanDefinition
 * @api public
 */
beanFactory.prototype.getBeanDefinition = function(beanName) {
	return this.beanDefinitions[beanName];
}

/**
 * remove beanDefinition from beanFactory.
 *
 * @param  {String} beanName
 * @api public
 */
beanFactory.prototype.removeBeanDefinition = function(beanName) {
	delete this.beanDefinitions[beanName];
}

/**
 * check beanFactory contains beanName beanDefinition or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
beanFactory.prototype.containsBeanDefinition = function(beanName) {
	return !!this.getBeanDefinition(beanName);
}