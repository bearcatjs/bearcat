var Pointcut = require('../../lib/aop/pointcut');

var should = require('should');

describe('Pointcut', function() {
	describe('Pointcut', function() {
		it('should do Pointcut right', function(done) {
			var pointcut = new Pointcut();
			pointcut.parse();

			done();
		});
	});
});