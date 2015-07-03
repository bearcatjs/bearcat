!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.bearcat=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./lib/util/requireUtil');

module.exports = require('./lib/bearcat');
},{"./lib/bearcat":20,"./lib/util/requireUtil":42}],2:[function(require,module,exports){
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
},{"./pointcut":9}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{"../../util/aopUtil":35,"../../util/utils":44,"../framework/proxyFactory":8,"../targetSource":10}],5:[function(require,module,exports){
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
},{"../../util/utils":44}],6:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat DynamicAopProxy
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'DynamicAopProxy');
var Constant = require('../../util/constant');
var Utils = require('../../util/utils');

/**
 * DynamicAopProxy constructor function.
 *
 * @param  {Object} advised advisedSupport object
 * @api public
 */
var DynamicAopProxy = function(advised) {
	this.advised = advised;
	this.dyInit();
}

/**
 * DynamicAopProxy init function.
 * it will add proxy interfaces to DynamicAopProxy prototype, and proxy to invoke function
 *
 * @api public
 */
DynamicAopProxy.prototype.dyInit = function() {
	if (!this.advised) {
		logger.error('DynamicAopProxy init error no advised');
		return;
	}

	var interfaces = this.advised.getInterfaces();
	var self = this;
	for (var i = 0; i < interfaces.length; i++) {
		(function(interface) {
			if (checkFuncName(interface)) {
				logger.error('init error proxy method interface %j the same as DynamicAopProxy, rename this name to another.', interface)
				return;
			};

			self[interface] = function() {
				arguments = Array.prototype.slice.apply(arguments);
				return self.dyInvoke(interface, arguments);
			}
		})(interfaces[i]);
	}
}

/**
 * DynamicAopProxy proxy invoke function.
 * all target proxy function invoke will delegate to this function
 *
 * @param  {String} method proxy method name
 * @param  {Array}  args proxy method invoke arguments
 *
 * @api private
 */
DynamicAopProxy.prototype.dyInvoke = function(method, args) {
	var self = this;
	var invokeCb = args.pop();
	var flag = false;
	if (!Utils.checkFunction(invokeCb)) {
		// aop target args last must be next function
		// if (invokeCb) {
		args.push(invokeCb);
		// }
		invokeCb = function() {};
		flag = true;
	}

	var targetSource = this.advised.getTargetSource();
	var beanName = targetSource.getBeanName();
	var target = targetSource.getTarget();

	var adviseType = Constant.AOP_ADVICE_BEFORE;
	var beforeAdvisors = this.advised.getInterceptionAdvice(method, beanName, adviseType);

	adviseType = Constant.AOP_ADVICE_AROUND;
	var aroundAdvisors = this.advised.getInterceptionAdvice(method, beanName, adviseType);

	var needAround = false;
	if (Utils.checkArray(aroundAdvisors) && aroundAdvisors.length) {
		needAround = true;
	}

	adviseType = Constant.AOP_ADVICE_AFTER;
	var afterAdvisors = this.advised.getInterceptionAdvice(method, beanName, adviseType);

	var needAfter = false;
	if (Utils.checkArray(afterAdvisors) && afterAdvisors.length) {
		needAfter = true;
	}

	return this.doInvokeAdvisorsBefore(method, args, beforeAdvisors, function(err) {
		if (err) {
			return invokeCb(err);
		}

		if (needAround) {
			self.doInvokeAdvisorsAround(target, method, args, aroundAdvisors, function() {
				arguments = Array.prototype.slice.apply(arguments);
				invokeCb.apply(null, arguments);
				self.doInvokeAdvisorsAfter(method, arguments, afterAdvisors, function() {});
			});
		} else {
			var next = function() {
				arguments = Array.prototype.slice.apply(arguments);
				invokeCb.apply(null, arguments);
				self.doInvokeAdvisorsAfter(method, arguments, afterAdvisors, function() {});
			}

			if (!flag) {
				args.push(next);
				return target[method].apply(target, args);
			} else {
				var r = target[method].apply(target, args);
				if (needAfter) {
					self.doInvokeAdvisorsAfter(method, r, afterAdvisors, function() {});
				}

				return r;
			}
		}
	});
}

/**
 * DynamicAopProxy do invoke before advisors chain.
 *
 * @param  {String}   method proxy method name
 * @param  {Array}    args proxy method invoke arguments
 * @param  {Object}   advisors target advisors
 * @param  {Function} cb callback function
 *
 * @api private
 */
DynamicAopProxy.prototype.doInvokeAdvisorsBefore = function(method, args, advisors, cb) {
	var index = 0;

	args = Array.prototype.slice.apply(args);

	if (!advisors || !Utils.checkArray(advisors) || !advisors.length) {
		return cb();
	}

	var next = function(err) {
		if (err || index >= advisors.length) {
			return cb(err);
		}

		var advisor = advisors[index++];
		var advise = advisor.getAdvice();
		var aspectBean = advisor.getBean();

		var _next = function(err) {
			next(err);
		};

		if (advisor.isRuntime()) {
			args.push(_next);
			aspectBean[advise].apply(aspectBean, args);
		} else {
			aspectBean[advise](_next);
		}
	}

	next();
}

/**
 * DynamicAopProxy do invoke around advisors chain.
 *
 * @param  {Object}   target target object
 * @param  {String}   method proxy method name
 * @param  {Array}    args proxy method invoke arguments
 * @param  {Object}   advisors target advisors
 * @param  {Function} cb callback function
 *
 * @api private
 */
DynamicAopProxy.prototype.doInvokeAdvisorsAround = function(target, method, args, advisors, cb) {
	var advisor = advisors[0];
	var advise = advisor.getAdvice();
	var aspectBean = advisor.getBean();

	// if (Utils.checkObject(args)) {
	// 	args = Array.prototype.slice.apply(args);
	// }

	if (advisor.isRuntime()) {
		args.unshift(method);
		args.unshift(target);
		args.push(cb);
		aspectBean[advise].apply(aspectBean, args);
	} else {
		aspectBean[advise](target, method, cb);
	}
}

/**
 * DynamicAopProxy do invoke after advisors chain.
 *
 * @param  {String}   method proxy method name
 * @param  {Array}    args proxy method invoke arguments
 * @param  {Object}   advisors target advisors
 * @param  {Function} cb callback function
 *
 * @api private
 */
DynamicAopProxy.prototype.doInvokeAdvisorsAfter = function(method, args, advisors, cb) {
	var index = 0;

	if (!advisors || !Utils.checkArray(advisors) || !advisors.length) {
		return cb();
	}

	// if (Utils.checkObject(args)) {
	// 	args = Array.prototype.slice.apply(args);
	// } else 
	if (!Utils.checkArray(args)) {
		args = [args];
	}

	var next = function(err) {
		if (err || index >= advisors.length) {
			return cb(err);
		}

		var advisor = advisors[index++];
		var advise = advisor.getAdvice();
		var aspectBean = advisor.getBean();

		var _next = function(err) {
			next(err);
		};

		args.push(_next);
		aspectBean[advise].apply(aspectBean, args);
	}

	next();
}

var names = ["dyInit", "dyInvoke", "doInvokeAdvisorsBefore",
	"doInvokeAdvisorsAround", "doInvokeAdvisorsAfter"
];

var checkFuncName = function(name) {
	for (var i = 0; i < names.length; i++) {
		if (name === names[i]) {
			return true;
		}
	}

	return false;
}

module.exports = DynamicAopProxy;
},{"../../util/constant":37,"../../util/utils":44,"pomelo-logger":57}],7:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat DynamicMetaProxy
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'DynamicMetaProxy');
var Utils = require('../../util/utils');

/**
 * DynamicMetaProxy constructor function.
 * this proxy will be used in bearcat.getBeanByMeta()
 * getBeanByMeta will first return a dynamicMetaProxy,
 * when target bean invoked, it will call getBean to get the target object
 *
 * @api public
 */
var DynamicMetaProxy = function() {
	this.args = null;
	this.target = null;
	this.beanFactory = null;
	this.beanDefinition = null;
}

/**
 * DynamicMetaProxy init function.
 *
 * @api public
 */
DynamicMetaProxy.prototype._dyInit = function() {
	var beanDefinition = this.beanDefinition;
	if (!beanDefinition) {
		logger.error('init error no beanDefinition.');
		return;
	}

	var self = this;

	var func = beanDefinition.getFunc();

	if (Utils.checkFunction(func)) {
		var proto = func.prototype;
		for (interface in proto) {
			if (Utils.checkFunction(proto[interface])) {
				(function(method) {
					if (checkFuncName(method)) {
						logger.error('init error proxy method interface %j the same as DynamicMetaProxy, rename this name to another.', method)
						return;
					};

					self[method] = function() {
						return self._dyInvoke(method, arguments);
					};
				})(interface);
			}
		}
	}
}

/**
 * DynamicMetaProxy proxy invoke function.
 *
 * @param  {String} method proxy method name
 * @param  {Array}  args target invoke arguments
 * @api private
 */
DynamicMetaProxy.prototype._dyInvoke = function(method, args) {
	var targetBean = this._getBean();
	if (Utils.checkFunction(targetBean[method])) {
		return targetBean[method].apply(targetBean, args);
	} else {
		logger.error('invoke error no such method %s in the target bean', method);
	}
}

/**
 * DynamicMetaProxy get target bean through beanFactory.
 *
 * @return  {Object}  target bean
 * @api public
 */
DynamicMetaProxy.prototype._getBean = function() {
	var args = this.args;

	var beanFactory = this.beanFactory;
	if (!this.target) {
		this.target = beanFactory.getBean.apply(beanFactory, args);
	}

	return this.target;
}

var names = ["_dyInit", "_dyInvoke", "_getBean"];

var checkFuncName = function(name) {
	for (var i = 0; i < names.length; i++) {
		if (name === names[i]) {
			return true;
		}
	}

	return false;
}

module.exports = DynamicMetaProxy;
},{"../../util/utils":44,"pomelo-logger":57}],8:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat DynamicAopProxy
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var RequireUtil = require('../../util/requireUtil');
var DynamicAopProxy = require('./dynamicAopProxy');
var AdvisedSupport = require('./advisedSupport');
var Utils = require('../../util/utils');
var Util = RequireUtil.requireUtil();

/**
 * ProxyFactory constructor function.
 *
 * @param  {Object} target target object
 * @param  {Array}  interfaces proxy interfaces
 * @api public
 */
var ProxyFactory = function(target, interfaces) {
	this.beanFactory = null;
	AdvisedSupport.call(this);

	if (target) {
		this.setTarget(target);
	}

	if (Utils.checkArray(interfaces)) {
		this.setInterfaces(interfaces);
	}
}

Util.inherits(ProxyFactory, AdvisedSupport);

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

module.exports = ProxyFactory;
},{"../../util/requireUtil":42,"../../util/utils":44,"./advisedSupport":5,"./dynamicAopProxy":6}],9:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat Pointcut
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Utils = require('../util/utils');

/**
 * Pointcut constructor function.
 *
 * @api public
 */
var Pointcut = function() {
	this.expression = null;
	this.adviceType = null;
	this.targetExpression = null;
}

/**
 * Pointcut set expression.
 *
 * @param  {String} expression pointcut expression
 * @api public
 */
Pointcut.prototype.setExpression = function(expression) {
	this.expression = expression;
}

/**
 * Pointcut get expression.
 *
 * @param  {String} pointcut expression
 * @api public
 */
Pointcut.prototype.getExpression = function() {
	return this.expression;
}

/**
 * Pointcut set adviceType: before, after, around.
 *
 * @param  {String} adviceType
 * @api public
 */
Pointcut.prototype.setAdviceType = function(adviceType) {
	this.adviceType = adviceType;
}

/**
 * Pointcut get adviceType: before, after, around.
 *
 * @param  {String} adviceType
 * @api public
 */
Pointcut.prototype.getAdviceType = function() {
	return this.adviceType;
}

/**
 * Pointcut set target pointcut expression.
 *
 * @param  {String} target pointcut expression
 * @api public
 */
Pointcut.prototype.setTargetExpression = function(targetExpression) {
	this.targetExpression = new RegExp(targetExpression);
}

/**
 * Pointcut get target pointcut expression.
 *
 * @return  {String} target pointcut expression
 * @api public
 */
Pointcut.prototype.getTargetExpression = function() {
	return this.targetExpression;
}

/**
 * Pointcut parse pointcut expression.
 *
 * @api public
 */
Pointcut.prototype.parse = function() {
	var expression = this.getExpression();
	if (!expression) {
		return;
	}

	var r = expression.split(':');
	if (Utils.checkArray(r) && r.length === 2) {
		this.setAdviceType(r[0]);
		this.setTargetExpression(r[1]);
	}
}

/**
 * Pointcut check whether pointcut match targetMethod.
 *
 * @param  {String} targetMethod target method name
 * @api public
 */
Pointcut.prototype.match = function(targetMethod) {
	var targetExpression = this.getTargetExpression();

	return targetMethod.match(targetExpression);
}

module.exports = Pointcut;
},{"../util/utils":44}],10:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat TargetSource
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

/**
 * TargetSource constructor function.
 *
 * @param  {String} beanName
 * @param  {Object} target target object
 * @api public
 */
var TargetSource = function(beanName, target) {
	this.beanName = beanName;
	this.target = target;
}

/**
 * TargetSource set beanName.
 *
 * @param  {String} beanName
 * @api public
 */
TargetSource.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

/**
 * TargetSource get beanName.
 *
 * @return  {String} beanName
 * @api public
 */
TargetSource.prototype.getBeanName = function() {
	return this.beanName;
}

/**
 * TargetSource set target.
 *
 * @param  {Object} target target object
 * @api public
 */
TargetSource.prototype.setTarget = function(target) {
	this.target = target;
}

/**
 * TargetSource get target.
 *
 * @return  {Object} target object
 * @api public
 */
TargetSource.prototype.getTarget = function() {
	return this.target;
}

TargetSource.prototype.releaseTarget = function() {

}

module.exports = TargetSource;
},{}],11:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanFactory
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'BeanFactory');
var DynamicMetaProxy = require('../aop/framework/dynamicMetaProxy');
var SingletonBeanFactory = require('./singletonBeanFactory');
var ModelConstraint = require('../model/modelConstraint');
var ModelDefinition = require('../model/modelDefinition');
var BeanDefinition = require('./support/beanDefinition');
var ValidatorUtil = require('../util/validatorUtil');
var ModelFilter = require('../model/modelFilter');
var ModelProxy = require('../model/modelProxy');
var ModelUtil = require('../util/modelUtil');
var Constant = require('../util/constant');
var BeanUtil = require('../util/beanUtil');
var AopUtil = require('../util/aopUtil');
var Aspect = require('../aop/aspect');
var Utils = require('../util/utils');

/**
 * BeanFactory constructor function.
 *
 * @api public
 */
var BeanFactory = function() {
	this.aspects = [];
	this.modelMap = {};
	this.initCbMap = {};
	this.beanCurMap = {};
	this.constraints = {};
	this.tableModelMap = {};
	this.beanFunctions = {};
	this.beanDefinitions = {};
	this.beanPostProcessors = [];
	this.singletonBeanFactory = new SingletonBeanFactory(this);
}

/**
 * BeanFactory get bean instance through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api public
 */
BeanFactory.prototype.getBean = function(beanName) {
	if (this.beanCurMap[beanName]) {
		logger.error("circle reference beanName " + beanName + " is in creating");
		return;
	}

	this.beanCurMap[beanName] = true;
	var beanObject = this.doGetBean.apply(this, arguments);
	delete this.beanCurMap[beanName];

	return beanObject;
}

/**
 * BeanFactory get bean proxy through BeanFactory IoC container for lazy init bean.
 * when invoke bean proxy, proxy will invoke getBean to get the target bean
 *
 * @param  {String} beanName
 * @return {Object} bean proxy object
 * @api public
 */
BeanFactory.prototype.getBeanProxy = function(beanName) {
	return this.doGetBeanProxy.apply(this, arguments);
}

/**
 * BeanFactory get model through BeanFactory IoC container.
 *
 * @param  {String} modelId
 * @return {Object} model proxy object
 * @api public
 */
BeanFactory.prototype.getModelProxy = function(modelId) {
	return this.doGetModelProxy(modelId);
}

/**
 * BeanFactory get constraint through BeanFactory IoC container.
 *
 * @param  {String} cid
 * @return {Object} constraint bean object
 * @api public
 */
BeanFactory.prototype.getConstraint = function(cid) {
	return this.doGetConstraint(cid);
}

/**
 * BeanFactory do get bean instance through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
BeanFactory.prototype.doGetBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	if (!beanDefinition) {
		logger.error('BeanFactory beanDefinition null for %j', beanName);
		return null;
	}

	if (beanDefinition.isAbstract()) {
		logger.warn('abstract bean can not get bean instance, you can use bearcat.getFunction to get constructor function of the bean');
		return this.getBeanFunction(beanName);
	}

	if (beanDefinition.hasParentBean()) {
		beanDefinition = this.setParentBean(beanName);
	}

	// if (beanDefinition.isLazyInit()) {
	// 	return this.getBeanProxy.apply(this, arguments);
	// }

	if (beanDefinition.isSingleton()) {
		return this.singletonBeanFactory.getSingleton.apply(this.singletonBeanFactory, arguments);
	} else if (beanDefinition.isPrototype()) {
		return this.createBean.apply(this, arguments);
	}
}

/**
 * BeanFactory do get bean proxy through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean proxy object
 * @api private
 */
BeanFactory.prototype.doGetBeanProxy = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	if (!beanDefinition) {
		logger.error('BeanFactory beanDefinition null for %j', beanName);
		return null;
	}

	var dynamicMetaProxy = new DynamicMetaProxy();
	dynamicMetaProxy['beanDefinition'] = beanDefinition;
	dynamicMetaProxy['beanFactory'] = this;
	dynamicMetaProxy['args'] = arguments;
	dynamicMetaProxy._dyInit();

	return dynamicMetaProxy;
}

/**
 * BeanFactory do get model through BeanFactory IoC container.
 *
 * @param  {String} modelId
 * @return {Object} model proxy
 * @api private
 */
BeanFactory.prototype.doGetModelProxy = function(modelId) {
	var modelDefinition = this.getModelDefinition(modelId);

	if (!modelDefinition) {
		logger.error('BeanFactory modelDefinition null for %j', modelId);
		return null;
	}

	var beanName = modelDefinition.getId();
	var beanDefinition = this.getBeanDefinition(beanName);

	if (!beanDefinition) {
		logger.error('BeanFactory beanDefinition null for %j', modelId);
		return null;
	}

	var modelFilter = new ModelFilter();
	modelFilter.setModelDefinition(modelDefinition);

	var modelProxy = new ModelProxy();
	var modelBean = this.getBean(beanName);
	var modelFields = modelDefinition.getFields();

	for (var key in modelFields) {
		var modelField = modelFields[key];
		var modelDefault = modelField.getDefault();
		var modelFieldType = modelField.getType();
		if (Utils.isNotNull(modelDefault)) {
			if (modelFieldType === Constant.TYPE_NUMBER) {
				modelDefault = parseInt(modelDefault);
			}
			modelBean[key] = modelDefault;
		}
	}

	modelFilter.setModel(modelBean);
	modelProxy['model'] = modelBean;
	modelProxy['beanFactory'] = this;
	modelProxy['modelFilter'] = modelFilter;
	modelProxy['beanDefinition'] = beanDefinition;
	modelProxy['modelDefinition'] = modelDefinition;

	modelProxy._modelInit();

	return modelProxy;
}

/**
 * BeanFactory do get constraint through BeanFactory IoC container.
 *
 * @param  {String} cid
 * @return {Object} constraint bean object
 * @api private
 */
BeanFactory.prototype.doGetConstraint = function(cid) {
	var constraintDefinition = this.getConstraintDefinition(cid);

	if (!constraintDefinition) {
		logger.error('BeanFactory constraintDefinition null for %j', cid);
		return null;
	}

	var beanName = constraintDefinition.getId();
	return this.getBean(beanName);
}

/**
 * BeanFactory create bean instance through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
BeanFactory.prototype.createBean = function(beanName) {
	var beanObject = this.doCreateBean.apply(this, arguments);
	beanObject = this.initBean(beanObject, beanName, this.getInitCb(beanName));

	return beanObject;
}

/**
 * BeanFactory do create bean instance through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
BeanFactory.prototype.doCreateBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	if (!beanDefinition) {
		return null;
	}

	if (beanDefinition.hasFactoryBean()) {
		return this.getBeanFromFactoryBean.apply(this, arguments);
	}

	var argsOn = beanDefinition.getArgsOn();
	var propsOn = beanDefinition.getPropsOn();
	var func = this.getBeanFunction(beanName);
	if (!func) {
		return null;
	}

	var dependsBeans = this.getDependsBeanValues(argsOn, arguments);
	var dependsApplyArgs = this.getDependsApplyArgs(dependsBeans);

	var beanObject = Object.create(func.prototype);

	func.apply(beanObject, dependsApplyArgs);

	dependsBeans = this.getDependsBeanValues(propsOn);
	if (Utils.checkArray(dependsBeans)) {
		for (var i = 0; i < dependsBeans.length; i++) {
			var wbean = dependsBeans[i];
			var name = wbean.getName();
			if (wbean.getDependType() === Constant.DEPEND_TYPE_BEAN) {
				beanObject[name] = wbean.getBean();
			} else if (wbean.getDependType() === Constant.DEPEND_TYPE_VALUE) {
				beanObject[name] = wbean.getValue();
			}
			// no this case
			// else if (wbean.getDependType() === Constant.DEPEND_TYPE_VAR) {
			// beanObject[name] = wbean.getValueOnce();
			// } 
			else {
				// Constant.DEPEND_TYPE_ERROR
			}
		}
	}

	return beanObject;
}

/**
 * BeanFactory init bean with init method.
 *
 * @param  {Object}   beanObject
 * @param  {String}   beanName
 * @param  {Function} cb async init callback function
 * @api private
 */
BeanFactory.prototype.initBean = function(beanObject, beanName, cb) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return;
	}

	beanObject = this.applyBeanPostProcessorsBeforeInitialization(beanObject, beanName);

	this.invokeInitMethods(beanObject, beanName, cb);

	beanObject = this.applyBeanPostProcessorsAfterInitialization(beanObject, beanName);

	return beanObject;
}

/**
 * BeanFactory invoke init method.
 *
 * @param  {Object}   beanObject
 * @param  {String}   beanName
 * @param  {Function} cb async init callback function
 * @api private
 */
BeanFactory.prototype.invokeInitMethods = function(beanObject, beanName, cb) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return;
	}

	if (beanDefinition.hasInitMethod()) {
		var initMethodName = beanDefinition.getInitMethodName();

		// run init method
		var initMethod = beanObject[initMethodName];
		if (Utils.checkFunction(initMethod)) {
			initMethod.call(beanObject, cb);
		}
	}
}

/**
 * BeanFactory get bean instance from factoryBean's factory method.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
BeanFactory.prototype.getBeanFromFactoryBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	var factoryBeanName = beanDefinition.getFactoryBeanName();
	var factoryMethodName = beanDefinition.getFactoryMethodName();
	var factoryArgsOn = beanDefinition.getFactoryArgsOn();

	var factoryBean = this.getBean(factoryBeanName);

	if (!factoryBean) {
		return null;
	}

	var factoryMethod = factoryBean[factoryMethodName];

	var dependsBeans = this.getDependsBeanValues(factoryArgsOn, arguments);

	var dependsApplyArgs = this.getDependsApplyArgs(dependsBeans);

	var beanObject = factoryMethod.apply(factoryBean, dependsApplyArgs);

	return beanObject;
}

/**
 * BeanFactory get denpended beans or values.
 *
 * @param  {Array} dependsOn
 * @param  {Array} args arguments
 * @return {Array} depended bean value list
 * @api private
 */
BeanFactory.prototype.getDependsBeanValues = function(dependsOn, args) {
	var r = [];
	if (!Utils.checkArray(dependsOn)) {
		return r;
	}

	var s = 1;
	for (var i = 0; i < dependsOn.length; i++) {
		var wbean = dependsOn[i];
		var beanName = wbean.getRef();

		if (wbean.getDependType() === Constant.DEPEND_TYPE_BEAN) {
			var bean = this.getBean(beanName);
			if (bean) {
				wbean.setBean(bean);
			}
		}

		if (wbean.getDependType() === Constant.DEPEND_TYPE_VAR) {
			var value = args[s++];
			wbean.setValue(value);
		}

		r.push(wbean);
	}

	return r;
}

/**
 * BeanFactory get depended apply arguments.
 *
 * @param  {Array} dependsOn
 * @return {Array} depended bean apply list
 * @api private
 */
BeanFactory.prototype.getDependsApplyArgs = function(dependsOn) {
	var r = [];

	if (!Utils.checkArray(dependsOn)) {
		return r;
	}

	for (var i = 0; i < dependsOn.length; i++) {
		var wbean = dependsOn[i];
		if (wbean.getDependType() === Constant.DEPEND_TYPE_BEAN) {
			r.push(wbean.getBean());
		} else if (wbean.getDependType() === Constant.DEPEND_TYPE_VALUE) {
			r.push(wbean.getValue());
		} else if (wbean.getDependType() === Constant.DEPEND_TYPE_VAR) {
			r.push(wbean.getValueOnce());
		} else {
			// DEPEND_TYPE_ERROR
			logger.error("getDependsApplyArgs depends args type error %j", wbean);
		}
	}

	return r;
}

/**
 * BeanFactory set parent bean.
 *
 * @param  {String} beanName
 * @return {Object} beanDefinition
 * @api public
 */
BeanFactory.prototype.setParentBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return null;
	}

	var parentName = beanDefinition.getParentName();
	var parentBeanDefintion = this.getBeanDefinition(parentName);

	var func = this.getBeanFunction(beanName);

	var parentFunc = this.getBeanFunction(parentName);

	if (parentFunc) {
		var proto = parentFunc.prototype;
		for (var key in proto) {
			if (!func.prototype[key]) {
				func.prototype[key] = proto[key];
			}
		}
	}

	if (parentBeanDefintion) {
		beanDefinition.setParentBean(parentBeanDefintion);
		beanDefinition.setArgsOn(parentBeanDefintion.getArgs());
		beanDefinition.setPropsOn(parentBeanDefintion.getProps());
		beanDefinition.setFactoryArgsOn(parentBeanDefintion.getFactoryArgs());
	}

	return beanDefinition;
}

/**
 * BeanFactory register beans through metaObjects into BeanFactory.
 *
 * @param  {Object} metaObjects
 * @api public
 */
BeanFactory.prototype.registerBeans = function(metaObjects) {
	for (var beanName in metaObjects) {
		this.registerBean(beanName, metaObjects[beanName]);
	}
}

/**
 * BeanFactory register bean through metaObject into BeanFactory.
 *
 * @param  {String} beanName
 * @param  {Object} metaObjects
 * @api public
 */
