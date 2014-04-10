/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * |   _  )  |   ____)   /   \     |   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * |______)  |_______/__/     \__\ | _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat Advisor
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Pointcut = require('./pointcut');

var Advisor = function() {
	this.pointcut = null;
	this.advice = null;
	this.beanName = null;
	this.bean = null;
	this.order = null;
	this.runtime = null;
}

module.exports = Advisor;

Advisor.prototype.setPointcut = function(pointcut) {
	if (!pointcut) {
		return;
	}

	var p = new Pointcut();
	p.setExpression(pointcut);

	this.pointcut = p;
}

Advisor.prototype.getPointcut = function() {
	return this.pointcut;
}

Advisor.prototype.setAdvice = function(advice) {
	this.advice = advice;
}

Advisor.prototype.getAdvice = function() {
	return this.advice;
}

Advisor.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

Advisor.prototype.getBeanName = function() {
	return this.beanName;
}

Advisor.prototype.setBean = function(bean) {
	this.bean = bean;
}

Advisor.prototype.getBean = function() {
	return this.bean;
}

Advisor.prototype.setOrder = function(order) {
	this.order = order;
}

Advisor.prototype.getOrder = function() {
	return this.order;
}

Advisor.prototype.setRuntime = function(runtime) {
	this.runtime = runtime;
}

Advisor.prototype.isRuntime = function() {
	return this.runtime;
}

Advisor.prototype.parse = function() {
	this.pointcut.parse();
}