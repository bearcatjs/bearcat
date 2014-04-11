/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * |   _  )  |   ____)   /   \     |   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * |______)  |_______/__/     \__\ | _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanFactory
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcar', 'BeanFactory');
var SingletonBeanFactory = require('./singletonBeanFactory');
var BeanDefinition = require('./support/beanDefinition');
var validatorUtil = require('../util/validatorUtil');
var constant = require('../util/constant');
var beanUtil = require('../util/beanUtil');
var aopUtil = require('../util/aopUtil');
var Aspect = require('../aop/aspect');
var utils = require('../util/utils');
var async = require('async');

/**
 * BeanFactory constructor function.
 *
 * @api public
 */
var BeanFactory = function() {
	this.aspects = [];
	this.initCbMap = {};
	this.beanCurMap = {};
	this.beanFunctions = {};
	this.beanDefinitions = {};
	this.beanPostProcessors = [];
	this.singletonBeanFactory = new SingletonBeanFactory();
}

module.exports = BeanFactory;

/**
 * get bean instance through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api public
 */
BeanFactory.prototype.getBean = function(beanName) {
	if (this.beanCurMap[beanName]) {
		throw new Error("[BeanFactory] circle reference beanName " + beanName + " is in creating");
	}

	arguments = Array.prototype.slice.apply(arguments);

	this.beanCurMap[beanName] = true;
	var beanObject = this.doGetBean.apply(this, arguments);
	delete this.beanCurMap[beanName];

	return beanObject;
}

/**
 * do get bean instance through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
BeanFactory.prototype.doGetBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	if (!beanDefinition) {
		logger.error('BeanFactory beanDefinition null for %j', beanName);
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
 * create bean instance through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
BeanFactory.prototype.createBean = function(beanName) {
	var beanObject = this.doCreateBean.apply(this, arguments);
	beanObject = this.initBean(beanObject, beanName, this.getInitCb(beanName));

	return beanObject;
}

/**
 * do create bean instance through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
BeanFactory.prototype.doCreateBean = function(beanName) {
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
BeanFactory.prototype.initBean = function(beanObject, beanName, cb) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return;
	}

	beanObject = this.applyBeanPostProcessorsBeforeInitialization(beanObject, beanName);

	this.invokeInitMethods(beanObject, beanName, cb);

	beanObject = this.applyBeanPostProcessorsAfterInitialization(beanObject, beanName);

	return beanObject;
}

BeanFactory.prototype.invokeInitMethods = function(beanObject, beanName, cb) {
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
BeanFactory.prototype.getBeanFromFactoryBean = function(beanName) {
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
BeanFactory.prototype.getDependsBeanValues = function(dependsOn, args) {
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
BeanFactory.prototype.getDependsApplyArgs = function(dependsOn) {
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
			throw new Error("[BeanFactory] depends args type error");
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
BeanFactory.prototype.setParentBean = function(beanName) {
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
BeanFactory.prototype.getDependsBeans = function(beanName) {
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
 * register beans through metaObjects into BeanFactory.
 *
 * @param  {Object} metaObjects
 * @api public
 */
BeanFactory.prototype.registryBeans = function(metaObjects) {
	for (var beanName in metaObjects) {
		this.registryBean(beanName, metaObjects[beanName]);
	}
}

/**
 * register bean through metaObject into BeanFactory.
 *
 * @param  {String} beanName
 * @param  {Object} metaObjects
 * @api public
 */
BeanFactory.prototype.registryBean = function(beanName, metaObject) {
	if (metaObject.func && utils.checkFunction(metaObject.func) && !this.getBeanFunction(beanName)) {
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
	var proxy = metaObject.proxy;
	if (typeof proxy === 'undefined') {
		proxy = constant.PROXY_DEFAULT;
	}

	var aop = metaObject.aop;

	var beanDefinition = null;
	beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		beanDefinition = new BeanDefinition();
	}

	beanDefinition.setOrder(order);
	beanDefinition.setScope(scope);
	beanDefinition.setProxy(proxy);
	beanDefinition.setBeanName(beanName);
	beanDefinition.setLazyInit(lazyInit);
	beanDefinition.setAsyncInit(asyncInit);
	beanDefinition.setParentName(parentName);
	beanDefinition.setInitMethodName(initMethodName);
	beanDefinition.setFactoryBeanName(factoryBeanName);
	beanDefinition.setFactoryMethodName(factoryMethodName);
	beanDefinition.setDestroyMethodName(destroyMethodName);
	beanDefinition.setArgsOn(beanUtil.buildBeanWrapper(args));
	beanDefinition.setPropsOn(beanUtil.buildBeanWrapper(props));
	beanDefinition.setFactoryArgsOn(beanUtil.buildBeanWrapper(factoryArgsOn));

	if (aop && Array.isArray(aop)) {
		var aspect = aopUtil.buildAspect(aop, beanDefinition);
		this.aspects.push(aspect);
		beanDefinition.setAspect(true);
	}

	this.beanDefinitions[beanName] = beanDefinition;
}

