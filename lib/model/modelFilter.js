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

var ModelFilter = function() {
	this.modelBean = null;
	this.modelDefinition = null;
}

ModelFilter.prototype.setModel = function(modelBean) {
	this.modelBean = modelBean;
}

ModelFilter.prototype.getModel = function() {
	return this.modelBean;
}

ModelFilter.prototype.setModelDefinition = function(modelDefinition) {
	this.modelDefinition = modelDefinition;
}

ModelFilter.prototype.getModelDefinition = function() {
	return this.modelDefinition;
}

ModelFilter.prototype.filter = function(key, value) {
	if (Utils.checkString(key)) {
		return this.doFilterKey(key, value);
	}

	return this.doFilterKeys();
}

ModelFilter.prototype.doFilterKey = function(key, value) {
	var field = this.modelDefinition.getField(key);
	return field.filter(value);
}

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

	return true;
}

module.exports = ModelFilter;