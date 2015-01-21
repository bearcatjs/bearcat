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
var ValidatorUtil = {};

module.exports = ValidatorUtil;

/**
 * ValidatorUtil validate metaObject.
 *
 * @param    {Object}   metaObject
 * @return   {Boolean}  true|false
 * @api public
 */
ValidatorUtil.metaValidator = function(metaObject) {
	var id = metaObject.id;
	var mid = metaObject.mid;
	var cid = metaObject.cid;

	if (!id && !mid && !cid)
		return false;

	var func = metaObject.func;
	if (!func || typeof func !== 'function') {
		return false;
	}

	var table = metaObject.table;
	if (table && typeof table !== 'string') {
		return false;
	}

	var message = metaObject.message;
	if (message && typeof message !== 'string') {
		return false;
	}

	var constraint = metaObject.constraint;
	if (constraint && typeof constraint !== 'string') {
		return false;
	}

	var order = metaObject.order;
	if (order && typeof order !== 'number')
		return false;

	var parentName = metaObject.parent;
	if (parentName && typeof parentName !== 'string')
		return false;

	var initMethodName = metaObject.init;
	if (initMethodName && typeof initMethodName !== 'string')
		return false;

	var destroyMethodName = metaObject.destroy;
	if (destroyMethodName && typeof destroyMethodName !== 'string')
		return false;

	var factoryBeanName = metaObject.factoryBean;
	if (factoryBeanName && typeof factoryBeanName !== 'string')
		return false;

	var factoryMethodName = metaObject.factoryMethod;
	if (factoryMethodName && typeof factoryMethodName !== 'string')
		return false;

	var scope = metaObject.scope || Constant.SCOPE_DEFAULT;
	if (scope && scope !== Constant.SCOPE_SINGLETON && scope !== Constant.SCOPE_PROTOTYPE)
		return false;

	// var args = metaObject.args || Constant.ARGS_DEFAULT;
	// var props = metaObject.props || Constant.PROPS_DEFAULT;
	// var factoryArgsOn = metaObject.factoryArgs || Constant.ARGS_DEFAULT;

	var asyncInit = metaObject.async || Constant.ASYNC_INIT_DEFAULT;
	if (asyncInit && typeof asyncInit !== 'boolean')
		return false;

	var lazyInit = metaObject.lazy || Constant.LAZY_INIT_DEFAULT;
	if (lazyInit && typeof lazyInit !== 'boolean')
		return false;

	return true;
}