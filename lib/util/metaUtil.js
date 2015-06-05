/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat MetaUtil
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('Bearcat', 'MetaUtil');
var RequireUtil = require('./requireUtil');
var Constant = require('./constant');
var Os = RequireUtil.requireOs();
var Utils = require('./utils');
var EOL = Os.EOL;

var MetaUtil = {
	metaCache: {}
};

/**
 * MetaUtil merge metaObject with originMeta.
 *
 * @param   {Object} meta metaObject
 * @param   {Object} originMeta origin metaObject
 * @param   {Object} merged metaObjects
 * @api public
 */
MetaUtil.mergeMeta = function(meta, originMeta) {
	if (!originMeta) {
		return meta;
	}

	for (var key in meta) {
		originMeta[key] = meta[key];
	}

	return originMeta;
}

/**
 * MetaUtil resolve function annotation like $id, $scope, $car etc.
 *
 * @param  {Function} func function annotation
 * @param  {String}   func function file path
 * @param  {Boolean}  force resolve func annotation
 * @return {Object}   metaObject resolved metaObject
 * @api private
 */
MetaUtil.resolveFuncAnnotation = function(func, fp, force) {
	var funcString = func.toString();

	if (process.env.LOADER_BIN === 'on') {
		force = true;
	}

	if (this.metaCache[funcString] && !force) {
		return this.metaCache[funcString];
	}

	var funcArgsString = funcString.match(Constant.FUNC_ARGS_REGEXP);

	if (funcArgsString) {
		funcArgsString = funcArgsString[1];
	} else {
		funcArgsString = "";
	}

	var funcArgs = [];

	if (funcArgsString) {
		funcArgs = funcArgsString.split(',');
	}

	var meta = {};
	var props = [];
	var args = [];
	var attributes = [];

	var funcProps = null;

	if (funcArgs.length || process.env.BEARCAT_FUNCTION_STRING) {
		// if constructor function have arguments or setup BEARCAT_FUNCTION_STRING flag
		// use funcString to resolve $ props
		funcString = MetaUtil.resolveFuncComment(funcString);
		funcProps = MetaUtil.resolvePropsFromFuncString(funcString, funcArgsString);
	} else {
		// use new to resolve $ props directly to support dynamic $ prefix attributes
		// try catch the error, when dependency is not ready when started
		try {
			funcProps = new func();
		} catch (e) {
			return;
		}
	}

	for (var funcKey in funcProps) {
		// prototype attribute must be prefixed with $, other attributes will be ignored 
		if (!funcProps.hasOwnProperty(funcKey) && !MetaUtil.checkFuncAnnotation(funcKey)) {
			continue;
		}

		var value = funcProps[funcKey];

		// ignore function value
		if (Utils.checkFunction(value)) {
			continue;
		}

		if (MetaUtil.checkFuncAnnotation(funcKey)) {
			var key = funcKey.substr(1);
			if (MetaUtil.checkInMetaProps(funcKey)) {
				if (key === Constant.META_AOP && funcProps[funcKey] === true) {
					meta[key] = this.resolvePrototypeAnnotation(func);
				} else {
					if (key === Constant.META_ID) {
						if (MetaUtil.checkInMetaProps(value, true)) {
							logger.warn('bean id value must not use bearcat special bean attributes: %s', value);
							return;
						}
					}
					meta[key] = value;
				}
			} else {
				if (!MetaUtil.checkInFuncArgs(funcKey, funcArgs)) {
					if (MetaUtil.checkFuncPropsValue(funcKey)) {
						props.push({
							name: funcKey,
							value: value
						});
					} else if (MetaUtil.checkFuncPropsType(funcKey)) {
						props.push({
							name: funcKey,
							type: value
						});
					} else if (MetaUtil.checkFuncPropsNamespace(funcKey)) {
						props.push({
							name: funcKey,
							ref: value
						});
					} else {
						props.push({
							name: funcKey,
							ref: key
						});
					}
				}
			}
			continue;
		} else if (MetaUtil.checkFuncPropsConfigValue(value)) {
			// this.num = "${car.num}"; placeholder
			props.push({
				name: funcKey,
				value: value
			});
		} else if (MetaUtil.checkFuncValueAnnotation(value)) {
			// this.num = "$type:Number"; model attribute
			attributes.push({
				name: funcKey,
				value: value
			});
		}
	}

	delete funcProps;

	if (props.length) {
		meta['props'] = props;
	}

	for (var i = 0; i < funcArgs.length; i++) {
		var funcArg = funcArgs[i].trim();
		if (!funcArg) {
			continue;
		}

		var key = funcArg.substr(1);
		if (MetaUtil.checkFuncAnnotation(funcArg)) {
			args.push({
				name: funcArg,
				ref: key
			});
		} else {
			// not start with $, treat it as a type injection
			args.push({
				name: funcArg,
				type: "Object"
			});
		}
	}

	if (args.length) {
		meta['args'] = args;
	}

	if (attributes.length) {
		meta['attributes'] = attributes;
	}

	meta['func'] = func;
	if (fp) {
		meta['fpath'] = require('path').resolve(process.cwd(), fp);
	}

	var id = meta.id;
	if (meta.id) {
		id = meta.id;
	} else if (meta.mid) {
		id = meta.mid + Constant.BEAN_SPECIAL_MODEL;
	} else if (meta.cid) {
		id = meta.cid + Constant.BEAN_SPECIAL_CONSTRAINT;
	} else {
		// must have id
	}

	if (id) {
		meta['id'] = id;
	}

	this.metaCache[funcString] = meta;
	return meta;
}