BeanFactory.prototype.registerBean = function(beanName, metaObject) {
	var func = metaObject.func;

	var validateResult = ValidatorUtil.metaValidator(metaObject);
	if (validateResult !== true) {
		logger.error("registryBean %j metaObject %j validate error %s", beanName, metaObject, validateResult.stack);
		return;
	}

	var mid = metaObject.mid;
	if (mid) {
		// register bearcat model
		this.registerModel(beanName, mid, metaObject);
	}

	var cid = metaObject.cid;
	if (cid) {
		// register bearcat constraint
		this.registerConstraint(beanName, cid, metaObject);
	}

	if (func && Utils.checkFunction(func) && !this.getBeanFunction(beanName)) {
		this.setBeanFunction(beanName, func);
	}

	var order = metaObject.order;
	var parentName = metaObject.parent;
	var initMethodName = metaObject.init;
	var destroyMethodName = metaObject.destroy;
	var factoryBeanName = metaObject.factoryBean;
	var factoryMethodName = metaObject.factoryMethod;
	var scope = metaObject.scope || Constant.SCOPE_DEFAULT;
	var args = metaObject.args || Constant.ARGS_DEFAULT;
	var props = metaObject.props || Constant.PROPS_DEFAULT;
	var factoryArgsOn = metaObject.factoryArgs || Constant.ARGS_DEFAULT;
	var asyncInit = metaObject.async || Constant.ASYNC_INIT_DEFAULT;
	var lazyInit = metaObject.lazy || Constant.LAZY_INIT_DEFAULT;
	var abstract = metaObject.abstract || Constant.ABSTRACT_DEFAULT;
	var proxy = metaObject.proxy;
	if (!Utils.isNotNull(proxy)) {
		proxy = Constant.PROXY_DEFAULT;
	}

	var aop = metaObject.aop;

	var beanDefinition = null;
	beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		beanDefinition = new BeanDefinition();
	}

	// model scope should be prototype
	if (mid) {
		scope = Constant.SCOPE_PROTOTYPE;
	}

	beanDefinition.setFunc(func);
	beanDefinition.setOrder(order);
	beanDefinition.setScope(scope);
	beanDefinition.setProxy(proxy);
	beanDefinition.setBeanName(beanName);
	beanDefinition.setLazyInit(lazyInit);
	beanDefinition.setAbstract(abstract);
	beanDefinition.setAsyncInit(asyncInit);
	beanDefinition.setParentName(parentName);
	beanDefinition.setInitMethodName(initMethodName);
	beanDefinition.setFactoryBeanName(factoryBeanName);
	beanDefinition.setFactoryMethodName(factoryMethodName);
	beanDefinition.setDestroyMethodName(destroyMethodName);
	beanDefinition.setArgsOn(BeanUtil.buildBeanWrapper(args));
	beanDefinition.setPropsOn(BeanUtil.buildBeanWrapper(props));
	beanDefinition.setFactoryArgsOn(BeanUtil.buildBeanWrapper(factoryArgsOn));

	if (aop && Utils.checkArray(aop)) {
		var aspect = AopUtil.buildAspect(aop, beanDefinition);
		this.aspects.push(aspect);
		beanDefinition.setAspect(true);
	}

	this.beanDefinitions[beanName] = beanDefinition;
}

/**
 * BeanFactory register model through metaObject into BeanFactory.
 *
 * @param  {String} beanName bean id
 * @param  {String} modelId  model id
 * @param  {Object} metaObject
 * @api public
 */
BeanFactory.prototype.registerModel = function(beanName, modelId, metaObject) {
	var modelDefinition = null;
	modelDefinition = this.getModelDefinition(modelId);
	if (!modelDefinition) {
		modelDefinition = new ModelDefinition();
	}

	var table = metaObject.table;
	var prefix = metaObject.prefix;
	var attributes = metaObject.attributes;

	var resolvedAttributes = ModelUtil.buildModelAttribute(attributes, this);

	modelDefinition.setId(beanName);
	modelDefinition.setMid(modelId);
	modelDefinition.setTable(table);
	modelDefinition.setPrefix(prefix);
	modelDefinition.setFields(resolvedAttributes['fields']);
	modelDefinition.setBalance(resolvedAttributes['balance']);
	modelDefinition.setRefFields(resolvedAttributes['refFields']);
	modelDefinition.setOneToMany(resolvedAttributes['oneToMany']);

	if (Utils.isNotNull(table)) {
		this.setTableModelMap(table, modelDefinition);
	}

	this.modelMap[modelId] = modelDefinition;
}

/**
 * BeanFactory register constraint through metaObject into BeanFactory.
 *
 * @param  {String} beanName bean id
 * @param  {String} cid      constraint id
 * @param  {Object} metaObject
 * @api public
 */
BeanFactory.prototype.registerConstraint = function(beanName, cid, metaObject) {
	var constraintDefinition = null;
	constraintDefinition = this.getConstraintDefinition(cid);
	if (!constraintDefinition) {
		constraintDefinition = new ModelConstraint();
	}

	var message = metaObject.message;
	var constraint = metaObject.constraint;

	constraintDefinition.setId(beanName);
	constraintDefinition.setCid(cid);
	constraintDefinition.setConstraint(constraint);

	this.constraints[cid] = constraintDefinition;
}

/**
 * BeanFactory instantiating singletion beans in advance.
 *
 * @param  {Function} cb callback function
 * @api public
 */
BeanFactory.prototype.preInstantiateSingletons = function(cb) {
	var beanDefinitionOrderList = BeanUtil.sortBeanDefinitions(this.beanDefinitions, this);
	var self = this;

	var index = 0;
	var next = function(err) {
		if (err || index >= beanDefinitionOrderList.length) {
			return cb(err);
		}

		var beanDefinition = beanDefinitionOrderList[index++];
		var beanName = beanDefinition.getBeanName();

		if (beanDefinition.isAsyncInit()) {
			if (!self.singletonBeanFactory.containsSingleton(beanName)) {
				var initCb = function() {
					next();
				}
				self.setInitCb(beanName, initCb);
				self.getBean(beanName);
			} else {
				self.getBean(beanName);
				next()
			}
		} else {
			var initCb = function() {}
			self.setInitCb(beanName, initCb);
			self.getBean(beanName);
			next();
		}
	}

	next();
}

/**
 * BeanFactory add beanPostProcessor to BeanFactory.
 * @param  {Object} beanPostProcessor
 * @api public
 */
BeanFactory.prototype.addBeanPostProcessor = function(beanPostProcessor) {
	this.beanPostProcessors.push(beanPostProcessor);
}

/**
 * BeanFactory get beanPostProcessors.
 * @return {Object} beanPostProcessors
 * @api public
 */
BeanFactory.prototype.getBeanPostProcessors = function() {
	return this.beanPostProcessors;
}

/**
 * BeanFactory apply beanPostBeforeProcessors.
 * @param  {Object} beanObject
 * @param  {String} beanName
 * @return {Object} beanObject
 * @api private
 */
BeanFactory.prototype.applyBeanPostProcessorsBeforeInitialization = function(beanObject, beanName) {
	var result = beanObject;

	var beanPostProcessors = this.getBeanPostProcessors();
	for (var i = 0; i < beanPostProcessors.length; i++) {
		var beanProcessor = beanPostProcessors[i];
		result = beanProcessor.before(result, beanName);
		if (!result) {
			return result;
		}
	}

	return result;
}

/**
 * BeanFactory apply beanPostAfterProcessors.
 * @param  {Object} beanObject
 * @param  {String} beanName
 * @return {Object} beanObject
 * @api private
 */
BeanFactory.prototype.applyBeanPostProcessorsAfterInitialization = function(beanObject, beanName) {
	var result = beanObject;

	var beanPostProcessors = this.getBeanPostProcessors();
	for (var i = 0; i < beanPostProcessors.length; i++) {
		var beanProcessor = beanPostProcessors[i];
		result = beanProcessor.after(result, beanName);
		if (!result) {
			return result;
		}
	}

	return result;
}

/**
 * BeanFactory destroy singletons.
 *
 * @api public
 */
BeanFactory.prototype.destroySingletons = function() {
	var singletonNames = this.singletonBeanFactory.getSingletonNames();

	for (var i = 0; i < singletonNames.length; i++) {
		this.destroySingleton(singletonNames[i]);
	}
}

/**
 * BeanFactory destroy BeanFactory.
 *
 * @api public
 */
BeanFactory.prototype.destroyBeanFactory = function() {
	this.initCbMap = null;
	this.beanCurMap = null;
	this.beanFunctions = null;
	this.beanDefinitions = null;
	this.singletonBeanFactory = null;
}

/**
 * BeanFactory destroy singleton.
 *
 * @param  {String} beanName
 * @api public
 */
BeanFactory.prototype.destroySingleton = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return;
	}

	var beanObject = this.getBean(beanName);

	this.destroyBean(beanName, beanObject);

	this.singletonBeanFactory.removeSingleton(beanName);
}

/**
 * BeanFactory destroy bean.
 *
 * @param  {String} beanName
 * @param  {Object} beanObject
 * @api public
 */
BeanFactory.prototype.destroyBean = function(beanName, beanObject) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return;
	}

	var destroyMethodName = beanDefinition.getDestroyMethodName();

	var destroyMethod = beanObject[destroyMethodName];
	if (Utils.checkFunction(destroyMethod)) {
		destroyMethod.call(beanObject);
	}

	this.removeFunction(beanName);
	this.removeBeanDefinition(beanName);
}

/**
 * BeanFactory check bean is a singleton or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
BeanFactory.prototype.isSingleton = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (beanDefinition) {
		return beanDefinition.isSingleton();
	} else {
		return false;
	}
}

/**
 * BeanFactory check bean is a prototype or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
BeanFactory.prototype.isPrototype = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (beanDefinition) {
		return beanDefinition.isPrototype();
	} else {
		return false;
	}
}

/**
 * BeanFactory check BeanFactory contains bean or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
BeanFactory.prototype.containsBean = function(beanName) {
	return !!this.getBeanFunction(beanName) && !!this.getBeanDefinition(beanName);
}

/**
 * BeanFactory get bean contructor function.
 *
 * @param  {String} beanName
 * @return {Function} bean constructor function
 * @api public
 */
BeanFactory.prototype.getBeanFunction = function(beanName) {
	return this.beanFunctions[beanName];
}

/**
 * BeanFactory set bean contructor function.
 *
 * @param  {String}   beanName
 * @param  {Function} func bean constructor function
 * @api public
 */
BeanFactory.prototype.setBeanFunction = function(beanName, func) {
	this.beanFunctions[beanName] = func;
}

/**
 * BeanFactory remove bean contructor function from BeanFactory.
 *
 * @param  {String} beanName
 * @api public
 */
BeanFactory.prototype.removeFunction = function(beanName) {
	delete this.beanFunctions[beanName];
}

/**
 * BeanFactory get init method.
 *
 * @param  {String}   beanName
 * @return {Function} bean init method
 * @api public
 */
BeanFactory.prototype.getInitCb = function(beanName) {
	if (!this.initCbMap[beanName]) {
		this.initCbMap[beanName] = Constant.INIT_CB_DEFAULT;
	}

	return this.initCbMap[beanName];
}

/**
 * BeanFactory set init method.
 *
 * @param  {String}   beanName
 * @param  {Function} initCb bean init method
 * @api public
 */
BeanFactory.prototype.setInitCb = function(beanName, initCb) {
	this.initCbMap[beanName] = initCb;
}

/**
 * BeanFactory get beanDefinition.
 *
 * @param  {String} beanName
 * @return {Object} beanDefinition
 * @api public
 */
BeanFactory.prototype.getBeanDefinition = function(beanName) {
	return this.beanDefinitions[beanName];
}

/**
 * BeanFactory get beanDefinitions.
 *
 * @return {Object} beanDefinitions
 * @api public
 */
BeanFactory.prototype.getBeanDefinitions = function() {
	return this.beanDefinitions;
}

/**
 * BeanFactory remove beanDefinition from BeanFactory.
 *
 * @param  {String} beanName
 * @api public
 */
BeanFactory.prototype.removeBeanDefinition = function(beanName) {
	delete this.beanDefinitions[beanName];
}

/**
 * BeanFactory check BeanFactory contains beanName beanDefinition or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
BeanFactory.prototype.containsBeanDefinition = function(beanName) {
	return !!this.getBeanDefinition(beanName);
}

/**
 * BeanFactory get aspects.
 *
 * @return {Array} aspects
 * @api public
 */
BeanFactory.prototype.getAspects = function() {
	return this.aspects;
}

/**
 * BeanFactory get modelDefinition.
 *
 * @param  {String} modelId
 * @return {Object} modelDefinition
 * @api public
 */
BeanFactory.prototype.getModelDefinition = function(modelId) {
	return this.modelMap[modelId];
}

/**
 * BeanFactory get modelDefinitions.
 *
 * @return {Object} modelDefinition map
 * @api public
 */
BeanFactory.prototype.getModelDefinitions = function() {
	return this.modelMap;
}

/**
 * BeanFactory get getConstraintDefinition.
 *
 * @param  {String} cid
 * @return {Object} getConstraintDefinition
 * @api public
 */
BeanFactory.prototype.getConstraintDefinition = function(cid) {
	return this.constraints[cid];
}

/**
 * BeanFactory set table model map.
 *
 * @param  {String} table name
 * @param  {Object} modelDefinition
 * @api public
 */
BeanFactory.prototype.setTableModelMap = function(table, modelDefinition) {
	this.tableModelMap[table] = modelDefinition;
}

/**
 * BeanFactory get modelDefinition by table.
 *
 * @param   {String} table name
 * @return  {Object} modelDefinition
 * @api public
 */
BeanFactory.prototype.getModelDefinitionByTable = function(table) {
	return this.tableModelMap[table];
}

module.exports = BeanFactory;
},{"../aop/aspect":3,"../aop/framework/dynamicMetaProxy":7,"../model/modelConstraint":24,"../model/modelDefinition":25,"../model/modelFilter":26,"../model/modelProxy":28,"../util/aopUtil":35,"../util/beanUtil":36,"../util/constant":37,"../util/modelUtil":40,"../util/utils":44,"../util/validatorUtil":45,"./singletonBeanFactory":13,"./support/beanDefinition":14,"pomelo-logger":57}],12:[function(require,module,exports){
var logger = require('pomelo-logger').getLogger('bearcat', 'ModuleFactory');

var ModuleFactory = function() {
	this.factoryMap = {};
	this.moduleMap = {};
}

ModuleFactory.prototype.define = function(id, factory) {
	if (this.factoryMap[id]) {
		logger.warn('module %s has been registered ...', id);
		return;
	}

	this.factoryMap[id] = factory;
}

ModuleFactory.prototype.require = function(id) {
	if (!this.moduleMap[id]) {
		var exports = {};
		var factory = this.factoryMap[id];

		if (!factory) {
			logger.warn('require file %s not exists ...', id);
			return;
		}

		var module = {
			exports: {}
		}

		factory(module.exports, module);
		this.moduleMap[id] = module.exports;
	}

	return this.moduleMap[id];
}

module.exports = ModuleFactory;
},{"pomelo-logger":57}],13:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat SingletonBeanFactory
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'SingletonBeanFactory');

/**
 * SingletonBeanFactory constructor function.
 *
 * @api public
 */
var SingletonBeanFactory = function(beanFactory) {
	this.beanFactory = beanFactory;
	this.singletonObjects = {};
}

/**
 * SingletonBeanFactory add singleton to SingletonBeanFactory.
 *
 * @param  {String} beanName
 * @param  {Object} beanObject
 * @api public
 */
SingletonBeanFactory.prototype.addSingleton = function(beanName, beanObject) {
	this.singletonObjects[beanName] = beanObject;
}

/**
 * SingletonBeanFactory check SingletonBeanFactory contains singleton or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
SingletonBeanFactory.prototype.containsSingleton = function(beanName) {
	return !!this.singletonObjects[beanName];
}

/**
 * SingletonBeanFactory get singleton from SingletonBeanFactory.
 *
 * @param  {String} beanName
 * @return {Object} singletonObject
 * @api public
 */
SingletonBeanFactory.prototype.getSingleton = function(beanName) {
	var beanFactory = this.beanFactory;

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
 * SingletonBeanFactory get all singleton names from SingletonBeanFactory.
 *
 * @api public
 */
SingletonBeanFactory.prototype.getSingletonNames = function() {
	var r = [];
	for (var name in this.singletonObjects) {
		r.push(name);
	}

	return r;
}

/**
 * SingletonBeanFactory remove singleton from SingletonBeanFactory.
 *
 * @param  {String} beanName
 * @api public
 */
SingletonBeanFactory.prototype.removeSingleton = function(beanName) {
	delete this.singletonObjects[beanName];
}

module.exports = SingletonBeanFactory;
},{"pomelo-logger":57}],14:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanDefinition
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Constant = require('../../util/constant');
var BeanUtils = require('../../util/beanUtil');
var Utils = require('../../util/utils');

/**
 * BeanDefinition constructor function.
 *
 * @api public
 */
var BeanDefinition = function() {
	this.argsOn = [];
	this.propsOn = [];
	this.func = null;
	this.order = null;
	this.proxy = true;
	this.aspect = false;
	this.abstract = false;
	this.lazyInit = false;
	this.asyncInit = false;
	this.parentName = null;
	this.parentBean = null;
	this.beanName = null;
	this.factoryArgsOn = {};
	this.factoryBeanName = null;
	this.factoryMethodName = null;
	this.initMethodName = null;
	this.destroyMethodName = null;
	this.scope = Constant.SCOPE_DEFAULT;
}

/**
 * BeanDefinition get parentName.
 *
 * @return  {String} parentName
 * @api public
 */
BeanDefinition.prototype.getParentName = function() {
	return this.parentName;
}

/**
 * BeanDefinition set parentName.
 *
 * @param  {String} parentName
 * @api public
 */
BeanDefinition.prototype.setParentName = function(parentName) {
	if (!parentName) {
		return;
	}
	this.parentName = parentName;
}

/**
 * BeanDefinition check whether has parent bean.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.hasParentBean = function() {
	return this.getParentName() && !this.getParentBean();
}

/**
 * BeanDefinition get parent bean.
 *
 * @return  {Object} parent bean
 * @api public
 */
BeanDefinition.prototype.getParentBean = function() {
	return this.parentBean;
}

/**
 * BeanDefinition set parent bean.
 *
 * @param  {Object} parentBean parent bean
 * @api public
 */
BeanDefinition.prototype.setParentBean = function(parentBean) {
	if (!parentBean) {
		return;
	}
	this.parentBean = parentBean;
}

/**
 * BeanDefinition get beanName.
 *
 * @return  {String} beanName
 * @api public
 */
BeanDefinition.prototype.getBeanName = function() {
	return this.beanName;
}

/**
 * BeanDefinition set beanName.
 *
 * @param  {String} beanName
 * @api public
 */
BeanDefinition.prototype.setBeanName = function(beanName) {
	if (!beanName) {
		return;
	}
	return this.beanName = beanName;
}

/**
 * BeanDefinition get factoryBeanName.
 *
 * @return  {String} factoryBeanName
 * @api public
 */
BeanDefinition.prototype.getFactoryBeanName = function() {
	if (this.factoryBeanName) {
		return this.factoryBeanName;
	} else {
		if (this.parentBean) {
			return this.parentBean.factoryBeanName;
		}
	}
}

/**
 * BeanDefinition set factoryBeanName.
 *
 * @param  {String} factoryBeanName
 * @api public
 */
BeanDefinition.prototype.setFactoryBeanName = function(factoryBeanName) {
	if (!factoryBeanName) {
		return;
	}
	this.factoryBeanName = factoryBeanName;
}

/**
 * BeanDefinition get factoryMethodName.
 *
 * @return  {String} factoryMethodName
 * @api public
 */
BeanDefinition.prototype.getFactoryMethodName = function() {
	if (this.factoryMethodName) {
		return this.factoryMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.factoryMethodName;
		}
	}
}

/**
 * BeanDefinition set factoryMethodName.
 *
 * @param  {String} factoryMethodName
 * @api public
 */
BeanDefinition.prototype.setFactoryMethodName = function(factoryMethodName) {
	if (!factoryMethodName) {
		return;
	}
	this.factoryMethodName = factoryMethodName;
}

/**
 * BeanDefinition get bean scope: singleton(default), prototype.
 *
 * @return  {String} scope
 * @api public
 */
BeanDefinition.prototype.getScope = function() {
	return this.scope;
}

/**
 * BeanDefinition set bean scope: singleton(default), prototype.
 *
 * @param  {String} scope
 * @api public
 */
BeanDefinition.prototype.setScope = function(scope) {
	if (!scope) {
		return;
	}
	this.scope = scope;
}

/**
 * BeanDefinition check whether is abstract.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isAbstract = function() {
	return this.abstract;
}

/**
 * BeanDefinition set abstract.
 *
 * @param  {Boolean} lazyInit true|false
 * @api public
 */
BeanDefinition.prototype.setAbstract = function(abstract) {
	if (Utils.isNotNull(abstract)) {
		this.abstract = abstract;
	}
}

/**
 * BeanDefinition check whether is lazyInit.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isLazyInit = function() {
	if (this.lazyInit) {
		return this.lazyInit;
	} else {
		if (this.parentBean) {
			return this.parentBean.lazyInit;
		}
	}
}

/**
 * BeanDefinition  set lazyInit.
 *
 * @param  {Boolean} lazyInit true|false
 * @api public
 */
BeanDefinition.prototype.setLazyInit = function(lazyInit) {
	if (Utils.isNotNull(lazyInit)) {
		this.lazyInit = lazyInit;
	}
}

/**
 * BeanDefinition check whether need to be proxied or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.needProxy = function() {
	return this.proxy;
}

/**
 * BeanDefinition set bean need proxy or not.
 *
 * @param  {Boolean} proxy true|false
 * @api public
 */
BeanDefinition.prototype.setProxy = function(proxy) {
	if (Utils.isNotNull(proxy)) {
		this.proxy = proxy;
	}
}

/**
 * BeanDefinition check whether is asyncInit.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isAsyncInit = function() {
	if (this.asyncInit) {
		return this.asyncInit;
	} else {
		if (this.parentBean) {
			return this.parentBean.asyncInit;
		}
	}
}

/**
 * BeanDefinition set bean asyncInit or not.
 *
 * @param  {Boolean} asyncInit true|false
 * @api public
 */
BeanDefinition.prototype.setAsyncInit = function(asyncInit) {
	if (Utils.isNotNull(asyncInit)) {
		this.asyncInit = asyncInit;
	}
}

/**
 * BeanDefinition set bean an aspect or not.
 *
 * @param  {Boolean} aspect true|false
 * @api public
 */
BeanDefinition.prototype.setAspect = function(aspect) {
	if (Utils.isNotNull(aspect)) {
		this.aspect = aspect;
	}
}

/**
 * BeanDefinition check whether is a aspect.
 * an aspect do not need to be proxied
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isAspect = function() {
	if (this.aspect) {
		return this.aspect;
	} else {
		if (this.parentBean) {
			return this.parentBean.aspect;
		}
	}
}

/**
 * BeanDefinition get bean props settings.
 *
 * @return  {Array} props settings
 * @api public
 */
BeanDefinition.prototype.getProps = function() {
	return this.propsOn;
}

/**
 * BeanDefinition get bean props settings.
 *
 * @return  {Array} props settings
 * @api public
 */
BeanDefinition.prototype.getPropsOn = function() {
	return this.propsOn;
}

/**
 * BeanDefinition set bean props settings.
 *
 * @param  {Array} propsOn props settings
 * @api public
 */
BeanDefinition.prototype.setPropsOn = function(propsOn) {
	if (!propsOn || !Utils.checkArray(propsOn) || !propsOn.length) {
		return;
	}
	this.updateSettingsOn(this, Constant.SETTINGS_PROPS_ON, propsOn);
}

/**
 * BeanDefinition get bean args settings.
 *
 * @return  {Array} args settings
 * @api public
 */
BeanDefinition.prototype.getArgs = function() {
	return this.argsOn;
}

/**
 * BeanDefinition get bean args settings.
 *
 * @return  {Array} args settings
 * @api public
 */
BeanDefinition.prototype.getArgsOn = function() {
	return this.argsOn;
}

/**
 * BeanDefinition set bean args settings.
 *
 * @param  {Array} argsOn args settings
 * @api public
 */
BeanDefinition.prototype.setArgsOn = function(argsOn) {
	if (!argsOn || !Utils.checkArray(argsOn) || !argsOn.length) {
		return;
	}
	this.updateSettingsOn(this, Constant.SETTINGS_ARGS_ON, argsOn);
}

/**
 * BeanDefinition get bean factory args settings.
 *
 * @return  {Array} factory args settings
 * @api public
 */
BeanDefinition.prototype.getFactoryArgs = function() {
	return this.factoryArgsOn;
}

/**
 * BeanDefinition get bean factory args settings.
 *
 * @return  {Array} factory args settings
 * @api public
 */
BeanDefinition.prototype.getFactoryArgsOn = function() {
	return this.factoryArgsOn;
}

/**
 * BeanDefinition set factory args settings.
 *
 * @param  {Array} factoryArgsOn factory args settings
 * @api public
 */
BeanDefinition.prototype.setFactoryArgsOn = function(factoryArgsOn) {
	if (!factoryArgsOn || !Utils.checkArray(factoryArgsOn) || !factoryArgsOn.length) {
		return;
	}
	this.updateSettingsOn(this, Constant.SETTINGS_FACTORY_ARGS_ON, factoryArgsOn);
}

/**
 * BeanDefinition get bean init method name.
 *
 * @return  {String} bean init method name
 * @api public
 */
BeanDefinition.prototype.getInitMethodName = function() {
	if (this.initMethodName) {
		return this.initMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.initMethodName;
		}
	}
}

/**
 * BeanDefinition set bean init method name.
 *
 * @param  {String} initMethodName bean init method name
 * @api public
 */
BeanDefinition.prototype.setInitMethodName = function(initMethodName) {
	if (!initMethodName) {
		return;
	}
	this.initMethodName = initMethodName;
}

/**
 * BeanDefinition get bean destroy method name.
 *
 * @return  {String} bean destroy method name
 * @api public
 */
BeanDefinition.prototype.getDestroyMethodName = function() {
	if (this.destroyMethodName) {
		return this.destroyMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.destroyMethodName;
		}
	}
}

/**
 * BeanDefinition set bean destroy method name.
 *
 * @param  {String} destroyMethodName bean destroy method name
 * @api public
 */
BeanDefinition.prototype.setDestroyMethodName = function(destroyMethodName) {
	if (!destroyMethodName) {
		return;
	}
	this.destroyMethodName = destroyMethodName;
}

/**
 * BeanDefinition get bean constructor function.
 *
 * @return  {Function} bean constructor function
 * @api public
 */
BeanDefinition.prototype.getFunc = function() {
	return this.func;
}

/**
 * BeanDefinition set bean constructor function.
 *
 * @param  {Function} func bean constructor function
 * @api public
 */
BeanDefinition.prototype.setFunc = function(func) {
	if (!this.func) {
		this.func = func;
	}
}

/**
 * BeanDefinition get bean order.
 *
 * @return  {Number} bean order
 * @api public
 */
BeanDefinition.prototype.getOrder = function() {
	if (this.order || this.order == 0) {
		return this.order;
	} else {
		if (this.parentBean) {
			return this.parentBean.order;
		}
	}
}

/**
 * BeanDefinition set bean order.
 *
 * @param  {Number} order bean order
 * @api public
 */
BeanDefinition.prototype.setOrder = function(order) {
	if (Utils.isNotNull(order)) {
		this.order = order;
	}
}

/**
 * BeanDefinition check bean whether is singleton or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isSingleton = function() {
	return this.scope === Constant.SCOPE_SINGLETON;
}

/**
 * BeanDefinition check bean whether is prototype or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isPrototype = function() {
	return this.scope === Constant.SCOPE_PROTOTYPE;
}

/**
 * BeanDefinition check bean whether has factoryBean or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.hasFactoryBean = function() {
	return Utils.isNotNull(this.factoryBeanName) && Utils.isNotNull(this.factoryMethodName);
}

/**
 * BeanDefinition check bean whether has initMethod or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.hasInitMethod = function() {
	return Utils.isNotNull(this.initMethodName);
}

/**
 * BeanDefinition check bean whether has parent or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.hasParent = function() {
	return Utils.isNotNull(this.parentName);
}

/**
 * BeanDefinition update settings.
 *
 * @param  {Object} beanDefinition
 * @param  {String} key key: propsOn, argsOn, factoryArgsOn
 * @param  {Array}  settingsOn settings
 * @api private
 */
