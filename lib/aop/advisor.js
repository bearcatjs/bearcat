/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat Advisor
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Pointcut = require('./pointcut');

/**
 * Advisor constructor function.
 *
 * @api public
 */
var Advisor = function() {
	this.pointcut = null;
	this.beanName = null;
	this.runtime = null;
	this.advice = null;
	this.order = null;
	this.bean = null;
}

/**
 * Advisor set pointcut.
 *
 * @param  {Object} pointcut pointcut object
 * @api public
 */
Advisor.prototype.setPointcut = function(pointcut) {
	if (!pointcut) {
		return;
	}

	var p = new Pointcut();
	p.setExpression(pointcut);

	this.pointcut = p;
}

/**
 * Advisor get pointcut.
 *
 * @return  {Object} pointcut object
 * @api public
 */
Advisor.prototype.getPointcut = function() {
	return this.pointcut;
}

/**
 * Advisor set advice function name.
 *
 * @param  {String} advice advice function name
 * @api public
 */
Advisor.prototype.setAdvice = function(advice) {
	this.advice = advice;
}

/**
 * Advisor get advice function name.
 *
 * @return  {String} advice function name
 * @api public
 */
Advisor.prototype.getAdvice = function() {
	return this.advice;
}

/**
 * Advisor set bean name.
 *
 * @param  {String} beanName bean name
 * @api public
 */
Advisor.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

/**
 * Advisor get bean name.
 *
 * @return  {String} bean name
 * @api public
 */
Advisor.prototype.getBeanName = function() {
	return this.beanName;
}

/**
 * Advisor set aspect bean.
 *
 * @param  {Object} bean aspect bean
 * @api public
 */
Advisor.prototype.setBean = function(bean) {
	this.bean = bean;
}

/**
 * Advisor get aspect bean.
 *
 * @return  {Object} aspect bean
 * @api public
 */
Advisor.prototype.getBean = function() {
	return this.bean;
}

/**
 * Advisor set advisor chain order.
 *
 * @param  {Number} order order number
 * @api public
 */
Advisor.prototype.setOrder = function(order) {
	this.order = order;
}

/**
 * Advisor get advisor chain order.
 *
 * @return  {Number} order number
 * @api public
 */
Advisor.prototype.getOrder = function() {
	return this.order;
}

/**
 * Advisor set if advisor is runtime.
 *
 * @param  {Boolean} runtime runtime true|false
 * @api public
 */
Advisor.prototype.setRuntime = function(runtime) {
	this.runtime = runtime;
}

/**
 * Advisor get if advisor is runtime.
 *
 * @return  {Boolean} runtime true|false
 * @api public
 */
Advisor.prototype.isRuntime = function() {
	return this.runtime;
}

/**
 * Advisor do parse pointcut,advice.
 *
 * @api public
 */
Advisor.prototype.parse = function() {
	this.pointcut.parse();
}

module.exports = Advisor;