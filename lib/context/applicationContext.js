/**
 * Bearcat applicationContext
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcar', 'applicationContext');
var AutoProxyCreator = require('../aop/autoproxy/autoProxyCreator');
var ResourceLoader = require('../resource/resourceLoader');
var BeanFactory = require('../beans/beanFactory');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

/**
 * beanFactory constructor function.
 *
 * @api public
 */
var applicationContext = function(configLocations) {
	this.configLocations = configLocations;
	this.startUpDate = null;
	this.active = false;
	this.beanFactory = null;
	this.resourceLoader = null;
	EventEmitter.call(this);
}

module.exports = applicationContext;

util.inherits(applicationContext, EventEmitter);

applicationContext.prototype.setStartupDate = function(startUpDate) {
	this.startUpDate = startUpDate;
}

applicationContext.prototype.getStartupDate = function() {
	return this.startUpDate;
}

applicationContext.prototype.getResourceLoader = function() {
	this.resourceLoader = new ResourceLoader();
	return this.resourceLoader;
}

applicationContext.prototype.getResource = function(cpath) {
	return this.resourceLoader.load(cpath);
}

applicationContext.prototype.getConfigLocations = function() {
	return this.configLocations;
}

applicationContext.prototype.getLifecycleProcessor = function() {

}

applicationContext.prototype.addBeanFactoryPostProcessor = function() {

}

applicationContext.prototype.getBeanFactoryProcessors = function() {

}

applicationContext.prototype.refresh = function(cb) {
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

applicationContext.prototype.prepareRefresh = function() {
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
applicationContext.prototype.refreshBeanFactory = function() {
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
applicationContext.prototype.prepareBeanFactory = function() {
	var configResources = this.resourceLoader.getDefaultConfigResources();

	this.beanFactory.registryBeans(configResources);
}

/*
 * 在内部修改之后，外部可以通过这个接口来做额外的处理
 */
applicationContext.prototype.postProcessBeanFactory = function() {
	var autoProxyCreator = new AutoProxyCreator();
	autoProxyCreator.setBeanFactory(this.getBeanFactory());
	this.beanFactory.addBeanPostProcessor(autoProxyCreator);
}

applicationContext.prototype.registerBeanPostProcessors = function() {

}

applicationContext.prototype.invokeBeanFactoryPostProcessors = function() {

}

/*
 * 实例化所有 singleton 的 bean
 */
applicationContext.prototype.finishBeanFactoryIntialization = function(cb) {
	this.beanFactory.preInstantiateSingletons(cb);
}

applicationContext.prototype.initLifecycleProcessor = function() {

}

applicationContext.prototype.onRefresh = function() {

}

applicationContext.prototype.finishRefresh = function() {
	this.emit('finishRefresh');
}

applicationContext.prototype.cancelRefresh = function() {

}

applicationContext.prototype.registerShutdownHook = function() {

}

applicationContext.prototype.destroy = function() {
	this.close();
}

applicationContext.prototype.close = function() {
	this.doClose();
}

applicationContext.prototype.doClose = function() {
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

applicationContext.prototype.destroyBeans = function() {
	this.getBeanFactory().destroySingletons();
}

applicationContext.prototype.onClose = function() {

}

applicationContext.prototype.isActive = function() {
	return this.active;
}

applicationContext.prototype.getBean = function(beanName) {
	arguments = Array.prototype.slice.apply(arguments);

	var beanFactory = this.getBeanFactory();
	return beanFactory.getBean.apply(beanFactory, arguments);
}

applicationContext.prototype.containsBean = function(beanName) {
	return this.getBeanFactory().containsBean(beanName);
}

applicationContext.prototype.isSingleton = function(beanName) {
	return this.getBeanFactory().isSingleton(beanName);
}

applicationContext.prototype.isPrototype = function(beanName) {
	return this.getBeanFactory().isPrototype(beanName);
}

applicationContext.prototype.containsBeanDefinition = function(beanName) {
	return this.getBeanFactory().containsBeanDefinition(beanName);
}

applicationContext.prototype.isRunning = function() {
	return this.active;
}

applicationContext.prototype.closeBeanFactory = function() {
	this.getBeanFactory().destroyBeanFactory();
	this.beanFactory = null;
}

applicationContext.prototype.hasBeanFactory = function() {
	return this.beanFactory != null;
}

applicationContext.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

applicationContext.prototype.createBeanFactory = function() {
	this.beanFactory = new BeanFactory();
}