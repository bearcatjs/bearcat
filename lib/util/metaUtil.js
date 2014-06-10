/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat MetaUtil
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('Bearcat', 'MetaUtil');
var Constant = require('./constant');
var Utils = require('./utils');
var Os = require('os');

var MetaUtil = {};

module.exports = MetaUtil;

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
		// if (key === Constant.DEPENDS_PROPS) {
		// 	originMeta[key] = MetaUtil.mergeProps(meta[key], originMeta[key]);
		// } else {
		originMeta[key] = meta[key];
		// }
	}

	return originMeta;
}

/**
 * MetaUtil merge props with originProps.
 *
 * @param   {Object} props
 * @param   {Object} originProps origin props
 * @param   {Object} merged props
 * @api public
 */
// MetaUtil.mergeProps = function(props, originProps) {
// 	var propsMap = {};
// 	var originPropsMap = {};

// 	for (var i = 0; i < props.length; i++) {
// 		if (props[i]['name']) {
// 			propsMap[props[i]['name']] = props[i];
// 		}
// 	}

// 	for (var i = 0; i < originProps.length; i++) {
// 		if (originProps[i]['name']) {
// 			originPropsMap[originPropsMap[i]['name']] = originPropsMap[i];
// 		}
// 	}

// 	for (var key in propsMap) {
// 		originPropsMap[key] = propsMap[key];
// 	}

// 	var r = [];
// 	for (var key in originPropsMap) {
// 		r.push(originPropsMap[key]);
// 	}

// 	return r;
// }

/**
 * MetaUtil resolve function annotation like $id, $scope, $car etc.
 *
 * @param  {Function} func function annotation
 * @return {Object}   metaObject resolved metaObject
 * @api private
 */
MetaUtil.resolveFuncAnnotation = function(func) {
	var funcString = func.toString();
	var funcArgsString = funcString.match(Constant.FUNC_ARGS_REGEXP);

	if (funcArgsString) {
		funcArgsString = funcArgsString[1];
	} else {
		funcArgsString = "";
	}

	var funcArgs = funcArgsString.split(",");

	var funcPropsArray = funcString.match(Constant.FUNC_PROPS_REGEXP);

	var EOL = Os.EOL;

	var meta = {};
	var props = [];
	var args = [];

	if (funcPropsArray && Utils.checkArray(funcPropsArray)) {
		var t = "var FuncProps = function(" + funcArgsString + ") {" + EOL;
		for (var i = 0; i < funcPropsArray.length; i++) {
			t += (funcPropsArray[i] + EOL);
		}
		t += "}";

		var funcProps = MetaUtil.getEvalFuncProps(t);

		for (var funcKey in funcProps) {
			if (MetaUtil.checkFuncAnnotation(funcKey)) {
				var key = funcKey.substr(1);
				var value = funcProps[funcKey];
				if (MetaUtil.checkInMetaProps(funcKey)) {
					meta[key] = funcProps[funcKey];
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
			}
		}

		if (props.length) {
			meta['props'] = props;
		}
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

	meta['func'] = func;
	return meta;
}

/**
 * MetaUtil get eval function props.
 *
 * @param  {String}   t function string
 * @return {Object}   eval object result
 * @api private
 */
MetaUtil.getEvalFuncProps = function(t) {
	try {
		eval(t);
		return new FuncProps();
	} catch (err) {
		logger.error("resolveFuncAnnotation error: " + err.stack);
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
MetaUtil.checkInMetaProps = function(funcKey) {
	var META_PROPS = Constant.META_PROPS;

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