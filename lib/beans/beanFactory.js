/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanFactory
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'BeanFactory');
var DynamicMetaProxy = require('../aop/framework/dynamicMetaProxy');
var SingletonBeanFactory = require('./singletonBeanFactory');
var ModelConstraint = require('../model/modelConstraint');
var ModelDefinition = require('../model/modelDefinition');
var BeanDefinition = require('./support/beanDefinition');
var ValidatorUtil = require('../util/validatorUtil');
var ModelFilter = require('../model/modelFilter');
var ModelProxy = require('../model/modelProxy');
var ModelUtil = require('../util/modelUtil');
var Constant = require('../util/constant');
var BeanUtil = require('../util/beanUtil');
var AopUtil = require('../util/aopUtil');
var Aspect = require('../aop/aspect');
var Utils = require('../util/utils');

/**
 * BeanFactory constructor function.
 *
 * @api public
 */
var BeanFactory = function() {
	this.aspects = [];
	this.modelMap = {};
	this.initCbMap = {};
	this.beanCurMap = {};
	this.constraints = {};
	this.tableModelMap = {};
	this.beanFunctions = {};
	this.beanDefinitions = {};
	this.beanPostProcessors = [];
	this.singletonBeanFactory = new SingletonBeanFactory(this);
}

/**
 * BeanFactory get bean instance through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api public
 */
BeanFactory.prototype.getBean = function(beanName) {
	if (this.beanCurMap[beanName]) {
		logger.error("circle reference beanName " + beanName + " is in creating");
		return;
	}

	this.beanCurMap[beanName] = true;
	var beanObject = this.doGetBean.apply(this, arguments);
	delete this.beanCurMap[beanName];

	return beanObject;
}

/**
 * BeanFactory get bean proxy through BeanFactory IoC container for lazy init bean.
 * when invoke bean proxy, proxy will invoke getBean to get the target bean
 *
 * @param  {String} beanName
 * @return {Object} bean proxy object
 * @api public
 */
BeanFactory.prototype.getBeanProxy = function(beanName) {
	return this.doGetBeanProxy.apply(this, arguments);
}

/**
 * BeanFactory get model through BeanFactory IoC container.
 *
 * @param  {String} modelId
 * @return {Object} model proxy object
 * @api public
 */
BeanFactory.prototype.getModelProxy = function(modelId) {
	return this.doGetModelProxy(modelId);
}

/**
 * BeanFactory get constraint through BeanFactory IoC container.
 *
 * @param  {String} cid
 * @return {Object} constraint bean object
 * @api public
 */
BeanFactory.prototype.getConstraint = function(cid) {
	return this.doGetConstraint(cid);
}

/**
 * BeanFactory do get bean instance through BeanFactory IoC container.
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

	if (beanDefinition.isAbstract()) {
		logger.warn('abstract bean can not get bean instance, you can use bearcat.getFunction to get constructor function of the bean');
		return this.getBeanFunction(beanName);
	}

	if (beanDefinition.hasParentBean()) {
		beanDefinition = this.setParentBean(beanName);
	}

	// if (beanDefinition.isLazyInit()) {
	// 	return this.getBeanProxy.apply(this, arguments);
	// }

	if (beanDefinition.isSingleton()) {
		return this.singletonBeanFactory.getSingleton.apply(this.singletonBeanFactory, arguments);
	} else if (beanDefinition.isPrototype()) {
		return this.createBean.apply(this, arguments);
	}
}

/**
 * BeanFactory do get bean proxy through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean proxy object
 * @api private
 */
BeanFactory.prototype.doGetBeanProxy = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	if (!beanDefinition) {
		logger.error('BeanFactory beanDefinition null for %j', beanName);
		return null;
	}

	var dynamicMetaProxy = new DynamicMetaProxy();
	dynamicMetaProxy['beanDefinition'] = beanDefinition;
	dynamicMetaProxy['beanFactory'] = this;
	dynamicMetaProxy['args'] = arguments;
	dynamicMetaProxy._dyInit();

	return dynamicMetaProxy;
}

/**
 * BeanFactory do get model through BeanFactory IoC container.
 *
 * @param  {String} modelId
 * @return {Object} model proxy
 * @api private
 */