/**
 * MetaUtil props from function string.
 *
 * @param  {String}     function string
 * @return {Object}     resolved props object
 * @api private
 */
MetaUtil.resolvePropsFromFuncString = function(funcString, funcArgsString) {
	var funcPropsArray = funcString.match(Constant.FUNC_PROPS_REGEXP);
	var funcPropsAttrArray = funcString.match(Constant.FUNC_PROPS_REGEXP_ATTR);

	var t = "var FuncProps = function(" + funcArgsString + ") {" + EOL;
	if (funcPropsArray && Utils.checkArray(funcPropsArray)) {
		for (var i = 0; i < funcPropsArray.length; i++) {
			t += (funcPropsArray[i] + EOL);
		}
	}

	if (funcPropsAttrArray && Utils.checkArray(funcPropsAttrArray)) {
		for (var i = 0; i < funcPropsAttrArray.length; i++) {
			t += (funcPropsAttrArray[i] + EOL);
		}
	}

	t += "}";

	var funcProps = MetaUtil.getEvalFuncProps(t);

	return funcProps;
}

/**
 * MetaUtil resolve prototype annotation.
 *
 * @param  {Function}   func function
 * @return {Object}     resolved meta object
 * @api private
 */
MetaUtil.resolvePrototypeAnnotation = function(func) {
	var proto = func.prototype;
	var meta = [];

	for (var funcName in proto) {
		var protoFunc = proto[funcName];
		if (Utils.checkFunction(protoFunc)) {
			var funcString = protoFunc.toString();
			funcString = MetaUtil.resolveFuncComment(funcString);

			var funcPropsArray = funcString.match(Constant.PROTO_FUNC_PROPS_REGEXP);
			var t = "";
			if (funcPropsArray && Utils.checkArray(funcPropsArray)) {
				t = "var FuncMetaProps = function() {" + EOL;
				for (var i = 0; i < funcPropsArray.length; i++) {
					t += (funcPropsArray[i].replace(/var\s*/, "this.") + EOL);
				}
				t += "}";
			}

			var funcProps = MetaUtil.getEvalFuncMetaProps(t);
			var aop = {};
			var flag = false;
			aop[Constant.META_AOP_ADVICE] = funcName;
			for (var funcKey in funcProps) {
				if (this.checkInAOPMetaProps(funcKey)) {
					var key = funcKey.substr(1);
					var value = funcProps[funcKey];
					aop[key] = value;
					flag = true;
				}
			}

			if (flag) {
				meta.push(aop);
			}
		}
	}

	return meta;
}

