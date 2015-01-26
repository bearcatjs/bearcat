/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanUtils
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var BeanWrapper = require('../beans/support/beanWrapper');
var Utils = require('./utils');

var BeanUtils = {};

/**
 * BeanUtil build beanWrapper from meta settings.
 *
 * @param    {Array}  list meta settings
 * @return   {Array}  beanWrappers
 * @api public
 */
BeanUtils.buildBeanWrapper = function(list) {
	var r = [];

	if (!Utils.checkArray(list)) {
		return r;
	}

	for (var i = 0; i < list.length; i++) {
		var w = list[i];

		var bWrapper = new BeanWrapper();
		if (w.name) {
			bWrapper.setName(w.name);
		}

		if (w.type) {
			bWrapper.setType(w.type);
		}

		if (w.value) {
			bWrapper.setValue(w.value);
		}

		if (w.ref) {
			bWrapper.setRef(w.ref);
		}

		bWrapper.setRole();

		r.push(bWrapper);
	}

	return r;
}

/**
 * BeanUtils getBeanSettingsMap.
 *
 * @param    {Array}   list beanWrappers
 * @return   {Object}  beanWrapper map
 * @api public
 */
BeanUtils.getBeanSettingsMap = function(list) {
	var r = {};
	if (!Utils.checkArray(list)) {
		return r;
	}

	for (var i = 0; i < list.length; i++) {
		var w = list[i];
		var name = w.getName();
		if (!name) {
			continue;
		}
		r[name] = w;
	}

	return r;
}

/**
 * BeanUtils getBeanSettingsArray.
 *
 * @param   {Object}  map beanWrapper map
 * @return  {Array}   beanWrappers
 * @api public
 */
BeanUtils.getBeanSettingsArray = function(map) {
	var r = [];

	if (!Utils.isNotNull(map)) {
		return r;
	}

	for (var name in map) {
		r.push(map[name]);
	}

	return r;
}

/**
 * BeanUtils sortBeanDefinitions.
 *
 * @param    {Array}  beanDefinitions
 * @return   {Array}  beanFactory sorted beanDefinitions
 * @api public
 */
BeanUtils.sortBeanDefinitions = function(beanDefinitions, beanFactory) {
	var r = [];

	for (var beanName in beanDefinitions) {
		var beanDefinition = beanDefinitions[beanName];

		if (beanDefinition.isSingleton() && !beanDefinition.isLazyInit() && !beanDefinition.isAbstract()) {
			if (beanDefinition.hasParentBean()) {
				beanDefinition = beanFactory.setParentBean(beanDefinition.getBeanName());
			}

			r.push(beanDefinition);
		}
	}

	r.sort(Utils.compareBeans);

	return r;
}

module.exports = BeanUtils;