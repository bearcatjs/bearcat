var beanWrapper = require('../beans/beanWrapper');
var utils = require('./utils');

module.exports.buildBeanWrapper = function(list) {
	var r = {};

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

		if (w.name) {
			r[w.name] = bWrapper;
		}
		// r.push(bWrapper);
	}

	return r;
}

module.exports.sortBeanDefinitions = function(beanFactory, beanDefinitions) {
	var r = [];
	var t = [];
	var n = 0;
	var orderMap = {};

	for (var beanName in beanDefinitions) {
		if (beanName === 'countDownLatchFactory' || beanName === 'countDownLatch') {
			continue;
		}
		var beanDefinition = beanDefinitions[beanName];
		if (beanDefinition['order']) {
			n++;
		}

		if (beanDefinition.hasParent()) {
			beanDefinition = beanFactory.setParentBean(beanName);
		}

		r.push(beanDefinition);
	}

	r.sort(compare);

	return {
		total: n,
		list: r
	};
}

function compare(a, b) {
	if (!a.getOrder())
		return 1;
	if (!b.getOrder())
		return -1;
	return a.getOrder() - b.getOrder();
}