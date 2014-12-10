var TargetSource = require('../../lib/aop/targetSource');

describe('TargetSource', function() {
	describe('TargetSource', function() {
		it('should do TargetSource right', function(done) {
			var targetSource = new TargetSource();
			var Car = function() {}
			targetSource.setBeanName('car');
			targetSource.setTarget(new Car());

			done();
		});
	});
});