BeanFactory.prototype.doGetModelProxy = function(modelId) {
	var modelDefinition = this.getModelDefinition(modelId);

	if (!modelDefinition) {
		logger.error('BeanFactory modelDefinition null for %j', modelId);
		return null;
	}

	var beanName = modelDefinition.getId();
	var beanDefinition = this.getBeanDefinition(beanName);

	if (!beanDefinition) {
		logger.error('BeanFactory beanDefinition null for %j', modelId);
		return null;
	}

	var modelFilter = new ModelFilter();
	modelFilter.setModelDefinition(modelDefinition);

	var modelProxy = new ModelProxy();
	var modelBean = this.getBean(beanName);
	var modelFields = modelDefinition.getFields();

	for (var key in modelFields) {
		var modelField = modelFields[key];
		var modelDefault = modelField.getDefault();
		var modelFieldType = modelField.getType();
		if (Utils.isNotNull(modelDefault)) {
			if (modelFieldType === Constant.TYPE_NUMBER) {
				modelDefault = parseInt(modelDefault);
			}
			modelBean[key] = modelDefault;
		}
	}

	modelFilter.setModel(modelBean);
	modelProxy['model'] = modelBean;
	modelProxy['beanFactory'] = this;
	modelProxy['modelFilter'] = modelFilter;
	modelProxy['beanDefinition'] = beanDefinition;
	modelProxy['modelDefinition'] = modelDefinition;

	modelProxy._modelInit();

	return modelProxy;
}

/**
 * BeanFactory do get constraint through BeanFactory IoC container.
 *
 * @param  {String} cid
 * @return {Object} constraint bean object
 * @api private
 */
BeanFactory.prototype.doGetConstraint = function(cid) {
	var constraintDefinition = this.getConstraintDefinition(cid);

	if (!constraintDefinition) {
		logger.error('BeanFactory constraintDefinition null for %j', cid);
		return null;
	}

	var beanName = constraintDefinition.getId();
	return this.getBean(beanName);
}

/**
 * BeanFactory create bean instance through BeanFactory IoC container.
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
 * BeanFactory do create bean instance through BeanFactory IoC container.
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

	var argsOn = beanDefinition.getArgsOn();
	var propsOn = beanDefinition.getPropsOn();
	var func = this.getBeanFunction(beanName);
	if (!func) {
		return null;
	}

	var dependsBeans = this.getDependsBeanValues(argsOn, arguments);
	var dependsApplyArgs = this.getDependsApplyArgs(dependsBeans);

	var beanObject = Object.create(func.prototype);

	func.apply(beanObject, dependsApplyArgs);

	dependsBeans = this.getDependsBeanValues(propsOn);
	if (Utils.checkArray(dependsBeans)) {
		for (var i = 0; i < dependsBeans.length; i++) {
			var wbean = dependsBeans[i];
			var name = wbean.getName();
			if (wbean.getDependType() === Constant.DEPEND_TYPE_BEAN) {
				beanObject[name] = wbean.getBean();
			} else if (wbean.getDependType() === Constant.DEPEND_TYPE_VALUE) {
				beanObject[name] = wbean.getValue();
			}
			// no this case
			// else if (wbean.getDependType() === Constant.DEPEND_TYPE_VAR) {
			// beanObject[name] = wbean.getValueOnce();
			// } 
			else {
				// Constant.DEPEND_TYPE_ERROR
			}
		}
	}

	return beanObject;
}

/**
 * BeanFactory init bean with init method.
 *
 * @param  {Object}   beanObject
 * @param  {String}   beanName
 * @param  {Function} cb async init callback function
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

/**
 * BeanFactory invoke init method.
 *
 * @param  {Object}   beanObject
 * @param  {String}   beanName
 * @param  {Function} cb async init callback function
 * @api private
 */
BeanFactory.prototype.invokeInitMethods = function(beanObject, beanName, cb) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return;
	}

	if (beanDefinition.hasInitMethod()) {
		var initMethodName = beanDefinition.getInitMethodName();

		// run init method
		var initMethod = beanObject[initMethodName];
		if (Utils.checkFunction(initMethod)) {
			initMethod.call(beanObject, cb);
		}
	}
}

