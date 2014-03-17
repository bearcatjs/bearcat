/**
 * Bearcat singletonBeanFactory
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcar', 'singletonBeanFactory');

/**
 * singletonBeanFactory constructor function.
 *
 * @api public
 */
var singletonBeanFactory = function() {
	this.singletonObjects = {};
}

module.exports = singletonBeanFactory;

/**
 * add singleton to singletonBeanFactory.
 *
 * @param  {String} beanName
 * @param {Object} beanObject
 * @api public
 */
singletonBeanFactory.prototype.addSingleton = function(beanName, beanObject) {
	this.singletonObjects[beanName] = beanObject;
}

/**
 * check singletonBeanFactory contains singleton or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
singletonBeanFactory.prototype.containsSingleton = function(beanName) {
	return this.singletonObjects[beanName] !== null;
}

/**
 * get singleton from singletonBeanFactory.
 *
 * @param  {String} beanName
 * @param  {Object} beanFactory
 * @return {Object} singletonObject
 * @api public
 */
singletonBeanFactory.prototype.getSingleton = function(beanName, beanFactory) {
	arguments = Array.prototype.slice.apply(arguments);
	beanFactory = arguments.pop();

	var bean = this.singletonObjects[beanName];
	if (bean) {
		return bean;
	} else {
		bean = beanFactory.createBean.apply(beanFactory, arguments);
	}

	this.addSingleton(beanName, bean);

	return bean;
}

/**
 * get all singleton names from singletonBeanFactory.
 *
 * @api public
 */
singletonBeanFactory.prototype.getSingletonNames = function() {
	var r = [];
	for (var name in this.singletonObjects) {
		r.push(name);
	}

	return r;
}

/**
 * remove singleton from singletonBeanFactory.
 *
 * @param  {String} beanName
 * @api public
 */
singletonBeanFactory.prototype.removeSingleton = function(beanName) {
	delete this.singletonObjects[beanName];
}