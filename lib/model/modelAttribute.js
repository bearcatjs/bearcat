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

var ModelAttribute = function() {
	this.ref = null;
	this.name = null;
	this.type = null;
	this.prefix = null;
	this.default = null;
	this.primary = false;
	this.constraints = [];
	this.expression = null;
}

ModelAttribute.prototype.filter = function(value) {
	var r = false;
	r = this.filterType(value);
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

	return true;
}

ModelAttribute.prototype.filterType = function(value) {
	var type = this.type;
	if (!Utils.checkString(type)) {
		return true;
	}

	var Type = Utils.normalizeType(type);

	var isType = Utils.isType(Type);

	var r = isType(value);

	if (r !== true) {
		var message = 'field: %s value: %s error, type not matched with %s';
		return new Error(Util.format(message, this.name, value, Type));
	}

	return r;
}

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

		index = item.indexOf(":");
		// "$type:String;default:aaa"
		if (index != -1) {
			var p = item.split(":");
			name = p[0].toLowerCase();

			if (p.length >= 2) {
				value = p[1];
				if (this.checkProps(name)) {
					this[name] = value;
				}
				// no this case
				// else {
				// 	props.push({
				// 		name: name,
				// 		value: value
				// 	});
				// }
			}
			continue;
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

ModelAttribute.prototype.setExpression = function(expression) {
	this.expression = expression;
}

ModelAttribute.prototype.getExpression = function() {
	return this.expression;
}

ModelAttribute.prototype.setRef = function(ref) {
	this.ref = ref;
}

ModelAttribute.prototype.getRef = function() {
	return this.ref;
}

ModelAttribute.prototype.setName = function(name) {
	this.name = name;
}

ModelAttribute.prototype.getName = function() {
	return this.name;
}

ModelAttribute.prototype.setType = function(type) {
	this.type = type;
}

ModelAttribute.prototype.getType = function(type) {
	return this.type;
}

ModelAttribute.prototype.setPrimary = function(primary) {
	this.primary = primary;
}

ModelAttribute.prototype.getPrimary = function() {
	return this.primary;
}

ModelAttribute.prototype.setDefault = function(defaultValue) {
	this.default = defaultValue;
}

ModelAttribute.prototype.getDefault = function() {
	return this.default;
}

ModelAttribute.prototype.setPrefix = function(prefix) {
	this.prefix = prefix;
}

ModelAttribute.prototype.getPrefix = function() {
	return this.prefix;
}

ModelAttribute.prototype.isPrimary = function() {
	return this.primary;
}

ModelAttribute.prototype.addConstraints = function(constraint) {
	this.constraints.push(constraint);
}

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