/**
 * MetaUtil resolve function comments.
 *
 * @param  {String}   t function string
 * @return {String}   resolved function string
 * @api private
 */
MetaUtil.resolveFuncComment = function(funcString) {
	funcString = funcString.replace(Constant.FUNC_COMMENT_LINE, "")
	funcString = funcString.replace(Constant.FUNC_COMMENT_STAR, "");
	return funcString;
}

/**
 * MetaUtil get eval function props.
 *
 * @param  {String}   t function string
 * @return {Object}   eval object result
 * @api private
 */
MetaUtil.getEvalFuncProps = function(t) {
	if (!t) {
		return {};
	}

	try {
		eval(t);
		return new FuncProps();
	} catch (err) {
		logger.error("resolveFuncAnnotation error: " + err.stack);
		return {};
	}
}

/**
 * MetaUtil get eval function props.
 *
 * @param  {String}   t function string
 * @return {Object}   eval object result
 * @api private
 */
MetaUtil.getEvalFuncMetaProps = function(t) {
	if (!t) {
		return {};
	}

	try {
		eval(t);
		return new FuncMetaProps();
	} catch (err) {
		logger.error("resolvePrototypeAnnotation error: " + err.stack);
		return {};
	}
}

/**
 * MetaUtil check funcKey in metaProps.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkInMetaProps = function(funcKey, flag) {
	var META_PROPS = Constant.META_PROPS;

	var prefix = "";
	if (!flag) {
		prefix = Constant.FUNC_ANNOTATION;
	}

	for (var i = 0; i < META_PROPS.length; i++) {
		if (prefix + META_PROPS[i] === funcKey) {
			return true;
		}
	}

	return false;
}

/**
 * MetaUtil check funcKey in aopMetaProps.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkInAOPMetaProps = function(funcKey) {
	var META_PROPS = Constant.AOP_META_PROPS;

	for (var i = 0; i < META_PROPS.length; i++) {
		if (Constant.FUNC_ANNOTATION + META_PROPS[i] === funcKey) {
			return true;
		}
	}

	return false;
}

/**
 * MetaUtil check funcKey in function args.
 *
 * @param  {String}   funcKey function key
 * @param  {Array}    function args
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkInFuncArgs = function(funcKey, funcArgs) {
	for (var i = 0; i < funcArgs.length; i++) {
		if (funcKey === funcArgs[i]) {
			return true;
		}
	}

	return false;
}

/**
 * MetaUtil check function annotation.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncAnnotation = function(funcKey) {
	return funcKey.match(/^\$/);
}

/**
 * MetaUtil check funcValue annotation.
 *
 * @param  {String}   funcValue function value
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncValueAnnotation = function(funcValue) {
	if (!Utils.checkString(funcValue)) {
		return false;
	}

	return this.checkFuncAnnotation(funcValue);
}

/**
 * MetaUtil check function props value.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncPropsValue = function(funcKey) {
	return funcKey.match(/^\$V/);
}

/**
 * MetaUtil check function props type.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncPropsType = function(funcKey) {
	return funcKey.match(/^\$T/);
}

/**
 * MetaUtil check function props namespace.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncPropsNamespace = function(funcKey) {
	return funcKey.match(/^\$N/);
}

/**
 * MetaUtil check function props config value.
 *
 * @param  {String}   value
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncPropsConfigValue = function(value) {
	if (!Utils.checkString(value)) {
		return;
	}
	return value.match(/^\$\{.*?\}$/);
}

/**
 * MetaUtil clean up meta cache.
 *
 * @api public
 */
MetaUtil.cleanUp = function() {
	this.metaCache = {};
}

module.exports = MetaUtil;