BeanDefinition.prototype.updateSettingsOn = function(BeanDefinition, key, settingsOn) {
	var settings = BeanDefinition[key];

	var settingsMap = BeanUtils.getBeanSettingsMap(settings);
	var settingsOnMap = BeanUtils.getBeanSettingsMap(settingsOn);

	for (var name in settingsOnMap) {
		if (!settingsMap[name]) {
			settingsMap[name] = settingsOnMap[name];
		}
	}

	BeanDefinition[key] = BeanUtils.getBeanSettingsArray(settingsMap);
}

module.exports = BeanDefinition;
},{"../../util/beanUtil":36,"../../util/constant":37,"../../util/utils":44}],15:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanDefinitionVisitor
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */
var logger = require('pomelo-logger').getLogger('bearcat', 'BeanDefinitionVisitor');
var Constant = require('../../util/constant');
var Utils = require('../../util/utils');

/**
 * BeanDefinitionVisitor constructor function.
 *
 * @api public
 */
var BeanDefinitionVisitor = function(valueResolver) {
	this.valueResolver = valueResolver;
}

/**
 * BeanDefinitionVisitor set valueResolver.
 *
 * @param  {Object} valueResolver
 * @api public
 */
BeanDefinitionVisitor.prototype.setValueResolver = function(valueResolver) {
	this.valueResolver = valueResolver;
}

/**
 * BeanDefinitionVisitor get valueResolver.
 *
 * @return  {Object} valueResolver
 * @api public
 */
BeanDefinitionVisitor.prototype.getValueResolver = function() {
	return this.valueResolver;
}

/**
 * BeanDefinitionVisitor resolve string value.
 *
 * @param  {String} strVal string value
 * @api public
 */
BeanDefinitionVisitor.prototype.resolveStringValue = function(strVal) {
	if (!this.valueResolver) {
		logger.error('No StringValueResolver specified');
		return;
	}

	var resolvedValue = this.getValueResolver().resolveStringValue(strVal);

	return resolvedValue;
}

/**
 * BeanDefinitionVisitor visit beanDefinition.
 *
 * @param  {Object} beanDefinition
 * @api public
 */
BeanDefinitionVisitor.prototype.visitBeanDefinition = function(beanDefinition) {
	this.visitParentName(beanDefinition);
	this.visitPropertyValues(beanDefinition);
	this.visitArgumentsValues(beanDefinition);
}

/**
 * BeanDefinitionVisitor visit parentName in beanDefinition.
 *
 * @param  {Object} beanDefinition
 * @api private
 */
BeanDefinitionVisitor.prototype.visitParentName = function(beanDefinition) {
	var parentName = beanDefinition.getParentName();

	if (Utils.isNotNull(parentName)) {
		var resolvedName = this.resolveStringValue(parentName);
		if (parentName !== resolvedName && Utils.isNotNull(resolvedName)) {
			beanDefinition.setParentName(resolvedName);
		}
	}
}

/**
 * BeanDefinitionVisitor visit properties values in beanDefinition.
 *
 * @param  {Object} beanDefinition
 * @api private
 */
BeanDefinitionVisitor.prototype.visitPropertyValues = function(beanDefinition) {
	var props = beanDefinition.getProps();
	for (var i = 0; i < props.length; i++) {
		var wbean = props[i];
		if (wbean.getDependType() === Constant.DEPEND_TYPE_VALUE) {
			var value = wbean.getValue();
			var resolvedValue = this.resolveStringValue(value);
			if (value !== resolvedValue && Utils.isNotNull(resolvedValue)) {
				wbean.setValue(resolvedValue);
			}
		}
	}
}

/**
 * BeanDefinitionVisitor visit argument values in beanDefinition.
 *
 * @param  {Object} beanDefinition
 * @api private
 */
BeanDefinitionVisitor.prototype.visitArgumentsValues = function(beanDefinition) {
	var args = beanDefinition.getArgs();
	for (var i = 0; i < args.length; i++) {
		var wbean = args[i];
		if (wbean.getDependType() === Constant.DEPEND_TYPE_VALUE) {
			var value = wbean.getValue();
			var resolvedValue = this.resolveStringValue(value);
			if (value !== resolvedValue && Utils.isNotNull(resolvedValue)) {
				wbean.setValue(resolvedValue);
			}
		}
	}
}

module.exports = BeanDefinitionVisitor;
},{"../../util/constant":37,"../../util/utils":44,"pomelo-logger":57}],16:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanModule
 * modified from seajs module.js
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>, http://seajs.org
 * MIT Licensed
 */

var RequestUtil = require('../../util/requestUtil');
var Utils = require('../../util/utils');

var anonymousMeta;

var fetchingList = {};
var fetchedList = {};
var callbackList = {};

var STATUS = {
	// 0 - init
	INIT: 0,
	// 1 - The `module.uri` is being fetched
	FETCHING: 1,
	// 2 - The meta data has been saved to cachedMods
	SAVED: 2,
	// 3 - The `module.dependencies` are being loaded
	LOADING: 3,
	// 4 - The module are ready to execute
	LOADED: 4,
	// 5 - 404
	ERROR: 5
}

/**
 * BeanModule constructor function.
 *
 * @param  {String}  uri
 * @param  {Array}   dependencies
 * @param  {Object}  loader reference
 * @api public
 */
var BeanModule = function(uri, deps, loader) {
	this.uri = uri;
	this.dependencies = deps || [];
	this.deps = {};
	this.remain = 0;
	this.entries = [];
	this.history = {};
	this.loader = loader;
	this.callback = null;
	this.status = STATUS.INIT;
}

/**
 * BeanModule resolve dependencies uri.
 *
 * @api private
 */
BeanModule.prototype.resolve = function() {
	var mod = this
	var ids = mod.dependencies
	var uris = []

	var loader = this.getLoader();
	var len = ids.length;
	for (var i = 0; i < len; i++) {
		uris[i] = loader.resolve(ids[i], mod.uri);
	}

	return uris
}

/**
 * BeanModule pass entry node into dependencies.
 *
 * @api private
 */
BeanModule.prototype.pass = function() {
	var mod = this

	var len = mod.dependencies.length

	// mod.entries changes dynamiclly
	for (var i = 0; i < mod.entries.length; i++) {
		var entry = mod.entries[i];

		var count = 0
		for (var j = 0; j < len; j++) {
			var m = mod.deps[mod.dependencies[j]]
				// If the module is unload and unused in the entry, pass entry to it
			if (m.status < STATUS.LOADED && !entry.history.hasOwnProperty(m.uri)) {
				entry.history[m.uri] = true
				count++
				m.entries.push(entry)
				if (m.status === STATUS.LOADING) {
					m.pass()
				}
			}
		}
		// If has passed the entry to it's dependencies, modify the entry's count and del it in the module
		if (count > 0) {
			entry.remain += count - 1
			mod.entries.shift()
			i--
		}
	}
}

/**
 * BeanModule load script files.
 *
 * @api private
 */
BeanModule.prototype.load = function() {
	var mod = this;

	if (this.status >= STATUS.LOADING) {
		return;
	}

	var loader = this.getLoader();
	mod.status = STATUS.LOADING;

	var uris = mod.resolve();

	for (var i = 0, len = uris.length; i < len; i++) {
		mod.deps[mod.dependencies[i]] = loader.get(uris[i])
	}

	// Pass entry to it's dependencies
	mod.pass();

	// If module has entries not be passed, call onload
	if (mod.entries.length) {
		mod.onload()
		return
	}

	// Begin parallel loading
	var requestCache = {};
	var m;

	for (i = 0; i < len; i++) {
		m = loader.get(uris[i]);

		if (m.status < STATUS.FETCHING) {
			m.fetch(requestCache)
		} else if (m.status === STATUS.SAVED) {
			m.load()
		}
	}

	// Send all requests at last to avoid cache bug in IE6-9. Issues#808
	for (var requestUri in requestCache) {
		if (requestCache.hasOwnProperty(requestUri)) {
			requestCache[requestUri]()
		}
	}
}

/**
 * BeanModule onload script file event callback.
 *
 * @api private
 */
BeanModule.prototype.onload = function() {
	var mod = this
	mod.status = STATUS.LOADED

	// When sometimes cached in IE, exec will occur before onload, make sure len is an number
	var len = (mod.entries || []).length;
	for (var i = 0; i < len; i++) {
		var entry = mod.entries[i]
		if (--entry.remain === 0) {
			entry.callback()
		}
	}

	delete mod.entries
}

/**
 * BeanModule error callback.
 *
 * @api private
 */
BeanModule.prototype.error = function() {
	var mod = this
	mod.onload()
	mod.status = STATUS.ERROR
}

/**
 * BeanModule fetch script files using async <script> or from webworker.
 *
 * @param  {Object}  request cache
 * @api private
 */
BeanModule.prototype.fetch = function(requestCache) {
	var mod = this
	var uri = mod.uri
	console.log('do fetch ' + uri);

	var loader = this.getLoader();
	mod.status = STATUS.FETCHING

	// Emit `fetch` event for plugins such as combo plugin
	var emitData = {
		uri: uri
	}

	var requestUri = emitData.requestUri || uri

	// Empty uri or have been fetched
	if (!requestUri || fetchedList.hasOwnProperty(requestUri)) {
		mod.load()
		return
	}

	if (fetchingList.hasOwnProperty(requestUri)) {
		callbackList[requestUri].push(mod)
		return
	}

	fetchingList[requestUri] = true
	callbackList[requestUri] = [mod]

	// Emit `request` event for plugins such as text plugin
	emitData = {
		uri: uri,
		requestUri: requestUri,
		onRequest: onRequest,
		// charset: Utils.checkFunction(data.charset) ? data.charset(requestUri) || 'utf-8' : data.charset,
		// crossorigin: Utils.checkFunction(data.crossorigin) ? data.crossorigin(requestUri) : data.crossorigin
		charset: 'utf-8',
		crossorigin: false
	}

	if (!emitData.requested) {
		requestCache ?
			requestCache[emitData.requestUri] = sendRequest :
			sendRequest()
	}

	function sendRequest() {
		RequestUtil.request(emitData.requestUri, emitData.onRequest, emitData.charset, emitData.crossorigin)
	}

	function onRequest(error) {
		delete fetchingList[requestUri]
		fetchedList[requestUri] = true

		// Save meta data of anonymous module
		if (anonymousMeta) {
			loader.save(uri, anonymousMeta)
			anonymousMeta = null
		}

		// Call callbacks
		var m, mods = callbackList[requestUri]
		delete callbackList[requestUri]
		while ((m = mods.shift())) {
			// When 404 occurs, the params error will be true
			if (error === true) {
				m.error()
			} else {
				m.load()
			}
		}
	}
}

/**
 * BeanModule add entry.
 *
 * @param  {Object}  entry node
 * @api public
 */
BeanModule.prototype.addEntry = function(entry) {
	this.entries.push(entry);
}

/**
 * BeanModule set remain number to be loaded.
 *
 * @param  {Number}  remain number
 * @api public
 */
BeanModule.prototype.setRemain = function(remain) {
	this.remain = remain;
}

/**
 * BeanModule set loader.
 *
 * @param  {Object}  loader reference
 * @api public
 */
BeanModule.prototype.setLoader = function(loader) {
	this.loader = loader;
}

/**
 * BeanModule get loader.
 *
 * @return  {Object}  loader reference
 * @api public
 */
BeanModule.prototype.getLoader = function() {
	return this.loader;
}

BeanModule.STATUS = STATUS;
BeanModule.anonymousMeta = anonymousMeta;

module.exports = BeanModule;
},{"../../util/requestUtil":41,"../../util/utils":44}],17:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanWrapper
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'BeanWrapper');

var Constant = require('../../util/constant');
var Utils = require('../../util/utils');

/**
 * BeanWrapper constructor function.
 *
 * @api public
 */
var BeanWrapper = function() {
	this.name = null;
	this.type = null;
	this.value = null;
	this.ref = null;
	this.role = null; // DEPENDS_ARGS, DEPENDS_PROPS
	this.bean = null; // bean dependency inject instance
}

/**
 * BeanWrapper get depend type.
 *
 * @return  {String} depend type
 * @api public
 */
BeanWrapper.prototype.getDependType = function() {
	return this.role;
}

/**
 * BeanWrapper get name.
 *
 * @return  {String} name
 * @api public
 */
BeanWrapper.prototype.getName = function() {
	return this.name;
}

/**
 * BeanWrapper set name.
 *
 * @param  {String} name
 * @api public
 */
BeanWrapper.prototype.setName = function(name) {
	this.name = name;
}

/**
 * BeanWrapper get type.
 *
 * @return  {String} type
 * @api public
 */
BeanWrapper.prototype.getType = function() {
	return this.type;
}

/**
 * BeanWrapper set type.
 *
 * @param  {String} type
 * @api public
 */
BeanWrapper.prototype.setType = function(type) {
	this.type = type;
}

/**
 * BeanWrapper get value.
 *
 * @return  {String} value
 * @api public
 */
BeanWrapper.prototype.getValue = function() {
	return this.value;
}

/**
 * BeanWrapper set value.
 *
 * @param  {String} value
 * @api public
 */
BeanWrapper.prototype.setValue = function(value) {
	this.value = value;
}

/**
 * BeanWrapper get value once.
 *
 * prototype bean may share DEPEND_TYPE_VAR value
 *
 * @return  {String} value
 * @api public
 */
BeanWrapper.prototype.getValueOnce = function() {
	var value = this.value;
	this.value = null;
	return value;
}

/**
 * BeanWrapper get ref bean.
 *
 * @return  {String} ref bean
 * @api public
 */
BeanWrapper.prototype.getRef = function() {
	return this.ref;
}

/**
 * BeanWrapper set ref bean.
 *
 * @param  {String} ref reference bean
 * @api public
 */
BeanWrapper.prototype.setRef = function(ref) {
	this.ref = ref;
}

/**
 * BeanWrapper get role.
 *
 * @return  {String} role
 * @api public
 */
BeanWrapper.prototype.getRole = function() {
	return this.role;
}

/**
 * BeanWrapper set role.
 *
 * @api public
 */
BeanWrapper.prototype.setRole = function() {
	var role = Constant.DEPEND_TYPE_ERROR;

	if (!this.name) {
		role = Constant.DEPEND_TYPE_ERROR;
	}

	if (this.ref) {
		role = Constant.DEPEND_TYPE_BEAN;
	}

	if (this.value) {
		role = Constant.DEPEND_TYPE_VALUE;
	}

	if (this.type) {
		if (Utils.checkType(this.type)) {
			role = Constant.DEPEND_TYPE_VAR;
		}
	}

	this.role = role;
}

/**
 * BeanWrapper get bean.
 *
 * @return  {Object} bean
 * @api public
 */
BeanWrapper.prototype.getBean = function() {
	return this.bean;
}

/**
 * BeanWrapper set bean.
 *
 * @param  {Object} bean
 * @api public
 */
BeanWrapper.prototype.setBean = function(bean) {
	this.bean = bean;
}

module.exports = BeanWrapper;
},{"../../util/constant":37,"../../util/utils":44,"pomelo-logger":57}],18:[function(require,module,exports){
(function (process){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat PlaceHolderConfigurer
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var PropertiesLoader = require('../../resource/propertiesLoader');
var BeanDefinitionVisitor = require('./beanDefinitionVisitor');
var PlaceHolderResolver = require('./placeHolderResolver');
var Constant = require('../../util/constant');
var Utils = require('../../util/utils');

var DEFAULT_LOAD_PATH = process.cwd() + "/config";

var Root;
(function() {
	Root = this;
}());

/**
 * PlaceHolderConfigurer constructor function.
 *
 * @api public
 */
var PlaceHolderConfigurer = function() {
	this.beanName = null;
	this.env = Constant.DEFAULT_ENV;
	this.cpath = DEFAULT_LOAD_PATH;
	this.properties = {};
}

/**
 * PlaceHolderConfigurer post process beanFactory.
 *
 * @param  {Object} beanFactory
 * @api public
 */
PlaceHolderConfigurer.prototype.postProcessBeanFactory = function(beanFactory) {
	this.loadProperties();

	this.processProperties(beanFactory);
}

/**
 * PlaceHolderConfigurer load properties by env.
 *
 * @api public
 */
PlaceHolderConfigurer.prototype.loadProperties = function() {
	var properties = null;

	if (Root.__bearcatData__ && Root.__bearcatData__.configData) {
		properties = Root.__bearcatData__.configData;
	} else {
		properties = this.getPropertiesLoader().loadProperties(this.getConfigPath(), this.getEnv());
	}

	this.mergeProperties(properties);
}

/**
 * PlaceHolderConfigurer merge properties.
 *
 * @param  {Object} properties
 * @api public
 */
PlaceHolderConfigurer.prototype.mergeProperties = function(properties) {
	for (var key in properties) {
		if (Utils.isNotNull(properties[key])) {
			this.properties[key] = properties[key];
		}
	}
}

/**
 * PlaceHolderConfigurer process properties.
 *
 * @param  {Object} beanFactory
 * @api public
 */
PlaceHolderConfigurer.prototype.processProperties = function(beanFactory) {
	var properties = this.getProperties();
	if (Utils.checkObjectEmpty(properties)) {
		return;
	}

	var valueResolver = new PlaceHolderResolver(properties);
	this.doProcessProperties(beanFactory, valueResolver);
}

/**
 * PlaceHolderConfigurer do process properties.
 *
 * @param  {Object} beanFactory
 * @param  {Object} valueResolver
 * @api private
 */
PlaceHolderConfigurer.prototype.doProcessProperties = function(beanFactory, valueResolver) {
	var visitor = new BeanDefinitionVisitor(valueResolver);
	var beanDefinitions = beanFactory.getBeanDefinitions();

	for (var beanName in beanDefinitions) {
		var bd = beanDefinitions[beanName];

		visitor.visitBeanDefinition(bd);
	}
}

/**
 * PlaceHolderConfigurer get properties loader.
 *
 * @return  {Object} properties loader
 * @api public
 */
PlaceHolderConfigurer.prototype.getPropertiesLoader = function() {
	return new PropertiesLoader();
}

/**
 * PlaceHolderConfigurer set beanName.
 *
 * @param  {String} beanName
 * @api public
 */
PlaceHolderConfigurer.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

/**
 * PlaceHolderConfigurer get beanName.
 *
 * @return  {String} beanName
 * @api public
 */
PlaceHolderConfigurer.prototype.getBeanName = function() {
	return this.beanName;
}

/**
 * PlaceHolderConfigurer set env.
 *
 * @param  {String} env
 * @api public
 */
PlaceHolderConfigurer.prototype.setEnv = function(env) {
	this.env = env;
}

/**
 * PlaceHolderConfigurer get env.
 *
 * @return  {String} env
 * @api public
 */
PlaceHolderConfigurer.prototype.getEnv = function() {
	return this.env;
}

/**
 * PlaceHolderConfigurer set configuration path.
 *
 * @param  {String} cpath configuration path
 * @api public
 */
PlaceHolderConfigurer.prototype.setConfigPath = function(cpath) {
	this.cpath = cpath;
}

/**
 * PlaceHolderConfigurer get configuration path.
 *
 * @return  {String} cpath configuration path
 * @api public
 */
PlaceHolderConfigurer.prototype.getConfigPath = function() {
	return this.cpath;
}

/**
 * PlaceHolderConfigurer set properties.
 *
 * @param  {Array} properties
 * @api public
 */
PlaceHolderConfigurer.prototype.setProperties = function(properties) {
	this.properties = properties;
}

/**
 * PlaceHolderConfigurer get properties.
 *
 * @return  {Array} properties
 * @api public
 */
PlaceHolderConfigurer.prototype.getProperties = function() {
	return this.properties;
}

module.exports = PlaceHolderConfigurer;
}).call(this,require('_process'))
},{"../../resource/propertiesLoader":33,"../../util/constant":37,"../../util/utils":44,"./beanDefinitionVisitor":15,"./placeHolderResolver":19,"_process":51}],19:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat PlaceHolderResolver
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */
var Utils = require('../../util/utils');

var DEFAULT_PLACEHOLDER_PREFIX = "${";
var DEFAULT_PLACEHOLDER_SUFFIX = "}";
var DEFAULT_VALUE_SEPARATOR = ":";

/**
 * PlaceHolderResolver constructor function.
 *
 * @param  {Array} properties
 * @api public
 */
var PlaceHolderResolver = function(properties) {
	this.placeholderPrefix = DEFAULT_PLACEHOLDER_PREFIX;
	this.placeholderSuffix = DEFAULT_PLACEHOLDER_SUFFIX;
	this.valueSeparator = DEFAULT_VALUE_SEPARATOR;
	this.properties = properties;
}

/**
 * PlaceHolderResolver resolve string value.
 *
 * @param  {String} strVal string value
 * @api public
 */
PlaceHolderResolver.prototype.resolveStringValue = function(strVal) {
	if (!Utils.checkString(strVal)) {
		return null;
	}

	var resolvedValue = this.doReplace(strVal);

	if (!Utils.isNotNull(resolvedValue)) {
		resolvedValue = strVal;
	}

	return resolvedValue;
}

/**
 * PlaceHolderResolver set properties.
 *
 * @param  {Array} properties
 * @api public
 */
PlaceHolderResolver.prototype.setProperties = function(properties) {
	this.properties = properties;
}

/**
 * PlaceHolderResolver get properties.
 *
 * @return  {Array} properties
 * @api public
 */
PlaceHolderResolver.prototype.getProperties = function() {
	return this.properties;
}

/**
 * PlaceHolderResolver replace string value.
 *
 * @param  {String} strVal string value
 * @api private
 */
PlaceHolderResolver.prototype.doReplace = function(strVal) {
	var properties = this.getProperties();
	if (!strVal || !properties) {
		return null;
	}

	var ptn = /\$\{(.*?)\}/g;
	var m, placeHolder, res = '',
		lastIndex = 0,
		head;
	var flag = true;
	var count = 0;
	while ((m = ptn.exec(strVal))) {
		placeHolder = m[1];

		head = strVal.substring(lastIndex, m.index);
		if (head.length) {
			res += head;
		}
		lastIndex = ptn.lastIndex;
		if (count == 0 && !head.length) {
			res = properties[placeHolder];
		} else {
			res += properties[placeHolder];
		}
		flag = false;
	}

	if (lastIndex < strVal.length) {
		res += strVal.substring(lastIndex);
	}

	if (flag) {
		return null;
	}
	return res;
}

module.exports = PlaceHolderResolver;
},{"../../util/utils":44}],20:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat App
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'app');
var ApplicationContext = require('./context/applicationContext');
var EventEmitter = require('events').EventEmitter;
var BeanFactory = require('./beans/beanFactory');
var Package = require('../package.json');
var Utils = require('./util/utils');

var Root;
(function() {
	Root = this;
}());

/*!
 * Application states
 */
var STATE_NEW = 1; // app new
var STATE_INITED = 2; // app has inited
var STATE_START = 3; // app start
var STATE_STARTED = 4; // app has started

/**
 * Bearcat app object.
 * @api public
 */
var Bearcat = {
	opts: null,
	configLocations: null,
	applicationContext: null,
	state: STATE_NEW,
	startTime: null,
	version: Package.version
};

Bearcat['__proto__'] = EventEmitter.prototype;

/**
 * Bearcat createApp constructor function.
 *
 * @param  {Array}  configLocations context path array
 * @param  {Object} opts
 * @param  {String} opts.NODE_ENV                    setup env
 * @param  {String} opts.BEARCAT_ENV                 setup env
 * @param  {String} opts.NODE_CPATH                  setup config path
 * @param  {String} opts.BEARCAT_CPATH               setup config path
 * @param  {String} opts.BEARCAT_HPATH               setup hot reload path(s), usually it is the scan source directory(app by default)
 * @param  {String} opts.BEARCAT_LOGGER              setup 'off' to turn off bearcat logger configuration
 * @param  {String} opts.BEARCAT_HOT                 setup 'on' to turn on bearcat hot code reload
 * @param  {String} opts.BEARCAT_ANNOTATION          setup 'off' to turn off bearcat $ based annotation
 * @param  {String} opts.BEARCAT_GLOBAL  	         setup bearcat to be global object
 * @param  {String} opts.BEARCAT_FUNCTION_STRING  	 setup bearcat to use func.toString for $ based annotation
 *
 * @return {Object} bearcat object
 * @api public
 */
Bearcat.createApp = function(configLocations, opts) {
	if (this.state >= STATE_INITED) {
		Bearcat.stop();
	}

	if (!Utils.checkArray(configLocations) && Utils.checkObject(configLocations)) {
		opts = configLocations;
		configLocations = [];
	}

	this.opts = opts || {};
	this.configLocations = configLocations || [];

	if (this.opts['BEARCAT_GLOBAL']) {
		Root.bearcat = Bearcat;
	}

	if (!Utils.checkObject(this.opts)) {
		logger.warn('Bearcat createApp opts must be object...');
	}

	this.applicationContext = new ApplicationContext(this.configLocations, this.opts);

	this.state = STATE_INITED;
	return Bearcat;
}

/**
 * Bearcat start app.
 *
 * @param  {Function} cb start callback function
 * @api public
 */
Bearcat.start = function(cb) {
	if (!Utils.checkFunction(cb)) {
		cb = function() {}
	}

	if (this.state > STATE_INITED) {
		logger.warn('Bearcat has already start, run bearcat.stop to start again.');
		return cb();
	}

	if (this.state < STATE_INITED) {
		logger.warn('Bearcat does not inited, run bearcat.createApp to init.');
		return cb();
	}

	this.state = STATE_START;
	this.startTime = Date.now();
	var self = this;

	var env = "";

	if (Utils.checkBrowser()) {
		env = 'browser';
		this.applicationContext.setEnv(env);
	}

	if (Utils.checkCocos2dJsb()) {
		env = 'cocos2djsb';
		this.applicationContext.setEnv(env);
	}

	this.applicationContext.on('finishRefresh', function() {
		self.state = STATE_STARTED;
		env = self.applicationContext.getEnv();
		logger.info('Bearcat startup in %s with %s ms', env, Date.now() - self.startTime);
		cb();
	});

	this.applicationContext.on('reload', function() {
		self.emit('reload');
	});

	this.applicationContext.refresh();
}

/**
 * Bearcat stop app.
 * it will stop internal applicationContext, destroy all singletonBeans
 *
 * @api public
 */
Bearcat.stop = function() {
	if (this.applicationContext) {
		this.applicationContext.destroy();
	}
	this.applicationContext = null;
	this.configLocations = null;
	this.startTime = null;
	this.state = STATE_NEW;
}

/**
 * Bearcat get beanFactory instance.
 *
 * @return  {Object} beanFactory instance
 * @api public
 */
Bearcat.getBeanFactory = function() {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %s', "getBeanFactory");
		return;
	}

	return this.applicationContext.getBeanFactory();
}

/**
 * Bearcat get applicationContext.
 *
 * @return  {Object} applicationContext
 * @api public
 */
Bearcat.getApplicationContext = function() {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %s', "getApplicationContext");
		return;
	}

	return this.applicationContext;
}

/**
 * Bearcat get bean from IoC container through meta argument.
 *
 * Examples:
 *
 *	  bearcat.getBeanByMeta({
 *		 id: "car",
 *		 func: Car // Car is a function constructor
 *	  });
 *
 * @param  {Object} meta meta object
 * @api public
 */
Bearcat.getBeanByMeta = function(meta) {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %s %j', "getBeanByMeta", meta);
		return;
	}

	return this.applicationContext.getBeanByMeta(meta);
}

/**
 * Bearcat get bean from IoC container through $ annotation function.
 *
 * Examples:
 *
 *	  bearcat.getBeanByFunc(function() {
 *		 this.$id = "car";
 *		 this.$scope = "prototype";
 *	  });
 *
 * @param  {Function} func $ annotation function
 * @api public
 */
