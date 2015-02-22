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

/**
 * ModelDefinition constructor function.
 *
 * @api public
 */
var ModelDefinition = function() {
	this.id = null;
	this.mid = null;
	this.table = null;
	this.prefix = null;
	this.balance = null;
	this.fields = {};
	this.refFields = [];
	this.modelKeyMap = {};
	this.oneToMany = false;
}

/**
 * ModelDefinition set bean id.
 *
 * @param   {String} bean id
 * @api public
 */
ModelDefinition.prototype.setId = function(id) {
	this.id = id;
}

/**
 * ModelDefinition get bean id.
 *
 * @return   {String} bean id
 * @api public
 */
ModelDefinition.prototype.getId = function() {
	return this.id;
}

/**
 * ModelDefinition set model id.
 *
 * @param   {String} model id
 * @api public
 */
ModelDefinition.prototype.setMid = function(mid) {
	this.mid = mid;
}

/**
 * ModelDefinition get model id.
 *
 * @return   {String} model id
 * @api public
 */
ModelDefinition.prototype.getMid = function() {
	return this.mid;
}

/**
 * ModelDefinition set ORM table.
 *
 * @param   {String} ORM table
 * @api public
 */
ModelDefinition.prototype.setTable = function(table) {
	if (!table) {
		return;
	}

	this.table = table;
}

/**
 * ModelDefinition get ORM table.
 *
 * @return   {String} ORM table
 * @api public
 */
ModelDefinition.prototype.getTable = function() {
	return this.table;
}

/**
 * ModelDefinition set model definition prefix.
 *
 * @param   {String} model definition prefix
 * @api public
 */
ModelDefinition.prototype.setPrefix = function(prefix) {
	if (!prefix) {
		return;
	}

	this.prefix = prefix;
}

/**
 * ModelDefinition get model definition prefix.
 *
 * @return   {String} model definition prefix
 * @api public
 */
ModelDefinition.prototype.getPrefix = function() {
	return this.prefix;
}

/**
 * ModelDefinition set model definition balance field for ddb sharding.
 *
 * @param   {String} model definition balance field
 * @api public
 */
ModelDefinition.prototype.setBalance = function(balance) {
	if (!balance) {
		return;
	}

	this.balance = balance;
}

/**
 * ModelDefinition get model definition balance field for ddb sharding.
 *
 * @return   {String} model definition balance field
 * @api public
 */
ModelDefinition.prototype.getBalance = function() {
	return this.balance;
}

/**
 * ModelDefinition set model fields.
 *
 * @param   {Array} model fields
 * @api public
 */
ModelDefinition.prototype.setFields = function(fields) {
	if (Utils.isNotNull(fields)) {
		this.fields = fields;
	}
}

/**
 * ModelDefinition get model fields.
 *
 * @return   {Array} model fields
 * @api public
 */
ModelDefinition.prototype.getFields = function() {
	return this.fields;
}

/**
 * ModelDefinition get model field by key.
 *
 * @return   {Object} model field
 * @api public
 */
ModelDefinition.prototype.getField = function(key) {
	return this.fields[key];
}

/**
 * ModelDefinition add ref field name.
 *
 * @param   {String} ref field name
 * @api public
 */
ModelDefinition.prototype.addRefField = function(refField) {
	this.refFields.push(refField);
}

/**
 * ModelDefinition set ref fields.
 *
 * @param   {Array} ref fields
 * @api public
 */
ModelDefinition.prototype.setRefFields = function(refFields) {
	if (Utils.isNotNull(refFields)) {
		this.refFields = refFields;
	}
}

/**
 * ModelDefinition get ref fields.
 *
 * @return   {Array} ref fields
 * @api public
 */
ModelDefinition.prototype.getRefFields = function() {
	return this.refFields;
}

/**
 * ModelDefinition set model key map used for resultSet to model object mapping.
 *
 * @param   {Object} model key map
 * @api public
 */
ModelDefinition.prototype.setModelKeyMap = function(modelKeyMap) {
	this.modelKeyMap = modelKeyMap;
}

/**
 * ModelDefinition get model key map used for resultSet to model object mapping.
 *
 * @return   {Object} model key map
 * @api public
 */
ModelDefinition.prototype.getModelKeyMap = function() {
	return this.modelKeyMap;
}

/**
 * ModelDefinition set model oneToMany relation.
 *
 * @param   {Boolean} oneToMany relation
 * @api public
 */
ModelDefinition.prototype.setOneToMany = function(oneToMany) {
	this.oneToMany = oneToMany;
}

/**
 * ModelDefinition check model oneToMany relation.
 *
 * @return   {Boolean} if it is oneToMany relation
 * @api public
 */
ModelDefinition.prototype.isOneToMany = function() {
	return this.oneToMany;
}

module.exports = ModelDefinition;