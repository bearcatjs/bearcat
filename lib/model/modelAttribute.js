/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelAttribute
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Constant = require('../util/constant');
var Utils = require('../util/utils');
var Util = require('util');

/**
 * ModelAttribute constructor function.
 *
 * @api public
 */
var ModelAttribute = function() {
	this.ref = null;
	this.name = null;
	this.type = null;
	this.prefix = null;
	this.default = null;
	this.primary = false;
	this.balance = false;
	this.constraints = [];
	this.expression = null;
}

/**
 * ModelAttribute do filter attribute value.
 *
 * @param   {String} 	attribute value
 * @return  {Error}  	Error
 * @api public
 */
ModelAttribute.prototype.filter = function(value) {
	if (!Utils.isNotNull(value)) {
		return;
	}

	var r = this.filterType(value);
	if (Utils.checkModelFilterError(r)) {
		return r;
	}

	var key = this.name;
	var constraints = this.constraints;
	var constraintMethod = Constant.CONSTRAINT_METHOD;

	for (var i = 0; i < constraints.length; i++) {
		var constraint = constraints[i];
		if (constraint && Utils.checkFunction(constraint[constraintMethod])) {
			r = constraint[constraintMethod](key, value);
			if (Utils.checkModelFilterError(r)) {
				return r;
			}
		}
	}

	return;
}

/**
 * ModelAttribute do filter attribute value type.
 *
 * @param   {String} 	attribute value
 * @return  {Error} 	Error
 * @api private
 */
ModelAttribute.prototype.filterType = function(value) {
	var type = this.type;
	if (!Utils.checkString(type)) {
		return;
	}

	var Type = type;

	var isType = Utils.isType(Type);

	var r = isType(value);

	if (r !== true) {
		var message = 'field: %s with value: %s error, type not matched with %s';
		return new Error(Util.format(message, this.name, value, Type));
	}

	return;
}

/**
 * ModelAttribute do parse attribute expression.
 *
 * @param   {String} attribute expression
 * @param   {Object} bean factory
 * @api private
 */
ModelAttribute.prototype.parse = function(expression, beanFactory) {
	if (!expression) {
		return;
	}

	expression = expression.replace(/\s/g, "");

	var f = expression[0];
	if (f !== Constant.CONSTRAINT_ANNOTATION) {
		return;
	}

	expression = expression.substr(1);

	var list = expression.split(Constant.CONSTRAINT_SPLIT); // split by ;

	for (var i = 0; i < list.length; i++) {
		var name = "";
		var value = "";
		var index = -1;
		var props = [];

		var item = list[i];

		// continue with ""
		if (!item) {
			continue;
		}

		// "$primary;"
		if (item === Constant.MODEL_ATTRIBUTE_PRIMARY) {
			this[item] = true;
			continue;
		}

		// "$balance;"
		if (item === Constant.MODEL_ATTRIBUTE_BALANCE) {
			this[item] = true;
			continue;
		}

		index = item.indexOf(":");
		// "$type:String;default:aaa"
		if (index != -1) {
			var p = item.split(":");
			name = p[0].toLowerCase();

			if (p.length >= 2) {
				value = p[1];
				if (this.checkProps(name)) {
					if (name === "type") {
						value = Utils.normalizeType(value);
					}

					this[name] = value;
					continue;
				}
				// max:10
				else {
					props.push({
						name: name,
						value: value
					});
				}
			}
		}

		index = item.indexOf("(");

		if (index != -1) {
			name = item.substr(0, index);
			// no prefix name
			if (!name) {
				continue;
			}

			var left = item.substr(index);
			var len = left.length;
			// no this case
			// if (len < 1) {
			// 	continue;
			// }
			var last = left[len - 1];
			if (last !== ")") {
				continue;
			}

			left = left.substr(1, len - 2);
			var leftList = left.split(",");

			for (var j = 0; j < leftList.length; j++) {
				var leftProp = leftList[j].split("=");
				var leftPropLen = leftProp.length;

				if (leftPropLen < 2) {
					continue;
				}

				if (!leftProp[0] || !leftProp[1]) {
					continue;
				}

				props.push({
					name: leftProp[0],
					value: leftProp[1]
				});
			}
		}

		if (!name) {
			name = item;
		}

		var constraint = beanFactory.getConstraint(name);
		if (!constraint) {
			continue;
		}

		var constraintDefinition = beanFactory.getConstraintDefinition(name);

		var constraintExpression = constraintDefinition.getConstraint();
		if (constraintExpression) {
			this.parse(constraintExpression, beanFactory)
		}

		var propsLen = props.length;
		if (propsLen) {
			for (var k = 0; k < propsLen; k++) {
				var prop = props[k];
				var propName = prop['name'];
				var propValue = prop['value'];
				constraint[propName] = propValue;
			}
		}

		this.addConstraints(constraint);
	}
}