Bearcat.getBeanByFunc = function(func) {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %s', "getBeanByFunc");
		return;
	}

	return this.applicationContext.getBeanByFunc(func);
}

/**
 * Bearcat add async loading beans, this just add beans needed to be loaded to bearcat.
 *
 * Examples:
 *
 *	  bearcat.use(['car']);
 *	  bearcat.use('car');
 *
 * @param  {Array|String} async loading beans id
 * @api public
 */
Bearcat.use = function(ids) {
	if (Utils.checkArray(ids)) {
		return this.applicationContext.use(ids);
	}

	if (Utils.checkString(ids)) {
		return this.applicationContext.use([ids]);
	}
}

/**
 * Bearcat async loading beans.
 *
 * Examples:
 *
 *	  bearcat.async(['car'], function(car) {
 *		  // car is ready
 *	  });
 *
 * @param  {Array|String} async loading beans id
 * @return {Function}     callback with loaded bean instances
 * @api public
 */
Bearcat.async = function(ids, cb) {
	if (Utils.checkArray(ids)) {
		return this.applicationContext.async(ids, cb);
	}

	if (Utils.checkString(ids)) {
		return this.applicationContext.async([ids], cb);
	}
}

/**
 * Bearcat add module(bean) to IoC container through $ annotation function.
 *
 * Examples:
 *
 *	  bearcat.module(function() {
 *		 this.$id = "car";
 *		 this.$scope = "prototype";
 *	  });
 *
 * @param  {Function} func $ annotation function
 * @api public
 */
Bearcat.module = function(func, context) {
	if (this.state < STATE_STARTED) {
		return this.applicationContext.module(func, context);
	} else {
		return this.getBean(func);
	}
}

/**
 * Bearcat define module(bean).
 *
 * Examples:
 *
 *    bearcat.define('car', function(exports, module) {
 *	     module.exports = function() {
 *	         console.log('run car...')
 *       }
 *    }, typeof module !== 'undefined' ? module : {});
 *
 * @param  {String}   id
 * @param  {Function} factory function
 * @param  {object}   context object
 * @api public
 */
Bearcat.define = function(id, factory, context) {
	return this.applicationContext.define(id, factory, context);
}

/**
 * Bearcat add module(bean) to IoC container through $ annotation function.
 *
 * Examples:
 *
 *	  var Car = bearcat.require('car');
 *
 * @param  {String} id
 * @api public
 */
Bearcat.require = function(id) {
	return this.applicationContext.require(id);
}

/**
 * Bearcat get bean from IoC container through beanName or meta argument.
 *
 * Examples:
 *
 *
 *	  // through beanName
 *	  var car = bearcat.getBean("car");
 *
 *	  // through meta
 *	  var car = bearcat.getBean({
 *		 id: "car",
 *		 func: Car // Car is a function constructor
 *	  });
 *
 *	  // through $ annotation func
 *	  var car = bearcat.getBean(function() {
 *		 this.$id = "car";
 *		 this.$scope = "prototype";
 *	  });
 *
 * @param  {String} beanName
 * @return {Object} bean
 * @api public
 */
Bearcat.getBean = function(beanName) {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %s %s state: %d', "getBean", beanName, this.state);
		return;
	}

	var firstarg = beanName;
	var func = "";
	if (Utils.checkObject(firstarg)) {
		func = "getBeanByMeta";
	} else if (Utils.checkFunction(firstarg)) {
		func = "getBeanByFunc";
	} else if (Utils.checkString(firstarg)) {
		func = "getBean";
	} else {
		logger.error('Bearcat application unsupported getBean arguments for %s', beanName);
		return;
	}

	return this.applicationContext[func].apply(this.applicationContext, arguments);
}

/**
 * Bearcat get bean constructor function from IoC container through beanName.
 *
 * Examples:
 *
 *
 *	  // through beanName
 *	  var Car = bearcat.getFunction("car");
 *
 *
 * @param  {String}   beanName
 * @return {Function} bean constructor function
 * @api public
 */
Bearcat.getFunction = function(beanName) {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %s %s state: %d', "getFunction", beanName, this.state);
		return;
	}

	return this.applicationContext.getBeanFunction(beanName);
}

/**
 * Bearcat get bean constructor function from IoC container through beanName, the same as bearcat.getFunction.
 *
 * Examples:
 *
 *
 *	  // through beanName
 *	  var Car = bearcat.getClass("car");
 *
 *
 * @param  {String}   beanName
 * @return {Function} bean constructor function
 * @api public
 */
Bearcat.getClass = function(beanName) {
	return Bearcat.getFunction(beanName);
}

/**
 * Bearcat shim to enable function inherits.
 *
 * Examples:
 *
 *
 *	  bearcat.extend("bus", "car");
 *
 *
 * @param  {String}   		beanName
 * @param  {String|Array}   superBeanName or superBeanName array
 * @api public
 */
Bearcat.extend = function(beanName, superBeanName) {
	if (!beanName || !superBeanName) {
		logger.error('[bearcat.extend] beanName or superBeanName can not be null');
		return;
	}

	this.applicationContext.extendBean(beanName, superBeanName);
}

/**
 * Bearcat call function used for inherits to call super constructor function.
 *
 * Examples:
 *
 *
 *	  bearcat.call("car", this);
 *
 *
 * @param  {String}   beanName
 * @param  {Object}   context
 * @api public
 */
Bearcat.call = function(beanName, context) {
	var beanFunction = Bearcat.getFunction(beanName);

	if (!beanFunction) {
		logger.error('[bearcat.call] bean function %s not exist', beanName);
		return;
	}

	var args = Array.prototype.slice.call(arguments, 2);
	beanFunction.apply(context, args);
}

/**
 * Bearcat get model from bearcat through modelId.
 *
 * Examples:
 *
 *
 *	  // through modelId
 *	  var carModel = bearcat.getModel("car");
 *
 *
 * @param  {String}   modelId
 * @return {Object}   model
 * @api public
 */
Bearcat.getModel = function(modelId) {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %s %s state: %d', "getModel", modelId, this.state);
		return;
	}

	return this.applicationContext.getModel(modelId);
}

/**
 * Bearcat convenient function for using in MVC route mapping.
 *
 * Examples:
 *
 *
 *	  // express
 *	  var app = express();
 *	  app.get('/', bearcat.getRoute('bearController', 'index'));
 *
 *
 * @param  {String} beanName
 * @param  {String} fnName routeName
 * @api public
 */
Bearcat.getRoute = function(beanName, fnName) {
	if (this.state !== STATE_STARTED) {
		return;
	}

	var bean = this.getBean(beanName);
	return bean[fnName].bind(bean);
}

module.exports = Bearcat;
},{"../package.json":54,"./beans/beanFactory":11,"./context/applicationContext":21,"./util/utils":44,"events":47,"pomelo-logger":57}],21:[function(require,module,exports){
(function (process){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ApplicationContext
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'ApplicationContext');
var PlaceHolderConfigurer = require('../beans/support/placeHolderConfigurer');
var AutoProxyCreator = require('../aop/autoproxy/autoProxyCreator');
var ModelKeyMapResolver = require('../model/modelKeyMapResolver');
var AsyncScriptLoader = require('../resource/asyncScriptLoader');
var BootStrapLoader = require('../resource/bootStrapLoader');
var ResourceLoader = require('../resource/resourceLoader');
var defaultConstraints = require('../model/constraints');
var ModuleFactory = require('../beans/moduleFactory');
var BeanFactory = require('../beans/beanFactory');
var EventEmitter = require('events').EventEmitter;
var RequireUtil = require('../util/requireUtil');
var Constant = require('../util/constant');
var FileUtil = require('../util/fileUtil');
var MetaUtil = require('../util/metaUtil');
var Utils = require('../util/utils');
var Path = RequireUtil.requirePath();
var Util = RequireUtil.requireUtil();
var DEFAULT_BASE = "";
var DEFAULT_LOAD_PATH = "";
var DEFAULT_HOT_RELOAD_PATH = "";

var Root;
(function() {
	Root = this;
}());

/**
 * ApplicationContext constructor function.
 *
 * @param  {Array} configLocations configuration paths
 * @api public
 */
var ApplicationContext = function(configLocations, opts) {
	this.opts = opts || {};
	this.configLocations = configLocations;
	this.loadBeans = [];
	this.active = false;
	this.reloadMap = {};
	this.beanFactory = null;
	this.startUpDate = null;
	this.extendBeanMap = {};
	this.extendedBeanMap = {};
	this.extendBeanCurMap = {};
	this.moduleFactory = null;
	this.resourceLoader = null;
	this.bootStrapLoader = null;
	this.asyncScriptLoader = null;
	this.cpath = DEFAULT_LOAD_PATH;
	this.hpath = DEFAULT_HOT_RELOAD_PATH;
	this.env = Constant.DEFAULT_ENV;
	this.base = DEFAULT_BASE;
	this.beanFactoryPostProcessors = [];
	EventEmitter.call(this);
	this.init();
}

module.exports = ApplicationContext;

Util.inherits(ApplicationContext, EventEmitter);

/**
 * ApplicationContext init.
 *
 * @api public
 */
ApplicationContext.prototype.init = function() {
	if (this.hasBeanFactory()) {
		this.destroyBeans();
		this.closeBeanFactory();
	}

	DEFAULT_BASE = process.cwd();

	if (this.configLocations.length) {
		var contextPath = this.configLocations[0];
		DEFAULT_BASE = Path.dirname(contextPath);
	}

	DEFAULT_LOAD_PATH = DEFAULT_BASE + "/config";
	DEFAULT_HOT_RELOAD_PATH = DEFAULT_BASE + "/app"; // equal to scan path

	this.cpath = DEFAULT_LOAD_PATH;
	this.hpath = DEFAULT_HOT_RELOAD_PATH;
	this.base = DEFAULT_BASE;

	this.createBeanFactory();
}

/**
 * ApplicationContext set container startUpDate.
 *
 * @param  {Number} startUpDate
 * @api public
 */
ApplicationContext.prototype.setStartupDate = function(startUpDate) {
	this.startUpDate = startUpDate;
}

/**
 * ApplicationContext get container startUpDate.
 *
 * @return  {Number} startUpDate
 * @api public
 */
ApplicationContext.prototype.getStartupDate = function() {
	return this.startUpDate;
}

/**
 * ApplicationContext get resourceLoader.
 *
 * @return  {Object} resourceLoader
 * @api public
 */
ApplicationContext.prototype.getResourceLoader = function() {
	this.resourceLoader = new ResourceLoader();
	return this.resourceLoader;
}

/**
 * ApplicationContext get asyncScriptLoader.
 *
 * @return  {Object} asyncScriptLoader
 * @api public
 */
ApplicationContext.prototype.getAsyncScriptLoader = function() {
	if (this.asyncScriptLoader) {
		return this.asyncScriptLoader;
	}

	this.asyncScriptLoader = new AsyncScriptLoader();
	this.asyncScriptLoader.setApplicationContext(this);
	return this.asyncScriptLoader;
}

/**
 * ApplicationContext get bootStrapLoader.
 *
 * @return  {Object} bootStrapLoader
 * @api public
 */
ApplicationContext.prototype.getBootStrapLoader = function() {
	if (this.bootStrapLoader) {
		return this.bootStrapLoader;
	}

	this.bootStrapLoader = new BootStrapLoader();
	return this.bootStrapLoader;
}

/**
 * ApplicationContext get metaObjects resource from contextPath.
 *
 * @param   {String} cpath contextPath
 * @return  {Object} metaObjects
 * @api public
 */
ApplicationContext.prototype.getResource = function(cpath) {
	if (Root.__bearcatData__ && Root.__bearcatData__.metas) {
		return Root.__bearcatData__.metas;
	}

	return this.resourceLoader.load(cpath);
}

/**
 * ApplicationContext get contextPath locations.
 *
 * @return  {Array} contextPath locations
 * @api public
 */
ApplicationContext.prototype.getConfigLocations = function() {
	return this.configLocations;
}

/**
 * ApplicationContext add beanFactoryPostProcessor.
 *
 * @param  {Object} beanFactoryPostProcessor
 * @api public
 */
ApplicationContext.prototype.addBeanFactoryPostProcessor = function(beanFactoryPostProcessor) {
	this.beanFactoryPostProcessors.push(beanFactoryPostProcessor);
}

/**
 * ApplicationContext get beanFactoryPostProcessors.
 *
 * @return  {Array} beanFactoryPostProcessors
 * @api public
 */
ApplicationContext.prototype.getBeanFactoryProcessors = function() {
	return this.beanFactoryPostProcessors;
}

/**
 * ApplicationContext do refresh actions.
 * refresh beanFactory, preIntialize singleton Beans
 *
 * @param  {Function} cb callback function
 * @api public
 */
ApplicationContext.prototype.refresh = function(cb) {
	var self = this;
	cb = cb || function() {};

	// Prepare context for refresh
	self.prepareRefresh();

	// Refresh internal beanFactory
	self.refreshBeanFactory();

	// Extend beans
	self.doExtendBeans();

	// Try Async loading for dependencies
	self.tryAsyncLoading(function() {

		// Try loading from bearcat-bootstrap.js for dependencies
		self.tryBootStrapLoading();

		// Prepare beanFactory for this context
		self.prepareBeanFactory();

		self.postProcessBeanFactory();

		// Invoke factory processors registered as beans in the context.
		self.invokeBeanFactoryPostProcessors();

		// Register bean processors that intercept bean creation.
		self.registerBeanPostProcessors();

		// Instantiate all remaining (non-lazy-init) singletons
		self.finishBeanFactoryIntialization(function() {

			// Last step: publish corresponding event.
			self.finishRefresh();
			cb();
		});
	});
}

/**
 * ApplicationContext prepareRefresh.
 * init startUpDate, active status
 * get resourceLoader and load context paths
 *
 * @api private
 */
ApplicationContext.prototype.prepareRefresh = function() {
	this.startUpDate = Date.now();

	this.active = true;

	var opts = this.opts;

	if (opts['NODE_ENV']) {
		process.env.NODE_ENV = opts['NODE_ENV'];
	}

	if (opts['BEARCAT_ENV']) {
		process.env.BEARCAT_ENV = opts['BEARCAT_ENV'];
	}

	if (opts['NODE_CPATH']) {
		process.env.NODE_CPATH = opts['NODE_CPATH'];
	}

	if (opts['BEARCAT_CPATH']) {
		process.env.BEARCAT_CPATH = opts['BEARCAT_CPATH'];
	}

	if (opts['BEARCAT_LOGGER'] && opts['BEARCAT_LOGGER'] === 'off') {
		process.env.BEARCAT_LOGGER = 'off';
	}

	if (opts['BEARCAT_HOT'] && opts['BEARCAT_HOT'] === 'on') {
		process.env.BEARCAT_HOT = 'on';
	}

	if (opts['BEARCAT_ANNOTATION'] && opts['BEARCAT_ANNOTATION'] === 'off') {
		process.env.BEARCAT_ANNOTATION = 'off';
	}

	if (opts['BEARCAT_FUNCTION_STRING']) {
		process.env.BEARCAT_FUNCTION_STRING = true;
	}

	this.getResourceLoader();

	this.beanFactoryPostProcessors = [];

	var args = Utils.parseArgs(process.argv);
	var env = this.getEnv();
	env = args.env || args['--env'] || process.env.NODE_ENV || process.env.BEARCAT_ENV || env || Constant.DEFAULT_ENV;

	this.setEnv(env);

	var cpath = this.getConfigPath();
	cpath = args.cpath || args['--cpath'] || process.env.NODE_CPATH || process.env.BEARCAT_CPATH || cpath;

	this.setConfigPath(cpath);

	if (Utils.checkBrowser()) {
		return;
	}

	MetaUtil.cleanUp();
	var base = this.getBase();

	if (process.env.BEARCAT_LOGGER !== 'off') {
		var originLoggerConfigPath = Path.join(cpath, Constant.LOGPATH);
		var presentLoggerConfigPath = Path.join(cpath, env, Constant.LOGPATH);
		if (FileUtil.existsSync(originLoggerConfigPath)) {
			require('pomelo-logger').configure(originLoggerConfigPath, {
				base: base
			});
		} else if (FileUtil.existsSync(presentLoggerConfigPath)) {
			require('pomelo-logger').configure(presentLoggerConfigPath, {
				base: base
			});
		} else {
			// logger.error('logger file path configuration is error.');
		}
	}

	var hpath = this.getHotPath();
	// BEARCAT_HPATH can be array
	// process.env.BEARCAT_HPATH will JSON.stringify this value
	// so do not use process.env.BEARCAT_HPATH
	hpath = args.hpath || args['--hpath'] || opts['BEARCAT_HPATH'] || hpath;
	this.setHotPath(hpath);

	if (process.env.BEARCAT_HOT === 'on') {
		this.hotReloadFileWatch(hpath);
	}
}

/**
 * ApplicationContext refreshBeanFactory.
 * reload beanFactory with refresh metaObjects
 *
 * @api private
 */
ApplicationContext.prototype.refreshBeanFactory = function() {
	this.configLocations = this.getConfigLocations();

	this.loadDefaultConstraints();

	var len = this.configLocations.length;
	for (var i = 0; i < len; i++) {
		this.beanFactory.registerBeans(this.getResource(this.configLocations[i]));
	}

	if (!len) {
		this.beanFactory.registerBeans(this.getResource());
	}
}

/**
 * ApplicationContext try async loading script files when in the frontend.
 *
 * @api private
 */
ApplicationContext.prototype.tryAsyncLoading = function(cb) {
	if (!Utils.checkBrowser() || Utils.checkCocos2dJsb()) {
		return cb();
	}

	var loadBeans = this.loadBeans;
	if (!loadBeans || !loadBeans.length) {
		return cb();
	}

	return this.doAsyncLoading(cb);
}

/**
 * ApplicationContext internal do async loading script files when in the frontend.
 *
 * @api private
 */
ApplicationContext.prototype.doAsyncLoading = function(cb) {
	var loadBeans = this.loadBeans;

	var asyncScriptLoader = this.getAsyncScriptLoader();

	return asyncScriptLoader.load(loadBeans, cb);
}

/**
 * ApplicationContext try loading script files from bearcat-bootstrap.js when in cocos2d-js jsb env.
 *
 * @api private
 */
ApplicationContext.prototype.tryBootStrapLoading = function() {
	if (!Utils.checkCocos2dJsb()) {
		return;
	}

	if (Root.__bearcatData__ && Root.__bearcatData__.idPaths) {
		idPaths = Root.__bearcatData__.idPaths;
		var bootStrapLoader = this.getBootStrapLoader();

		return bootStrapLoader.load(idPaths);
	}
}

/**
 * ApplicationContext prepareBeanFactory.
 * register default beans into beanFactory
 *
 * @api private
 */
ApplicationContext.prototype.prepareBeanFactory = function() {
	var placeHolderConfigurer = new PlaceHolderConfigurer();
	if (Utils.isNotNull(this.env)) {
		placeHolderConfigurer.setEnv(this.env);
	}

	if (Utils.isNotNull(this.cpath)) {
		placeHolderConfigurer.setConfigPath(this.cpath);
	}

	var modelKeyMapResolver = new ModelKeyMapResolver();

	this.addBeanFactoryPostProcessor(placeHolderConfigurer);
	this.addBeanFactoryPostProcessor(modelKeyMapResolver);

}

/**
 * ApplicationContext registerBeanMeta.
 * register metaObject
 *
 * @param  {Object} metaObject
 * @api private
 */
ApplicationContext.prototype.registerBeanMeta = function(meta) {
	var id = meta['id'];
	if (!id) {
		logger.error('ApplicationContext registerBean error meta no id.');
		return;
	}

	var metaObject = {};
	metaObject[id] = meta;

	this.beanFactory.registerBeans(metaObject);
}

/**
 * ApplicationContext load default constraints.
 *
 * @api private
 */
ApplicationContext.prototype.loadDefaultConstraints = function() {
	for (var key in defaultConstraints) {
		this.getBeanByFunc(defaultConstraints[key]);
	}
}

/**
 * ApplicationContext hotReloadFileWatch.
 *
 * @param  {String} hpath hot reload path
 * @api private
 */
ApplicationContext.prototype.hotReloadFileWatch = function(hpath) {
	var self = this;
	var watcher = require('chokidar').watch(hpath, {
		ignored: /[\/\\]\./,
		ignoreInitial: true
	});

	if (!watcher) {
		return;
	}

	logger.info('bearcat hot reload watch %j', hpath);
	watcher.on('all', function(event, path) {
		if (event != 'change' && event != 'add') {
			return;
		}

		var filename = path;
		if (!Utils.checkString(filename)) {
			return;
		}

		var id = Utils.getFileName(filename, '.js'.length);

		if (!Utils.checkFileType(filename, '.js') || !Utils.isFile(filename)) {
			return;
		}

		var pid = process.pid;
		var s = Math.floor(Math.random(0, 1) * 5);
		var m = Math.floor(Math.random(0, 1) * 10);
		var p = Math.floor(Math.random(0, 1) * 100);
		var t = s * 1000 + p * (pid % 100) + p + s * m;

		var doHotReload = function() {
			logger.info('%s changed, bearcat start hot reloading %d ...', filename, t);
			var meta = Utils.myRequireHot(filename);
			if (!meta) {
				return;
			}

			if (Utils.checkFunction(meta)) {
				meta = MetaUtil.resolveFuncAnnotation(meta, null, true);
			}

			if (Utils.checkObject(meta)) {
				id = meta['id'];
				var func = meta['func'];

				if (event == 'add') {
					// dynamic add file
					logger.info('bearcat reload add bean %s', id);
					self.registerBeanMeta(meta);
				} else {
					if (id && Utils.checkFunction(func)) {
						var beanFactory = self.getBeanFactory();
						var beanFunc = beanFactory.getBeanFunction(id);

						self.doHotAddAttributes(meta, id);
						if (beanFunc) {
							var proto = func.prototype;

							logger.info('bearcat reload update bean %s', id);
							for (var key in proto) {
								// logger.info('bearcat reload update prototype %s:%s', id, key);
								beanFunc.prototype[key] = proto[key];
							}
						}
					}
				}
			}
			self.emit('reload');
			logger.info('bearcat hot reloading done ...');
		}

		setTimeout(doHotReload, t);
	});
}

/**
 * ApplicationContext do hot add attributes.
 *
 * @param  {Object} hot reload new metaObject
 * @param  {String} hot reload bean name
 * @api private
 */
ApplicationContext.prototype.doHotAddAttributes = function(metaObject, beanName) {
	var beanFactory = this.getBeanFactory();
	var beanFunc = beanFactory.getBeanFunction(beanName);
	var beanDefinition = beanFactory.getBeanDefinition(beanName);

	if (!beanDefinition) {
		return;
	}

	var beanPrototype = beanFunc.prototype;
	var propsOn = beanDefinition.getPropsOn();
	var props = metaObject.props;

	if (!Utils.checkArray(props)) {
		return;
	}

	for (var i = 0; i < props.length; i++) {
		(function(w) {
			var name = w.name;
			var flag = 1;

			for (j = 0; j < propsOn.length; j++) {
				var p = propsOn[j];
				if (name === p.getName()) {
					flag = 0;
					break;
				}
			}

			// new prop attribute
			if (flag) {
				var value = w.value;
				var ref = w.ref;
				var key = "";
				if (ref) {
					key = Constant.DEFINE_GETTER_PREFIX + name;
				}

				logger.info('hot reload add attribute %s to %s', name, beanName);
				beanPrototype.__defineGetter__(name, function() {
					if (value) {
						return value;
					}

					if (ref) {
						if (!this[key]) {
							this[key] = beanFactory.getBean(ref);
						}

						return this[key];
					}
				});
			}
		})(props[i]);
	}
}

ApplicationContext.prototype.postProcessBeanFactory = function() {

}

/**
 * ApplicationContext register bean post processors.
 *
 * @api private
 */
ApplicationContext.prototype.registerBeanPostProcessors = function() {
	var autoProxyCreator = new AutoProxyCreator();
	autoProxyCreator.setBeanFactory(this.getBeanFactory());
	this.beanFactory.addBeanPostProcessor(autoProxyCreator);
}

/**
 * ApplicationContext invoke bean factory post processors.
 *
 * @api private
 */
ApplicationContext.prototype.invokeBeanFactoryPostProcessors = function() {
	var beanFactory = this.getBeanFactory();
	var postProcessors = this.getBeanFactoryProcessors();
	for (var i = 0; i < postProcessors.length; i++) {
		var postProcessor = postProcessors[i];
		postProcessor.postProcessBeanFactory(beanFactory);
	}
}

/**
 * ApplicationContext finish beanFactory singleton beans intialization.
 *
 * @param  {Function} cb callback function
 * @api private
 */
ApplicationContext.prototype.finishBeanFactoryIntialization = function(cb) {
	this.beanFactory.preInstantiateSingletons(cb);
}

/**
 * ApplicationContext finish refresh event emit.
 *
 * @api private
 */
ApplicationContext.prototype.finishRefresh = function() {
	var self = this;
	this.emit('finishRefresh');

	if (process.browser) {
		return;
	}

	var listeners = process.listeners('SIGTERM');
	if (listeners && listeners.length) {
		return;
	}

	var destroyFlag = false;
	var doDestroy = function() {
		if (destroyFlag) {
			return;
		}

		destroyFlag = true;
		logger.info('Bearcat starts destroying...');
		self.destroy();
		process.exit();
	}

	process.on('SIGINT', doDestroy);
	process.on('SIGTERM', doDestroy);
	process.on('SIGHUP', doDestroy);
}

/**
 * ApplicationContext cancel refresh.
 *
 * @api publish
 */
ApplicationContext.prototype.cancelRefresh = function() {
	this.active = false;
}

ApplicationContext.prototype.registerShutdownHook = function() {

}

/**
 * ApplicationContext destroy.
 *
 * @api public
 */
ApplicationContext.prototype.destroy = function() {
	this.close();
}

/**
 * ApplicationContext close.
 *
 * @api private
 */
ApplicationContext.prototype.close = function() {
	this.doClose();
}

/**
 * ApplicationContext do close.
 *
 * destroyBeans, closeBeanFactory, free resourceLoader, etc..
 * @api private
 */
ApplicationContext.prototype.doClose = function() {
	this.configLocations = null;
	this.startUpDate = null;
	this.active = false;
	if (this.hasBeanFactory()) {
		this.destroyBeans();
		this.closeBeanFactory();
	}

	MetaUtil.cleanUp();
	this.beanFactory = null;
	this.resourceLoader = null;
	this.beanFactoryPostProcessors = [];
	this.cpath = DEFAULT_LOAD_PATH;
	this.env = Constant.DEFAULT_ENV;
	this.emit('destroyed');
}

/**
 * ApplicationContext destroyBeans.
 *
 * @api private
 */
ApplicationContext.prototype.destroyBeans = function() {
	this.getBeanFactory().destroySingletons();
}

/**
 * ApplicationContext check whether applicationContext is active or not.
 *
 * @api public
 */
ApplicationContext.prototype.isActive = function() {
	return this.active;
}

/**
 * ApplicationContext getBean through beanName from applicationContext.
 *
 * @param   {String} beanName
 * @return  {Object} beanObject
 * @api public
 */
ApplicationContext.prototype.getBean = function(beanName) {
	var beanFactory = this.getBeanFactory();
	return beanFactory.getBean.apply(beanFactory, arguments);
}

/**
 * ApplicationContext getBean through metaObject from applicationContext.
 *
 * @param   {Object} meta metaObject
 * @return  {Object} beanObject
 * @api public
 */
ApplicationContext.prototype.getBeanByMeta = function(meta) {
	var id = meta['id'];
	if (!id) {
		logger.error('ApplicationContext getBeanByMeta error meta no id.');
		return;
	}

	if (!this.getBeanDefinition(id)) {
		this.registerBeanMeta(meta);

		this.invokeBeanFactoryPostProcessors();
	}

	arguments[0] = id;

	return this.beanFactory.getBeanProxy.apply(this.beanFactory, arguments);
}

/**
 * ApplicationContext getBean through $ annotation function from applicationContext.
 *
 * @param   {Function} func $ annotation function
 * @return  {Object}   beanObject
 * @api public
 */
ApplicationContext.prototype.getBeanByFunc = function(func) {
	var meta = MetaUtil.resolveFuncAnnotation(func);

	var id = meta['id'];
	if (!id) {
		logger.error('ApplicationContext getBeanByFunc error meta no id, add this.$id = "yourId" to your func.');
		return;
	}

	if (!this.getBeanDefinition(id)) {
		meta['lazy'] = true;
		this.registerBeanMeta(meta);

		this.invokeBeanFactoryPostProcessors();
	}

	arguments[0] = id;

	return this.beanFactory.getBeanProxy.apply(this.beanFactory, arguments);
}

/**
 * ApplicationContext getModel through modelId.
 *
 * @param   {String}   modelId
 * @return  {Object}   model
 * @api public
 */
ApplicationContext.prototype.getModel = function(modelId) {
	if (!modelId) {
		logger.error('ApplicationContext getModel error no modelId.');
		return;
	}

	return this.beanFactory.getModelProxy(modelId);
}

/**
 * ApplicationContext getModelDefinition through modelId.
 *
 * @param   {String}   modelId
 * @return  {Object}   modelDefinition
 * @api public
 */
ApplicationContext.prototype.getModelDefinition = function(modelId) {
	if (!modelId) {
		logger.error('ApplicationContext getModelDefinition error no modelId.');
		return;
	}

	return this.beanFactory.getModelDefinition(modelId);
}

/**
 * ApplicationContext get bean contructor function.
 *
 * @param  {String}   beanName
 * @return {Function} bean constructor function
 * @api public
 */
ApplicationContext.prototype.getBeanFunction = function(beanName) {
	return this.beanFactory.getBeanFunction(beanName);
}

/**
 * ApplicationContext extend bean.
 *
 * @param  {String}   		beanName
 * @param  {String|Array}   superBeanName or superBeanName array
 * @api public
 */
ApplicationContext.prototype.extendBean = function(beanName, superBeanName) {
	if (!this.extendBeanMap[beanName]) {
		this.extendBeanMap[beanName] = [];
	}

	this.extendBeanMap[beanName] = this.extendBeanMap[beanName].concat(superBeanName);
}

/**
 * ApplicationContext do extend beans.
 *
 * @api private
 */
ApplicationContext.prototype.doExtendBeans = function() {
	var extendBeanMap = this.extendBeanMap;

	for (var beanName in extendBeanMap) {
		var superNames = extendBeanMap[beanName];

		for (var i = 0; i < superNames.length; i++) {
			var superBeanName = superNames[i];
			this.doExtendBean(beanName, superBeanName);
		}
	}
}

/**
 * ApplicationContext do extend bean.
 *
 * @param  {String}   beanName
 * @param  {String}   superBeanName
 * @api public
 */
ApplicationContext.prototype.doExtendBean = function(beanName, superBeanName) {
	var cacheKey = beanName + '_' + superBeanName;
	if (this.extendBeanCurMap[superBeanName]) {
		logger.error("[bearcat.extend] error circle beanName %s extend %s is not allowed", beanName, superBeanName);
		return;
	}

	this.extendBeanCurMap[beanName] = true;

	if (this.extendedBeanMap[cacheKey]) {
		return;
	}

	var beanFunction = this.getBeanFunction(beanName);
	if (!beanFunction) {
		logger.error('[bearcat.extend] %s from super %s, %s null', beanName, superBeanName, beanName);
		return;
	}

	var superFunction = this.getBeanFunction(superBeanName);
	if (!superFunction) {
		logger.error('[bearcat.extend] %s from super %s, %s null', beanName, superBeanName, superBeanName);
		return;
	}

	var _superBeans = this.extendBeanMap[superBeanName];
	if (_superBeans && _superBeans.length) {
		for (var i = 0; i < _superBeans.length; i++) {
			this.doExtendBean(superBeanName, _superBeans[i]);
		}
	}

	var _super = superFunction.prototype;
	var props = beanFunction.prototype;
	for (var name in _super) {
		if (!props[name]) {
			props[name] = _super[name];
		} else {
			if (Utils.checkFunction(props[name]) && Utils.checkFunction(_super[name])) {
				props[name] = (function(super_fn, fn) {
					return function() {
						var tmp = this._super;

						this._super = super_fn;

						var ret = fn.apply(this, arguments);

						this._super = tmp;

						return ret;
					}
				})(_super[name], props[name]);
			}
		}
	}

	delete this.extendBeanCurMap[beanName];
	this.extendedBeanMap[cacheKey] = true;
}

/**
 * ApplicationContext add module(bean) to IoC container through $ annotation function from applicationContext.
 *
 * @param   {Function} func $ annotation function
 * @api public
 */
ApplicationContext.prototype.module = function(func, context) {
	var meta = MetaUtil.resolveFuncAnnotation(func);
	var id = meta['id'];
	if (!id) {
		logger.error('ApplicationContext module error meta no id, add this.$id = "yourId" to your func.');
		return;
	}

	if (this.getBeanDefinition(id)) {
		return;
	}

	// node.js env
	if (!Utils.checkBrowser() && Utils.isNotNull(context) && context['exports']) {
		return context['exports'] = func;
	}

	// browser async load depended script files
	if (Utils.checkBrowser()) {
		var loader = this.getAsyncScriptLoader();
		loader.module(id, meta);
	}

	// register current bean meta
	return this.registerBeanMeta(meta);
}

/**
 * ApplicationContext service locator pattern define module.
 *
 * @param   {String}   id
 * @param   {Function} factory factory function
 * @api public
 */
ApplicationContext.prototype.define = function(id, factory, context) {
	// loader env
	if (process.env.LOADER_BIN && Utils.isNotNull(context) && context['exports']) {
		return context['exports'] = {
			id: id,
			func: factory
		};
	}

	return this.getModuleFactory().define(id, factory);
}

/**
 * ApplicationContext service locator pattern define module.
 *
 * @param   {String}   id
 * @param   {Function} factory factory function
 * @api public
 */
ApplicationContext.prototype.require = function(id) {
	return this.getModuleFactory().require(id);
}

/**
 * ApplicationContext add startup loaded bean ids.
 *
 * @param   {Array} startup loaded bean ids
 * @api public
 */
ApplicationContext.prototype.use = function(ids) {
	this.loadBeans = this.loadBeans.concat(ids);
}

/**
 * ApplicationContext async load bean with bean ids.
 *
 * @param   {Array}    loaded bean ids
 * @param   {Function} callback function
 * @api public
 */
ApplicationContext.prototype.async = function(ids, cb) {
	var asyncScriptLoader = new AsyncScriptLoader();
	return asyncScriptLoader.load(loadBeans, cb);
}

/**
 * ApplicationContext check ApplicationContext contains bean or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.containsBean = function(beanName) {
	return this.getBeanFactory().containsBean(beanName);
}

/**
 * ApplicationContext check bean is a singleton or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.isSingleton = function(beanName) {
	return this.getBeanFactory().isSingleton(beanName);
}

/**
 * ApplicationContext check bean is a prototype or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.isPrototype = function(beanName) {
	return this.getBeanFactory().isPrototype(beanName);
}

/**
 * ApplicationContext check ApplicationContext contains beanName beanDefinition or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.containsBeanDefinition = function(beanName) {
	return this.getBeanFactory().containsBeanDefinition(beanName);
}

/**
 * ApplicationContext check whether applicationContext is running or not.
 *
 * @return {Boolean} true|false
 * @api public
 */
ApplicationContext.prototype.isRunning = function() {
	return this.active;
}

/**
 * ApplicationContext close beanFactory.
 *
 * @api public
 */
ApplicationContext.prototype.closeBeanFactory = function() {
	this.getBeanFactory().destroyBeanFactory();
	this.beanFactory = null;
}

/**
 * ApplicationContext check whether applicationContext has beanFactory or not.
 *
 * @return {Boolean} true|false
 * @api public
 */
ApplicationContext.prototype.hasBeanFactory = function() {
	return this.beanFactory != null;
}

/**
 * ApplicationContext getBeanFactory.
 *
 * @return {Object} beanFactory
 * @api public
 */
ApplicationContext.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

ApplicationContext.prototype.getModuleFactory = function() {
	if (!this.moduleFactory) {
		this.moduleFactory = new ModuleFactory();
	}

	return this.moduleFactory;
}

/**
 * ApplicationContext createBeanFactory.
 *
 * @api private
 */
ApplicationContext.prototype.createBeanFactory = function() {
	this.beanFactory = new BeanFactory();
}

/**
 * ApplicationContext get beanDefinition.
 *
 * @param  {String} beanName
 * @return {Object} beanDefinition
 * @api public
 */
ApplicationContext.prototype.getBeanDefinition = function(beanName) {
	return this.getBeanFactory().getBeanDefinition(beanName);
}

/**
 * ApplicationContext remove beanDefinition from ApplicationContext.
 *
 * @param  {String} beanName
 * @api public
 */
ApplicationContext.prototype.removeBeanDefinition = function(beanName) {
	return this.getBeanFactory().removeBeanDefinition(beanName);
}

/**
 * ApplicationContext set env.
 *
 * @param {String} env
 * @api public
 */
ApplicationContext.prototype.setEnv = function(env) {
	this.env = env;
}

/**
 * ApplicationContext get env.
 *
 * @return {String} env
 * @api public
 */
ApplicationContext.prototype.getEnv = function() {
	return this.env;
}

/**
 * ApplicationContext set config path.
 *
 * @param {String} cpath config path
 * @api public
 */
ApplicationContext.prototype.setConfigPath = function(cpath) {
	this.cpath = cpath;
}

/**
 * ApplicationContext get config path.
 *
 * @return {String} config path
 * @api public
 */
ApplicationContext.prototype.getConfigPath = function() {
	return this.cpath;
}

/**
 * ApplicationContext set hot reload path.
 *
 * @param {String} hpath hot reload path
 * @api public
 */
ApplicationContext.prototype.setHotPath = function(hpath) {
	this.hpath = hpath;
}

/**
 * ApplicationContext get hot reload path.
 *
 * @return {String} hpath hot reload path
 * @api public
 */
ApplicationContext.prototype.getHotPath = function() {
	return this.hpath;
}

/**
 * ApplicationContext get base path.
 *
 * @return {String} base path
 * @api public
 */
ApplicationContext.prototype.getBase = function() {
	return this.base;
}
}).call(this,require('_process'))
},{"../aop/autoproxy/autoProxyCreator":4,"../beans/beanFactory":11,"../beans/moduleFactory":12,"../beans/support/placeHolderConfigurer":18,"../model/constraints":22,"../model/modelKeyMapResolver":27,"../resource/asyncScriptLoader":29,"../resource/bootStrapLoader":30,"../resource/resourceLoader":34,"../util/constant":37,"../util/fileUtil":38,"../util/metaUtil":39,"../util/requireUtil":42,"../util/utils":44,"_process":51,"chokidar":56,"events":47,"pomelo-logger":57}],22:[function(require,module,exports){
(function (__dirname){
var Utils = require('../../util/utils');

var Constraints = {};
if (!Utils.checkBrowser()) {
	var fs = require('fs');
	var path = require('path');

	fs.readdirSync(__dirname).forEach(function(filename) {
		if (!/\.js$/.test(filename)) {
			return;
		}

		if (filename === 'index.js') {
			return;
		}

		var name = path.basename(filename, '.js');

		function load() {
			return require(__dirname + '/' + name);
		}

		Constraints.__defineGetter__(name, load);
	});
}

module.exports = Constraints;
}).call(this,"/lib/model/constraints")
},{"../../util/utils":44,"fs":46,"path":50}],23:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelAttribute
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Constant = require('../util/constant');
var Utils = require('../util/utils');
var Util = require('util');

