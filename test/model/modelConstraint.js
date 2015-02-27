var ModelConstraint = require('../../lib/model/modelConstraint');
var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}

describe('bearcat', function() {
	describe('#modelConstraint', function() {
		it('should do modelConstraint right', function(done) {
			var modelConstraint = new ModelConstraint();
			modelConstraint.getCid();

			done();
		})
	})
});