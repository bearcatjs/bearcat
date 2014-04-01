var Advisor = require('../aop/advisor');
var Aspect = require('../aop/aspect');
var aopUtil = {};

module.exports = aopUtil;

aopUtil.buildAspect = function(metaList, beanDefinition) {
	var aspect = new Aspect();
	var beanName = beanDefinition.getBeanName();
	aspect.setBeanDefinition(beanDefinition);

	for (var i = 0; i < metaList.length; i++) {
		var meta = metaList[i];
		var pointcut = meta['pointcut'];
		var advice = meta['advice'];

		if (!pointcut || !advice) {
			continue;
		}

		var advisor = new Advisor();
		advisor.setPointcut(pointcut);
		advisor.setAdvice(advice);
		advisor.setBeanName(beanName);
		advisor.parse();

		aspect.addAdvisor(advisor);
	}

	return aspect;
}