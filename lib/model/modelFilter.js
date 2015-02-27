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