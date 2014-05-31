var Advisor = require('../../lib/aop/advisor');

var should = require('should');

describe('Advisor', function() {
	describe('advisor', function() {
		it('should advice right', function(done) {
			var advisor = new Advisor();
			advisor.setPointcut(null);

			advisor.setBeanName('car');
			var r = advisor.getBeanName();
			r.should.eql('car');

			done();
		});
	});
});