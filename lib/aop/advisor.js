var Pointcut = require('./pointcut');

var advisor = function() {
	this.pointcut = null;
	this.advice = null;
	this.beanName = null;
	this.bean = null;
	this.order = null;
	this.runtime = null;
}

module.exports = advisor;

advisor.prototype.setPointcut = function(pointcut) {
	if (!pointcut) {
		return;
	}

	var p = new Pointcut();
	p.setExpression(pointcut);

	this.pointcut = p;
}

advisor.prototype.getPointcut = function() {
	return this.pointcut;
}

advisor.prototype.setAdvice = function(advice) {
	this.advice = advice;
}

advisor.prototype.getAdvice = function() {
	return this.advice;
}

advisor.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

advisor.prototype.getBeanName = function() {
	return this.beanName;
}

advisor.prototype.setBean = function(bean) {
	this.bean = bean;
}

advisor.prototype.getBean = function() {
	return this.bean;
}

advisor.prototype.setOrder = function(order) {
	this.order = order;
}

advisor.prototype.getOrder = function() {
	return this.order;
}

advisor.prototype.setRuntime = function(runtime) {
	this.runtime = runtime;
}

advisor.prototype.isRuntime = function() {
	return this.runtime;
}

advisor.prototype.parse = function() {
	this.pointcut.parse();
}