/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ValidatorUtil
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
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

	if (!id)
		return false;

	var order = metaObject.order;
	if (order && typeof order !== 'number')
		return false;

	var parentName = metaObject.parent;
	if (parentName && typeof parentName !== 'string')
		return false;

	var initMethodName = metaObject.initMethod;
	if (initMethodName && typeof initMethodName !== 'string')
		return false;

	var destroyMethodName = metaObject.destroyMethod;
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

	var args = metaObject.args || Constant.ARGS_DEFAULT;
	var props = metaObject.props || Constant.PROPS_DEFAULT;
	var factoryArgsOn = metaObject.factoryArgs || Constant.ARGS_DEFAULT;

	var asyncInit = metaObject.asyncInit || Constant.ASYNC_INIT_DEFAULT;
	if (asyncInit && typeof asyncInit !== 'boolean')
		return false;

	return true;
}