/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelDefinition
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var ModelDefinition = function() {
	this.id = null;
	this.mid = null;
	this.table = null;
	this.fields = {};
	// this.normalFields = {};
	// this.primaryFields = {};
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

ModelDefinition.prototype.setFields = function(fields) {
	this.fields = fields;
}

ModelDefinition.prototype.getFields = function() {
	return this.fields;
}

ModelDefinition.prototype.getField = function(key) {
	return this.fields[key];
}

module.exports = ModelDefinition;

// ModelDefinition.prototype.setNormalFields = function(normalFields) {
// 	this.normalFields = normalFields;
// }

// ModelDefinition.prototype.getNormalFields = function() {
// 	return this.normalFields;
// }

// ModelDefinition.prototype.setPrimaryFields = function(primaryFields) {
// 	this.primaryFields = primaryFields;
// }

// ModelDefinition.prototype.getPrimaryFields = function() {
// 	return this.primaryFields;
// }