/**
 * BeanFactory get bean instance from factoryBean's factory method.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
BeanFactory.prototype.getBeanFromFactoryBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	var factoryBeanName = beanDefinition.getFactoryBeanName();
	var factoryMethodName = beanDefinition.getFactoryMethodName();
	var factoryArgsOn = beanDefinition.getFactoryArgsOn();

	var factoryBean = this.getBean(factoryBeanName);

	if (!factoryBean) {
		return null;
	}

	var factoryMethod = factoryBean[factoryMethodName];

	var dependsBeans = this.getDependsBeanValues(factoryArgsOn, arguments);

	var dependsApplyArgs = this.getDependsApplyArgs(dependsBeans);

	var beanObject = factoryMethod.apply(factoryBean, dependsApplyArgs);

	return beanObject;
}

/**
 * BeanFactory get denpended beans or values.
 *
 * @param  {Array} dependsOn
 * @param  {Array} args arguments
 * @return {Array} depended bean value list
 * @api private
 */
BeanFactory.prototype.getDependsBeanValues = function(dependsOn, args) {
	var r = [];
	if (!Utils.checkArray(dependsOn)) {
		return r;
	}

	var s = 1;
	for (var i = 0; i < dependsOn.length; i++) {
		var wbean = dependsOn[i];
		var beanName = wbean.getRef();

		if (wbean.getDependType() === Constant.DEPEND_TYPE_BEAN) {
			var bean = this.getBean(beanName);
			if (bean) {
				wbean.setBean(bean);
			}
		}

		if (wbean.getDependType() === Constant.DEPEND_TYPE_VAR) {
			var value = args[s++];
			wbean.setValue(value);
		}

		r.push(wbean);
	}

	return r;
}

/**
 * BeanFactory get depended apply arguments.
 *
 * @param  {Array} dependsOn
 * @return {Array} depended bean apply list
 * @api private
 */
BeanFactory.prototype.getDependsApplyArgs = function(dependsOn) {
	var r = [];

	if (!Utils.checkArray(dependsOn)) {
		return r;
	}

	for (var i = 0; i < dependsOn.length; i++) {
		var wbean = dependsOn[i];
		if (wbean.getDependType() === Constant.DEPEND_TYPE_BEAN) {
			r.push(wbean.getBean());
		} else if (wbean.getDependType() === Constant.DEPEND_TYPE_VALUE) {
			r.push(wbean.getValue());
		} else if (wbean.getDependType() === Constant.DEPEND_TYPE_VAR) {
			r.push(wbean.getValueOnce());
		} else {
			// DEPEND_TYPE_ERROR
			logger.error("getDependsApplyArgs depends args type error %j", wbean);
		}
	}

	return r;
}

/**
 * BeanFactory set parent bean.
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

	var func = this.getBeanFunction(beanName);

	var parentFunc = this.getBeanFunction(parentName);

	if (parentFunc) {
		var proto = parentFunc.prototype;
		for (var key in proto) {
			if (!func.prototype[key]) {
				func.prototype[key] = proto[key];
			}
		}
	}

	if (parentBeanDefintion) {
		beanDefinition.setParentBean(parentBeanDefintion);
		beanDefinition.setArgsOn(parentBeanDefintion.getArgs());
		beanDefinition.setPropsOn(parentBeanDefintion.getProps());
		beanDefinition.setFactoryArgsOn(parentBeanDefintion.getFactoryArgs());
	}

	return beanDefinition;
}

/**
 * BeanFactory register beans through metaObjects into BeanFactory.
 *
 * @param  {Object} metaObjects
 * @api public
 */
BeanFactory.prototype.registerBeans = function(metaObjects) {
	for (var beanName in metaObjects) {
		this.registerBean(beanName, metaObjects[beanName]);
	}
}

/**
 * BeanFactory register bean through metaObject into BeanFactory.
 *
 * @param  {String} beanName
 * @param  {Object} metaObjects
 * @api public
 */
