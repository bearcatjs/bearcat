var ProxyFactory = require('../framework/proxyFactory');

var autoProxyCreator = function() {
	this.beanFactory = null;
}

module.exports = autoProxyCreator;

autoProxyCreator.prototype.before = function(beanObject, beanName) {
	return beanObject;
}

autoProxyCreator.prototype.after = function(beanObject, beanName) {
	return this.createProxy();
}

autoProxyCreator.prototype.setBeanFactory = function(beanFactory) {
	this.beanFactory = beanFactory;
}

autoProxyCreator.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

autoProxyCreator.prototype.createProxy = function(beanObject, beanName, advisors, targetSource) {
	var proxyFactory = new ProxyFactory(beanObject, "runLog");
	var aspects = this.beanFactory.getAspects();
	var advisors = [];
	for (var i = 0; i < aspects.length; i++) {
		var aspect = aspects[i];
		var ads = aspect.getAdvisors();
		for (var j = 0; j < ads.length; j++) {
			advisors.push(ads[j]);
		}
	}

	proxyFactory.setAdvisors(advisors);
	return proxyFactory.getProxy();
}

autoProxyCreator.prototype.getAdvicesAndAdvisorsForBean = function() {

}