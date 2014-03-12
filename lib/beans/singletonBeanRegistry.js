var logger = require('pomelo-logger').getLogger('bearcar', 'singletonBeanRegistry');

var singletonBeanRegistry = function() {
	this.singletonObjects = {};
}

module.exports = singletonBeanRegistry;

singletonBeanRegistry.prototype.registerSingleton = function(beanName) {

}

singletonBeanRegistry.prototype.addSingleton = function(beanName, beanObject) {
	// logger.error("addSingleton " + beanName);
	this.singletonObjects[beanName] = beanObject;

}

singletonBeanRegistry.prototype.containsSingleton = function() {

}

singletonBeanRegistry.prototype.getSingleton = function(beanName, beanFactory) {
	arguments = Array.prototype.slice.apply(arguments);
	beanFactory = arguments.pop();

	// logger.debug("%j %j", arguments, this.singletonObjects)
	var bean = this.singletonObjects[beanName];
	if (bean) {
		return bean;
	} else {
		bean = beanFactory.createBean.apply(beanFactory, arguments);
	}

	this.addSingleton(beanName, bean);

	return bean;
}

singletonBeanRegistry.prototype.getSingletonNames = function() {
	var r = [];
	for (var name in this.singletonObjects) {
		r.push(name);
	}

	return r;
}

singletonBeanRegistry.prototype.destorySingletons = function() {

}

singletonBeanRegistry.prototype.removeSingleton = function(beanName) {
	delete this.singletonObjects[beanName];
}