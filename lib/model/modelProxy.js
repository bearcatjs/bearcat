/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelProxy
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'ModelProxy');
var Constant = require('../util/constant');
var Utils = require('../util/utils');

var ModelProxy = function() {
	this.model = null;
	this.modelFilter = null;
	this.beanDefinition = null;
	this.modelDefinition = null;
	this.filterName = null;
	this.filterFlag = false;
}

ModelProxy.prototype._modelInit = function() {
	var beanDefinition = this.getBeanDefinition();
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
						arguments = Array.prototype.slice.apply(arguments);
						return self._modelInvoke(method, arguments);
					};
				})(interface);
			}
		}
	}
}

ModelProxy.prototype._modelInvoke = function(method, args) {
	var targetModel = this.getModel();
	if (Utils.checkFunction(targetModel[method])) {
		return targetModel[method].apply(targetModel, args);
	}
}

ModelProxy.prototype.$set = function(key, value) {
	var model = this.getModel();
	var filters = this.getFilters();

	model[key] = value;
	var r = this.doFilters(filters, key);

	if (r !== true) {
		return r;
	}

	return true;
}

ModelProxy.prototype.$get = function(key) {
	return this.getModel()[key];
}

ModelProxy.prototype.$filter = function(filter) {
	this.filterFlag = true;

	if (Utils.checkString(filter)) {
		this.filterName = filter;
	}

	return this;
}

ModelProxy.prototype.$pack = function(data) {
	if (Utils.checkObject(data)) {
		for (var key in data) {
			var value = data[key];
			this.model[key] = value;
		}
	}

	var filters = this.getFilters();
	var r = this.doFilters(filters);

	if (r !== true) {
		return r;
	}

	return true;
}

ModelProxy.prototype.$clone = function() {

}

ModelProxy.prototype.getFilters = function() {
	var filters = [];

	if (this.filterFlag) {
		filters.push({
			type: Constant.FILTER_BUILTIN,
			method: Constant.FILTER_BUILTIN_METHOD // "filter"
		});
	}

	var filterName = this.filterName;
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

	this.reset();
	return filters;
}

ModelProxy.prototype.doFilters = function(filters, key) {
	if (!filters.length) {
		return true;
	}

	var r;
	for (var i = 0; i < filters.length; i++) {
		var filter = filters[i];
		var type = filter['type'];
		var method = filter['method'];
		if (type === Constant.FILTER_BUILTIN) {
			r = this.modelFilter[method](key);
			if (r !== true) {
				return r;
			}
		}

		if (type === Constant.FILTER_MODEL) {
			r = this._modelInvoke(method, []); // just call the filter method
			if (r !== true) {
				return r;
			}
		}
	}

	return true;
}

ModelProxy.prototype.reset = function() {
	this.filterFlag = false;
	this.filterName = null;
}

ModelProxy.prototype.setModel = function(model) {
	this.model = model;
}

ModelProxy.prototype.getModel = function() {
	return this.model;
}

ModelProxy.prototype.setModelDefinition = function(modelDefinition) {
	this.modelDefinition = modelDefinition;
}

ModelProxy.prototype.getModelDefinition = function() {
	return this.modelDefinition;
}

ModelProxy.prototype.setBeanDefinition = function(beanDefinition) {
	this.beanDefinition = beanDefinition;
}

ModelProxy.prototype.getBeanDefinition = function() {
	return this.beanDefinition;
}

var names = ["_modelInit", "_modelInvoke"];

var checkFuncName = function(name) {
	for (var i = 0; i < names.length; i++) {
		if (name === names[i]) {
			return true;
		}
	}

	return false;
}

module.exports = ModelProxy;