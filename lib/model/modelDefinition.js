/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelDefinition
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Utils = require('../util/utils');

var ModelDefinition = function() {
	this.id = null;
	this.mid = null;
	this.table = null;
	this.prefix = null;
	this.fields = {};
	this.refFields = [];
	this.modelKeyMap = {};
}

ModelDefinition.prototype.setId = function(id) {
	this.id = id;
}

ModelDefinition.prototype.getId = function() {
	return this.id;
}

ModelDefinition.prototype.setMid = function(mid) {
	this.mid = mid;
}

ModelDefinition.prototype.getMid = function() {
	return this.mid;
}

ModelDefinition.prototype.setTable = function(table) {
	this.table = table;
}

ModelDefinition.prototype.getTable = function() {
	return this.table;
}

ModelDefinition.prototype.setPrefix = function(prefix) {
	this.prefix = prefix;
}

ModelDefinition.prototype.getPrefix = function() {
	return this.prefix;
}

ModelDefinition.prototype.setFields = function(fields) {
	if (Utils.isNotNull(fields)) {
		this.fields = fields;
	}
}

ModelDefinition.prototype.getFields = function() {
	return this.fields;
}

ModelDefinition.prototype.getField = function(key) {
	return this.fields[key];
}

ModelDefinition.prototype.addRefField = function(refField) {
	this.refFields.push(refField);
}

ModelDefinition.prototype.setRefFields = function(refFields) {
	if (Utils.isNotNull(refFields)) {
		this.refFields = refFields;
	}
}

ModelDefinition.prototype.getRefFields = function() {
	return this.refFields;
}

ModelDefinition.prototype.setModelKeyMap = function(modelKeyMap) {
	this.modelKeyMap = modelKeyMap;
}

ModelDefinition.prototype.getModelKeyMap = function() {
	return this.modelKeyMap;
}

module.exports = ModelDefinition;