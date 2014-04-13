/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat DynamicMetaProxy
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'DynamicMetaProxy');
var utils = require('../../util/utils');

/**
 * DynamicMetaProxy constructor function.
 * this proxy will be used in bearcat.getBeanByMeta()
 * getBeanByMeta will first return a dynamicMetaProxy,
 * when target bean invoked, it will call getBean to get the target object
 *
 * @api public
 */
var DynamicMetaProxy = function() {
	this.args = null;
	this.target = null;
	this.beanFactory = null;
	this.beanDefinition = null;
}

module.exports = DynamicMetaProxy;

/**
 * DynamicMetaProxy init function.
 *
 * @api public
 */
DynamicMetaProxy.prototype.dyInit = function() {
	var beanDefinition = this.getBeanDefinition();
	if (!beanDefinition) {
		logger.error('init error no beanDefinition.');
		return;
	}

	var self = this;

	var func = beanDefinition.getFunc();

	if (utils.checkFunction(func)) {
		var proto = func.prototype;
		for (interface in proto) {
			if (utils.checkFunction(proto[interface])) {
				(function(method) {
					if (checkFuncName(method)) {
						logger.error('init error proxy method interface %j the same as DynamicMetaProxy, rename this name to another.', method)
						return;
					};

					DynamicMetaProxy.prototype[method] = function() {
						arguments = Array.prototype.slice.apply(arguments);
						return self.dyInvoke(method, arguments);
					};
				})(interface);
			}
		}
	}
}

/**
 * DynamicMetaProxy proxy invoke function.
 *
 * @param  {String} proxy method name
 * @param  {Array}  target invoke arguments
 * @api private
 */
DynamicMetaProxy.prototype.dyInvoke = function(method, args) {
	var targetBean = this.getBean();
	if (utils.checkFunction(targetBean[method])) {
		targetBean[method].apply(targetBean, args);
	} else {
		logger.error('invoke error targetBean method %j null args: %j', method, args);
	}
}

/**
 * DynamicMetaProxy get target bean through beanFactory.
 *
 * @return  {Object}  target bean
 * @api public
 */
DynamicMetaProxy.prototype.getBean = function() {
	var args = this.getArgs();

	var beanFactory = this.getBeanFactory();
	if (!this.target) {
		this.target = beanFactory.getBean.apply(beanFactory, args);
	}

	return this.target;
}

/**
 * DynamicMetaProxy set meta.
 *
 * @param  {Object} meta object
 * @api public
 */
DynamicMetaProxy.prototype.setMeta = function(meta) {
	this.meta = meta;
}

/**
 * DynamicMetaProxy get meta.
 *
 * @return  {Object} meta object
 * @api public
 */
DynamicMetaProxy.prototype.getMeta = function() {
	return this.meta;
}

/**
 * DynamicMetaProxy set args.
 *
 * @param  {Array}  get bean arguments
 * @api public
 */
DynamicMetaProxy.prototype.setArgs = function(args) {
	this.args = args;
}

/**
 * DynamicMetaProxy get args.
 *
 * @return  {Array}  get bean arguments
 * @api public
 */
DynamicMetaProxy.prototype.getArgs = function() {
	return this.args;
}

/**
 * DynamicMetaProxy set target instance.
 *
 * @param  {Object} target object instance
 * @api public
 */
DynamicMetaProxy.prototype.setTarget = function(target) {
	this.target = target;
}

/**
 * DynamicMetaProxy get target instance.
 *
 * @return  {Object} target object instance
 * @api public
 */
DynamicMetaProxy.prototype.getTarget = function() {
	return this.target;
}

/**
 * DynamicMetaProxy set beanFactory.
 *
 * @param  {Object} beanFactory
 * @api public
 */
DynamicMetaProxy.prototype.setBeanFactory = function(beanFactory) {
	this.beanFactory = beanFactory;
}

/**
 * DynamicMetaProxy get beanFactory.
 *
 * @return  {Object} beanFactory
 * @api public
 */
DynamicMetaProxy.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

/**
 * DynamicMetaProxy set beanDefinition.
 *
 * @param  {Object} beanDefinition
 * @api public
 */
DynamicMetaProxy.prototype.setBeanDefinition = function(beanDefinition) {
	this.beanDefinition = beanDefinition;
}

/**
 * DynamicMetaProxy get beanDefinition.
 *
 * @return  {Object} beanDefinition
 * @api public
 */
DynamicMetaProxy.prototype.getBeanDefinition = function() {
	return this.beanDefinition;
}

var names = ["dyInit", "dyInvoke", "getBean", "setBeanName",
	"getBeanName", "setMeta", "getMeta", "setTarget", "setBeanFactory", "getBeanFactory"
];

var checkFuncName = function(name) {
	for (var i = 0; i < names.length; i++) {
		if (name === names[i]) {
			return true;
		}
	}

	return false;
}