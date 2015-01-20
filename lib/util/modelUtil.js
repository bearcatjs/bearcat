/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelUtils
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var ModelAttribute = require('../model/modelAttribute');
var Utils = require('./utils');
var ModelUtil = {};

ModelUtil.buildModelAttribute = function(attributes, beanFactory) {
	if (!Utils.checkArray(attributes)) {
		return {};
	}

	var r = {};
	for (var i = 0; i < attributes.length; i++) {
		var attribute = attributes[i];
		var name = attribute['name'];
		var value = attribute['value'];
		var modelAttribute = new ModelAttribute();
		modelAttribute.setName(name);
		modelAttribute.setExpression(value);
		modelAttribute.parse(value, beanFactory);
		r[name] = modelAttribute;
	}

	return r;
}

module.exports = ModelUtil;