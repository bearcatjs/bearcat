/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat Aspect
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

/**
 * Aspect constructor function.
 *
 * @api public
 */
var Aspect = function() {
	this.advisors = [];
	this.beanName = null;
	this.beanDefinition = null;
	this.bean = null;
}

/**
 * Aspect add advisor.
 *
 * @param  {Object} advisor advisor object
 * @api public
 */
Aspect.prototype.addAdvisor = function(advisor) {
	this.advisors.push(advisor);
}

/**
 * Aspect get advisors.
 *
 * @return  {Array} advisors
 * @api public
 */
Aspect.prototype.getAdvisors = function() {
	return this.advisors;
}

/**
 * Aspect set beanDefinition.
 *
 * @param  {Object} beanDefinition beanDefinition object
 * @api public
 */
Aspect.prototype.setBeanDefinition = function(beanDefinition) {
	this.beanDefinition = beanDefinition;
}

/**
 * Aspect get beanDefinition.
 *
 * @return  {Object} beanDefinition object
 * @api public
 */
Aspect.prototype.getBeanDefinition = function() {
	return this.beanDefinition;
}

/**
 * Aspect set beanName.
 *
 * @param  {String} beanName
 * @api public
 */
Aspect.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

/**
 * Aspect get beanName.
 *
 * @return  {String} beanName
 * @api public
 */
Aspect.prototype.getBeanName = function() {
	return this.beanName;
}

/**
 * Aspect set aspect bean.
 *
 * @param  {Object} bean aspect bean object
 * @api public
 */
Aspect.prototype.setBean = function(bean) {
	this.bean = bean;
}

/**
 * Aspect get aspect bean.
 *
 * @return  {Object} aspect bean object
 * @api public
 */
Aspect.prototype.getBean = function() {
	return this.bean;
}

module.exports = Aspect;