var AopUtil = require('../../lib/util/aopUtil');
var BeanDefinition = require('../../lib/beans/support/beanDefinition');

describe('AopUtil', function() {
	describe('AopUtil', function() {
		it('should AopUtil right', function(done) {
			var beanDefinition = new BeanDefinition();
			beanDefinition.setBeanName('car');

			AopUtil.buildAspect([{}], beanDefinition);

			done();
		});
	});
});