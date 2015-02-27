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