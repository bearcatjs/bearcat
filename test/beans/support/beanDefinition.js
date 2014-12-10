var BeanDefinition = require('../../../lib/beans/support/beanDefinition');
var BeanWrapper = require('../../../lib/beans/support/beanWrapper');
var Constant = require('../../../lib/util/constant');

describe('beanDefinition', function() {
	describe('beanDefinition', function() {
		it('should advice right', function(done) {
			var beanDefinition = new BeanDefinition();
			var parentBeanDefinition = new BeanDefinition();
			parentBeanDefinition.setFactoryBeanName('factoryCar');
			parentBeanDefinition.setFactoryMethodName('createCar');
			parentBeanDefinition.setScope('prototype');
			parentBeanDefinition.setLazyInit(true);
			parentBeanDefinition.setProxy(true);
			parentBeanDefinition.setInitMethodName('init');
			parentBeanDefinition.setDestroyMethodName('destroy');

			beanDefinition.setParentBean(parentBeanDefinition);
			beanDefinition.setParentBean();
			beanDefinition.setBeanName();
			beanDefinition.setScope();
			var beanWrapper = new BeanWrapper();
			beanWrapper.setName('car');
			beanDefinition.setFactoryArgsOn([beanWrapper]);
			beanDefinition.hasParent();

			beanDefinition.isSingleton();
			beanDefinition.isPrototype();
			beanDefinition.getFactoryBeanName();
			beanDefinition.getFactoryMethodName();
			beanDefinition.getScope();
			beanDefinition.isLazyInit();
			beanDefinition.needProxy();
			beanDefinition.getInitMethodName();
			beanDefinition.getDestroyMethodName();

			done();
		});
	});
});