/**
 * instantiating singletion beans in advance.
 *
 * @api public
 */
BeanFactory.prototype.preInstantiateSingletons = function(cb) {
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
 * add beanPostProcessor to BeanFactory.
 * @param  {Object} beanPostProcessor
 *
 * @api public
 */
BeanFactory.prototype.addBeanPostProcessor = function(beanPostProcessor) {
	this.beanPostProcessors.push(beanPostProcessor);
}

/**
 * get beanPostProcessors.
 * @return {Object}
 *
 * @api public
 */
BeanFactory.prototype.getBeanPostProcessors = function() {
	return this.beanPostProcessors;
}

BeanFactory.prototype.applyBeanPostProcessorsBeforeInitialization = function(beanObject, beanName) {
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

BeanFactory.prototype.applyBeanPostProcessorsAfterInitialization = function(beanObject, beanName) {
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
BeanFactory.prototype.destroySingletons = function() {
	var singletonNames = this.singletonBeanFactory.getSingletonNames();

	for (var i = 0; i < singletonNames.length; i++) {
		this.destroySingleton(singletonNames[i]);
	}
}

/**
 * destroy BeanFactory.
 *
 * @api public
 */
BeanFactory.prototype.destroyBeanFactory = function() {
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
BeanFactory.prototype.destroySingleton = function(beanName) {
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
BeanFactory.prototype.destroyBean = function(beanName, beanObject) {
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
BeanFactory.prototype.isSingleton = function(beanName) {
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
BeanFactory.prototype.isPrototype = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (beanDefinition) {
		return beanDefinition.isPrototype();
	} else {
		return false;
	}
}

/**
 * check BeanFactory contains bean or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
BeanFactory.prototype.containsBean = function(beanName) {
	return this.getBeanFunction(beanName) && this.getBeanDefinition(beanName);
}

/**
 * get bean contructor function.
 *
 * @param  {String} beanName
 * @return {Function} bean constructor function
 * @api public
 */
BeanFactory.prototype.getBeanFunction = function(beanName) {
	return this.beanFunctions[beanName];
}

/**
 * set bean contructor function.
 *
 * @param  {String} beanName
 * @param {Function} bean constructor function
 * @api public
 */
BeanFactory.prototype.setBeanFunction = function(beanName, func) {
	this.beanFunctions[beanName] = func;
}

/**
 * remove bean contructor function from BeanFactory.
 *
 * @param  {String} beanName
 * @api public
 */
BeanFactory.prototype.removeFunction = function(beanName) {
	delete this.beanFunctions[beanName];
}

/**
 * get init method.
 *
 * @param  {String} beanName
 * @return {Function} bean init method
 * @api public
 */
BeanFactory.prototype.getInitCb = function(beanName) {
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
BeanFactory.prototype.setInitCb = function(beanName, initCb) {
	this.initCbMap[beanName] = initCb;
}

/**
 * get beanDefinition.
 *
 * @param  {String} beanName
 * @return {Object} beanDefinition
 * @api public
 */
BeanFactory.prototype.getBeanDefinition = function(beanName) {
	return this.beanDefinitions[beanName];
}

/**
 * remove beanDefinition from BeanFactory.
 *
 * @param  {String} beanName
 * @api public
 */
BeanFactory.prototype.removeBeanDefinition = function(beanName) {
	delete this.beanDefinitions[beanName];
}

/**
 * check BeanFactory contains beanName beanDefinition or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
BeanFactory.prototype.containsBeanDefinition = function(beanName) {
	return !!this.getBeanDefinition(beanName);
}

BeanFactory.prototype.getAspects = function() {
	return this.aspects;
}