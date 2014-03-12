var logger = require('pomelo-logger').getLogger('bearcar', 'applicationContext');
var ResourceLoader = require('../resource/resourceLoader');
var BeanFactory = require('../beans/beanFactory');

var applicationContext = function() {
	this.startUpDate = null;
	this.active = false;
	this.beanFactory = null;
	this.resourceLoader = null;
}

module.exports = applicationContext;

applicationContext.prototype.setStartupDate = function(startUpDate) {
	this.startUpDate = startUpDate;
}

applicationContext.prototype.getStartupDate = function() {
	return this.startUpDate;
}

applicationContext.prototype.publishEvent = function() {

}

applicationContext.prototype.getApplicationEventMulticaster = function() {

}

applicationContext.prototype.getResourceLoader = function() {
	this.resourceLoader = new ResourceLoader();
}

applicationContext.prototype.getLifecycleProcessor = function() {

}

applicationContext.prototype.addBeanFactoryPostProcessor = function() {

}

applicationContext.prototype.getBeanFactoryProcessors = function() {

}

applicationContext.prototype.addApplicationListeners = function() {

}

applicationContext.prototype.getApplicationListeners = function() {

}

applicationContext.prototype.refresh = function() {
	this.prepareRefresh();

	this.refreshBeanFactory();

	// this.prepareBeanFactory();

	this.postProcessBeanFactory();

	this.invokeBeanFactoryPostProcessors();

	this.registerBeanPostProcessors();

	this.initApplicationEventMulticaster();

	this.onRefresh();

	this.registerListeners();

	this.finishBeanFactoryIntialization();

	this.finishRefresh();
}

applicationContext.prototype.prepareRefresh = function() {
	this.startUpDate = Date.now();

	this.active = true;

	this.getResourceLoader();
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
	var configResources = this.resourceLoader.getConfigResources();
	// logger.debug("%j", configResources);
	this.beanFactory.registryBeans(configResources);
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

}

applicationContext.prototype.registerBeanPostProcessors = function() {

}

applicationContext.prototype.invokeBeanFactoryPostProcessors = function() {

}

/*
 * 实例化所有 singleton 的 bean
 */
applicationContext.prototype.finishBeanFactoryIntialization = function() {
	this.beanFactory.preInstantiateSingletons();
}

applicationContext.prototype.initApplicationEventMulticaster = function() {

}

applicationContext.prototype.initLifecycleProcessor = function() {

}

applicationContext.prototype.onRefresh = function() {

}

applicationContext.prototype.registerListeners = function() {

}

applicationContext.prototype.addListener = function() {

}

applicationContext.prototype.finishRefresh = function() {

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

}

applicationContext.prototype.destroyBeans = function() {
	this.getBeanFactory().destroySingletons();
}

applicationContext.prototype.onClose = function() {

}

applicationContext.prototype.isActive = function() {
	return this.isActive;
}

applicationContext.prototype.getBean = function(beanName) {
	arguments = Array.prototype.slice.apply(arguments);

	var beanObject = this.doGetBean.apply(this, arguments);

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

applicationContext.prototype.getBeanDefinitionCount = function() {

}

applicationContext.prototype.getBeanDefinitionNames = function() {

}

applicationContext.prototype.getResources = function() {

}

applicationContext.prototype.start = function() {

}

applicationContext.prototype.stop = function() {

}

applicationContext.prototype.isRunning = function() {

}

applicationContext.prototype.closeBeanFactory = function() {

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