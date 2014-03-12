var SingletonBeanRegistry = require('./singletonBeanRegistry');
var logger = require('pomelo-logger').getLogger('bearcar', 'beanFactory');
var BeanDefinition = require('./beanDefinition');
var constant = require('../util/constant');
var beanUtil = require('../util/beanUtil');
var utils = require('../util/utils');
var async = require('async');
var util = require('util');

var beanFactory = function() {
	this.beanDefinitions = {};
	this.beanFunctions = {};
	this.singletonBeanRegistry = new SingletonBeanRegistry();
	this.initCb = null;
	this.beanCurMap = {};
}

var instance = null;

module.exports = function() {
	if (!instance) {
		instance = new beanFactory();
	}

	return instance;
}

beanFactory.prototype.getBean = function(beanName) {
	if (this.beanCurMap[beanName]) {
		logger.error("circle reference beanName %j is in creating", beanName);
		throw new Error("circle reference beanName " + beanName + " is in creating")
	}

	arguments = Array.prototype.slice.apply(arguments);

	this.beanCurMap[beanName] = true;
	var beanObject = this.doGetBean.apply(this, arguments);
	delete this.beanCurMap[beanName];

	return beanObject;
}

beanFactory.prototype.isSingleton = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (beanDefinition) {
		return beanDefinition.isSingleton();
	} else {
		return false;
	}
}

beanFactory.prototype.isPrototype = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (beanDefinition) {
		return beanDefinition.isPrototype();
	} else {
		return false;
	}
}

beanFactory.prototype.containsBean = function(beanName) {

}

beanFactory.prototype.getBeanFunctions = function(beanName) {
	return this.beanFunctions[beanName];
}

beanFactory.prototype.setBeanFunctions = function(beanName, func) {
	this.beanFunctions[beanName] = func;
}

beanFactory.prototype.doGetBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	if (!beanDefinition) {
		return null;
	}

	arguments = Array.prototype.slice.apply(arguments);

	if (beanDefinition.isSingleton()) {
		arguments.push(this);

		return this.singletonBeanRegistry.getSingleton.apply(this.singletonBeanRegistry, arguments);
	} else if (beanDefinition.isPrototype()) {

		return this.createBean.apply(this, arguments);
	}
}

beanFactory.prototype.createBean = function(beanName) {
	var beanObject = this.doCreateBean.apply(this, arguments);
	this.initBean(beanObject, beanName, this.getInitCb());

	return beanObject;
}

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

	var func = this.getBeanFunctions(beanName);
	var argsOn = beanDefinition.getArgsOn();
	var propsOn = beanDefinition.getPropsOn();
	var initMethodName = beanDefinition.getInitMethodName();

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
		func.apply(beanObject, null);
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

beanFactory.prototype.initBean = function(beanObject, beanName, cb) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition || !beanDefinition.hasInitMethod()) {
		return;
	}
	var initMethodName = beanDefinition.getInitMethodName();

	// run init method
	var initMethod = beanObject[initMethodName];
	if (utils.checkFunction(initMethod)) {
		initMethod.call(beanObject, cb);
	}
}

beanFactory.prototype.setParentBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	var parentName = beanDefinition.getParentName();
	var parentBeanDefintion = this.getBeanDefinition(parentName);

	if (parentBeanDefintion) {
		beanDefinition.setParentBean(parentBeanDefintion);
		beanDefinition.updatePropsOn(parentBeanDefintion.getProps());
		beanDefinition.updateArgsOn(parentBeanDefintion.getArgs());
		beanDefinition.updateFactoryArgsOn(parentBeanDefintion.getFactoryArgs());
	}

	return beanDefinition;
}

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

beanFactory.prototype.getInitCb = function() {
	if (!this.initCb) {
		this.initCb = constant.INIT_CB_DEFAULT;
	}

	return this.initCb;
}

beanFactory.prototype.setInitCb = function(initCb) {
	this.initCb = initCb;
}

beanFactory.prototype.getBeanFromFactoryBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	var args = Array.prototype.slice.apply(arguments);
	args.shift();

	var factoryBeanName = beanDefinition.getFactoryBeanName();
	var factoryMethodName = beanDefinition.getFactoryMethodName();
	var factoryArgsOn = beanDefinition.getFactoryArgsOn();

	var factoryBean = this.getBean(factoryBeanName);
	var factoryMethod = factoryBean[factoryMethodName];

	var dependsBeans = this.getDependsBeanValues(factoryArgsOn, args);

	var dependsApplyArgs = this.getDependsApplyArgs(dependsBeans);

	var beanObject = factoryMethod.apply(null, dependsApplyArgs);

	return beanObject;
}