/**
 * ModelAttribute constructor function.
 *
 * @api public
 */
var ModelAttribute = function() {
	this.ref = null;
	this.name = null;
	this.type = null;
	this.prefix = null;
	this.default = null;
	this.primary = false;
	this.balance = false;
	this.constraints = [];
	this.expression = null;
}

/**
 * ModelAttribute do filter attribute value.
 *
 * @param   {String} 	attribute value
 * @return  {Error}  	Error
 * @api public
 */
ModelAttribute.prototype.filter = function(value) {
	if (!Utils.isNotNull(value)) {
		return;
	}

	var r = this.filterType(value);
	if (Utils.checkModelFilterError(r)) {
		return r;
	}

	var key = this.name;
	var constraints = this.constraints;
	var constraintMethod = Constant.CONSTRAINT_METHOD;

	for (var i = 0; i < constraints.length; i++) {
		var constraint = constraints[i];
		if (constraint && Utils.checkFunction(constraint[constraintMethod])) {
			r = constraint[constraintMethod](key, value);
			if (Utils.checkModelFilterError(r)) {
				return r;
			}
		}
	}

	return;
}

/**
 * ModelAttribute do filter attribute value type.
 *
 * @param   {String} 	attribute value
 * @return  {Error} 	Error
 * @api private
 */
ModelAttribute.prototype.filterType = function(value) {
	var type = this.type;
	if (!Utils.checkString(type)) {
		return;
	}

	var Type = type;

	var isType = Utils.isType(Type);

	var r = isType(value);

	if (r !== true) {
		var message = 'field: %s with value: %s error, type not matched with %s';
		return new Error(Util.format(message, this.name, value, Type));
	}

	return;
}

/**
 * ModelAttribute do parse attribute expression.
 *
 * @param   {String} attribute expression
 * @param   {Object} bean factory
 * @api private
 */
ModelAttribute.prototype.parse = function(expression, beanFactory) {
	if (!expression) {
		return;
	}

	expression = expression.replace(/\s/g, "");

	var f = expression[0];
	if (f !== Constant.CONSTRAINT_ANNOTATION) {
		return;
	}

	expression = expression.substr(1);

	var list = expression.split(Constant.CONSTRAINT_SPLIT); // split by ;

	for (var i = 0; i < list.length; i++) {
		var name = "";
		var value = "";
		var index = -1;
		var props = [];

		var item = list[i];

		// continue with ""
		if (!item) {
			continue;
		}

		// "$primary;"
		if (item === Constant.MODEL_ATTRIBUTE_PRIMARY) {
			this[item] = true;
			continue;
		}

		// "$balance;"
		if (item === Constant.MODEL_ATTRIBUTE_BALANCE) {
			this[item] = true;
			continue;
		}

		index = item.indexOf(":");
		// "$type:String;default:aaa"
		if (index != -1) {
			var p = item.split(":");
			name = p[0].toLowerCase();

			if (p.length >= 2) {
				value = p[1];
				if (this.checkProps(name)) {
					if (name === "type") {
						value = Utils.normalizeType(value);
					}

					this[name] = value;
					continue;
				}
				// max:10
				else {
					props.push({
						name: name,
						value: value
					});
				}
			}
		}

		index = item.indexOf("(");

		if (index != -1) {
			name = item.substr(0, index);
			// no prefix name
			if (!name) {
				continue;
			}

			var left = item.substr(index);
			var len = left.length;
			// no this case
			// if (len < 1) {
			// 	continue;
			// }
			var last = left[len - 1];
			if (last !== ")") {
				continue;
			}

			left = left.substr(1, len - 2);
			var leftList = left.split(",");

			for (var j = 0; j < leftList.length; j++) {
				var leftProp = leftList[j].split("=");
				var leftPropLen = leftProp.length;

				if (leftPropLen < 2) {
					continue;
				}

				if (!leftProp[0] || !leftProp[1]) {
					continue;
				}

				props.push({
					name: leftProp[0],
					value: leftProp[1]
				});
			}
		}

		if (!name) {
			name = item;
		}

		var constraint = beanFactory.getConstraint(name);
		if (!constraint) {
			continue;
		}

		var constraintDefinition = beanFactory.getConstraintDefinition(name);

		var constraintExpression = constraintDefinition.getConstraint();
		if (constraintExpression) {
			this.parse(constraintExpression, beanFactory)
		}

		var propsLen = props.length;
		if (propsLen) {
			for (var k = 0; k < propsLen; k++) {
				var prop = props[k];
				var propName = prop['name'];
				var propValue = prop['value'];
				constraint[propName] = propValue;
			}
		}

		this.addConstraints(constraint);
	}
}

/**
 * ModelAttribute set expression.
 *
 * @param   {String} expression
 * @api public
 */
ModelAttribute.prototype.setExpression = function(expression) {
	this.expression = expression;
}

/**
 * ModelAttribute get expression.
 *
 * @return   {String} expression
 * @api public
 */
ModelAttribute.prototype.getExpression = function() {
	return this.expression;
}

/**
 * ModelAttribute set ref.
 *
 * @param   {String} ref string.
 * @api public
 */
ModelAttribute.prototype.setRef = function(ref) {
	this.ref = ref;
}

/**
 * ModelAttribute get ref.
 *
 * @return   {String} ref string.
 * @api public
 */
ModelAttribute.prototype.getRef = function() {
	return this.ref;
}

/**
 * ModelAttribute set attribute name.
 *
 * @param   {String} attribute name.
 * @api public
 */
ModelAttribute.prototype.setName = function(name) {
	this.name = name;
}

/**
 * ModelAttribute get attribute name.
 *
 * @return   {String} attribute name.
 * @api public
 */
ModelAttribute.prototype.getName = function() {
	return this.name;
}

/**
 * ModelAttribute set attribute type.
 *
 * @param   {String} attribute type.
 * @api public
 */
ModelAttribute.prototype.setType = function(type) {
	this.type = type;
}

/**
 * ModelAttribute get attribute type.
 *
 * @return   {String} attribute type.
 * @api public
 */
ModelAttribute.prototype.getType = function(type) {
	return this.type;
}

/**
 * ModelAttribute set attribute primary.
 *
 * @param   {Boolean} if it is the attribute primary.
 * @api public
 */
ModelAttribute.prototype.setPrimary = function(primary) {
	this.primary = primary;
}

/**
 * ModelAttribute get attribute primary.
 *
 * @return   {Boolean} attribute primary.
 * @api public
 */
ModelAttribute.prototype.getPrimary = function() {
	return this.primary;
}

/**
 * ModelAttribute set attribute default value.
 *
 * @param   {String} attribute default value.
 * @api public
 */
ModelAttribute.prototype.setDefault = function(defaultValue) {
	this.default = defaultValue;
}

/**
 * ModelAttribute get attribute default value.
 *
 * @return   {String} attribute default value.
 * @api public
 */
ModelAttribute.prototype.getDefault = function() {
	return this.default;
}

/**
 * ModelAttribute set attribute prefix.
 *
 * @param   {String} attribute prefix.
 * @api public
 */
ModelAttribute.prototype.setPrefix = function(prefix) {
	this.prefix = prefix;
}

/**
 * ModelAttribute get attribute prefix.
 *
 * @return   {String} attribute prefix.
 * @api public
 */
ModelAttribute.prototype.getPrefix = function() {
	return this.prefix;
}

/**
 * ModelAttribute check if it is a primary attribute.
 *
 * @param   {Boolean} if it is a primary attribute.
 * @api public
 */
ModelAttribute.prototype.isPrimary = function() {
	return this.primary;
}

/**
 * ModelAttribute check if it is a balance attribute.
 *
 * @param   {Boolean} if it is a balance attribute.
 * @api public
 */
ModelAttribute.prototype.isBalance = function() {
	return this.balance;
}

/**
 * ModelAttribute add constraint.
 *
 * @param   {Object} constraint object.
 * @api public
 */
ModelAttribute.prototype.addConstraints = function(constraint) {
	this.constraints.push(constraint);
}

/**
 * ModelAttribute check attribute properties.
 *
 * @param   {Boolean} check result.
 * @api private
 */
ModelAttribute.prototype.checkProps = function(key) {
	var attributes = Constant.MODEL_ATTRIBUTES;
	for (var i = 0; i < attributes.length; i++) {
		if (key === attributes[i]) {
			return true;
		}
	}

	return false;
}

module.exports = ModelAttribute;
},{"../util/constant":37,"../util/utils":44,"util":53}],24:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelConstraint
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

/**
 * ModelConstraint constructor function.
 *
 * @api public
 */
var ModelConstraint = function() {
	this.id = null;
	this.cid = null;
	this.constraint = null;
}

/**
 * ModelConstraint set bean id.
 *
 * @param   {String} bean id
 * @api public
 */
ModelConstraint.prototype.setId = function(id) {
	this.id = id;
}

/**
 * ModelConstraint get bean id.
 *
 * @return   {String} bean id
 * @api public
 */
ModelConstraint.prototype.getId = function() {
	return this.id;
}

/**
 * ModelConstraint set constraint id.
 *
 * @param   {String} constraint id
 * @api public
 */
ModelConstraint.prototype.setCid = function(cid) {
	this.cid = cid;
}

/**
 * ModelConstraint get bean id.
 *
 * @return   {String} constraint id
 * @api public
 */
ModelConstraint.prototype.getCid = function() {
	return this.cid;
}

/**
 * ModelConstraint set constraint expression.
 *
 * @param   {String} constraint expression
 * @api public
 */
ModelConstraint.prototype.setConstraint = function(constraint) {
	this.constraint = constraint;
}

/**
 * ModelConstraint get constraint expression.
 *
 * @return   {String} constraint expression
 * @api public
 */
ModelConstraint.prototype.getConstraint = function() {
	return this.constraint;
}

module.exports = ModelConstraint;
},{}],25:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelDefinition
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Utils = require('../util/utils');

/**
 * ModelDefinition constructor function.
 *
 * @api public
 */
var ModelDefinition = function() {
	this.id = null;
	this.mid = null;
	this.table = null;
	this.prefix = null;
	this.balance = null;
	this.fields = {};
	this.refFields = [];
	this.modelKeyMap = {};
	this.oneToMany = false;
}

/**
 * ModelDefinition set bean id.
 *
 * @param   {String} bean id
 * @api public
 */
ModelDefinition.prototype.setId = function(id) {
	this.id = id;
}

/**
 * ModelDefinition get bean id.
 *
 * @return   {String} bean id
 * @api public
 */
ModelDefinition.prototype.getId = function() {
	return this.id;
}

/**
 * ModelDefinition set model id.
 *
 * @param   {String} model id
 * @api public
 */
ModelDefinition.prototype.setMid = function(mid) {
	this.mid = mid;
}

/**
 * ModelDefinition get model id.
 *
 * @return   {String} model id
 * @api public
 */
ModelDefinition.prototype.getMid = function() {
	return this.mid;
}

/**
 * ModelDefinition set ORM table.
 *
 * @param   {String} ORM table
 * @api public
 */
ModelDefinition.prototype.setTable = function(table) {
	if (!table) {
		return;
	}

	this.table = table;
}

/**
 * ModelDefinition get ORM table.
 *
 * @return   {String} ORM table
 * @api public
 */
ModelDefinition.prototype.getTable = function() {
	return this.table;
}

/**
 * ModelDefinition set model definition prefix.
 *
 * @param   {String} model definition prefix
 * @api public
 */
ModelDefinition.prototype.setPrefix = function(prefix) {
	if (!prefix) {
		return;
	}

	this.prefix = prefix;
}

/**
 * ModelDefinition get model definition prefix.
 *
 * @return   {String} model definition prefix
 * @api public
 */
ModelDefinition.prototype.getPrefix = function() {
	return this.prefix;
}

/**
 * ModelDefinition set model definition balance field for ddb sharding.
 *
 * @param   {String} model definition balance field
 * @api public
 */
ModelDefinition.prototype.setBalance = function(balance) {
	if (!balance) {
		return;
	}

	this.balance = balance;
}

/**
 * ModelDefinition get model definition balance field for ddb sharding.
 *
 * @return   {String} model definition balance field
 * @api public
 */
ModelDefinition.prototype.getBalance = function() {
	return this.balance;
}

/**
 * ModelDefinition set model fields.
 *
 * @param   {Array} model fields
 * @api public
 */
ModelDefinition.prototype.setFields = function(fields) {
	if (Utils.isNotNull(fields)) {
		this.fields = fields;
	}
}

/**
 * ModelDefinition get model fields.
 *
 * @return   {Array} model fields
 * @api public
 */
ModelDefinition.prototype.getFields = function() {
	return this.fields;
}

/**
 * ModelDefinition get model field by key.
 *
 * @return   {Object} model field
 * @api public
 */
ModelDefinition.prototype.getField = function(key) {
	return this.fields[key];
}

/**
 * ModelDefinition add ref field name.
 *
 * @param   {String} ref field name
 * @api public
 */
ModelDefinition.prototype.addRefField = function(refField) {
	this.refFields.push(refField);
}

/**
 * ModelDefinition set ref fields.
 *
 * @param   {Array} ref fields
 * @api public
 */
ModelDefinition.prototype.setRefFields = function(refFields) {
	if (Utils.isNotNull(refFields)) {
		this.refFields = refFields;
	}
}

/**
 * ModelDefinition get ref fields.
 *
 * @return   {Array} ref fields
 * @api public
 */
ModelDefinition.prototype.getRefFields = function() {
	return this.refFields;
}

/**
 * ModelDefinition set model key map used for resultSet to model object mapping.
 *
 * @param   {Object} model key map
 * @api public
 */
ModelDefinition.prototype.setModelKeyMap = function(modelKeyMap) {
	this.modelKeyMap = modelKeyMap;
}

/**
 * ModelDefinition get model key map used for resultSet to model object mapping.
 *
 * @return   {Object} model key map
 * @api public
 */
ModelDefinition.prototype.getModelKeyMap = function() {
	return this.modelKeyMap;
}

/**
 * ModelDefinition set model oneToMany relation.
 *
 * @param   {Boolean} oneToMany relation
 * @api public
 */
ModelDefinition.prototype.setOneToMany = function(oneToMany) {
	this.oneToMany = oneToMany;
}

/**
 * ModelDefinition check model oneToMany relation.
 *
 * @return   {Boolean} if it is oneToMany relation
 * @api public
 */
ModelDefinition.prototype.isOneToMany = function() {
	return this.oneToMany;
}

module.exports = ModelDefinition;
},{"../util/utils":44}],26:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelFilter
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'ModelFilter');
var Utils = require('../util/utils');

/**
 * ModelFilter constructor function.
 *
 * @api public
 */
var ModelFilter = function() {
	this.modelBean = null;
	this.modelDefinition = null;
}

/**
 * ModelFilter set model object ref.
 *
 * @param   {Object} model object ref
 * @api public
 */
ModelFilter.prototype.setModel = function(modelBean) {
	this.modelBean = modelBean;
}

/**
 * ModelFilter get model object ref.
 *
 * @return   {Object} model object ref
 * @api public
 */
ModelFilter.prototype.getModel = function() {
	return this.modelBean;
}

/**
 * ModelFilter set model definition.
 *
 * @param   {Object} model definition
 * @api public
 */
ModelFilter.prototype.setModelDefinition = function(modelDefinition) {
	this.modelDefinition = modelDefinition;
}

/**
 * ModelFilter get model definition.
 *
 * @return   {Object} model definition
 * @api public
 */
ModelFilter.prototype.getModelDefinition = function() {
	return this.modelDefinition;
}

/**
 * ModelFilter model filter key/value attribute.
 *
 * @param   {String} model attribute key
 * @param   {String} model attribute value
 * @api public
 */
ModelFilter.prototype.filter = function(key, value) {
	if (Utils.checkString(key)) {
		return this.doFilterKey(key, value);
	}

	return this.doFilterKeys();
}

