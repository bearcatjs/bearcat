var ModelProxy = require('../../lib/model/modelProxy');
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
	describe('#modelProxy', function() {
		it('should do modelProxy right', function(done) {
			var modelProxy = new ModelProxy();
			modelProxy._modelInit();
			modelProxy._filter();
			modelProxy.$pack();
			modelProxy._getFilters();
			modelProxy._reset();
			modelProxy['model'] = {}
			modelProxy._modelInvoke('xxx');
			modelProxy.toJSON();

			done();
		})
	})
});