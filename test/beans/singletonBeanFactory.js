var SingletonBeanFactory = require('../../lib/beans/singletonBeanFactory');

describe('SingletonBeanFactory', function() {
	describe('simple', function() {
		it('should get bean right', function(done) {
			var singletonBeanFactory = new SingletonBeanFactory();
			singletonBeanFactory.containsSingleton('car');

			done();
		});
	});
});