/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ApplicationContext
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcar', 'ApplicationContext');
var AutoProxyCreator = require('../aop/autoproxy/autoProxyCreator');
var DynamicMetaProxy = require('../aop/framework/dynamicMetaProxy');
var ResourceLoader = require('../resource/resourceLoader');
var BeanFactory = require('../beans/beanFactory');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

/**
 * ApplicationContext constructor function.
 *
 * @api public
 */
var ApplicationContext = function(configLocations) {
	this.configLocations = configLocations;
	this.active = false;
	this.beanFactory = null;
	this.startUpDate = null;
	this.resourceLoader = null;
	EventEmitter.call(this);
}

module.exports = ApplicationContext;

util.inherits(ApplicationContext, EventEmitter);

/**
 * ApplicationContext set container startUpDate.
 *
 * @param  {Number} startUpDate
 * @api public
 */
ApplicationContext.prototype.setStartupDate = function(startUpDate) {
	this.startUpDate = startUpDate;
}

/**
 * ApplicationContext get container startUpDate.
 *
 * @return  {Number} startUpDate
 * @api public
 */
ApplicationContext.prototype.getStartupDate = function() {
	return this.startUpDate;
}

/**
 * ApplicationContext get resourceLoader.
 *
 * @return  {Object} resourceLoader
 * @api public
 */
ApplicationContext.prototype.getResourceLoader = function() {
	this.resourceLoader = new ResourceLoader();
	return this.resourceLoader;
}

/**
 * ApplicationContext get metaObjects resource from contextPath.
 *
 * @param   {String} contextPath
 * @return  {Object} metaObjects
 * @api public
 */
ApplicationContext.prototype.getResource = function(cpath) {
	return this.resourceLoader.load(cpath);
}

/**
 * ApplicationContext get contextPath locations.
 *
 * @return  {Array} contextPath locations
 * @api public
 */
ApplicationContext.prototype.getConfigLocations = function() {
	return this.configLocations;
}

ApplicationContext.prototype.addBeanFactoryPostProcessor = function() {

}

ApplicationContext.prototype.getBeanFactoryProcessors = function() {

}

/**
 * ApplicationContext do refresh actions.
 * refresh beanFactory, preIntialize singleton Beans
 *
 * @param  {Function} callback function
 * @api public
 */
ApplicationContext.prototype.refresh = function(cb) {
	var self = this;
	cb = cb || function() {};

	this.prepareRefresh();

	this.refreshBeanFactory();

	// this.prepareBeanFactory();

	this.postProcessBeanFactory();

	this.invokeBeanFactoryPostProcessors();

	this.registerBeanPostProcessors();

	this.finishBeanFactoryIntialization(function() {
		self.finishRefresh();
		cb();
	});
}

/**
 * ApplicationContext prepareRefresh.
 * init startUpDate, active status
 * get resourceLoader and load context paths
 *
 * @api private
 */
ApplicationContext.prototype.prepareRefresh = function() {
	this.startUpDate = Date.now();

	this.active = true;

	this.resourceLoader = this.getResourceLoader();
	for (var i = 0; i < this.configLocations; i++) {
		this.resourceLoader.addLoadPath(this.configLocations[i]);
	}
}

/**
 * ApplicationContext refreshBeanFactory.
 * reload beanFactory with refresh metaObjects
 *
 * @api private
 */
ApplicationContext.prototype.refreshBeanFactory = function() {
	if (this.hasBeanFactory()) {
		this.destroyBeans();
		this.closeBeanFactory();
	}

	this.createBeanFactory();
	this.configLocations = this.getConfigLocations();

	for (var i = 0; i < this.configLocations.length; i++) {
		this.beanFactory.registryBeans(this.resourceLoader.load(this.configLocations[i]));
	}
}

/**
 * ApplicationContext prepareBeanFactory.
 * register default beans into beanFactory
 *
 * @api private
 */
ApplicationContext.prototype.prepareBeanFactory = function() {
	var configResources = this.resourceLoader.getDefaultConfigResources();

	this.beanFactory.registryBeans(configResources);
}

/**
 * ApplicationContext registerBeanMeta.
 * register metaObject
 *
 * @param  {Object} metaObject
 * @api private
 */
ApplicationContext.prototype.registerBeanMeta = function(meta) {
	var id = meta['id'];
	if (!id) {
		logger.error('ApplicationContext registerBean error meta no id.');
		return;
	}

	var metaObject = {};
	metaObject[id] = meta;

	this.beanFactory.registryBeans(metaObject);
}

/*
 * 在内部修改之后，外部可以通过这个接口来做额外的处理,需要review重构一下
 */
ApplicationContext.prototype.postProcessBeanFactory = function() {
	var autoProxyCreator = new AutoProxyCreator();
	autoProxyCreator.setBeanFactory(this.getBeanFactory());
	this.beanFactory.addBeanPostProcessor(autoProxyCreator);
}

