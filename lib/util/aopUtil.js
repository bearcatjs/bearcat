/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat AopUtil
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Advisor = require('../aop/advisor');
var Aspect = require('../aop/aspect');
var Utils = require('./utils');
var AopUtil = {};

/**
 * AopUtil build aspects from metaList and beanDefinition.
 *
 * @param   {Array}  metaList
 * @param   {Object} beanDefinition
 * @param   {Array}  aspects
 * @api public
 */
AopUtil.buildAspect = function(metaList, beanDefinition) {
	var aspect = new Aspect();
	var beanName = beanDefinition.getBeanName();
	aspect.setBeanDefinition(beanDefinition);
	aspect.setBeanName(beanName);

	for (var i = 0; i < metaList.length; i++) {
		var meta = metaList[i];
		var pointcut = meta['pointcut'];
		var advice = meta['advice'];
		var order = meta['order'];
		var runtime = meta['runtime'] || false;

		if (!pointcut || !advice) {
			continue;
		}

		var advisor = new Advisor();
		advisor.setPointcut(pointcut);
		advisor.setAdvice(advice);
		advisor.setBeanName(beanName);
		advisor.setOrder(order);
		advisor.setRuntime(runtime);
		advisor.parse();

		aspect.addAdvisor(advisor);
	}

	return aspect;
}

/**
 * AopUtil reflect methods from object.
 *
 * @param    {Object} object
 * @return   {Array}  method names
 * @api public
 */
AopUtil.getMethodsFromObject = function(object) {
	var proto = object;
	var methods = [];

	for (var key in proto) {
		var method = proto[key];
		if (Utils.checkFunction(method)) {
			methods.push(key);
		}
	}

	return methods;
}

/**
 * AopUtil sort advisors by order.
 *
 * @param    {Array} advisors
 * @return   {Array} sorted advisors
 * @api public
 */
AopUtil.sortAdvisorsByOrder = function(advisors) {
	advisors.sort(Utils.compareByOrder);

	return advisors;
}

module.exports = AopUtil;