var logger = require('pomelo-logger').getLogger('bearcat', 'DynamicAopProxy');
var Constant = require('../../util/constant');
var Utils = require('../../util/utils');
var async = require('async');

var DynamicAopProxy = function(advised) {
	this.advised = advised;
	this.init();
}

DynamicAopProxy.prototype.init = function() {
	if (!this.advised) {
		logger.error('DynamicAopProxy init error no advised');
		return;
	}

	var interfaces = this.advised.getInterfaces();
	var self = this;
	for (var i = 0; i < interfaces.length; i++) {
		(function(interface) {
			DynamicAopProxy.prototype[interface] = function() {
				arguments = Array.prototype.slice.apply(arguments);
				return self.invoke(interface, arguments);
				// return self.invoke.apply(self, arguments);
				// return self.target[interface].apply(self.target, arguments);
			}
		})(interfaces[i]);
	}
}

DynamicAopProxy.prototype.setInterfaces = function(interfaces) {
	var self = this;
	for (var i = 0; i < interfaces.length; i++) {
		(function(interface) {
			self.interfaces.push(interface);
			DynamicAopProxy.prototype[interface] = function() {
				arguments = Array.prototype.slice.apply(arguments);

				return self.target[interface].apply(self.target, arguments);
			}
		})(interfaces[i]);
	}
}

DynamicAopProxy.prototype.invoke = function(method, args) {
	var self = this;
	var invokeCb = args.pop();
	if (!Utils.checkFunction(invokeCb)) {
		// aop target args last must next function
		if (invokeCb) {
			args.push(invokeCb);
		}
		invokeCb = function() {};
	}
	var targetSource = this.advised.getTargetSource();
	var beanName = targetSource.getBeanName();
	var target = targetSource.getTarget();

	var adviseType = Constant.AOP_ADVICE_BEFORE;
	var beforeAdvisors = this.advised.getInterceptionAdvice(method, beanName, adviseType);
	adviseType = Constant.AOP_ADVICE_AROUND;
	var aroundAdvisors = this.advised.getInterceptionAdvice(method, beanName, adviseType);

	var needAround = false;
	if (Array.isArray(aroundAdvisors) && aroundAdvisors.length) {
		needAround = true;
	}

	adviseType = Constant.AOP_ADVICE_AFTER;
	var afterAdvisors = this.advised.getInterceptionAdvice(method, beanName, adviseType);
	var needAfter = false;
	if (Array.isArray(afterAdvisors) && afterAdvisors.length) {
		needAfter = true;
	}

	this.doInvokeAdvisorsBefore(method, args, beforeAdvisors, function() {
		if (needAround) {
			self.doInvokeAdvisorsAround(target, method, args, aroundAdvisors, function() {
				arguments = Array.prototype.slice.apply(arguments);
				if (needAfter) {
					self.doInvokeAdvisorsAfter(method, arguments, afterAdvisors);
				}
			});
		} else {
			var next = function() {
				arguments = Array.prototype.slice.apply(arguments);
				invokeCb.apply(null, arguments);
				if (needAfter) {
					self.doInvokeAdvisorsAfter(method, arguments, afterAdvisors, function() {});
				}
			}

			args.push(next);
			target[method].apply(target, args);
		}
	});
}

DynamicAopProxy.prototype.doInvokeAdvisorsBefore = function(method, args, advisors, cb) {
	var i = 0;

	if (!advisors || !Array.isArray(advisors)) {
		cb();
	}

	async.whilst(function() {
			return i < advisors.length;
		},
		function(callback) {
			var advisor = advisors[i];
			var pointcut = advisor.getPointcut();
			var advise = advisor.getAdvice();
			var aspectBean = advisor.getBean();

			var next = function(err) {
				i++;
				callback(err);
			};

			if (advisor.isRuntime()) {
				args.push(next);
				aspectBean[advise].apply(aspectBean, args);
			} else {
				aspectBean[advise](next);
			}

		},
		function(err) {
			cb(err);
		}
	);
}

DynamicAopProxy.prototype.doInvokeAdvisorsAround = function(target, method, args, advisors, cb) {
	var advisor = advisors[0];
	var pointcut = advisor.getPointcut();
	var advise = advisor.getAdvice();
	var aspectBean = advisor.getBean();

	if (advisor.isRuntime()) {
		aspectBean[advise](target, method, args, cb);
	} else {
		aspectBean[advise](target, method, cb);
	}
}

DynamicAopProxy.prototype.doInvokeAdvisorsAfter = function(method, args, advisors, cb) {
	var i = 0;

	if (!advisors || !Array.isArray(advisors)) {
		cb();
	}

	async.whilst(function() {
			return i < advisors.length;
		},
		function(callback) {
			var advisor = advisors[i];
			var pointcut = advisor.getPointcut();
			var advise = advisor.getAdvice();
			var aspectBean = advisor.getBean();

			var next = function(err) {
				i++;
				callback(err);
			};

			args.push(next);
			aspectBean[advise].apply(aspectBean, args);
		},
		function(err) {
			cb(err);
		}
	);
}

module.exports = DynamicAopProxy;