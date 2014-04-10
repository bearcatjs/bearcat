/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * |   _  )  |   ____)   /   \     |   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * |______)  |_______/__/     \__\ | _| `.____) (______)__/     \__\  |__|
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
 * beanFactory constructor function.
 *
 * @api public
 */
var ApplicationContext = function(configLocations) {
	this.configLocations = configLocations;
	this.startUpDate = null;
	this.active = false;
	this.beanFactory = null;
	this.resourceLoader = null;
	EventEmitter.call(this);
}

module.exports = ApplicationContext;

util.inherits(ApplicationContext, EventEmitter);

ApplicationContext.prototype.setStartupDate = function(startUpDate) {
	this.startUpDate = startUpDate;
}

ApplicationContext.prototype.getStartupDate = function() {
	return this.startUpDate;
}

ApplicationContext.prototype.getResourceLoader = function() {
	this.resourceLoader = new ResourceLoader();
	return this.resourceLoader;
}

ApplicationContext.prototype.getResource = function(cpath) {
	return this.resourceLoader.load(cpath);
}

ApplicationContext.prototype.getConfigLocations = function() {
	return this.configLocations;
}

ApplicationContext.prototype.getLifecycleProcessor = function() {

}

ApplicationContext.prototype.addBeanFactoryPostProcessor = function() {

}

ApplicationContext.prototype.getBeanFactoryProcessors = function() {

}

ApplicationContext.prototype.refresh = function(cb) {
	cb = cb || function() {};
	var self = this;
	this.prepareRefresh();

	this.refreshBeanFactory();

	// this.prepareBeanFactory();

	this.postProcessBeanFactory();

	this.invokeBeanFactoryPostProcessors();

	this.registerBeanPostProcessors();

	this.onRefresh();

	this.finishBeanFactoryIntialization(function() {
		self.finishRefresh();
		cb();
	});
}

ApplicationContext.prototype.prepareRefresh = function() {
	this.startUpDate = Date.now();

	this.active = true;

	this.resourceLoader = this.getResourceLoader();
	for (var i = 0; i < this.configLocations; i++) {
		this.resourceLoader.addLoadPath(this.configLocations[i]);
	}
}

/*
 * 重新扫描一下 bean 配置文件
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

/*
 * beanFactory 默认配置加载，加载内部bean
 */
ApplicationContext.prototype.prepareBeanFactory = function() {
	var configResources = this.resourceLoader.getDefaultConfigResources();

	this.beanFactory.registryBeans(configResources);
}

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
 * 在内部修改之后，外部可以通过这个接口来做额外的处理
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

/*
 * 实例化所有 singleton 的 bean
 */
ApplicationContext.prototype.finishBeanFactoryIntialization = function(cb) {
	this.beanFactory.preInstantiateSingletons(cb);
}

ApplicationContext.prototype.initLifecycleProcessor = function() {

}

ApplicationContext.prototype.onRefresh = function() {

}

ApplicationContext.prototype.finishRefresh = function() {
	this.emit('finishRefresh');
}

ApplicationContext.prototype.cancelRefresh = function() {

}

ApplicationContext.prototype.registerShutdownHook = function() {

}

ApplicationContext.prototype.destroy = function() {
	this.close();
}

ApplicationContext.prototype.close = function() {
	this.doClose();
}

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

ApplicationContext.prototype.destroyBeans = function() {
	this.getBeanFactory().destroySingletons();
}

ApplicationContext.prototype.onClose = function() {

}

ApplicationContext.prototype.isActive = function() {
	return this.active;
}

ApplicationContext.prototype.getBean = function(beanName) {
	arguments = Array.prototype.slice.apply(arguments);

	var beanFactory = this.getBeanFactory();
	return beanFactory.getBean.apply(beanFactory, arguments);
}

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

ApplicationContext.prototype.containsBean = function(beanName) {
	return this.getBeanFactory().containsBean(beanName);
}

ApplicationContext.prototype.isSingleton = function(beanName) {
	return this.getBeanFactory().isSingleton(beanName);
}

ApplicationContext.prototype.isPrototype = function(beanName) {
	return this.getBeanFactory().isPrototype(beanName);
}

ApplicationContext.prototype.containsBeanDefinition = function(beanName) {
	return this.getBeanFactory().containsBeanDefinition(beanName);
}

ApplicationContext.prototype.isRunning = function() {
	return this.active;
}

ApplicationContext.prototype.closeBeanFactory = function() {
	this.getBeanFactory().destroyBeanFactory();
	this.beanFactory = null;
}

ApplicationContext.prototype.hasBeanFactory = function() {
	return this.beanFactory != null;
}

ApplicationContext.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

ApplicationContext.prototype.createBeanFactory = function() {
	this.beanFactory = new BeanFactory();
}