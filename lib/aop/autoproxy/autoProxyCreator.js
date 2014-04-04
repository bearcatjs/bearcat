var ProxyFactory = require('../framework/proxyFactory');
var TargetSource = require('../targetSource');
var AopUtil = require('../../util/aopUtil');

var autoProxyCreator = function() {
	this.beanFactory = null;
}

module.exports = autoProxyCreator;

autoProxyCreator.prototype.before = function(beanObject, beanName) {
	return beanObject;
}

autoProxyCreator.prototype.after = function(beanObject, beanName) {
	if (beanObject) {
		return this.wrapIfNecessary(beanObject, beanName);
	}

	return beanObject;
}

autoProxyCreator.prototype.setBeanFactory = function(beanFactory) {
	this.beanFactory = beanFactory;
}

autoProxyCreator.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

autoProxyCreator.prototype.wrapIfNecessary = function(beanObject, beanName) {
	var beanDefinition = this.beanFactory.getBeanDefinition(beanName);
	if (beanDefinition.isAspect()) {
		return beanObject;
	}

	var advisors = this.getAdvisorsForBean(beanObject, beanName);

	if (Array.isArray(advisors) && advisors.length) {
		var proxy = this.createProxy(beanObject, beanName, advisors, new TargetSource(beanName, beanObject));
		return proxy;
	}

	return beanObject;
}

autoProxyCreator.prototype.createProxy = function(beanObject, beanName, advisors, targetSource) {
	var proxyFactory = new ProxyFactory();
	proxyFactory.setBeanFactory(this.getBeanFactory());
	proxyFactory.setTarget(targetSource);
	var methods = AopUtil.getMethodsFromObject(beanObject);
	proxyFactory.setInterfaces(methods);

	for (var i = 0; i < advisors.length; i++) {
		proxyFactory.addAdvisor(advisors[i]);
	}

	return proxyFactory.getProxy();
}

autoProxyCreator.prototype.getAdvisorsForBean = function(beanObject, beanName) {
	return this.findEligibleAdvisors(beanObject, beanName);
}

autoProxyCreator.prototype.findEligibleAdvisors = function(beanObject, beanName) {
	var candidateAdvisors = this.findCandidateAdvisors(beanObject, beanName);
	return this.findAdvisorsThatCanApply(beanObject, beanName, candidateAdvisors);
}

autoProxyCreator.prototype.findCandidateAdvisors = function(beanObject, beanName) {
	var aspects = this.beanFactory.getAspects();

	var candidateAdvisors = [];

	for (var i = 0; i < aspects.length; i++) {
		var aspect = aspects[i];
		var beanName = aspect.getBeanName();
		var aspectBean = this.beanFactory.getBean(beanName);
		aspect.setBean(aspectBean);
		var advisors = aspect.getAdvisors();
		for (var j = 0; j < advisors.length; j++) {
			var advisor = advisors[j];
			advisor.setBean(aspectBean);
			candidateAdvisors.push(advisor);
		}
	}

	return candidateAdvisors;
}

autoProxyCreator.prototype.findAdvisorsThatCanApply = function(beanObject, beanName, candidateAdvisors) {
	var advisors = [];
	//TODO pointcut match
	for (var i = 0; i < candidateAdvisors.length; i++) {
		var advisor = candidateAdvisors[i];
		if (this.canApply(advisor, beanObject, beanName)) {
			advisors.push(advisor);
		}
	}

	advisors = AopUtil.sortAdvisorsByOrder(advisors);

	return advisors;
}

autoProxyCreator.prototype.canApply = function(advisor, beanObject, beanName) {
	var methods = AopUtil.getMethodsFromObject(beanObject);

	var pointcut = advisor.getPointcut();

	for (var i = 0; i < methods.length; i++) {
		var targetMethod = beanName + '.' + methods[i];

		if (pointcut.match(targetMethod)) {
			return true;
		}
	}

	return false;
}