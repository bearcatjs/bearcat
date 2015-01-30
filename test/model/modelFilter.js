var ModelFilter = require('../../lib/model/modelFilter');
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
	describe('#modelFilter', function() {
		it('should do modelFilter right', function(done) {
			var modelFilter = new ModelFilter();
			modelFilter.getModel();
			modelFilter.getModelDefinition();

			done();
		})
	})
});