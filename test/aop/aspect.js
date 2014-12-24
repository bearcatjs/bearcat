var Aspect = require('../../lib/aop/aspect');
var BeanDefinition = require('../../lib/beans/support/beanDefinition');

describe('Aspect', function() {
	describe('aspect', function() {
		it('should aspect right', function(done) {
			var aspect = new Aspect();
			aspect.setBeanDefinition(new BeanDefinition());
			aspect.getBeanDefinition();

			var Car = function() {}
			aspect.setBean(new Car());
			aspect.getBean();

			done();
		});
	});
});