BeanFactory.prototype.registerBean = function(beanName, metaObject) {
	var func = metaObject.func;

	var validateResult = ValidatorUtil.metaValidator(metaObject);
	if (validateResult !== true) {
		logger.error("registryBean %j metaObject %j validate error %s", beanName, metaObject, validateResult.stack);
		return;
	}

	var mid = metaObject.mid;
	if (mid) {
		// register bearcat model
		this.registerModel(beanName, mid, metaObject);
	}

	var cid = metaObject.cid;
	if (cid) {
		// register bearcat constraint
		this.registerConstraint(beanName, cid, metaObject);
	}

	if (func && Utils.checkFunction(func) && !this.getBeanFunction(beanName)) {
		this.setBeanFunction(beanName, func);
	}

	var order = metaObject.order;
	var parentName = metaObject.parent;
	var initMethodName = metaObject.init;
	var destroyMethodName = metaObject.destroy;
	var factoryBeanName = metaObject.factoryBean;
	var factoryMethodName = metaObject.factoryMethod;
	var scope = metaObject.scope || Constant.SCOPE_DEFAULT;
	var args = metaObject.args || Constant.ARGS_DEFAULT;
	var props = metaObject.props || Constant.PROPS_DEFAULT;
	var factoryArgsOn = metaObject.factoryArgs || Constant.ARGS_DEFAULT;
	var asyncInit = metaObject.async || Constant.ASYNC_INIT_DEFAULT;
	var lazyInit = metaObject.lazy || Constant.LAZY_INIT_DEFAULT;
	var abstract = metaObject.abstract || Constant.ABSTRACT_DEFAULT;
	var proxy = metaObject.proxy;
	if (!Utils.isNotNull(proxy)) {
		proxy = Constant.PROXY_DEFAULT;
	}

	var aop = metaObject.aop;

	var beanDefinition = null;
	beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		beanDefinition = new BeanDefinition();
	}

	// model scope should be prototype
	if (mid) {
		scope = Constant.SCOPE_PROTOTYPE;
	}

	beanDefinition.setFunc(func);
	beanDefinition.setOrder(order);
	beanDefinition.setScope(scope);
	beanDefinition.setProxy(proxy);
	beanDefinition.setBeanName(beanName);
	beanDefinition.setLazyInit(lazyInit);
	beanDefinition.setAbstract(abstract);
	beanDefinition.setAsyncInit(asyncInit);
	beanDefinition.setParentName(parentName);
	beanDefinition.setInitMethodName(initMethodName);
	beanDefinition.setFactoryBeanName(factoryBeanName);
	beanDefinition.setFactoryMethodName(factoryMethodName);
	beanDefinition.setDestroyMethodName(destroyMethodName);
	beanDefinition.setArgsOn(BeanUtil.buildBeanWrapper(args));
	beanDefinition.setPropsOn(BeanUtil.buildBeanWrapper(props));
	beanDefinition.setFactoryArgsOn(BeanUtil.buildBeanWrapper(factoryArgsOn));

	if (aop && Utils.checkArray(aop)) {
		var aspect = AopUtil.buildAspect(aop, beanDefinition);
		this.aspects.push(aspect);
		beanDefinition.setAspect(true);
	}

	this.beanDefinitions[beanName] = beanDefinition;
}

/**
 * BeanFactory register model through metaObject into BeanFactory.
 *
 * @param  {String} beanName bean id
 * @param  {String} modelId  model id
 * @param  {Object} metaObject
 * @api public
 */
BeanFactory.prototype.registerModel = function(beanName, modelId, metaObject) {
	var modelDefinition = null;
	modelDefinition = this.getModelDefinition(modelId);
	if (!modelDefinition) {
		modelDefinition = new ModelDefinition();
	}

	var table = metaObject.table;
	var prefix = metaObject.prefix;
	var attributes = metaObject.attributes;

	var resolvedAttributes = ModelUtil.buildModelAttribute(attributes, this);

	modelDefinition.setId(beanName);
	modelDefinition.setMid(modelId);
	modelDefinition.setTable(table);
	modelDefinition.setPrefix(prefix);
	modelDefinition.setFields(resolvedAttributes['fields']);
	modelDefinition.setBalance(resolvedAttributes['balance']);
	modelDefinition.setRefFields(resolvedAttributes['refFields']);
	modelDefinition.setOneToMany(resolvedAttributes['oneToMany']);

	if (Utils.isNotNull(table)) {
		this.setTableModelMap(table, modelDefinition);
	}

	this.modelMap[modelId] = modelDefinition;
}