ApplicationContext.prototype.registerBeanPostProcessors = function() {

}

ApplicationContext.prototype.invokeBeanFactoryPostProcessors = function() {

}

/**
 * ApplicationContext finish beanFactory singleton beans intialization.
 *
 * @param  {Function} callback function
 * @api private
 */
ApplicationContext.prototype.finishBeanFactoryIntialization = function(cb) {
	this.beanFactory.preInstantiateSingletons(cb);
}

/**
 * ApplicationContext finish refresh event emit.
 *
 * @api private
 */
ApplicationContext.prototype.finishRefresh = function() {
	this.emit('finishRefresh');
}

ApplicationContext.prototype.cancelRefresh = function() {

}

ApplicationContext.prototype.registerShutdownHook = function() {

}

/**
 * ApplicationContext destroy.
 *
 * @api public
 */
ApplicationContext.prototype.destroy = function() {
	this.close();
}

/**
 * ApplicationContext close.
 *
 * @api private
 */
ApplicationContext.prototype.close = function() {
	this.doClose();
}

/**
 * ApplicationContext do close.
 *
 * destroyBeans, closeBeanFactory, free resourceLoader, etc..
 * @api private
 */
ApplicationContext.prototype.doClose = function() {
	this.configLocations = null;
	this.startUpDate = null;
	this.active = false;
	if (this.hasBeanFactory()) {
		this.destroyBeans();
		this.closeBeanFactory();
	}
	this.beanFactory = null;
	this.resourceLoader = null;
	this.emit('destroyed');
}

/**
 * ApplicationContext destroyBeans.
 *
 * @api private
 */
ApplicationContext.prototype.destroyBeans = function() {
	this.getBeanFactory().destroySingletons();
}

/**
 * ApplicationContext check whether applicationContext is active or not.
 *
 * @api public
 */
ApplicationContext.prototype.isActive = function() {
	return this.active;
}

/**
 * ApplicationContext getBean through beanName from applicationContext.
 *
 * @param   {String} beanName
 * @return  {Object} beanObject
 * @api public
 */
ApplicationContext.prototype.getBean = function(beanName) {
	arguments = Array.prototype.slice.apply(arguments);

	var beanFactory = this.getBeanFactory();
	return beanFactory.getBean.apply(beanFactory, arguments);
}

/**
 * ApplicationContext getBean through metaObject from applicationContext.
 *
 * @param   {Object} metaObject
 * @return  {Object} beanObject
 * @api public
 */
ApplicationContext.prototype.getBeanByMeta = function(meta) {
	var id = meta['id'];
	if (!id) {
		logger.error('ApplicationContext getBeanByMeta error meta no id.');
		return;
	}

	this.registerBeanMeta(meta);

	var dynamicMetaProxy = new DynamicMetaProxy();
	dynamicMetaProxy.setMeta(meta);
	dynamicMetaProxy.setBeanFactory(this.getBeanFactory());
	dynamicMetaProxy.dyInit();

	return dynamicMetaProxy;
}

/**
 * ApplicationContext check ApplicationContext contains bean or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.containsBean = function(beanName) {
	return this.getBeanFactory().containsBean(beanName);
}

/**
 * ApplicationContext check bean is a singleton or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.isSingleton = function(beanName) {
	return this.getBeanFactory().isSingleton(beanName);
}

/**
 * ApplicationContext check bean is a prototype or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.isPrototype = function(beanName) {
	return this.getBeanFactory().isPrototype(beanName);
}

/**
 * ApplicationContext check ApplicationContext contains beanName beanDefinition or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.containsBeanDefinition = function(beanName) {
	return this.getBeanFactory().containsBeanDefinition(beanName);
}

/**
 * ApplicationContext check whether applicationContext is running or not.
 *
 * @return {Boolean} true|false
 * @api public
 */
ApplicationContext.prototype.isRunning = function() {
	return this.active;
}

/**
 * ApplicationContext close beanFactory.
 *
 * @api public
 */
ApplicationContext.prototype.closeBeanFactory = function() {
	this.getBeanFactory().destroyBeanFactory();
	this.beanFactory = null;
}

/**
 * ApplicationContext check whether applicationContext has beanFactory or not.
 *
 * @return {Boolean} true|false
 * @api public
 */
ApplicationContext.prototype.hasBeanFactory = function() {
	return this.beanFactory != null;
}

/**
 * ApplicationContext getBeanFactory.
 *
 * @return {Object} beanFactory
 * @api public
 */
ApplicationContext.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

/**
 * ApplicationContext createBeanFactory.
 *
 * @api private
 */
ApplicationContext.prototype.createBeanFactory = function() {
	this.beanFactory = new BeanFactory();
}