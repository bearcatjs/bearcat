var advisedSupport = function() {
	this.advisors = [];
	this.interfaces = [];
	this.targetSource = null;
	this.advisorChainFactory = null;
	this.methodCache = {};
	this.beanFactory = null;
}

module.exports = advisedSupport;

advisedSupport.prototype.setTarget = function(target) {
	this.setTargetSource(target);
}

advisedSupport.prototype.setTargetSource = function(targetSource) {
	this.targetSource = targetSource;
}

advisedSupport.prototype.getTargetSource = function() {
	return this.targetSource;
}

advisedSupport.prototype.setAdvisorChainFactory = function(advisorChainFactory) {
	this.advisorChainFactory = advisorChainFactory;
}

advisedSupport.prototype.getAdvisorChainFactory = function() {
	return this.advisorChainFactory;
}

advisedSupport.prototype.setInterfaces = function(interfaces) {
	this.interfaces = interfaces;
}

advisedSupport.prototype.addInterface = function(interface) {
	this.interfaces.push(interface);
}

advisedSupport.prototype.getInterfaces = function() {
	return this.interfaces;
}

advisedSupport.prototype.getAdvisors = function() {
	return this.advisors;
}

advisedSupport.prototype.addAdvisor = function(advisor) {
	this.advisors.push(advisor);
}

advisedSupport.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

advisedSupport.prototype.setBeanFactory = function(beanFactory) {
	this.beanFactory = beanFactory;
}

advisedSupport.prototype.getInterceptionAdvice = function(method, beanName, adviceType) {
	var cacheKey = method + "_" + adviceType;
	var cached = this.methodCache[cacheKey];

	if (!cached) {
		cached = this.doGetInterceptionAdvice(method, beanName, adviceType);
		this.methodCache[cacheKey] = cached;
	}

	return cached;
}

advisedSupport.prototype.doGetInterceptionAdvice = function(method, beanName, adviceType) {
	var interceptorList = [];
	var advisors = this.getAdvisors();
	var targetMethod = beanName + '.' + method;

	for (var i = 0; i < advisors.length; i++) {
		var advisor = advisors[i];
		var pointcut = advisor.getPointcut();
		if (pointcut.getAdviceType() !== adviceType) {
			continue;
		}

		if (pointcut.match(targetMethod)) {
			interceptorList.push(advisor);
		}
	}

	return interceptorList;
}