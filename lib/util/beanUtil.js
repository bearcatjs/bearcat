/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * |   _  )  |   ____)   /   \     |   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * |______)  |_______/__/     \__\ | _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanUtils
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var beanWrapper = require('../beans/support/beanWrapper');
var utils = require('./utils');

var BeanUtils = {};

module.exports = BeanUtils;

BeanUtils.buildBeanWrapper = function(list) {
	var r = [];

	if (!utils.checkArray(list)) {
		return r;
	}

	for (var i = 0; i < list.length; i++) {
		var w = list[i];

		var bWrapper = new beanWrapper();
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

BeanUtils.sortBeanDefinitions = function(beanFactory, beanDefinitions) {
	var r = [];
	var t = [];
	var orderMap = {};

	for (var beanName in beanDefinitions) {
		var beanDefinition = beanDefinitions[beanName];
		if (beanDefinition.isSingleton() && !beanDefinition.isLazyInit()) {

			if (beanDefinition.hasParentBean()) {
				beanDefinition = beanFactory.setParentBean(beanName);
			}

			r.push(beanDefinition);
		}
	}

	r.sort(compare);

	return r;
}

function compare(a, b) {
	if (!a.getOrder())
		return 1;
	if (!b.getOrder())
		return -1;
	return a.getOrder() - b.getOrder();
}