/**
 * ModelFilter do model filter key/value attribute.
 *
 * @param   {String} 		model attribute key
 * @param   {String} 		model attribute value
 *
 * @return  {Boolean|Error} true|false|Error
 * @api private
 */
ModelFilter.prototype.doFilterKey = function(key, value) {
	var field = this.modelDefinition.getField(key);
	if (field) {
		return field.filter(value);
	}
}

/**
 * ModelFilter do model filter key/value attributes.
 *
 * @param   {String} 	model attribute key
 * @param   {String} 	model attribute value
 *
 * @return  {Error} 	Error
 * @api private
 */
ModelFilter.prototype.doFilterKeys = function() {
	var fields = this.modelDefinition.getFields();

	for (var key in fields) {
		var field = fields[key];
		var value = this.modelBean[key];
		var r = field.filter(value);
		if (Utils.checkModelFilterError(r)) {
			return r;
		}
	}

	return;
}

module.exports = ModelFilter;
},{"../util/utils":44,"pomelo-logger":57}],27:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelKeyMapResolver
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'ModelKeyMapResolver');

/**
 * ModelKeyMapResolver constructor function.
 *
 * @api public
 */
var ModelKeyMapResolver = function() {

}

/**
 * ModelKeyMapResolver post process beanFactory.
 *
 * @param  {Object} beanFactory
 * @api public
 */
ModelKeyMapResolver.prototype.postProcessBeanFactory = function(beanFactory) {
	this.processModelKeyMap(beanFactory);
}

/**
 * ModelKeyMapResolver process model key map.
 *
 * @param  {Object} beanFactory
 * @api public
 */
ModelKeyMapResolver.prototype.processModelKeyMap = function(beanFactory) {
	var models = beanFactory.getModelDefinitions();

	for (var modelId in models) {
		var modelDefinition = models[modelId];
		var modelKeyMap = {};
		this.processModelDefinition(beanFactory, modelDefinition, modelKeyMap, {});
		modelDefinition.setModelKeyMap(modelKeyMap);
	}
}

/**
 * ModelKeyMapResolver post model definition.
 *
 * @param  {Object} beanFactory
 * @param  {Object} modelDefinition
 * @param  {Object} modelKeyMap
 * @param  {Object} option
 * @api public
 */
ModelKeyMapResolver.prototype.processModelDefinition = function(beanFactory, modelDefinition, modelKeyMap, option) {
	var fields = modelDefinition.getFields();

	var modelId = modelDefinition.getMid();
	var prefix = modelDefinition.getPrefix();
	var optionPrefix = option['prefix'] || prefix;
	var parentId = option['pid'];
	var parentType = option['ptype'];
	var parentField = option['pfield'];

	for (var fieldName in fields) {
		var field = fields[fieldName];
		var fieldName = field.getName();
		var modelRefId = field.getRef();
		var fieldPrefix = field.getPrefix();
		var fieldType = field.getType();

		var modelKey = "";
		if (optionPrefix) {
			modelKey += optionPrefix;
		}

		modelKey = modelKey + fieldName;

		if (modelRefId) {
			var modelRefDefinition = beanFactory.getModelDefinition(modelRefId);

			if (!modelRefDefinition) {
				logger.warn('model field ref id %s not exsit', modelRefId);
				continue;
			}

			var option = {
				pid: modelId,
				ptype: fieldType,
				pfield: fieldName
			};

			if (fieldPrefix) {
				option['prefix'] = fieldPrefix;
			}

			this.processModelDefinition(beanFactory, modelRefDefinition, modelKeyMap, option);
			continue;
		}

		modelKeyMap[modelKey] = {
			id: modelId,
			pid: parentId,
			ptype: parentType,
			pfield: parentField,
			fieldName: fieldName,
			type: fieldType
		};
	}
}

module.exports = ModelKeyMapResolver;
},{"pomelo-logger":57}],28:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelProxy
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'ModelProxy');
var Constant = require('../util/constant');
var Utils = require('../util/utils');

/**
 * ModelProxy constructor function.
 *
 * @api public
 */
var ModelProxy = function() {
	this.model = null;
	this.modelFilter = null;
	this.beanFactory = null;
	this.beanDefinition = null;
	this.modelDefinition = null;
	this.beforeNames = [];
	this.afterNames = [];
	this.beforeName = null;
	this.afterName = null;
	this.beforeFlag = false;
	this.afterFlag = false;
}

/**
 * ModelProxy set key/value to model.
 *
 * @param  {String} 	key
 * @param  {Object} 	value
 * @return {Object} 	Error object when set value failed
 * @api public
 */
ModelProxy.prototype.$set = function(key, value) {
	var model = this.model;
	this['beforeFlag'] = true; // setup before flag, enable builtin constaints by default
	var befores = this._getFilters(Constant.MODEL_FILTER_BEFORE);

	// do model before filters
	var r = this._doFilters(befores, key, value);

	if (Utils.checkModelFilterError(r)) {
		return this._result(r);
	}

	//  setup value
	model[key] = value;

	var afters = this._getFilters(Constant.MODEL_FILTER_AFTER);

	// do model after filters
	r = this._doFilters(afters, key, value);

	if (Utils.checkModelFilterError(r)) {
		return this._result(r);
	}

	return this._result(r);
}

/**
 * ModelProxy get data from model.
 *
 * @param  {String} key
 * @return {Object} data value
 * @api public
 */
ModelProxy.prototype.$get = function(key) {
	return this.model[key];
}

/**
 * ModelProxy pack data object to model.
 *
 * @param  {Object} 	data
 * @return {Object} 	Error object when pack data failed
 * @api public
 */
ModelProxy.prototype.$pack = function(data) {
	if (!Utils.checkObject(data)) {
		return new Error('pack data must be Object');
	}

	var model = this.model;

	for (var key in data) {
		var value = data[key];
		model[key] = value;
	}

	this['afterFlag'] = true;

	// $pack only have after filters
	var afters = this._getFilters(Constant.MODEL_FILTER_AFTER);

	// do model after filters
	var r = this._doFilters(afters);

	if (Utils.checkModelFilterError(r)) {
		return this._result(r);
	}

	return this._result(r);
}

/**
 * ModelProxy pack db ResultSet data to model.
 *
 * @param  {Object} resultSet data
 * @return {Object|Boolean} Error|true
 * @api public
 */
ModelProxy.prototype.$packResultSet = function(resultSet) {
	if (!Utils.checkObject(resultSet)) {
		return new Error('resultSet must be Object');
	}

	var beanFactory = this.beanFactory;
	var resultModelId = this.modelDefinition.getMid();
	var resultModel = this;

	if (!resultModel) {
		logger.error('packResultSet error no such result model %s', resultModelId);
		return;
	}

	var modelKeyMap = this.modelDefinition.getModelKeyMap();

	var dataResult = resultSet;

	var modelResultMap = {};
	for (var dataKey in dataResult) {
		var dataValue = dataResult[dataKey];
		if (Utils.checkFunction(dataValue)) {
			continue;
		}

		var modelMap = modelKeyMap[dataKey];
		if (!modelMap) {
			logger.warn('packResultSet resultSet key %s does not match any model attribute', dataKey);
			continue;
		}

		var modelId = modelMap['id'];
		var fieldName = modelMap['fieldName'];
		var fieldType = modelMap['type'];
		var pid = modelMap['pid'] || modelId;
		var pfield = modelMap['pfield'] || fieldName;
		var ptype = modelMap['ptype'];

		var model;
		if (Utils.checkTypeArray(ptype) || Utils.checkTypeObject(ptype)) {
			var modelResultMapKey = pid + "_" + pfield;
			model = modelResultMap[modelResultMapKey];
			if (!model) {
				model = beanFactory.getModelProxy(modelId);
				modelResultMap[modelResultMapKey] = model; // ref model object
			}
		} else {
			model = this;
		}

		var r = model.$before().$set(fieldName, dataValue); // set data, do filter
		if (Utils.checkModelFilterError(r)) {
			return r;
		}
	}

	this._doPackResultSet(resultModel, modelResultMap);
}

/**
 * ModelProxy set before filter to model.
 * filter can be String which is the name of the filter method in the model
 * or can be Array which contains the filter methods in order
 *
 * @param  {String|Array} before filter
 * @api public
 */
ModelProxy.prototype.$before = function(before) {
	return this._filter(Constant.MODEL_FILTER_BEFORE, before);
}

/**
 * ModelProxy set after filter to model.
 * filter can be String which is the name of the filter method in the model
 * or can be Array which contains the filter methods in order
 *
 * @param  {String|Array} after filter
 * @api public
 */
ModelProxy.prototype.$after = function(after) {
	return this._filter(Constant.MODEL_FILTER_AFTER, after);
}

ModelProxy.prototype.$clone = function() {

}

/**
 * ModelProxy  model proxy init.
 *
 * @api private
 */
ModelProxy.prototype._modelInit = function() {
	var beanDefinition = this.beanDefinition;
	if (!beanDefinition) {
		logger.error('init error no beanDefinition.');
		return;
	}

	var self = this;

	var func = beanDefinition.getFunc();

	if (Utils.checkFunction(func)) {
		var proto = func.prototype;
		for (interface in proto) {
			if (Utils.checkFunction(proto[interface])) {
				(function(method) {
					if (checkFuncName(method)) {
						logger.error('init error proxy method interface %j the same as ModelProxy, rename this name to another.', method)
						return;
					};

					self[method] = function() {
						return self._modelInvoke(method, arguments);
					};
				})(interface);
			}
		}
	}
}

/**
 * ModelProxy model proxy invoke methods.
 *
 * @param  {String} invoke method name
 * @param  {Array}  invoke arguments
 * @return {Object} invoke result
 * @api private
 */
ModelProxy.prototype._modelInvoke = function(method, args) {
	var targetModel = this.model;
	if (Utils.checkFunction(targetModel[method])) {
		return targetModel[method].apply(targetModel, args);
	} else {
		logger.error('invoke error with %s %j', method, args);
	}
}

/**
 * ModelProxy do pack db ResultSet data to model.
 *
 * @param  {Object} resultSet data
 * @return {Object|Boolean} Error|true
 * @api private
 */
ModelProxy.prototype._doPackResultSet = function(resultModel, modelResultMap) {
	var resultModelFields = resultModel.modelDefinition.getFields();
	var resultModelId = resultModel.modelDefinition.getMid();
	var beanFactory = this.beanFactory;

	for (var resultFieldKey in resultModelFields) {
		var resultField = resultModelFields[resultFieldKey];
		var resultFieldRef = resultField.getRef();
		var resultFieldType = resultField.getType();
		var key = resultModelId + "_" + resultFieldKey;
		var value = modelResultMap[key];

		if (!Utils.isNotNull(value) && resultFieldRef) {
			var refModel = beanFactory.getModelProxy(resultFieldRef);
			if (refModel) {
				this._doPackResultSet(refModel, modelResultMap);
				value = refModel;
			}
		}

		if (!Utils.isNotNull(value)) {
			continue;
		}

		var oneToMany = false;
		if (Utils.checkTypeArray(resultFieldType)) {
			oneToMany = true;
		}

		if (oneToMany) {
			var resultFieldValue = resultModel.$get(resultFieldKey);
			if (!Utils.checkArray(resultFieldValue)) {
				resultFieldValue = [];
			}

			resultFieldValue.push(value);
			resultModel['model'][resultFieldKey] = resultFieldValue;
			continue;
		}

		resultModel.$set(resultFieldKey, value);
	}
}

/**
 * ModelProxy do set filter to model.
 *
 * @param  {String}       filter type
 * @param  {String|Array} filter
 * @api private
 */
ModelProxy.prototype._filter = function(type, filter) {
	if (type !== Constant.MODEL_FILTER_BEFORE && type !== Constant.MODEL_FILTER_AFTER) {
		logger.warn('unknow model filter type %s', type);
		return this;
	}

	this[type + 'Flag'] = true;

	if (Utils.checkString(filter)) {
		this[type + 'Name'] = filter;
	}

	if (Utils.checkArray(filter)) {
		this[type + 'Names'] = filter;
	}

	return this;
}

/**
 * ModelProxy get filters by type.
 *
 * @param  {String} filter type
 * @param  {Array} 	filters
 * @api private
 */
ModelProxy.prototype._getFilters = function(type) {
	if (type !== Constant.MODEL_FILTER_BEFORE && type !== Constant.MODEL_FILTER_AFTER) {
		return;
	}

	var filters = [];

	// before filter
	// before + after filter only do the builtin filter once
	if (type === Constant.MODEL_FILTER_BEFORE ||
		(type === Constant.MODEL_FILTER_AFTER && !this.beforeFlag)) {
		if (this[type + 'Flag']) {
			filters.push({
				type: Constant.FILTER_BUILTIN,
				method: Constant.FILTER_BUILTIN_METHOD // "filter"
			});
		}
	}

	var filterName = this[type + 'Name'];
	if (filterName) {
		var filterArray = this._modelInvoke(filterName);
		if (Utils.checkArray(filterArray)) {
			for (var i = 0; i < filterArray.length; i++) {
				filters.push({
					type: Constant.FILTER_MODEL,
					method: filterArray[i]
				});
			}
		}
	}

	var filterNames = this[type + 'Names'];
	for (var j = 0; j < filterNames.length; j++) {
		filters.push({
			type: Constant.FILTER_MODEL,
			method: filterNames[j]
		});
	}

	return filters;
}

/**
 * ModelProxy do filters with key value.
 *
 * @param  {Array}  filters
 * @param  {String} key
 * @param  {Object} value
 * @return {Error}  Error object
 * @api private
 */
ModelProxy.prototype._doFilters = function(filters, key, value) {
	if (!filters || !filters.length) {
		return;
	}

	var r;
	for (var i = 0; i < filters.length; i++) {
		var filter = filters[i];
		var type = filter['type'];
		var method = filter['method'];
		if (type === Constant.FILTER_BUILTIN) {
			r = this.modelFilter[method](key, value);
			if (Utils.checkModelFilterError(r)) {
				return r;
			}
		}

		if (type === Constant.FILTER_MODEL) {
			var args = [];
			if (Utils.isNotNull(key)) args.push(key);
			if (Utils.isNotNull(value)) args.push(value);
			r = this._modelInvoke(method, args); // just call the filter method
			if (Utils.checkModelFilterError(r)) {
				return r;
			}
		}
	}

	return;
}

/**
 * ModelProxy reset result.
 *
 * @param  {Object}  result
 * @return {Object}  result
 * @api private
 */
ModelProxy.prototype._result = function(r) {
	this._reset(Constant.MODEL_FILTER_BEFORE);
	this._reset(Constant.MODEL_FILTER_AFTER);

	return r;
}

/**
 * ModelProxy reset filter.
 *
 * @param  {String}  filter type
 * @api private
 */
ModelProxy.prototype._reset = function(type) {
	if (type !== Constant.MODEL_FILTER_BEFORE && type !== Constant.MODEL_FILTER_AFTER) {
		return;
	}

	this[type + 'Flag'] = false;
	this[type + 'Name'] = null;
	this[type + 'Names'] = [];
}

/**
 * ModelProxy toJSON.
 *
 * @api public
 */
ModelProxy.prototype.toJSON = function() {
	return this.model;
}

var names = ["_modelInit", "_modelInvoke", "$set", "$pack", "$packResultSet",
	"_doPackResultSet", "$get", "$before", "$after", "_filter", "$clone",
	"_getFilters", "_doFilters", "_result", "_reset", "toJSON"
];

var checkFuncName = function(name) {
	for (var i = 0; i < names.length; i++) {
		if (name === names[i]) {
			return true;
		}
	}

	return false;
}

module.exports = ModelProxy;
},{"../util/constant":37,"../util/utils":44,"pomelo-logger":57}],29:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat AsyncScriptLoader
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'AsyncScriptLoader');
var BeanModule = require('../beans/support/beanModule');
var Path = require('../util/requireUtil').requirePath();
var ScriptUtil = require('../util/scriptUtil');
var Utils = require('../util/utils');
var cid = 1;

var Root;
(function() {
	Root = this;
}());

/**
 * AsyncScriptLoader constructor function.
 *
 * @api public
 */
var AsyncScriptLoader = function() {
	this.cacheModules = {};
	this.loaderDir = null;
	this.applicationContext = null;
}

/**
 * AsyncScriptLoader get loaded beans list.
 *
 * @return  {Array}  loaded beans
 * @api public
 */
AsyncScriptLoader.prototype.getLoadBeans = function() {
	return this.loadBeans;
}

/**
 * AsyncScriptLoader load beans asynchronously.
 *
 * @param  {Array}     loaded beans ids
 * @param  {Function}  callback function
 * @api public
 */
AsyncScriptLoader.prototype.load = function(ids, cb) {
	this.loaderDir = ScriptUtil.getLoaderDir();

	var uri = this.loaderDir + '_load_' + cid++;
	var mod = this.get(uri, ids);

	mod.addEntry(mod);
	mod.setRemain(1);

	mod.callback = function() {
		if (Utils.checkFunction(cb)) {
			cb();
		}

		delete mod.callback
		delete mod.history
		delete mod.remain
		delete mod.entries;
	}

	mod.load();
}

/**
 * AsyncScriptLoader save load script with uri meta.
 *
 * @param  {String}  uri
 * @param  {Object}  bean meta
 * @api public
 */
AsyncScriptLoader.prototype.save = function(uri, meta) {
	var mod = this.get(uri)

	// Do NOT override already saved modules
	if (mod.status < BeanModule.STATUS.SAVED) {
		mod.id = meta.id || uri
		mod.dependencies = meta.deps || []
		mod.factory = meta.factory
		mod.status = BeanModule.STATUS.SAVED
	}
}

/**
 * AsyncScriptLoader register script with id, meta.
 *
 * @param  {String}  id
 * @param  {Object}  bean meta
 * @api public
 */
AsyncScriptLoader.prototype.module = function(id, beanMeta) {
	var deps = this.resolveDeps(beanMeta);

	var meta = {
		id: id,
		uri: this.resolve(id),
		deps: deps
	};

	meta.uri ? this.save(meta.uri, meta) :
		// Save information for "saving" work in the script onload event
		BeanModule.anonymousMeta = meta;
}

/**
 * AsyncScriptLoader resolve uri path with refUri.
 *
 * @param  {String}  id
 * @param  {String}  refUri
 * @return {String}  resolved path
 * @api public
 */
AsyncScriptLoader.prototype.resolve = function(id, refUri) {
	// id path map
	var path = this.getPathById(id);
	if (!path) {
		path = id;
		logger.warn('id: ' + id + ' can not be resolved, try run bearcat generate or use bearcat.module to register it');
	}

	return path;
}

/**
 * AsyncScriptLoader resolve deps through bean meta.
 *
 * @param  {Object}  bean meta
 * @param  {Array}   resolved deps
 * @api public
 */
AsyncScriptLoader.prototype.resolveDeps = function(beanMeta) {
	var propsOn = beanMeta.props;
	if (!Utils.isNotNull(propsOn) || !propsOn) {
		return;
	}

	var deps = [];

	for (var i = 0; i < propsOn.length; i++) {
		var prop = propsOn[i];
		var ref = prop['ref'];

		if (ref) {
			// do not load already registered beans
			if (this.applicationContext.getBeanDefinition(ref)) {
				continue;
			}
			deps.push(ref);
		}
	}

	return deps;
}

/**
 * AsyncScriptLoader get bean path through bean id.
 *
 * @param  {String}  id
 * @return {String}  bean path
 * @api public
 */
AsyncScriptLoader.prototype.getPathById = function(id) {
	if (Root.__bearcatData__ && Root.__bearcatData__.idPaths) {
		return Root.__bearcatData__.idPaths[id];
	}
}

/**
 * AsyncScriptLoader get script from cache or new.
 *
 * @param  {String}  uri
 * @param  {Array}   deps id
 * @return {Object}  module
 * @api public
 */
AsyncScriptLoader.prototype.get = function(uri, deps) {
	return this.cacheModules[uri] || (this.cacheModules[uri] = new BeanModule(uri, deps, this));
}

/**
 * AsyncScriptLoader set applicationContext reference.
 *
 * @param  {Object}  applicationContext
 * @api public
 */
AsyncScriptLoader.prototype.setApplicationContext = function(applicationContext) {
	this.applicationContext = applicationContext;
}

module.exports = AsyncScriptLoader;
},{"../beans/support/beanModule":16,"../util/requireUtil":42,"../util/scriptUtil":43,"../util/utils":44,"pomelo-logger":57}],30:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BootStrapLoader
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

/**
 * BootStrapLoader constructor function.
 *
 * @api public
 */
var BootStrapLoader = function() {

}

/**
 * BootStrapLoader load script files.
 *
 * @param  {Array}     bootstrap idPaths
 * @api public
 */
BootStrapLoader.prototype.load = function(idPaths) {
	for (var id in idPaths) {
		var idPath = idPaths[id];
		require(idPath);
	}
}

module.exports = BootStrapLoader;
},{}],31:[function(require,module,exports){
(function (process){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ConfigLoader
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'ConfigLoader');
var RequireUtil = require('../util/requireUtil');
var MetaUtil = require('../util/metaUtil');
var Constant = require('../util/constant');
var MetaLoader = require('./metaLoader');
var Utils = require('../util/utils');
var Path = RequireUtil.requirePath();

/**
 * ConfigLoader constructor function.
 *
 * @api public
 */
var ConfigLoader = function() {}

module.exports = ConfigLoader;

/**
 * ConfigLoader get meta loader.
 *
 * @return  {Object} meta loader
 * @api public
 */
ConfigLoader.prototype.getMetaLoader = function() {
	return new MetaLoader();
}

/**
 * ConfigLoader get meta objects from context path.
 *
 * @param   {String} cpath context path
 * @return  {Object} meta objects
 * @api public
 */
ConfigLoader.prototype.getResources = function(cpath) {
	var scanPaths = [];
	var metaObjects = {};
	var metaLoader = this.getMetaLoader();
	this.getRecursiveScanPath(cpath, scanPaths, metaObjects);

	for (var beanName in metaObjects) {
		metaLoader.setMetaObject(beanName, metaObjects[beanName]);
	}

	for (var i = 0; i < scanPaths.length; i++) {
		metaLoader.load(scanPaths[i]);
	}

	return metaLoader.getMetaObjects();
}

/**
 * ConfigLoader get recursive scan paths and metaObjects in context.json.
 *
 * @param   {String} cpath context path
 * @param   {Array}  scanPaths scan paths
 * @param   {Object} metaObjects
 * @api public
 */
ConfigLoader.prototype.getRecursiveScanPath = function(cpath, scanPaths, metaObjects) {
	var context = Utils.myRequire(cpath);
	if (!context) {
		return;
	}

	var scan = context.scan;
	var beans = context.beans;
	// var browser = context.browser;
	var imports = context.imports;
	var namespace = context.namespace;
	var dependencies = context.dependencies;

	var dpath = Path.dirname(cpath);

	// if (Utils.checkString(browser)) {
	// 	return this.getRecursiveScanPath(dpath + '/' + browser, scanPaths, metaObjects);
	// } else if (Utils.checkArray(browser)) {
	// 	for (var i = 0; i < browser.length; i++) {
	// 		this.getRecursiveScanPath(dpath + '/' + browser[i], scanPaths, metaObjects);
	// 	}
	// 	return;
	// }

	for (var dependency in dependencies) {
		this.getRecursiveScanPath(dpath + '/node_modules/' + dependency + '/context.json', scanPaths, metaObjects);
	}

	if (Utils.checkArray(imports)) {
		for (var j = 0; j < imports.length; j++) {
			this.getRecursiveScanPath(dpath + '/' + imports[j], scanPaths, metaObjects);
		}
	}

	// context.json defined bean metadatas
	if (beans) {
		for (var i = 0; i < beans.length; i++) {
			var bean = beans[i];
			var beanName = bean['id'];

			if (namespace) {
				beanName = namespace + Constant.NAMESPACE_SEPERATOR + beanName;
			}

			// var loadpath = this.loadedContextBeans[beanName];
			// if (beanName && loadpath) {
			// 	logger.warn("bean %j defined in %j has already defined in %j, please check your configuration metadata files", beanName, cpath, loadpath);
			// 	continue;
			// }

			var beanObject = null;
			var funcPath = "";
			if (Utils.checkString(bean['func'])) {
				// beans from require, may be cached by require when you do with the same context.json
				funcPath = Utils.getLoadPath(bean['func'], cpath);
				beanObject = Utils.myRequire(funcPath);
			}

			if (beanObject) {
				if (Utils.checkFunction(beanObject)) {
					bean['func'] = beanObject;
				} else if (Utils.checkObject(beanObject)) {
					if (beanObject['id'] && beanObject['id'] === beanName) {
						// meta defined in js file override context.json
						bean = MetaUtil.mergeMeta(beanObject, bean);
						bean['ftype'] = 'object';
					} else {
						logger.error('meta defined in file %j %j mismatch with that defined in context %j', funcPath, beanObject, bean);
						continue;
					}
				}
			}

			if (beanName) {
				var originMeta = metaObjects[beanName];
				metaObjects[beanName] = MetaUtil.mergeMeta(bean, originMeta);
				if (funcPath) {
					bean['fpath'] = Path.resolve(process.cwd(), funcPath);
				}
			}
		}
	}

	if (Utils.checkString(scan)) {
		var scanPath = Utils.getLoadPath2(scan, cpath);
		scanPaths.push(scanPath);
	}

	if (Utils.checkArray(scan)) {
		for (var i = 0; i < scan.length; i++) {
			var scanPath = Utils.getLoadPath2(scan[i], cpath);
			scanPaths.push(scanPath);
		}
	}
}
}).call(this,require('_process'))
},{"../util/constant":37,"../util/metaUtil":39,"../util/requireUtil":42,"../util/utils":44,"./metaLoader":32,"_process":51,"pomelo-logger":57}],32:[function(require,module,exports){
(function (process){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat MetaLoader
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'MetaLoader');
var FileUtil = require('../util/fileUtil');
var MetaUtil = require('../util/metaUtil');
var Constant = require('../util/constant');
var Utils = require('../util/utils');
var path = require('path');

/**
 * MetaLoader constructor function.
 *
 * @api public
 */
var MetaLoader = function() {
	this.metaObjects = {};
}

module.exports = MetaLoader;

/**
 * MetaLoader load metaObjects from meta path.
 *
 * @param   {String} mpath
 * @return  {Object} meta objects
 * @api public
 */
MetaLoader.prototype.load = function(mpath) {
	if (!mpath) {
		logger.error('load path should not be empty.');
		return;
	}

	mpath = FileUtil.realpathSync(mpath);

	if (!Utils.isDir(mpath)) {
		logger.error('path should be directory.');
		return;
	}

	this.loadPath(this.metaObjects, mpath);
	return this.metaObjects;
};

/**
 * MetaLoader set metaObject to beanName.
 *
 * @param   {String} beanName
 * @param   {Object} metaObject
 * @api public
 */
MetaLoader.prototype.setMetaObject = function(beanName, metaObject) {
	var originMeta = this.metaObjects[beanName];
	this.metaObjects[beanName] = MetaUtil.mergeMeta(metaObject, originMeta);
}

/**
 * MetaLoader get metaObjects.
 *
 * @return   {Object} metaObjects
 * @api public
 */
MetaLoader.prototype.getMetaObjects = function() {
	return this.metaObjects;
}

/**
 * MetaLoader load file, require file.
 *
 * @return   {Object} fp file meta
 * @api private
 */
MetaLoader.prototype.loadFile = function(fp) {
	var m = Utils.myRequire(fp);
	if (process.env.BEARCAT_ANNOTATION !== 'off' && Utils.checkFunction(m)) {
		// meta may be $ annotations in function
		return MetaUtil.resolveFuncAnnotation(m, fp);
	}

	if (!Utils.checkObject(m)) {
		// meta must be object	
		return;
	}

	if (!m || !m.id || !m.func) {
		// id, func must have
		return;
	}

	if (fp) {
		m['ftype'] = 'object';
		m['fpath'] = fp;
	}

	return m;
};

/**
 * MetaLoader load meta from path recursively.
 *
 * @param    {Object} meta metaObjects
 * @param    {String} path
 * @return   {Object} metaObjects
 * @api private
 */
MetaLoader.prototype.loadPath = function(meta, path) {
	var files = FileUtil.readdirSync(path);

	if (path.charAt(path.length - 1) !== '/') {
		path += '/';
	}

	var fp, fn, m;
	for (var i = 0, l = files.length; i < l; i++) {
		fn = files[i];
		fp = path + fn;

		if (Utils.isDir(fp)) {
			this.loadPath(meta, fp);
		}

		if (!Utils.isFile(fp) || !Utils.checkFileType(fn, '.js')) {
			// only load js file type
			continue;
		}

		m = this.loadFile(fp);
		if (!m) {
			continue;
		}

		// id by default is the file name
		var id = Utils.getFileName(fn, '.js'.length);
		if (m.id) {
			id = m.id;
		} else if (m.mid) {
			id = m.mid + Constant.BEAN_SPECIAL_MODEL;
		} else if (m.cid) {
			id = m.cid + Constant.BEAN_SPECIAL_CONSTRAINT;
		} else {
			// ignore
			continue;
		}

		var originMeta = meta[id];
		meta[id] = MetaUtil.mergeMeta(m, originMeta);
	}

	return meta;
};
}).call(this,require('_process'))
},{"../util/constant":37,"../util/fileUtil":38,"../util/metaUtil":39,"../util/utils":44,"_process":51,"path":50,"pomelo-logger":57}],33:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat PropertiesLoader
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'PropertiesLoader');
var FileUtil = require('../util/fileUtil');
var Utils = require('../util/utils');

