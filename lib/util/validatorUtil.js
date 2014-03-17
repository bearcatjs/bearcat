var constant = require('./constant');
var validatorUtil = {};

module.exports = validatorUtil;

validatorUtil.metaValidator = function(metaObject) {
	var order = metaObject.order;
	if(order && typeof order !== 'number')
		return false;

	var parentName = metaObject.parent;
	if(parentName && typeof parentName !== 'string')
		return false;

	var initMethodName = metaObject.initMethod;
	if(initMethodName && typeof initMethodName !== 'string')
		return false;

	var destroyMethodName = metaObject.destroyMethod;
	if(destroyMethodName && typeof destroyMethodName !== 'string')
		return false;

	var factoryBeanName = metaObject.factoryBean;
	if(factoryBeanName && typeof factoryBeanName !== 'string')
		return false;

	var factoryMethodName = metaObject.factoryMethod;
	if(factoryMethodName && typeof factoryMethodName !== 'string')
		return false;

	var scope = metaObject.scope || constant.SCOPE_DEFAULT;
	if(scope && scope !== constant.SCOPE_SINGLETON && scope !== constant.SCOPE_PROTOTYPE)
		return false;
	var args = metaObject.args || constant.ARGS_DEFAULT;
	var props = metaObject.props || constant.PROPS_DEFAULT;
	var factoryArgsOn = metaObject.factoryArgs || constant.ARGS_DEFAULT;
	var asyncInit = metaObject.asyncInit || constant.ASYNC_INIT_DEFAULT;
	if(asyncInit && typeof asyncInit !== 'boolean')
		return false;

	return true;
}