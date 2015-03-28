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