/**
 * PropertiesLoader constructor function.
 *
 * @api public
 */
var PropertiesLoader = function() {

}

module.exports = PropertiesLoader;

/**
 * PropertiesLoader load properties from load path with env.
 *
 * @param    {String} lpath load path
 * @param    {String} env environment
 * @return   {Object} properties
 * @api public
 */
PropertiesLoader.prototype.loadProperties = function(lpath, env) {
	var meta = {};

	this.loadDir(meta, lpath, true);
	this.loadDir(meta, lpath + '/' + env);

	return meta;
}

/**
 * PropertiesLoader load properties from directory.
 *
 * @param    {Object}  meta properties
 * @param    {String}  lpath load path
 * @param    {Boolean} lflag if not load subdirectory or not, true not
 * @api private
 */
PropertiesLoader.prototype.loadDir = function(meta, lpath, lflag) {
	if (!FileUtil.existsSync(lpath)) {
		return;
	}

	if (!Utils.isDir(lpath)) {
		return;
	}

	var files = FileUtil.readdirSync(lpath);

	if (lpath.charAt(lpath.length - 1) !== '/') {
		lpath += '/';
	}

	var fp, fn, m;
	for (var i = 0, l = files.length; i < l; i++) {
		fn = files[i];
		fp = lpath + fn;

		if (!lflag && Utils.isDir(fp)) {
			this.loadDir(meta, fp);
		}

		if (!Utils.isFile(fp) || !Utils.checkFileType(fp, 'json')) {
			// only load json properties files
			continue;
		}

		m = Utils.myRequire(fp);
		if (!Utils.isNotNull(m) || !Utils.checkObject(m)) {
			continue;
		}

		for (var key in m) {
			if (Utils.isNotNull(m[key])) {
				meta[key] = m[key];
			}
		}
	}
}
},{"../util/fileUtil":38,"../util/utils":44,"pomelo-logger":57}],34:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ResourceLoader
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var ConfigLoader = require('./configLoader');

/**
 * ResourceLoader constructor function.
 *
 * @api public
 */
var ResourceLoader = function() {
	this.loadPathMap = {};
	this.loadPaths = [];
}

module.exports = ResourceLoader;

/**
 * ResourceLoader get config loader.
 *
 * @return  {Object} config loader
 * @api public
 */
ResourceLoader.prototype.getConfigLoader = function() {
	var configLoader = new ConfigLoader();
	return configLoader;
}

/**
 * ResourceLoader add context load path.
 *
 * @param  {String} cpath context load path
 * @api public
 */
ResourceLoader.prototype.addLoadPath = function(cpath) {
	this.loadPaths.push(cpath);
}

/**
 * ResourceLoader load metaObjects from context path.
 *
 * @param   {String} cpath context load path
 * @return  {Object} metaObjects
 * @api public
 */
ResourceLoader.prototype.load = function(cpath) {
	if (this.loadPathMap[cpath]) {
		return this.loadPathMap[cpath];
	}

	var metaObjects = this.getConfigLoader().getResources(cpath);
	this.loadPathMap[cpath] = metaObjects;
	this.addLoadPath(cpath);

	return metaObjects;
}
},{"./configLoader":31}],35:[function(require,module,exports){
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
},{"../aop/advisor":2,"../aop/aspect":3,"./utils":44}],36:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanUtils
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var BeanWrapper = require('../beans/support/beanWrapper');
var Utils = require('./utils');

var BeanUtils = {};

/**
 * BeanUtil build beanWrapper from meta settings.
 *
 * @param    {Array}  list meta settings
 * @return   {Array}  beanWrappers
 * @api public
 */
BeanUtils.buildBeanWrapper = function(list) {
	var r = [];

	if (!Utils.checkArray(list)) {
		return r;
	}

	for (var i = 0; i < list.length; i++) {
		var w = list[i];

		var bWrapper = new BeanWrapper();
		if (w.name) {
			bWrapper.setName(w.name);
		}

		if (w.type) {
			bWrapper.setType(w.type);
		}

		if (w.value) {
			bWrapper.setValue(w.value);
		}

		if (w.ref) {
			bWrapper.setRef(w.ref);
		}

		bWrapper.setRole();

		r.push(bWrapper);
	}

	return r;
}

/**
 * BeanUtils getBeanSettingsMap.
 *
 * @param    {Array}   list beanWrappers
 * @return   {Object}  beanWrapper map
 * @api public
 */
BeanUtils.getBeanSettingsMap = function(list) {
	var r = {};
	if (!Utils.checkArray(list)) {
		return r;
	}

	for (var i = 0; i < list.length; i++) {
		var w = list[i];
		var name = w.getName();
		if (!name) {
			continue;
		}
		r[name] = w;
	}

	return r;
}

/**
 * BeanUtils getBeanSettingsArray.
 *
 * @param   {Object}  map beanWrapper map
 * @return  {Array}   beanWrappers
 * @api public
 */
BeanUtils.getBeanSettingsArray = function(map) {
	var r = [];

	if (!Utils.isNotNull(map)) {
		return r;
	}

	for (var name in map) {
		r.push(map[name]);
	}

	return r;
}

/**
 * BeanUtils sortBeanDefinitions.
 *
 * @param    {Array}  beanDefinitions
 * @return   {Array}  beanFactory sorted beanDefinitions
 * @api public
 */
BeanUtils.sortBeanDefinitions = function(beanDefinitions, beanFactory) {
	var r = [];

	for (var beanName in beanDefinitions) {
		var beanDefinition = beanDefinitions[beanName];

		if (beanDefinition.isSingleton() && !beanDefinition.isLazyInit() && !beanDefinition.isAbstract()) {
			if (beanDefinition.hasParentBean()) {
				beanDefinition = beanFactory.setParentBean(beanDefinition.getBeanName());
			}

			r.push(beanDefinition);
		}
	}

	r.sort(Utils.compareBeans);

	return r;
}

module.exports = BeanUtils;
},{"../beans/support/beanWrapper":17,"./utils":44}],37:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat Constant
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

module.exports = {
	SCOPE_DEFAULT: "singleton",
	SCOPE_SINGLETON: "singleton",
	SCOPE_PROTOTYPE: "prototype",

	DEPENDS_ARGS: "args",
	DEPENDS_PROPS: "props",

	SETTINGS_ARGS_ON: "argsOn",
	SETTINGS_PROPS_ON: "propsOn",
	SETTINGS_FACTORY_ARGS_ON: "factoryArgsOn",

	DEPEND_TYPE_BEAN: "d_bean",
	DEPEND_TYPE_VALUE: "d_value",
	DEPEND_TYPE_VAR: "d_var",
	DEPEND_TYPE_ERROR: "d_error",

	PROPS_DEFAULT: [],
	ARGS_DEFAULT: [],

	ASYNC_INIT_DEFAULT: false,
	LAZY_INIT_DEFAULT: false,
	ABSTRACT_DEFAULT: false,

	INIT_CB_DEFAULT: function() {},

	AOP_ADVICE_BEFORE: "before",
	AOP_ADVICE_AFTER: "after",
	AOP_ADVICE_AROUND: "around",

	PROXY_DEFAULT: true,

	DEFAULT_ENV: "dev",

	LOGPATH: "log4js.json",

	NAMESPACE_SEPERATOR: ":",

	FUNC_ARGS_REGEXP: /function.*?\((.*?)\)\s*\{/,

	FUNC_PROPS_REGEXP: /\s*this\.\$\w+\s*=(.|\s)*?;/g,

	FUNC_PROPS_REGEXP_ATTR: /\s*this\.\w+\s*=\s*[\"\']\$(.|\s)*?[\"\'];/g,

	FUNC_COMMENT_LINE: /\/\/.*?\n/g,

	FUNC_COMMENT_STAR: /\/\*(.|\s)*?\*\//g,

	FUNC_ANNOTATION: "$",

	PROTO_FUNC_PROPS_REGEXP: /\w+\s*\$\w+\s*=(.|\s)*?;/g,

	META_PROPS: ["id", "order", "init", "destroy", "factoryBean",
		"factoryMethod", "scope", "async", "abstract", "parent",
		"lazy", "factoryArgs", "proxy", "aop", "mid", "table",
		"cid", "constraint", "prefix"
	],

	AOP_META_PROPS: ["pointcut", "advice", "order", "runtime"],

	META_AOP: "aop",

	META_ID: "id",

	META_AOP_ADVICE: "advice",

	FILTER_BUILTIN: "builtin",
	FILTER_MODEL: "model",
	FILTER_BUILTIN_METHOD: "filter",

	CONSTRAINT_ANNOTATION: "$",
	CONSTRAINT_SPLIT: ";",
	CONSTRAINT_METHOD: "validate",

	MODEL_ATTRIBUTES: ["type", "primary", "default", "ref", "prefix"],
	MODEL_ATTRIBUTE_PRIMARY: "primary",
	MODEL_ATTRIBUTE_BALANCE: "balance",
	MODEL_ATTRIBUTE_TYPE_ARRAY: "Array",
	MODEL_ATTRIBUTE_TYPE_OBJECT: "Object",
	MODEL_FILTER_BEFORE: 'before',
	MODEL_FILTER_AFTER: 'after',

	BEAN_SPECIAL_MODEL: "_$model",
	BEAN_SPECIAL_CONSTRAINT: "_$constraint",

	TYPE_NUMBER: "Number",

	DEFINE_GETTER_PREFIX: "__"
}
},{}],38:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat FileUtil
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var fs = require('fs');

var FileUtil = {};

/**
 * FileUtil existsSync.
 *
 * @api public
 */
FileUtil.existsSync = function() {
	return false;
}

/**
 * FileUtil watch shim.
 *
 * @api public
 */
FileUtil.watch = function() {

}

/**
 * FileUtil realpathSync shim.
 *
 * @api public
 */
FileUtil.realpathSync = function() {

}

/**
 * FileUtil readdirSync shim.
 *
 * @api public
 */
FileUtil.readdirSync = function() {

}

if (fs) {
	for (var method in fs) {
		FileUtil[method] = fs[method];
	}
}

module.exports = FileUtil;
},{"fs":46}],39:[function(require,module,exports){
(function (process){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat MetaUtil
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('Bearcat', 'MetaUtil');
var RequireUtil = require('./requireUtil');
var Constant = require('./constant');
var Os = RequireUtil.requireOs();
var Utils = require('./utils');
var EOL = Os.EOL;

var MetaUtil = {
	metaCache: {}
};

/**
 * MetaUtil merge metaObject with originMeta.
 *
 * @param   {Object} meta metaObject
 * @param   {Object} originMeta origin metaObject
 * @param   {Object} merged metaObjects
 * @api public
 */
MetaUtil.mergeMeta = function(meta, originMeta) {
	if (!originMeta) {
		return meta;
	}

	for (var key in meta) {
		originMeta[key] = meta[key];
	}

	return originMeta;
}

/**
 * MetaUtil resolve function annotation like $id, $scope, $car etc.
 *
 * @param  {Function} func function annotation
 * @param  {String}   func function file path
 * @param  {Boolean}  force resolve func annotation
 * @return {Object}   metaObject resolved metaObject
 * @api private
 */
MetaUtil.resolveFuncAnnotation = function(func, fp, force) {
	var funcString = func.toString();

	if (process.env.LOADER_BIN === 'on') {
		force = true;
	}

	if (this.metaCache[funcString] && !force) {
		return this.metaCache[funcString];
	}

	var funcArgsString = funcString.match(Constant.FUNC_ARGS_REGEXP);

	if (funcArgsString) {
		funcArgsString = funcArgsString[1];
	} else {
		funcArgsString = "";
	}

	var funcArgs = [];

	if (funcArgsString) {
		funcArgs = funcArgsString.split(',');
	}

	var meta = {};
	var props = [];
	var args = [];
	var attributes = [];

	var funcProps = null;

	if (funcArgs.length || process.env.BEARCAT_FUNCTION_STRING) {
		// if constructor function have arguments or setup BEARCAT_FUNCTION_STRING flag
		// use funcString to resolve $ props
		funcString = MetaUtil.resolveFuncComment(funcString);
		funcProps = MetaUtil.resolvePropsFromFuncString(funcString, funcArgsString);
	} else {
		// use new to resolve $ props directly to support dynamic $ prefix attributes
		// try catch the error, when dependency is not ready when started
		try {
			funcProps = new func();
		} catch (e) {
			return;
		}
	}

	for (var funcKey in funcProps) {
		// prototype attribute must be prefixed with $, other attributes will be ignored 
		if (!funcProps.hasOwnProperty(funcKey) && !MetaUtil.checkFuncAnnotation(funcKey)) {
			continue;
		}

		var value = funcProps[funcKey];

		// ignore function value
		if (Utils.checkFunction(value)) {
			continue;
		}

		if (MetaUtil.checkFuncAnnotation(funcKey)) {
			var key = funcKey.substr(1);
			if (MetaUtil.checkInMetaProps(funcKey)) {
				if (key === Constant.META_AOP && funcProps[funcKey] === true) {
					meta[key] = this.resolvePrototypeAnnotation(func);
				} else {
					if (key === Constant.META_ID) {
						if (MetaUtil.checkInMetaProps(value, true)) {
							logger.warn('bean id value must not use bearcat special bean attributes: %s', value);
							return;
						}
					}
					meta[key] = value;
				}
			} else {
				if (!MetaUtil.checkInFuncArgs(funcKey, funcArgs)) {
					if (MetaUtil.checkFuncPropsValue(funcKey)) {
						props.push({
							name: funcKey,
							value: value
						});
					} else if (MetaUtil.checkFuncPropsType(funcKey)) {
						props.push({
							name: funcKey,
							type: value
						});
					} else if (MetaUtil.checkFuncPropsNamespace(funcKey)) {
						props.push({
							name: funcKey,
							ref: value
						});
					} else {
						props.push({
							name: funcKey,
							ref: key
						});
					}
				}
			}
			continue;
		} else if (MetaUtil.checkFuncPropsConfigValue(value)) {
			// this.num = "${car.num}"; placeholder
			props.push({
				name: funcKey,
				value: value
			});
		} else if (MetaUtil.checkFuncValueAnnotation(value)) {
			// this.num = "$type:Number"; model attribute
			attributes.push({
				name: funcKey,
				value: value
			});
		}
	}

	delete funcProps;

	if (props.length) {
		meta['props'] = props;
	}

	for (var i = 0; i < funcArgs.length; i++) {
		var funcArg = funcArgs[i].trim();
		if (!funcArg) {
			continue;
		}

		var key = funcArg.substr(1);
		if (MetaUtil.checkFuncAnnotation(funcArg)) {
			args.push({
				name: funcArg,
				ref: key
			});
		} else {
			// not start with $, treat it as a type injection
			args.push({
				name: funcArg,
				type: "Object"
			});
		}
	}

	if (args.length) {
		meta['args'] = args;
	}

	if (attributes.length) {
		meta['attributes'] = attributes;
	}

	meta['func'] = func;
	if (fp) {
		meta['fpath'] = require('path').resolve(process.cwd(), fp);
	}

	var id = meta.id;
	if (meta.id) {
		id = meta.id;
	} else if (meta.mid) {
		id = meta.mid + Constant.BEAN_SPECIAL_MODEL;
	} else if (meta.cid) {
		id = meta.cid + Constant.BEAN_SPECIAL_CONSTRAINT;
	} else {
		// must have id
	}

	if (id) {
		meta['id'] = id;
	}

	this.metaCache[funcString] = meta;
	return meta;
}

/**
 * MetaUtil props from function string.
 *
 * @param  {String}     function string
 * @return {Object}     resolved props object
 * @api private
 */
MetaUtil.resolvePropsFromFuncString = function(funcString, funcArgsString) {
	var funcPropsArray = funcString.match(Constant.FUNC_PROPS_REGEXP);
	var funcPropsAttrArray = funcString.match(Constant.FUNC_PROPS_REGEXP_ATTR);

	var t = "var FuncProps = function(" + funcArgsString + ") {" + EOL;
	if (funcPropsArray && Utils.checkArray(funcPropsArray)) {
		for (var i = 0; i < funcPropsArray.length; i++) {
			t += (funcPropsArray[i] + EOL);
		}
	}

	if (funcPropsAttrArray && Utils.checkArray(funcPropsAttrArray)) {
		for (var i = 0; i < funcPropsAttrArray.length; i++) {
			t += (funcPropsAttrArray[i] + EOL);
		}
	}

	t += "}";

	var funcProps = MetaUtil.getEvalFuncProps(t);

	return funcProps;
}

/**
 * MetaUtil resolve prototype annotation.
 *
 * @param  {Function}   func function
 * @return {Object}     resolved meta object
 * @api private
 */
MetaUtil.resolvePrototypeAnnotation = function(func) {
	var proto = func.prototype;
	var meta = [];

	for (var funcName in proto) {
		var protoFunc = proto[funcName];
		if (Utils.checkFunction(protoFunc)) {
			var funcString = protoFunc.toString();
			funcString = MetaUtil.resolveFuncComment(funcString);

			var funcPropsArray = funcString.match(Constant.PROTO_FUNC_PROPS_REGEXP);
			var t = "";
			if (funcPropsArray && Utils.checkArray(funcPropsArray)) {
				t = "var FuncMetaProps = function() {" + EOL;
				for (var i = 0; i < funcPropsArray.length; i++) {
					t += (funcPropsArray[i].replace(/var\s*/, "this.") + EOL);
				}
				t += "}";
			}

			var funcProps = MetaUtil.getEvalFuncMetaProps(t);
			var aop = {};
			var flag = false;
			aop[Constant.META_AOP_ADVICE] = funcName;
			for (var funcKey in funcProps) {
				if (this.checkInAOPMetaProps(funcKey)) {
					var key = funcKey.substr(1);
					var value = funcProps[funcKey];
					aop[key] = value;
					flag = true;
				}
			}

			if (flag) {
				meta.push(aop);
			}
		}
	}

	return meta;
}

/**
 * MetaUtil resolve function comments.
 *
 * @param  {String}   t function string
 * @return {String}   resolved function string
 * @api private
 */
MetaUtil.resolveFuncComment = function(funcString) {
	funcString = funcString.replace(Constant.FUNC_COMMENT_LINE, "")
	funcString = funcString.replace(Constant.FUNC_COMMENT_STAR, "");
	return funcString;
}

/**
 * MetaUtil get eval function props.
 *
 * @param  {String}   t function string
 * @return {Object}   eval object result
 * @api private
 */
MetaUtil.getEvalFuncProps = function(t) {
	if (!t) {
		return {};
	}

	try {
		eval(t);
		return new FuncProps();
	} catch (err) {
		logger.error("resolveFuncAnnotation error: " + err.stack);
		return {};
	}
}

/**
 * MetaUtil get eval function props.
 *
 * @param  {String}   t function string
 * @return {Object}   eval object result
 * @api private
 */
MetaUtil.getEvalFuncMetaProps = function(t) {
	if (!t) {
		return {};
	}

	try {
		eval(t);
		return new FuncMetaProps();
	} catch (err) {
		logger.error("resolvePrototypeAnnotation error: " + err.stack);
		return {};
	}
}

/**
 * MetaUtil check funcKey in metaProps.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkInMetaProps = function(funcKey, flag) {
	var META_PROPS = Constant.META_PROPS;

	var prefix = "";
	if (!flag) {
		prefix = Constant.FUNC_ANNOTATION;
	}

	for (var i = 0; i < META_PROPS.length; i++) {
		if (prefix + META_PROPS[i] === funcKey) {
			return true;
		}
	}

	return false;
}

/**
 * MetaUtil check funcKey in aopMetaProps.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkInAOPMetaProps = function(funcKey) {
	var META_PROPS = Constant.AOP_META_PROPS;

	for (var i = 0; i < META_PROPS.length; i++) {
		if (Constant.FUNC_ANNOTATION + META_PROPS[i] === funcKey) {
			return true;
		}
	}

	return false;
}

/**
 * MetaUtil check funcKey in function args.
 *
 * @param  {String}   funcKey function key
 * @param  {Array}    function args
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkInFuncArgs = function(funcKey, funcArgs) {
	for (var i = 0; i < funcArgs.length; i++) {
		if (funcKey === funcArgs[i]) {
			return true;
		}
	}

	return false;
}

/**
 * MetaUtil check function annotation.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncAnnotation = function(funcKey) {
	return funcKey.match(/^\$/);
}

/**
 * MetaUtil check funcValue annotation.
 *
 * @param  {String}   funcValue function value
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncValueAnnotation = function(funcValue) {
	if (!Utils.checkString(funcValue)) {
		return false;
	}

	return this.checkFuncAnnotation(funcValue);
}

/**
 * MetaUtil check function props value.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncPropsValue = function(funcKey) {
	return funcKey.match(/^\$V/);
}

/**
 * MetaUtil check function props type.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncPropsType = function(funcKey) {
	return funcKey.match(/^\$T/);
}

/**
 * MetaUtil check function props namespace.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncPropsNamespace = function(funcKey) {
	return funcKey.match(/^\$N/);
}

/**
 * MetaUtil check function props config value.
 *
 * @param  {String}   value
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncPropsConfigValue = function(value) {
	if (!Utils.checkString(value)) {
		return;
	}
	return value.match(/^\$\{.*?\}$/);
}

/**
 * MetaUtil clean up meta cache.
 *
 * @api public
 */
MetaUtil.cleanUp = function() {
	this.metaCache = {};
}

module.exports = MetaUtil;
}).call(this,require('_process'))
},{"./constant":37,"./requireUtil":42,"./utils":44,"_process":51,"path":50,"pomelo-logger":57}],40:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelUtils
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var ModelAttribute = require('../model/modelAttribute');
var Constant = require('./constant');
var Utils = require('./utils');
var ModelUtil = {};

/**
 * ModelUtil build model attribute.
 *
 * @param   {Array}  model meta attributes.
 * @param   {Object} beanFactory.
 * @return  {Object} modelAttributes.
 * @api public
 */
ModelUtil.buildModelAttribute = function(attributes, beanFactory) {
	if (!Utils.checkArray(attributes)) {
		return {};
	}

	var r = {};
	var fields = {};
	var refFields = [];
	var oneToMany = false;
	var balance = "";
	for (var i = 0; i < attributes.length; i++) {
		var attribute = attributes[i];
		var name = attribute['name'];
		var value = attribute['value'];

		var modelAttribute = new ModelAttribute();
		modelAttribute.setName(name);
		modelAttribute.setExpression(value);
		modelAttribute.parse(value, beanFactory);

		fields[name] = modelAttribute;

		if (modelAttribute.getRef()) {
			refFields.push(name);
		}

		var type = modelAttribute.getType();
		if (Utils.checkTypeArray(type)) {
			oneToMany = true;
		}

		if (modelAttribute.isBalance()) {
			balance = name;
		}
	}

	return {
		fields: fields,
		balance: balance,
		refFields: refFields,
		oneToMany: oneToMany
	};
}

module.exports = ModelUtil;
},{"../model/modelAttribute":23,"./constant":37,"./utils":44}],41:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat RequestUtil load async script
 * modified from seajs util-request.js
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>, http://seajs.org
 * MIT Licensed
 */

var Utils = require('./utils');
var RequestUtil = {};
var currentlyAddingScript;

/**
 * RequestUtil request script file from url.
 *
 * @param  {String}   url
 * @param  {Function} callback function
 * @param  {String}   charset code
 * @param  {Boolean}  crossorigin or not
 * @api public
 */
RequestUtil.request = function(url, callback, charset, crossorigin) {
	if (Utils.checkWebWorker()) {
		return this.requestFromWebWorker(url, callback, charset, crossorigin);
	} else {
		return this.requestFromAsyncScript(url, callback, charset, crossorigin);
	}
}

/**
 * RequestUtil request script file from web worker.
 *
 * @param  {String}   url
 * @param  {Function} callback function
 * @param  {String}   charset code
 * @param  {Boolean}  crossorigin or not
 * @api private
 */
RequestUtil.requestFromWebWorker = function(url, callback, charset, crossorigin) {
	// Load with importScripts
	var error;
	try {
		importScripts(url);
	} catch (e) {
		error = e;
	}
	callback(error);
}

/**
 * RequestUtil request script file from async <script> tag.
 *
 * @param  {String}   url
 * @param  {Function} callback function
 * @param  {String}   charset code
 * @param  {Boolean}  crossorigin or not
 * @api private
 */
RequestUtil.requestFromAsyncScript = function(url, callback, charset, crossorigin) {
	var doc = document;
	var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
	var baseElement = head.getElementsByTagName("base")[0];

	var node = doc.createElement("script");

	if (charset) {
		var cs = Utils.checkFunction(charset) ? charset(url) : charset;
		if (cs) {
			node.charset = cs;
		}
	}

	// crossorigin default value is `false`.
	var cors = Utils.checkFunction(crossorigin) ? crossorigin(url) : crossorigin;
	if (cors !== false) {
		node.crossorigin = cors;
	}

	this.addOnload(head, node, callback, url);

	node.async = true;
	node.src = url;

	// For some cache cases in IE 6-8, the script executes IMMEDIATELY after
	// the end of the insert execution, so use `currentlyAddingScript` to
	// hold current node, for deriving url in `define` call
	currentlyAddingScript = node;

	// ref: #185 & http://dev.jquery.com/ticket/2709
	baseElement ?
		head.insertBefore(node, baseElement) :
		head.appendChild(node);

	currentlyAddingScript = null;
}

/**
 * RequestUtil request script file from url.
 *
 * @param  {Object}   head node
 * @param  {Object}   node
 * @param  {Function} callback function
 * @param  {String}   url
 * @api private
 */
