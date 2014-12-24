var BeanDefinitionVisitor = require('../../../lib/beans/support/beanDefinitionVisitor');

describe('BeanDefinitionVisitor', function() {
	describe('beanDefinitionVisitor', function() {
		it('should advice right', function(done) {
			var beanDefinitionVisitor = new BeanDefinitionVisitor();
			beanDefinitionVisitor.setValueResolver();
			beanDefinitionVisitor.resolveStringValue("aaa");

			done();
		});
	});
});