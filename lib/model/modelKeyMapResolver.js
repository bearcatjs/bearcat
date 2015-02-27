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