RequestUtil.addOnload = function(head, node, callback, url) {
	var supportOnload = "onload" in node;

	if (supportOnload) {
		node.onload = onload
		node.onerror = function() {
			// TODO
			// emit("error", {
			// 	uri: url,
			// 	node: node
			// })
			onload(true)
		}
	} else {
		node.onreadystatechange = function() {
			if (/loaded|complete/.test(node.readyState)) {
				onload()
			}
		}
	}

	function onload(error) {
		// Ensure only run once and handle memory leak in IE
		node.onload = node.onerror = node.onreadystatechange = null

		// Remove the script to reduce memory leak
		// if (!data.debug) {
		if (!false) {
			head.removeChild(node)
		}

		// Dereference the node
		node = null

		callback(error)
	}
}

module.exports = RequestUtil;
},{"./utils":44}],42:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat RequireUtils
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var ShimBuiltins = require('../../shim/builtins');
var RequireUtils = {};

var Root;
(function() {
	Root = this;
}());

if (!Root.process) {
	Root.process = ShimBuiltins.process;
}

/**
 * RequireUtils require os shim.
 *
 * @api public
 */
RequireUtils.requireOs = function() {
	var os = require('os');
	if (os) {
		return os;
	} else {
		return ShimBuiltins.os;
	}
}

/**
 * RequireUtils require path shim.
 *
 * @api public
 */
RequireUtils.requirePath = function() {
	var path = require('path');
	if (path) {
		return path;
	} else {
		return ShimBuiltins.path;
	}
}

/**
 * RequireUtils require util shim.
 *
 * @api public
 */
RequireUtils.requireUtil = function() {
	var util = require('util');
	if (util) {
		return util;
	} else {
		return ShimBuiltins.util;
	}
}

module.exports = RequireUtils;
},{"../../shim/builtins":55,"os":49,"path":50,"util":53}],43:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ScriptUtil
 * modified from seajs util-path.js
 * The utilities for operating path such as id, uri
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>, http://seajs.org
 * MIT Licensed
 */

var ScriptUtil = {};

var DIRNAME_RE = /[^?#]*\//

var DOT_RE = /\/\.\//g
var DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//
var MULTI_SLASH_RE = /([^:/])\/+\//g

/**
 * ScriptUtil get current loader directory.
 *
 * @api public
 */
ScriptUtil.getLoaderDir = function() {
  if (typeof location === 'undefined') {
    location = {};
  }
  // Extract the directory portion of a path
  // dirname("a/b/c.js?t=123#xx/zz") ==> "a/b/"
  // ref: http://jsperf.com/regex-vs-split/2
  function dirname(path) {
    return path.match(DIRNAME_RE)[0]
  }

  // Canonicalize a path
  // realpath("http://test.com/a//./b/../c") ==> "http://test.com/a/c"
  function realpath(path) {
    // /a/b/./c/./d ==> /a/b/c/d
    path = path.replace(DOT_RE, "/")

    /*
      @author wh1100717
      a//b/c ==> a/b/c
      a///b/////c ==> a/b/c
      DOUBLE_DOT_RE matches a/b/c//../d path correctly only if replace // with / first
    */
    path = path.replace(MULTI_SLASH_RE, "$1/")

    // a/b/c/../../d  ==>  a/b/../d  ==>  a/d
    while (path.match(DOUBLE_DOT_RE)) {
      path = path.replace(DOUBLE_DOT_RE, "/")
    }

    return path
  }

  // Normalize an id
  // normalize("path/to/a") ==> "path/to/a.js"
  // NOTICE: substring is faster than negative slice and RegExp
  function normalize(path) {
    var last = path.length - 1
    var lastC = path.charCodeAt(last)

    // If the uri ends with `#`, just return it without '#'
    if (lastC === 35 /* "#" */ ) {
      return path.substring(0, last)
    }

    return (path.substring(last - 2) === ".js" ||
      path.indexOf("?") > 0 ||
      lastC === 47 /* "/" */ ) ? path : path + ".js"
  }


  var PATHS_RE = /^([^/:]+)(\/.+)$/
  var VARS_RE = /{([^{]+)}/g

  function parseAlias(id) {
    var alias = data.alias
    return alias && isString(alias[id]) ? alias[id] : id
  }

  function parsePaths(id) {
    var paths = data.paths
    var m

    if (paths && (m = id.match(PATHS_RE)) && isString(paths[m[1]])) {
      id = paths[m[1]] + m[2]
    }

    return id
  }

  function parseVars(id) {
    var vars = data.vars

    if (vars && id.indexOf("{") > -1) {
      id = id.replace(VARS_RE, function(m, key) {
        return isString(vars[key]) ? vars[key] : m
      })
    }

    return id
  }

  function parseMap(uri) {
    var map = data.map
    var ret = uri

    if (map) {
      for (var i = 0, len = map.length; i < len; i++) {
        var rule = map[i]

        ret = isFunction(rule) ?
          (rule(uri) || uri) :
          uri.replace(rule[0], rule[1])

        // Only apply the first matched rule
        if (ret !== uri) break
      }
    }

    return ret
  }


  var ABSOLUTE_RE = /^\/\/.|:\//
  var ROOT_DIR_RE = /^.*?\/\/.*?\//

  function addBase(id, refUri) {
    var ret
    var first = id.charCodeAt(0)

    // Absolute
    if (ABSOLUTE_RE.test(id)) {
      ret = id
    }
    // Relative
    else if (first === 46 /* "." */ ) {
      ret = (refUri ? dirname(refUri) : data.cwd) + id
    }
    // Root
    else if (first === 47 /* "/" */ ) {
      var m = data.cwd.match(ROOT_DIR_RE)
      ret = m ? m[0] + id.substring(1) : id
    }
    // Top-level
    else {
      ret = data.base + id
    }

    // Add default protocol when uri begins with "//"
    if (ret.indexOf("//") === 0) {
      ret = location.protocol + ret
    }

    return realpath(ret)
  }

  function id2Uri(id, refUri) {
    if (!id) return ""

    id = parseAlias(id)
    id = parsePaths(id)
    id = parseAlias(id)
    id = parseVars(id)
    id = parseAlias(id)
    id = normalize(id)
    id = parseAlias(id)

    var uri = addBase(id, refUri)
    uri = parseAlias(uri)
    uri = parseMap(uri)

    return uri
  }

  // For Developers
  // seajs.resolve = id2Uri;

  // Check environment
  var isWebWorker = typeof window === 'undefined' && typeof importScripts !== 'undefined' && isFunction(importScripts);

  // Ignore about:xxx and blob:xxx
  var IGNORE_LOCATION_RE = /^(about|blob):/;
  var loaderDir;
  // Sea.js's full path
  var loaderPath;
  // Location is read-only from web worker, should be ok though
  var cwd = (!location.href || IGNORE_LOCATION_RE.test(location.href)) ? '' : dirname(location.href);

  if (isWebWorker) {
    // Web worker doesn't create DOM object when loading scripts
    // Get sea.js's path by stack trace.
    var stack;
    try {
      var up = new Error();
      throw up;
    } catch (e) {
      // IE won't set Error.stack until thrown
      stack = e.stack.split('\n');
    }
    // First line is 'Error'
    stack.shift();

    var m;
    // Try match `url:row:col` from stack trace line. Known formats:
    // Chrome:  '    at http://localhost:8000/script/sea-worker-debug.js:294:25'
    // FireFox: '@http://localhost:8000/script/sea-worker-debug.js:1082:1'
    // IE11:    '   at Anonymous function (http://localhost:8000/script/sea-worker-debug.js:295:5)'
    // Don't care about older browsers since web worker is an HTML5 feature
    var TRACE_RE = /.*?((?:http|https|file)(?::\/{2}[\w]+)(?:[\/|\.]?)(?:[^\s"]*)).*?/i
      // Try match `url` (Note: in IE there will be a tailing ')')
    var URL_RE = /(.*?):\d+:\d+\)?$/;
    // Find url of from stack trace.
    // Cannot simply read the first one because sometimes we will get:
    // Error
    //  at Error (native) <- Here's your problem
    //  at http://localhost:8000/_site/dist/sea.js:2:4334 <- What we want
    //  at http://localhost:8000/_site/dist/sea.js:2:8386
    //  at http://localhost:8000/_site/tests/specs/web-worker/worker.js:3:1
    while (stack.length > 0) {
      var top = stack.shift();
      m = TRACE_RE.exec(top);
      if (m != null) {
        break;
      }
    }
    var url;
    if (m != null) {
      // Remove line number and column number
      // No need to check, can't be wrong at this point
      var url = URL_RE.exec(m[1])[1];
    }
    // Set
    loaderPath = url
      // Set loaderDir
    loaderDir = dirname(url || cwd);
    // This happens with inline worker.
    // When entrance script's location.href is a blob url,
    // cwd will not be available.
    // Fall back to loaderDir.
    if (cwd === '') {
      cwd = loaderDir;
    }
  } else {
    var doc = document
    var scripts = doc.scripts

    // Recommend to add `seajsnode` id for the `sea.js` script element
    var loaderScript = doc.getElementById("seajsnode") ||
      scripts[scripts.length - 1]

    function getScriptAbsoluteSrc(node) {
      return node.hasAttribute ? // non-IE6/7
        node.src :
        // see http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
        node.getAttribute("src", 4)
    }
    loaderPath = getScriptAbsoluteSrc(loaderScript)
      // When `sea.js` is inline, set loaderDir to current working directory
    loaderDir = dirname(loaderPath || cwd)
  }

  return loaderDir;
}

module.exports = ScriptUtil;
},{}],44:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat Utils
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'Utils');
var RequireUtil = require('./requireUtil');
var Constant = require('./constant');
var FileUtil = require('./fileUtil');
var Path = RequireUtil.requirePath();

var Utils = {};

/**
 * Utils normalize type
 *
 * @param  {String}   type
 * @return {String}   normalized type
 * @api public
 */
Utils.normalizeType = function(type) {
	if (!Utils.checkString(type)) {
		return;
	}

	type = type.toLowerCase();
	var Type = type[0].toUpperCase() + type.substr(1);
	return Type;
}

/**
 * Utils check type array
 *
 * @param  {String}    type
 * @return {Boolean}   true|false
 * @api public
 */
Utils.checkTypeArray = function(type) {
	var type = this.normalizeType(type);
	return type === Constant.MODEL_ATTRIBUTE_TYPE_ARRAY;
}

/**
 * Utils check type object
 *
 * @param  {String}    type
 * @return {Boolean}   true|false
 * @api public
 */
Utils.checkTypeObject = function(type) {
	var type = this.normalizeType(type);
	return type === Constant.MODEL_ATTRIBUTE_TYPE_OBJECT;
}

/**
 * Utils check type
 *
 * @param  {String}   type
 * @return {Function} high order function
 * @api public
 */
Utils.isType = function(type) {
	return function(obj) {
		return {}.toString.call(obj) == "[object " + type + "]";
	}
}

/**
 * Utils check array
 *
 * @param  {Array}   array
 * @return {Boolean} true|false
 * @api public
 */
Utils.checkArray = Array.isArray || Utils.isType("Array");

/**
 * Utils check number
 *
 * @param  {Number}  number
 * @return {Boolean} true|false
 * @api public
 */
Utils.checkNumber = Utils.isType("Number");

/**
 * Utils check function
 *
 * @param  {Function}   func function
 * @return {Boolean}    true|false
 * @api public
 */
Utils.checkFunction = Utils.isType("Function");
/**
 * Utils check object
 *
 * @param  {Object}   obj object
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkObject = Utils.isType("Object");

/**
 * Utils check string
 *
 * @param  {String}   string
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkString = Utils.isType("String");

/**
 * Utils check boolean
 *
 * @param  {Object}   obj object
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkBoolean = Utils.isType("Boolean");

/**
 * Utils check object not empty
 *
 * @param  {Object}   obj object
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkObjectEmpty = function(obj) {
	var flag = true;

	for (var key in obj) {
		flag = false;
	}

	return flag;
}

/**
 * Utils check type
 *
 * @param  {String}   type
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkType = function(type) {
	if (type === 'Object')
		return true;
	if (type === 'Number')
		return true;
	if (type === 'Array')
		return true;
	if (type === 'Boolean')
		return true;
	if (type === 'Function')
		return true;
	if (type === 'String')
		return true;
	return false;
}

/**
 * Utils check is not null
 *
 * @param  {Object}   value
 * @return {Boolean}  true|false
 * @api public
 */
Utils.isNotNull = function(value) {
	if (typeof value !== 'undefined' && value !== null)
		return true;
	return false;
}

/**
 * Utils myRequire require handle error
 *
 * @param  {String}   cpath require path
 * @return {Object}   require result
 * @api public
 */
Utils.myRequire = function(cpath) {
	if (!Utils.checkString(cpath)) {
		return;
	}

	var context = null;
	try {
		context = require(cpath);
		return context;
	} catch (err) {
		logger.error('myRequire error %s', err.stack);
		// logger.debug('myRequire error file pid %d %s %s', process.pid, cpath, FileUtil.readFileSync(cpath).toString());
		return context;
	}
}

/**
 * Utils myRequireHot require handle error
 *
 * @param  {String}   cpath require path
 * @return {Object}   require result
 * @api public
 */
Utils.myRequireHot = function(cpath) {
	var context = null;
	try {
		context = Utils.requireUncached(cpath);
		return context;
	} catch (err) {
		logger.error('myRequireHot error %s', err.stack);
		// logger.debug('myRequireHot error file pid %d %s %s', process.pid, cpath, FileUtil.readFileSync(cpath).toString());
		return context;
	}
}

/**
 * Utils get load path
 *
 * @param  {String}   spath scan path
 * @param  {String}   cpath context path
 * @return {String}   load path
 * @api public
 */
Utils.getLoadPath = function(spath, cpath) {
	if (!Utils.checkString(spath)) {
		return null;
	}
	spath = spath.replace(/\./g, "/");

	cpath = require.resolve(cpath);

	var dpath = Path.dirname(cpath);

	return dpath + "/" + spath;
}

/**
 * Utils get load path
 *
 * @param  {String}   spath scan path
 * @param  {String}   cpath context path
 * @return {String}   load path
 * @api public
 */
Utils.getLoadPath2 = function(spath, cpath) {
	if (!Utils.checkString(spath)) {
		return null;
	}

	cpath = require.resolve(cpath);

	var dpath = Path.dirname(cpath);

	var rpath = Path.resolve(dpath, spath);
	return rpath;
}

/**
 * Utils require new
 *
 * @param  {String}   module require module
 * @return {object}   require result
 * @api public
 */
Utils.requireUncached = function(module) {
	if (!Utils.checkString(module)) {
		return;
	}

	var modulePath = require.resolve(module);
	if (require.cache[modulePath]) {
		delete require.cache[modulePath];
	}

	return require(modulePath)
}

/**
 * Utils Check file suffix
 
 * @param {String} fn file name
 * @param {String} suffix suffix string, such as .js, etc.
 */
Utils.checkFileType = function(fn, suffix) {
	if (suffix.charAt(0) !== '.') {
		suffix = '.' + suffix;
	}

	if (fn.length <= suffix.length) {
		return false;
	}

	var str = fn.substring(fn.length - suffix.length).toLowerCase();
	suffix = suffix.toLowerCase();
	return str === suffix;
};

/**
 * Utils Check isFile
 
 * @param  {String}  path 
 * @return {Boolean} true|false.
 */
Utils.isFile = function(path) {
	if (FileUtil.existsSync(path)) {
		return FileUtil.statSync(path).isFile();
	}
};

/**
 * Utils Check isDir
 
 * @param  {String}  path 
 * @return {Boolean} true|false.
 */
Utils.isDir = function(path) {
	if (FileUtil.existsSync(path)) {
		return FileUtil.statSync(path).isDirectory();
	}
};

/**
 * Utils get file name
 
 * @param  {String}  fp 
 * @param  {Number}  suffixLength
 * @return {String}  file name
 */
Utils.getFileName = function(fp, suffixLength) {
	var fn = Path.basename(fp);
	if (fn.length > suffixLength) {
		return fn.substring(0, fn.length - suffixLength);
	}

	return fn;
};

/**
 * Utils compare by order
 
 * @param  {Object}  a
 * @param  {Object}  b
 * @return {Number}  
 */
Utils.compareByOrder = function(a, b) {
	if (!a.getOrder())
		return 1;
	if (!b.getOrder())
		return -1;
	return a.getOrder() - b.getOrder();
}

/**
 * Utils compare beans, aspect first, order low first
 
 * @param  {Object}  a
 * @param  {Object}  b
 * @return {Number}  
 */
Utils.compareBeans = function(a, b) {
	if (a.isAspect()) {
		return -1;
	}

	if (b.isAspect()) {
		return 1;
	}

	if (!a.getOrder())
		return 1;
	if (!b.getOrder())
		return -1;
	return a.getOrder() - b.getOrder();
}

/**
 * Utils parseArgs
 
 * @param  {Array}  args
 * @return {Object} argsMap 
 */
Utils.parseArgs = function(args) {
	var argsMap = {};
	var mainPos = 1;

	argsMap.main = args[mainPos];

	for (var i = (mainPos + 1); i < args.length; i++) {
		var arg = args[i];
		var sep = arg.indexOf('=');
		var key = arg.slice(0, sep);
		var value = arg.slice(sep + 1);
		argsMap[key] = value;
	}

	return argsMap;
}

/**
 * Utils check browser
 *
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkBrowser = function() {
	return typeof window !== 'undefined';
}

/**
 * Utils check web worker
 *
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkWebWorker = function() {
	return this.checkBrowser() && typeof importScripts !== 'undefined' && this.checkFunction(importScripts);
}

/**
 * Utils check model filter error
 *
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkModelFilterError = function(r) {
	return r !== true && this.isNotNull(r);
}

/**
 * Utils check cocos2d-js jsb env
 *
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkCocos2dJsb = function() {
	if (typeof cc !== 'undefined' && cc && cc.sys && cc.sys.isNative) {
		return true;
	}

	return false;
}

module.exports = Utils;
},{"./constant":37,"./fileUtil":38,"./requireUtil":42,"pomelo-logger":57}],45:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ValidatorUtil
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Constant = require('./constant');
var Utils = require('./utils');
var ValidatorUtil = {};

/**
 * ValidatorUtil validate metaObject.
 *
 * @param    {Object}   	   metaObject
 * @return   {Boolean|Error}  true|error object
 * @api public
 */
ValidatorUtil.metaValidator = function(metaObject) {
	var id = metaObject.id;
	var mid = metaObject.mid;
	var cid = metaObject.cid;

	if (!id && !mid && !cid)
		return new Error('one of id, mid, cid must be exist');

	if (Utils.isNotNull(id) && !Utils.checkString(id))
		return new Error('id must be String');

	if (Utils.isNotNull(mid) && !Utils.checkString(mid))
		return new Error('mid must be String');

	if (Utils.isNotNull(cid) && !Utils.checkString(cid))
		return new Error('cid must be String');

	var func = metaObject.func;
	if (!Utils.isNotNull(func) || !Utils.checkFunction(func))
		return new Error('func must be Function');

	var table = metaObject.table;
	if (Utils.isNotNull(table) && !Utils.checkString(table)) {
		return new Error('table must be String');
	}

	var message = metaObject.message;
	if (Utils.isNotNull(message) && !Utils.checkString(message)) {
		return new Error('message must be String');
	}

	var constraint = metaObject.constraint;
	if (Utils.isNotNull(constraint) && !Utils.checkString(constraint)) {
		return new Error('constraint must be String');
	}

	var order = metaObject.order;
	if (Utils.isNotNull(order) && !Utils.checkNumber(order))
		return new Error('order must be Number');

	var parentName = metaObject.parent;
	if (Utils.isNotNull(parentName) && !Utils.checkString(parentName))
		return new Error('parent must be String');

	var initMethodName = metaObject.init;
	if (Utils.isNotNull(initMethodName) && !Utils.checkString(initMethodName))
		return new Error('init must be String');

	var destroyMethodName = metaObject.destroy;
	if (Utils.isNotNull(destroyMethodName) && !Utils.checkString(destroyMethodName))
		return new Error('destroy must be String');

	var factoryBeanName = metaObject.factoryBean;
	if (Utils.isNotNull(factoryBeanName) && !Utils.checkString(factoryBeanName))
		return new Error('factoryBean must be String');

	var factoryMethodName = metaObject.factoryMethod;
	if (Utils.isNotNull(factoryMethodName) && !Utils.checkString(factoryMethodName))
		return new Error('factoryMethodName must be String');

	var scope = metaObject.scope || Constant.SCOPE_DEFAULT;
	if (scope && scope !== Constant.SCOPE_SINGLETON && scope !== Constant.SCOPE_PROTOTYPE)
		return new Error('scope must be singleton or prototype');

	var asyncInit = metaObject.async || Constant.ASYNC_INIT_DEFAULT;
	if (Utils.isNotNull(asyncInit) && !Utils.checkBoolean(asyncInit))
		return new Error('async must be Boolean');

	var lazyInit = metaObject.lazy || Constant.LAZY_INIT_DEFAULT;
	if (Utils.isNotNull(lazyInit) && !Utils.checkBoolean(lazyInit))
		return new Error('lazy must be Boolean');

	return true;
}

module.exports = ValidatorUtil;
},{"./constant":37,"./utils":44}],46:[function(require,module,exports){

},{}],47:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],48:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],49:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

},{}],50:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":51}],51:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],52:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],53:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":52,"_process":51,"inherits":48}],54:[function(require,module,exports){
module.exports={
  "name": "bearcat",
  "version": "0.4.26",
  "description": "Magic, self-described javaScript objects build up elastic, maintainable front-backend javaScript applications",
  "main": "index.js",
  "bin": "./bin/bearcat-bin.js",
  "scripts": {
    "test": "grunt"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/bearcatjs/bearcat.git"
  },
  "keywords": [
    "di",
    "IoC",
    "AOP",
    "dependency",
    "injection",
    "consistent",
    "configuration",
    "hot reload",
    "front-backend",
    "sharable codes",
    "dependency injection",
    "asynchronous script loading",
    "magic, self-described javaScript objects"
  ],
  "dependencies": {
    "pomelo-logger": "0.1.x",
    "commander": "2.x",
    "chokidar": "~1.0.1"
  },
  "browser": {
    "pomelo-logger": "./shim/logger.js",
    "chokidar": "./shim/chokidar.js"
  },
  "author": "fantasyni",
  "license": "MIT",
  "devDependencies": {
    "expect.js": "~0.3.1",
    "mocha": ">=0.0.1",
    "grunt": "~0.4.2",
    "blanket": "1.1.x",
    "grunt-browserify": "3.x",
    "grunt-mocha-test": "0.8.x",
    "grunt-contrib-clean": "0.5.x",
    "grunt-contrib-uglify": "~0.3.2"
  }
}
},{}],55:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat builtins.js
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

exports.process = require('./modules/process');
exports.path = require('./modules/path');
exports.util = require('./modules/util');
exports.os = require('./modules/os');
require('./object');
},{"./modules/os":58,"./modules/path":59,"./modules/process":60,"./modules/util":63,"./object":64}],56:[function(require,module,exports){
var Chokidar = {};

Chokidar.watch = function() {

}

module.exports = Chokidar;
},{}],57:[function(require,module,exports){
(function (process){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat shim logger.js
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

function getLogger(categoryName) {
	if (typeof console.log !== 'function') {
		return console;
	}

	var args = arguments;
	var prefix = "";
	for (var i = 1; i < args.length; i++) {
		if (i !== args.length - 1)
			prefix = prefix + args[i] + "] [";
		else
			prefix = prefix + args[i];
	}
	if (typeof categoryName === 'string') {
		// category name is __filename then cut the prefix path
		categoryName = categoryName.replace(process.cwd(), '');
	}
	var levels = ['log', 'debug', 'info', 'warn', 'error', 'trace'];

	var logger = {};
	if (checkCocos2dJsb()) {
		for (var i = 0; i < levels.length; i++) {
			var level = levels[i];
			if (cc[level]) {
				logger[level] = cc[level];
			} else {
				logger[level] = cc.log;
			}
		}
	} else {
		logger = console;
	}

	var pLogger = {};
	for (var key in logger) {
		pLogger[key] = logger[key];
	}

	for (var i = 0; i < levels.length; i++) {
		(function(item) {
			pLogger[item] = function() {
				var p = "";
				if (!process.env.RAW_MESSAGE) {
					if (args.length > 1) {
						p = "[" + prefix + "] ";
					}
					if (args.length && process.env.LOGGER_LINE) {
						p = getLine() + ": " + p;
					}
				}

				if (args.length) {
					arguments[0] = p + arguments[0];
				}

				logger[item].apply(logger, arguments);
			}
		})(levels[i]);
	}

	return pLogger;
};

function checkCocos2dJsb() {
	if (typeof cc !== 'undefined' && cc && cc.sys && cc.sys.isNative) {
		return true;
	}

	return false;
}

module.exports = {
	getLogger: getLogger
}
}).call(this,require('_process'))
},{"_process":51}],58:[function(require,module,exports){
exports.endianness = function() {
    return 'LE'
};

exports.hostname = function() {
    if (typeof location !== 'undefined') {
        return location.hostname
    } else return '';
};

exports.loadavg = function() {
    return []
};

exports.uptime = function() {
    return 0
};

exports.freemem = function() {
    return Number.MAX_VALUE;
};

exports.totalmem = function() {
    return Number.MAX_VALUE;
};

exports.cpus = function() {
    return []
};

exports.type = function() {
    return 'Browser'
};

exports.release = function() {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces = exports.getNetworkInterfaces = function() {
    return {}
};

exports.arch = function() {
    return 'javascript'
};

exports.platform = function() {
    return 'browser'
};

exports.tmpdir = exports.tmpDir = function() {
    return '/tmp';
};

exports.EOL = '\n';
},{}],59:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
  /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
    resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
    trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
    root = result[0],
    dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ? function(str, start, len) {
  return str.substr(start, len)
} : function(str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};
}).call(this,require('_process'))
},{"_process":51}],60:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function() {
    var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined' && window.MutationObserver;
    var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;

    if (canSetImmediate) {
        return function(f) {
            return window.setImmediate(f)
        };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function() {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function(fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, {
            attributes: true
        });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function(ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function(name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function() {
    return '/'
};
process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
};
},{}],61:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function() {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}
},{}],62:[function(require,module,exports){
module.exports = function isBuffer(arg) {
	return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
}
},{}],63:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s':
        return String(args[i++]);
      case '%d':
        return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;

  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
      '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
    value &&
    isFunction(value.inspect) &&
    // Filter out the util module, it's inspect function is special
    value.inspect !== exports.inspect &&
    // Also filter out any prototype objects using the circular check.
    !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
    array = false,
    braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
      .replace(/'/g, "\\'")
      .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
        String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
        key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || {
    value: value[key]
  };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
        .replace(/\\"/g, '"')
        .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
      (base === '' ? '' : base + '\n ') +
      ' ' +
      output.join(',\n  ') +
      ' ' +
      braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
    (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
    typeof arg === 'boolean' ||
    typeof arg === 'number' ||
    typeof arg === 'string' ||
    typeof arg === 'symbol' || // ES6 symbol
    typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec'
];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
    pad(d.getMinutes()),
    pad(d.getSeconds())
  ].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('./support/inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/inherits":61,"./support/isBuffer":62,"_process":51}],64:[function(require,module,exports){
if (typeof Object.create != 'function') {
  Object.create = (function() {
    var Object = function() {};
    return function(prototype) {
      if (arguments.length > 1) {
        // throw Error('Second argument not supported');
      }
      if (typeof prototype != 'object') {
        throw TypeError('Argument must be an object');
      }
      Object.prototype = prototype;
      var result = new Object();
      Object.prototype = null;
      return result;
    };
  })();
}

if (typeof String.prototype.trim != 'function') {
  if (!String.prototype.trim) {
    (function() {
      // Make sure we trim BOM and NBSP
      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      String.prototype.trim = function() {
        return this.replace(rtrim, '');
      };
    })();
  }
}
},{}]},{},[1])(1)
});