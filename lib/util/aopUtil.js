var Advisor = require('../aop/advisor');
var Aspect = require('../aop/aspect');
var aopUtil = {};

module.exports = aopUtil;

aopUtil.buildAspect = function(metaList, beanDefinition) {
	var aspect = new Aspect();
	var beanName = beanDefinition.getBeanName();
	aspect.setBeanDefinition(beanDefinition);
	aspect.setBeanName(beanName);

	for (var i = 0; i < metaList.length; i++) {
		var meta = metaList[i];
		var pointcut = meta['pointcut'];
		var advice = meta['advice'];
		var order = meta['order'];
		var runtime = meta['runtime'] || false;

		if (!pointcut || !advice) {
			continue;
		}

		var advisor = new Advisor();
		advisor.setPointcut(pointcut);
		advisor.setAdvice(advice);
		advisor.setBeanName(beanName);
		advisor.setOrder(order);
		advisor.setRuntime(runtime);
		advisor.parse();

		aspect.addAdvisor(advisor);
	}

	return aspect;
}

aopUtil.getMethodsFromObject = function(object) {
	var proto = object;
	var methods = [];

	for (var key in proto) {
		var method = proto[key];
		if (typeof method === 'function') {
			methods.push(key);
		}
	}

	return methods;
}

aopUtil.sortAdvisorsByOrder = function(advisors) {
	advisors.sort(compare);

	return advisors;
}

function compare(a, b) {
	if (!a.getOrder())
		return 1;
	if (!b.getOrder())
		return -1;
	return a.getOrder() - b.getOrder();
}