/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * |   _  )  |   ____)   /   \     |   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * |______)  |_______/__/     \__\ | _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat Aspect
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Aspect = function() {
	this.advisors = [];
	this.beanName = null;
	this.beanDefinition = null;
	this.bean = null;
}

module.exports = Aspect;

Aspect.prototype.addAdvisor = function(advisor) {
	this.advisors.push(advisor);
}

Aspect.prototype.getAdvisors = function() {
	return this.advisors;
}

Aspect.prototype.setBeanDefinition = function(beanDefinition) {
	this.beanDefinition = beanDefinition;
}

Aspect.prototype.getBeanDefinition = function() {
	return this.beanDefinition;
}

Aspect.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

Aspect.prototype.getBeanName = function() {
	return this.beanName;
}

Aspect.prototype.setBean = function(bean) {
	this.bean = bean;
}

Aspect.prototype.getBean = function() {
	return this.bean;
}