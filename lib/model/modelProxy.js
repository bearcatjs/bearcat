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
	} else {
		logger.error('invoke error with %s %j', method, args);
	}
}

ModelProxy.prototype.$set = function(key, value) {
	var model = this.getModel();
	var befores = this.getFilters(Constant.MODEL_FILTER_BEFORE);

	// do model before filters
	var r = this.doFilters(befores, key, value);

	if (Utils.checkModelFilterError(r)) {
		return this.result(r);
	}

	//  setup value
	model[key] = value;

	var afters = this.getFilters(Constant.MODEL_FILTER_AFTER);

	// do model after filters
	r = this.doFilters(afters, key, value);

	if (Utils.checkModelFilterError(r)) {
		return this.result(r);
	}

	return this.result(r);
}

ModelProxy.prototype.$pack = function(data) {
	if (!Utils.checkObject(data)) {
		return new Error('pack data must be Object');
	}

	var model = this.getModel();

	for (var key in data) {
		var value = data[key];
		model[key] = value;
	}

	// $pack only have after filters
	var afters = this.getFilters(Constant.MODEL_FILTER_AFTER);

	// do model after filters
	var r = this.doFilters(afters);

	if (Utils.checkModelFilterError(r)) {
		return this.result(r);
	}

	return this.result(r);
}

ModelProxy.prototype.$packResultSet = function(resultSet) {
	if (!Utils.checkObject(resultSet)) {
		return new Error('resultSet must be Array');
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
		var modelMap = modelKeyMap[dataKey];
		if (!modelMap) {
			logger.warn('packResultSet resultSet key %s does not match any model attribute', dataKey);
			continue;
		}

		var pid = modelMap['pid'];
		var modelId = modelMap['id'];
		var pfield = modelMap['pfield'];
		var ptype = modelMap['ptype'];
		var fieldName = modelMap['fieldName'];

		var modelResultMapKey = pid + "_" + pfield;
		var model = modelResultMap[modelResultMapKey];
		if (!model) {
			model = beanFactory.getModelProxy(modelId);
			modelResultMap[modelResultMapKey] = model;
		}

		var r = model.$before().$set(fieldName, dataValue); // set data, do filter
		if (Utils.checkModelFilterError(r)) {
			return r;
		}
	}

	this.doPackResultSet(resultModel, modelResultMap);
}

ModelProxy.prototype.doPackResultSet = function(resultModel, modelResultMap) {
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
				this.doPackResultSet(refModel, modelResultMap);
				value = refModel;
			}
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

ModelProxy.prototype.$get = function(key) {
	return this.getModel()[key];
}

ModelProxy.prototype.$before = function(before) {
	return this._filter(Constant.MODEL_FILTER_BEFORE, before);
}

ModelProxy.prototype.$after = function(after) {
	return this._filter(Constant.MODEL_FILTER_AFTER, after);
}

ModelProxy.prototype._filter = function(type, filter) {
	if (type !== Constant.MODEL_FILTER_BEFORE && type !== Constant.MODEL_FILTER_AFTER) {
		return;
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

ModelProxy.prototype.$clone = function() {

}

ModelProxy.prototype.getFilters = function(type) {
	if (type !== Constant.MODEL_FILTER_BEFORE && type !== Constant.MODEL_FILTER_AFTER) {
		return;
	}

	var filters = [];

	// before filter
	// before + after filter only do the built filter once
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

ModelProxy.prototype.doFilters = function(filters, key, value) {
	if (!filters || !filters.length) {
		return true;
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

	return true;
}

ModelProxy.prototype.result = function(r) {
	this.reset(Constant.MODEL_FILTER_BEFORE);
	this.reset(Constant.MODEL_FILTER_AFTER);

	return r;
}

ModelProxy.prototype.reset = function(type) {
	if (type !== Constant.MODEL_FILTER_BEFORE && type !== Constant.MODEL_FILTER_AFTER) {
		return;
	}

	this[type + 'Flag'] = false;
	this[type + 'Name'] = null;
	this[type + 'Names'] = [];
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

ModelProxy.prototype.setBeanFactory = function(beanFactory) {
	this.beanFactory = beanFactory;
}

ModelProxy.prototype.setBeanDefinition = function(beanDefinition) {
	this.beanDefinition = beanDefinition;
}

ModelProxy.prototype.getBeanDefinition = function() {
	return this.beanDefinition;
}

ModelProxy.prototype.setModelFilter = function(modelFilter) {
	this.modelFilter = modelFilter;
}

ModelProxy.prototype.getModelFilter = function() {
	return this.modelFilter;
}

ModelProxy.prototype.toJSON = function() {
	return this.model;
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