/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat DynamicAopProxy
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var DynamicAopProxy = require('./dynamicAopProxy');
var AdvisedSupport = require('./advisedSupport');
var util = require('util');

/**
 * ProxyFactory constructor function.
 *
 * @param  {Object} target object
 * @param  {Array}  proxy interfaces
 * @api public
 */
var ProxyFactory = function(target, interfaces) {
	this.beanFactory = null;
	AdvisedSupport.call(this);

	if (target) {
		this.setTarget(target);
	}

	if (Array.isArray(interfaces)) {
		this.setInterfaces(interfaces);
	}
}

util.inherits(ProxyFactory, AdvisedSupport);

module.exports = ProxyFactory;

/**
 * ProxyFactory get dynamic proxy.
 *
 * @return  {Object} dynamic proxy object
 * @api public
 */
ProxyFactory.prototype.getProxy = function() {
	var beanFactory = this.getBeanFactory();
	var proxyObject = new DynamicAopProxy(this);
	return proxyObject;
}