/**
 * ModelAttribute set expression.
 *
 * @param   {String} expression
 * @api public
 */
ModelAttribute.prototype.setExpression = function(expression) {
	this.expression = expression;
}

/**
 * ModelAttribute get expression.
 *
 * @return   {String} expression
 * @api public
 */
ModelAttribute.prototype.getExpression = function() {
	return this.expression;
}

/**
 * ModelAttribute set ref.
 *
 * @param   {String} ref string.
 * @api public
 */
ModelAttribute.prototype.setRef = function(ref) {
	this.ref = ref;
}

/**
 * ModelAttribute get ref.
 *
 * @return   {String} ref string.
 * @api public
 */
ModelAttribute.prototype.getRef = function() {
	return this.ref;
}

/**
 * ModelAttribute set attribute name.
 *
 * @param   {String} attribute name.
 * @api public
 */
ModelAttribute.prototype.setName = function(name) {
	this.name = name;
}

/**
 * ModelAttribute get attribute name.
 *
 * @return   {String} attribute name.
 * @api public
 */
ModelAttribute.prototype.getName = function() {
	return this.name;
}

/**
 * ModelAttribute set attribute type.
 *
 * @param   {String} attribute type.
 * @api public
 */
ModelAttribute.prototype.setType = function(type) {
	this.type = type;
}

/**
 * ModelAttribute get attribute type.
 *
 * @return   {String} attribute type.
 * @api public
 */
ModelAttribute.prototype.getType = function(type) {
	return this.type;
}

/**
 * ModelAttribute set attribute primary.
 *
 * @param   {Boolean} if it is the attribute primary.
 * @api public
 */
ModelAttribute.prototype.setPrimary = function(primary) {
	this.primary = primary;
}

/**
 * ModelAttribute get attribute primary.
 *
 * @return   {Boolean} attribute primary.
 * @api public
 */
ModelAttribute.prototype.getPrimary = function() {
	return this.primary;
}

/**
 * ModelAttribute set attribute default value.
 *
 * @param   {String} attribute default value.
 * @api public
 */
ModelAttribute.prototype.setDefault = function(defaultValue) {
	this.default = defaultValue;
}

/**
 * ModelAttribute get attribute default value.
 *
 * @return   {String} attribute default value.
 * @api public
 */
ModelAttribute.prototype.getDefault = function() {
	return this.default;
}

/**
 * ModelAttribute set attribute prefix.
 *
 * @param   {String} attribute prefix.
 * @api public
 */
ModelAttribute.prototype.setPrefix = function(prefix) {
	this.prefix = prefix;
}

/**
 * ModelAttribute get attribute prefix.
 *
 * @return   {String} attribute prefix.
 * @api public
 */
ModelAttribute.prototype.getPrefix = function() {
	return this.prefix;
}

/**
 * ModelAttribute check if it is a primary attribute.
 *
 * @param   {Boolean} if it is a primary attribute.
 * @api public
 */
ModelAttribute.prototype.isPrimary = function() {
	return this.primary;
}

/**
 * ModelAttribute check if it is a balance attribute.
 *
 * @param   {Boolean} if it is a balance attribute.
 * @api public
 */
ModelAttribute.prototype.isBalance = function() {
	return this.balance;
}

/**
 * ModelAttribute add constraint.
 *
 * @param   {Object} constraint object.
 * @api public
 */
ModelAttribute.prototype.addConstraints = function(constraint) {
	this.constraints.push(constraint);
}

/**
 * ModelAttribute check attribute properties.
 *
 * @param   {Boolean} check result.
 * @api private
 */
ModelAttribute.prototype.checkProps = function(key) {
	var attributes = Constant.MODEL_ATTRIBUTES;
	for (var i = 0; i < attributes.length; i++) {
		if (key === attributes[i]) {
			return true;
		}
	}

	return false;
}

module.exports = ModelAttribute;