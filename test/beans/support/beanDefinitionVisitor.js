var lib = process.env.BEARCAT_COV ? 'lib-cov' : 'lib';

var BeanDefinitionVisitor = require('../../../' + lib + '/beans/support/beanDefinitionVisitor');

var should = require('should');

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