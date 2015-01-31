/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat AutoProxyCreator
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var ProxyFactory = require('../framework/proxyFactory');
var TargetSource = require('../targetSource');
var AopUtil = require('../../util/aopUtil');
var Utils = require('../../util/utils');

/**
 * AutoProxyCreator constructor function.
 * it is a beanPostProcessor
 * @api public
 */
var AutoProxyCreator = function() {
	this.beanFactory = null;
}

/**
 * AutoProxyCreator beanPostProcessor before filter wrap bean if necessary.
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @return {Object} bean object
 * @api public
 */
AutoProxyCreator.prototype.before = function(beanObject, beanName) {
	return beanObject;
}

/**
 * AutoProxyCreator beanPostProcessor after filter wrap bean if necessary.
 * it may return target proxy object if necessary
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @return {Object} bean object
 * @api public
 */
AutoProxyCreator.prototype.after = function(beanObject, beanName) {
	return this.wrapIfNecessary(beanObject, beanName);
}

/**
 * AutoProxyCreator set beanFactory.
 *
 * @param  {Object} beanFactory beanFactory object
 * @api public
 */
AutoProxyCreator.prototype.setBeanFactory = function(beanFactory) {
	this.beanFactory = beanFactory;
}

/**
 * AutoProxyCreator get beanFactory.
 *
 * @return  {Object} beanFactory object
 * @api public
 */
AutoProxyCreator.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

/**
 * AutoProxyCreator wrap bean if necessary.
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
AutoProxyCreator.prototype.wrapIfNecessary = function(beanObject, beanName) {
	var beanDefinition = this.beanFactory.getBeanDefinition(beanName);
	// class do not need to be proxied
	if (!beanDefinition.needProxy()) {
		return beanObject;
	}

	// aspect beanObject do not need to proxy
	if (beanDefinition.isAspect()) {
		return beanObject;
	}

	var advisors = this.getAdvisorsForBean(beanObject, beanName);

	if (Utils.checkArray(advisors) && advisors.length) {
		var proxy = this.createProxy(beanObject, beanName, advisors, new TargetSource(beanName, beanObject));
		return proxy;
	}

	return beanObject;
}

/**
 * AutoProxyCreator create proxy object with specific advisors and targetSource.
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @param  {Array}  advisors advisors list
 * @param  {Object} targetSource targetSource object
 * @return {Object} bean proxy object
 * @api private
 */
AutoProxyCreator.prototype.createProxy = function(beanObject, beanName, advisors, targetSource) {
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

/**
 * AutoProxyCreator get advisors for bean.
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @return {Array}  advisors list
 * @api private
 */
AutoProxyCreator.prototype.getAdvisorsForBean = function(beanObject, beanName) {
	return this.findEligibleAdvisors(beanObject, beanName);
}

/**
 * AutoProxyCreator find eligible advisors.
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @return {Array}  advisors list
 * @api private
 */
AutoProxyCreator.prototype.findEligibleAdvisors = function(beanObject, beanName) {
	var candidateAdvisors = this.findCandidateAdvisors(beanObject, beanName);
	return this.findAdvisorsThatCanApply(beanObject, beanName, candidateAdvisors);
}

/**
 * AutoProxyCreator find all candidate advisors for bean.
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @return {Array}  advisors list
 * @api private
 */
AutoProxyCreator.prototype.findCandidateAdvisors = function(beanObject, beanName) {
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

/**
 * AutoProxyCreator find all candidate advisors appliable for bean.
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @param  {Array}  candidateAdvisors
 * @return {Array}  advisors list
 * @api private
 */
AutoProxyCreator.prototype.findAdvisorsThatCanApply = function(beanObject, beanName, candidateAdvisors) {
	var advisors = [];

	for (var i = 0; i < candidateAdvisors.length; i++) {
		var advisor = candidateAdvisors[i];
		if (this.canApply(advisor, beanObject, beanName)) {
			advisors.push(advisor);
		}
	}

	advisors = AopUtil.sortAdvisorsByOrder(advisors);

	return advisors;
}

/**
 * AutoProxyCreator check whether an advisor can be applied to the specific bean.
 *
 * @param  {Object}  advisor
 * @param  {Object}  beanObject
 * @param  {String}  beanName
 * @return {Boolean} true|false
 * @api private
 */
AutoProxyCreator.prototype.canApply = function(advisor, beanObject, beanName) {
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

module.exports = AutoProxyCreator;