/**
 * BeanFactory register constraint through metaObject into BeanFactory.
 *
 * @param  {String} beanName bean id
 * @param  {String} cid      constraint id
 * @param  {Object} metaObject
 * @api public
 */
BeanFactory.prototype.registerConstraint = function(beanName, cid, metaObject) {
	var constraintDefinition = null;
	constraintDefinition = this.getConstraintDefinition(cid);
	if (!constraintDefinition) {
		constraintDefinition = new ModelConstraint();
	}

	var message = metaObject.message;
	var constraint = metaObject.constraint;

	constraintDefinition.setId(beanName);
	constraintDefinition.setCid(cid);
	constraintDefinition.setConstraint(constraint);

	this.constraints[cid] = constraintDefinition;
}

/**
 * BeanFactory instantiating singletion beans in advance.
 *
 * @param  {Function} cb callback function
 * @api public
 */
BeanFactory.prototype.preInstantiateSingletons = function(cb) {
	var beanDefinitionOrderList = BeanUtil.sortBeanDefinitions(this.beanDefinitions, this);
	var self = this;

	var index = 0;
	var next = function(err) {
		if (err || index >= beanDefinitionOrderList.length) {
			return cb(err);
		}

		var beanDefinition = beanDefinitionOrderList[index++];
		var beanName = beanDefinition.getBeanName();

		if (beanDefinition.isAsyncInit()) {
			if (!self.singletonBeanFactory.containsSingleton(beanName)) {
				var initCb = function() {
					next();
				}
				self.setInitCb(beanName, initCb);
				self.getBean(beanName);
			} else {
				self.getBean(beanName);
				next()
			}
		} else {
			var initCb = function() {}
			self.setInitCb(beanName, initCb);
			self.getBean(beanName);
			next();
		}
	}

	next();
}

/**
 * BeanFactory add beanPostProcessor to BeanFactory.
 * @param  {Object} beanPostProcessor
 * @api public
 */
BeanFactory.prototype.addBeanPostProcessor = function(beanPostProcessor) {
	this.beanPostProcessors.push(beanPostProcessor);
}

/**
 * BeanFactory get beanPostProcessors.
 * @return {Object} beanPostProcessors
 * @api public
 */
BeanFactory.prototype.getBeanPostProcessors = function() {
	return this.beanPostProcessors;
}

/**
 * BeanFactory apply beanPostBeforeProcessors.
 * @param  {Object} beanObject
 * @param  {String} beanName
 * @return {Object} beanObject
 * @api private
 */
BeanFactory.prototype.applyBeanPostProcessorsBeforeInitialization = function(beanObject, beanName) {
	var result = beanObject;

	var beanPostProcessors = this.getBeanPostProcessors();
	for (var i = 0; i < beanPostProcessors.length; i++) {
		var beanProcessor = beanPostProcessors[i];
		result = beanProcessor.before(result, beanName);
		if (!result) {
			return result;
		}
	}

	return result;
}

/**
 * BeanFactory apply beanPostAfterProcessors.
 * @param  {Object} beanObject
 * @param  {String} beanName
 * @return {Object} beanObject
 * @api private
 */
BeanFactory.prototype.applyBeanPostProcessorsAfterInitialization = function(beanObject, beanName) {
	var result = beanObject;

	var beanPostProcessors = this.getBeanPostProcessors();
	for (var i = 0; i < beanPostProcessors.length; i++) {
		var beanProcessor = beanPostProcessors[i];
		result = beanProcessor.after(result, beanName);
		if (!result) {
			return result;
		}
	}

	return result;
}

/**
 * BeanFactory destroy singletons.
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
 * BeanFactory destroy BeanFactory.
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
 * BeanFactory destroy singleton.
 *
 * @param  {String} beanName
 * @api public
 */
BeanFactory.prototype.destroySingleton = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return;
	}

	var beanObject = this.getBean(beanName);

	this.destroyBean(beanName, beanObject);

	this.singletonBeanFactory.removeSingleton(beanName);
}

