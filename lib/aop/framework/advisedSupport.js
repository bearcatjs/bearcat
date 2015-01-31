/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat AdvisedSupport
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */
var Utils = require('../../util/utils');

/**
 * AdvisedSupport constructor function.
 * @api public
 */
var AdvisedSupport = function() {
	this.advisors = [];
	this.interfaces = [];
	this.methodCache = {};
	this.beanFactory = null;
	this.targetSource = null;
	this.advisorChainFactory = null;
}

/**
 * set target.
 *
 * @param  {Object} target target object
 * @api public
 */
AdvisedSupport.prototype.setTarget = function(target) {
	this.setTargetSource(target);
}

/**
 * set target source.
 *
 * @param  {Object} targetSource object
 * @api public
 */
AdvisedSupport.prototype.setTargetSource = function(targetSource) {
	this.targetSource = targetSource;
}

/**
 * get target source.
 *
 * @return  {Object} targetSource object
 * @api public
 */
AdvisedSupport.prototype.getTargetSource = function() {
	return this.targetSource;
}

/**
 * set proxy interfaces.
 *
 * @param  {Array} interfaces proxy interfaces
 * @api public
 */
AdvisedSupport.prototype.setInterfaces = function(interfaces) {
	for (var i = 0; i < interfaces.length; i++) {
		this.addInterface(interfaces[i]);
	}
}

/**
 * add proxy interface.
 *
 * @param  {String} interface proxy interface
 * @api public
 */
AdvisedSupport.prototype.addInterface = function(interface) {
	this.interfaces.push(interface);
}

/**
 * get proxy interfaces.
 *
 * @return  {Array} proxy interfaces
 * @api public
 */
AdvisedSupport.prototype.getInterfaces = function() {
	return this.interfaces;
}

/**
 * get advisors.
 *
 * @return  {Array} advisors
 * @api public
 */
AdvisedSupport.prototype.getAdvisors = function() {
	return this.advisors;
}

/**
 * add advisor.
 *
 * @param  {Object} advisor
 * @api public
 */
AdvisedSupport.prototype.addAdvisor = function(advisor) {
	this.advisors.push(advisor);
}

/**
 * get beanFactory.
 *
 * @return  {Object} beanFactory object
 * @api public
 */
AdvisedSupport.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

/**
 * set beanFactory.
 *
 * @param  {Object} beanFactory beanFactory object
 * @api public
 */
AdvisedSupport.prototype.setBeanFactory = function(beanFactory) {
	this.beanFactory = beanFactory;
}

/**
 * get interception advisors for bean.
 *
 * @param   {String} method
 * @param   {String} beanName
 * @param   {String} adviceType
 * @return  {Object} interception advisors
 * @api public
 */
AdvisedSupport.prototype.getInterceptionAdvice = function(method, beanName, adviceType) {
	var cacheKey = method + "_" + adviceType;
	var cached = this.methodCache[cacheKey];

	if (!cached) {
		cached = this.doGetInterceptionAdvice(method, beanName, adviceType);
		this.methodCache[cacheKey] = cached;
	}

	return cached;
}

/**
 * do get interception advisors for bean.
 *
 * @param   {String} method
 * @param   {String} beanName
 * @param   {String} adviceType
 * @return  {Object} interception advisors
 * @api private
 */
AdvisedSupport.prototype.doGetInterceptionAdvice = function(method, beanName, adviceType) {
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

	interceptorList.sort(Utils.compareByOrder);

	return interceptorList;
}

module.exports = AdvisedSupport;