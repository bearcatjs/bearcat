var lib = process.env.BEARCAT_COV ? 'lib-cov' : 'lib';

var BeanFactory = require('../../' + lib + '/beans/beanFactory');
var BeanDefinition = require('../../' + lib + '/beans/support/beanDefinition');
var BeanWrapper = require('../../' + lib + '/beans/support/beanWrapper');
var should = require('should');

describe('BeanFactory', function() {
	describe('simple', function() {
		it('should get bean right', function(done) {
			var beanFactory = new BeanFactory();

			beanFactory.doCreateBean('car');
			beanFactory.initBean('car');
			beanFactory.invokeInitMethods('car');
			beanFactory.getDependsApplyArgs('');
			beanFactory.setParentBean('car');
			// beanFactory.getDependsBeans('car');
			beanFactory.isSingleton('car');
			beanFactory.isPrototype('car');
			beanFactory.destroySingleton();
			beanFactory.destroyBean();

			var beanDefinition = new BeanDefinition();
			beanDefinition.setBeanName('car');
			beanFactory.beanDefinitions['car'] = beanDefinition;

			beanFactory.doCreateBean('car');

			var beanWrapper = new BeanWrapper();

			beanFactory.getDependsApplyArgs([beanWrapper]);

			done();
		});
	});
});