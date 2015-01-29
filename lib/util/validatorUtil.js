/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ValidatorUtil
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Constant = require('./constant');
var Utils = require('./utils');
var ValidatorUtil = {};

/**
 * ValidatorUtil validate metaObject.
 *
 * @param    {Object}   	   metaObject
 * @return   {Boolean|Error}  true|error object
 * @api public
 */
ValidatorUtil.metaValidator = function(metaObject) {
	var id = metaObject.id;
	var mid = metaObject.mid;
	var cid = metaObject.cid;

	if (!id && !mid && !cid)
		return new Error('one of id, mid, cid must be exist');

	if (Utils.isNotNull(id) && !Utils.checkString(id))
		return new Error('id must be String');

	if (Utils.isNotNull(mid) && !Utils.checkString(mid))
		return new Error('mid must be String');

	if (Utils.isNotNull(cid) && !Utils.checkString(cid))
		return new Error('cid must be String');

	var func = metaObject.func;
	if (!Utils.isNotNull(func) || !Utils.checkFunction(func))
		return new Error('func must be Function');

	var table = metaObject.table;
	if (Utils.isNotNull(table) && !Utils.checkString(table)) {
		return new Error('table must be String');
	}

	var message = metaObject.message;
	if (Utils.isNotNull(message) && !Utils.checkString(message)) {
		return new Error('message must be String');
	}

	var constraint = metaObject.constraint;
	if (Utils.isNotNull(constraint) && !Utils.checkString(constraint)) {
		return new Error('constraint must be String');
	}

	var order = metaObject.order;
	if (Utils.isNotNull(order) && !Utils.checkNumber(order))
		return new Error('order must be Number');

	var parentName = metaObject.parent;
	if (Utils.isNotNull(parentName) && !Utils.checkString(parentName))
		return new Error('parent must be String');

	var initMethodName = metaObject.init;
	if (Utils.isNotNull(initMethodName) && !Utils.checkString(initMethodName))
		return new Error('init must be String');

	var destroyMethodName = metaObject.destroy;
	if (Utils.isNotNull(destroyMethodName) && !Utils.checkString(destroyMethodName))
		return new Error('destroy must be String');

	var factoryBeanName = metaObject.factoryBean;
	if (Utils.isNotNull(factoryBeanName) && !Utils.checkString(factoryBeanName))
		return new Error('factoryBean must be String');

	var factoryMethodName = metaObject.factoryMethod;
	if (Utils.isNotNull(factoryMethodName) && !Utils.checkString(factoryMethodName))
		return new Error('factoryMethodName must be String');

	var scope = metaObject.scope || Constant.SCOPE_DEFAULT;
	if (scope && scope !== Constant.SCOPE_SINGLETON && scope !== Constant.SCOPE_PROTOTYPE)
		return new Error('scope must be singleton or prototype');

	var asyncInit = metaObject.async || Constant.ASYNC_INIT_DEFAULT;
	if (Utils.isNotNull(asyncInit) && !Utils.checkBoolean(asyncInit))
		return new Error('async must be Boolean');

	var lazyInit = metaObject.lazy || Constant.LAZY_INIT_DEFAULT;
	if (Utils.isNotNull(lazyInit) && !Utils.checkBoolean(lazyInit))
		return new Error('lazy must be Boolean');

	return true;
}

module.exports = ValidatorUtil;