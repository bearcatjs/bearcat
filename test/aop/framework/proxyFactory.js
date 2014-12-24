var ProxyFactory = require('../../../lib/aop/framework/proxyFactory');

describe('ProxyFactory', function() {
	describe('ProxyFactory', function() {
		it('should do ProxyFactory right', function(done) {
			var Car = function() {}

			var proxyFactory = new ProxyFactory(new Car(), ['run', 'runxx']);

			done();
		});
	});
});