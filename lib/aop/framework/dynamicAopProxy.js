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