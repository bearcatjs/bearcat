/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * |   _  )  |   ____)   /   \     |   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * |______)  |_______/__/     \__\ | _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat DynamicMetaProxy
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'DynamicMetaProxy');

var DynamicMetaProxy = function() {
	this.meta = null;
	this.target = null;
	this.beanName = null;
	this.beanFactory = null;
}

module.exports = DynamicMetaProxy;

DynamicMetaProxy.prototype.dyInit = function() {
	var meta = this.meta;
	if (!meta) {
		logger.error('init error no meta.');
		return;
	}

	var id = meta['id'];

	if (!id) {
		logger.error('init error no id.');
		return;
	}

	this.setBeanName(id);
	var self = this;

	var func = meta['func'];

	if (func && typeof func === 'function') {
		var proto = func.prototype;
		for (interface in proto) {
			if (typeof proto[interface] === 'function') {
				(function(method) {
					if (checkFuncName(method)) {
						logger.error('init error proxy method interface %j the same as DynamicMetaProxy, rename this name to another.', method)
						return;
					};

					DynamicMetaProxy.prototype[method] = function() {
						arguments = Array.prototype.slice.apply(arguments);
						return self.dyInvoke(method, arguments);
					};
				})(interface);
			}
		}
	}
}

DynamicMetaProxy.prototype.dyInvoke = function(method, args) {
	var targetBean = this.getBean();
	if (targetBean[method] && typeof targetBean[method] === 'function') {
		targetBean[method].apply(targetBean, args);
	} else {
		logger.error('invoke error targetBean method %j null args: %j', method, args);
	}
}

DynamicMetaProxy.prototype.getBean = function() {
	var beanName = this.beanName;
	if (!beanName) {
		logger.error('getBean error no beanName.');
		return;
	}

	if (!this.target) {
		this.target = this.beanFactory.getBean(beanName);
	}

	return this.target;
}

DynamicMetaProxy.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

DynamicMetaProxy.prototype.getBeanName = function() {
	return this.beanName;
}

DynamicMetaProxy.prototype.setMeta = function(meta) {
	this.meta = meta;
}

DynamicMetaProxy.prototype.getMeta = function() {
	return this.meta;
}

DynamicMetaProxy.prototype.setTarget = function(target) {
	this.target = target;
}

DynamicMetaProxy.prototype.getTarget = function() {
	return this.target;
}

DynamicMetaProxy.prototype.setBeanFactory = function(beanFactory) {
	this.beanFactory = beanFactory;
}

DynamicMetaProxy.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

var names = ["dyInit", "dyInvoke", "getBean", "setBeanName",
	"getBeanName", "setMeta", "getMeta", "setTarget", "setBeanFactory", "getBeanFactory"
];

var checkFuncName = function(name) {
	for (var i = 0; i < names.length; i++) {
		if (name === names[i]) {
			return true;
		}
	}

	return false;
}