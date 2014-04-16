var lib = process.env.BEARCAT_COV ? 'lib-cov' : 'lib';

var AopUtil = require('../../' + lib + '/util/aopUtil');
var BeanDefinition = require('../../' + lib + '/beans/support/beanDefinition');

var should = require('should');

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