/**
 * BeanFactory destroy bean.
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

	var destroyMethodName = beanDefinition.getDestroyMethodName();

	var destroyMethod = beanObject[destroyMethodName];
	if (Utils.checkFunction(destroyMethod)) {
		destroyMethod.call(beanObject);
	}

	this.removeFunction(beanName);
	this.removeBeanDefinition(beanName);
}

/**
 * BeanFactory check bean is a singleton or not.
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
 * BeanFactory check bean is a prototype or not.
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
 * BeanFactory check BeanFactory contains bean or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
BeanFactory.prototype.containsBean = function(beanName) {
	return !!this.getBeanFunction(beanName) && !!this.getBeanDefinition(beanName);
}

/**
 * BeanFactory get bean contructor function.
 *
 * @param  {String} beanName
 * @return {Function} bean constructor function
 * @api public
 */
BeanFactory.prototype.getBeanFunction = function(beanName) {
	return this.beanFunctions[beanName];
}

/**
 * BeanFactory set bean contructor function.
 *
 * @param  {String}   beanName
 * @param  {Function} func bean constructor function
 * @api public
 */
BeanFactory.prototype.setBeanFunction = function(beanName, func) {
	this.beanFunctions[beanName] = func;
}

/**
 * BeanFactory remove bean contructor function from BeanFactory.
 *
 * @param  {String} beanName
 * @api public
 */
BeanFactory.prototype.removeFunction = function(beanName) {
	delete this.beanFunctions[beanName];
}

/**
 * BeanFactory get init method.
 *
 * @param  {String}   beanName
 * @return {Function} bean init method
 * @api public
 */
BeanFactory.prototype.getInitCb = function(beanName) {
	if (!this.initCbMap[beanName]) {
		this.initCbMap[beanName] = Constant.INIT_CB_DEFAULT;
	}

	return this.initCbMap[beanName];
}

/**
 * BeanFactory set init method.
 *
 * @param  {String}   beanName
 * @param  {Function} initCb bean init method
 * @api public
 */
BeanFactory.prototype.setInitCb = function(beanName, initCb) {
	this.initCbMap[beanName] = initCb;
}

/**
 * BeanFactory get beanDefinition.
 *
 * @param  {String} beanName
 * @return {Object} beanDefinition
 * @api public
 */
BeanFactory.prototype.getBeanDefinition = function(beanName) {
	return this.beanDefinitions[beanName];
}

/**
 * BeanFactory get beanDefinitions.
 *
 * @return {Object} beanDefinitions
 * @api public
 */
BeanFactory.prototype.getBeanDefinitions = function() {
	return this.beanDefinitions;
}

/**
 * BeanFactory remove beanDefinition from BeanFactory.
 *
 * @param  {String} beanName
 * @api public
 */
BeanFactory.prototype.removeBeanDefinition = function(beanName) {
	delete this.beanDefinitions[beanName];
}

/**
 * BeanFactory check BeanFactory contains beanName beanDefinition or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
BeanFactory.prototype.containsBeanDefinition = function(beanName) {
	return !!this.getBeanDefinition(beanName);
}

/**
 * BeanFactory get aspects.
 *
 * @return {Array} aspects
 * @api public
 */
BeanFactory.prototype.getAspects = function() {
	return this.aspects;
}

/**
 * BeanFactory get modelDefinition.
 *
 * @param  {String} modelId
 * @return {Object} modelDefinition
 * @api public
 */
BeanFactory.prototype.getModelDefinition = function(modelId) {
	return this.modelMap[modelId];
}

/**
 * BeanFactory get modelDefinitions.
 *
 * @return {Object} modelDefinition map
 * @api public
 */
BeanFactory.prototype.getModelDefinitions = function() {
	return this.modelMap;
}

/**
 * BeanFactory get getConstraintDefinition.
 *
 * @param  {String} cid
 * @return {Object} getConstraintDefinition
 * @api public
 */
BeanFactory.prototype.getConstraintDefinition = function(cid) {
	return this.constraints[cid];
}

/**
 * BeanFactory set table model map.
 *
 * @param  {String} table name
 * @param  {Object} modelDefinition
 * @api public
 */
BeanFactory.prototype.setTableModelMap = function(table, modelDefinition) {
	this.tableModelMap[table] = modelDefinition;
}

/**
 * BeanFactory get modelDefinition by table.
 *
 * @param   {String} table name
 * @return  {Object} modelDefinition
 * @api public
 */
BeanFactory.prototype.getModelDefinitionByTable = function(table) {
	return this.tableModelMap[table];
}

module.exports = BeanFactory;