beanFactory.prototype.getBeanDefinition = function(beanName) {
	return this.beanDefinitions[beanName];
}

beanFactory.prototype.containsBeanDefinition = function(beanName) {
	return !!this.getBeanDefinition(beanName);
}

beanFactory.prototype.registryBeans = function(metaObjects) {
	for (var beanName in metaObjects) {
		this.registryBean(beanName, metaObjects[beanName]);
	}
}

beanFactory.prototype.registryBean = function(beanName, metaObject) {
	if (metaObject.func) {
		this.setBeanFunctions(beanName, metaObject.func);
	}

	var scope = metaObject.scope || constant.SCOPE_DEFAULT;
	var args = metaObject.args || constant.ARGS_DEFAULT;
	var props = metaObject.props || constant.PROPS_DEFAULT;
	var factoryBeanName = metaObject.factoryBean;
	var factoryMethodName = metaObject.factoryMethod;
	var factoryArgsOn = metaObject.factoryArgs || constant.ARGS_DEFAULT;
	var initMethodName = metaObject.initMethod;
	var destroyMethodName = metaObject.destroyMethod;
	var order = metaObject.order;
	var asyncInit = metaObject.asyncInit || constant.ASYNC_INIT_DEFAULT;
	var parentName = metaObject.parent;

	var bean = new BeanDefinition();
	bean.setBeanClassName(beanName);
	bean.setScope(scope);
	bean.setArgsOn(beanUtil.buildBeanWrapper(args));
	bean.setPropsOn(beanUtil.buildBeanWrapper(props));
	bean.setFactoryBeanName(factoryBeanName);
	bean.setFactoryMethodName(factoryMethodName);
	bean.setFactoryArgsOn(beanUtil.buildBeanWrapper(factoryArgsOn));
	bean.setInitMethodName(initMethodName);
	bean.setDestroyMethodName(destroyMethodName);
	bean.setOrder(order);
	bean.setAsyncInit(asyncInit);
	bean.setParentName(parentName);

	this.beanDefinitions[beanName] = bean;
}

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
		}
	}

	return r;
}

beanFactory.prototype.getDependsPropsBeanValues = function(dependsOn) {
	for (var i = 0; i < dependsOn.length; i++) {
		var wbean = dependsOn[i];
		var beanName = wbean.getName();

		if (wbean.getDependType() === constant.DEPEND_TYPE_BEAN) {
			wbean.setBean(this.getBean(beanName));
		}
	}
}

beanFactory.prototype.preInstantiateSingletons = function() {
	var sortedBeanDefinitions = beanUtil.sortBeanDefinitions(this, this.beanDefinitions);
	var totalOrderNum = sortedBeanDefinitions['total'];
	var beanOrderList = sortedBeanDefinitions['list'];
	var self = this;

	var cur = 0;
	async.whilst(function() {
		return cur < beanOrderList.length;
	}, function(_cb) {
		var beanDefinition = beanOrderList[cur];
		if (beanDefinition.isSingleton()) {

			if (beanDefinition.isAsyncInit()) {
				var initCb = function() {
					logger.info('initCb called...');
					cur++;
					_cb();
				}
				self.setInitCb(initCb);
				self.getBean(beanOrderList[cur].getBeanClassName());
			} else {
				var initCb = function() {}
				self.setInitCb(initCb);
				self.getBean(beanOrderList[cur].getBeanClassName());
				cur++;
				_cb();
			}

		} else {
			cur++;
			_cb();
		}
	}, function() {

	});
}

beanFactory.prototype.destroySingleton = function(beanName) {
	var beanObject = this.getBean(beanName);

	this.destroyBean(beanName, beanObject);

	this.singletonBeanRegistry.removeSingleton(beanName);
}

beanFactory.prototype.destroySingletons = function() {
	var singletonNames = this.singletonBeanRegistry.getSingletonNames();

	for (var i = 0; i < singletonNames.length; i++) {
		this.destroySingleton(singletonNames[i]);
	}
}

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

	delete this.beanDefinitions[beanName];
	delete this.beanFunctions[beanName];
}