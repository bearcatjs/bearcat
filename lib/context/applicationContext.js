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
var PlaceHolderConfigurer = require('../beans/support/placeHolderConfigurer');
var AutoProxyCreator = require('../aop/autoproxy/autoProxyCreator');
var ResourceLoader = require('../resource/resourceLoader');
var BeanFactory = require('../beans/beanFactory');
var EventEmitter = require('events').EventEmitter;
var Constant = require('../util/constant');
var Utils = require('../util/utils');
var util = require('util');
var DEFAULT_LOAD_PATH = process.cwd() + "/config";

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
	this.cpath = DEFAULT_LOAD_PATH;
	this.env = Constant.DEFAULT_ENV;
	this.beanFactoryPostProcessors = [];
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

/**
 * ApplicationContext add beanFactoryPostProcessor.
 *
 * @param  {Object} beanFactoryPostProcessor
 * @api public
 */
ApplicationContext.prototype.addBeanFactoryPostProcessor = function(beanFactoryPostProcessor) {
	this.beanFactoryPostProcessors.push(beanFactoryPostProcessor);
}

/**
 * ApplicationContext get beanFactoryPostProcessors.
 *
 * @return  {Array} beanFactoryPostProcessors
 * @api public
 */
ApplicationContext.prototype.getBeanFactoryProcessors = function() {
	return this.beanFactoryPostProcessors;
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

	// Prepare context for refresh
	this.prepareRefresh();

	// Refresh internal beanFactory
	this.refreshBeanFactory();

	// Prepare beanFactory for this context
	this.prepareBeanFactory();

	this.postProcessBeanFactory();

	// Invoke factory processors registered as beans in the context.
	this.invokeBeanFactoryPostProcessors();

	// Register bean processors that intercept bean creation.
	this.registerBeanPostProcessors();

	// Instantiate all remaining (non-lazy-init) singletons
	this.finishBeanFactoryIntialization(function() {
		// Last step: publish corresponding event.
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

	var args = Utils.parseArgs(process.argv);
	var env = args.env || args['--env'] || process.env.NODE_ENV || Constant.DEFAULT_ENV;

	this.setEnv(env);

	var cpath = this.getConfigPath();
	cpath = args.cpath || args['--cpath'] || cpath;

	this.setConfigPath(cpath);
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

	var beanFactory = this.createBeanFactory();
	this.configLocations = this.getConfigLocations();

	for (var i = 0; i < this.configLocations.length; i++) {
		this.beanFactory.registryBeans(this.getResource(this.configLocations[i]));
	}

	return beanFactory;
}

/**
 * ApplicationContext prepareBeanFactory.
 * register default beans into beanFactory
 *
 * @api private
 */
ApplicationContext.prototype.prepareBeanFactory = function() {
	var placeHolderConfigurer = new PlaceHolderConfigurer();
	if (Utils.isNotNull(this.env)) {
		placeHolderConfigurer.setEnv(this.env);
	}

	if (Utils.isNotNull(this.cpath)) {
		placeHolderConfigurer.setConfigPath(this.cpath);
	}

	placeHolderConfigurer.setBeanFactory(this.getBeanFactory());

	this.addBeanFactoryPostProcessor(placeHolderConfigurer);
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

ApplicationContext.prototype.postProcessBeanFactory = function() {

}

ApplicationContext.prototype.registerBeanPostProcessors = function() {
	var autoProxyCreator = new AutoProxyCreator();
	autoProxyCreator.setBeanFactory(this.getBeanFactory());
	this.beanFactory.addBeanPostProcessor(autoProxyCreator);
}

ApplicationContext.prototype.invokeBeanFactoryPostProcessors = function() {
	var beanFactory = this.getBeanFactory();
	var postProcessors = this.getBeanFactoryProcessors();
	for (var i = 0; i < postProcessors.length; i++) {
		var postProcessor = postProcessors[i];
		postProcessor.postProcessBeanFactory(beanFactory);
	}
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
	this.active = false;
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

	return this.beanFactory.getBeanProxy(id);
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

/**
 * ApplicationContext get beanDefinition.
 *
 * @param  {String} beanName
 * @return {Object} beanDefinition
 * @api public
 */
ApplicationContext.prototype.getBeanDefinition = function(beanName) {
	return this.getBeanFactory().getBeanDefinition(beanName);
}

/**
 * ApplicationContext remove beanDefinition from ApplicationContext.
 *
 * @param  {String} beanName
 * @api public
 */
ApplicationContext.prototype.removeBeanDefinition = function(beanName) {
	return this.getBeanFactory().removeBeanDefinition(beanName);
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
 * ApplicationContext set env.
 *
 * @param {String} env
 * @api public
 */
ApplicationContext.prototype.setEnv = function(env) {
	this.env = env;
}

/**
 * ApplicationContext get env.
 *
 * @return {String} env
 * @api public
 */
ApplicationContext.prototype.getEnv = function() {
	return this.env;
}

/**
 * ApplicationContext set config path.
 *
 * @param {String} config path
 * @api public
 */
ApplicationContext.prototype.setConfigPath = function(cpath) {
	this.cpath = cpath;
}

/**
 * ApplicationContext get config path.
 *
 * @return {String} config path
 * @api public
 */
ApplicationContext.prototype.getConfigPath = function() {
	return this.cpath;
}