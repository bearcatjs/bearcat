var ModelDefinition = require('../../lib/model/modelDefinition');
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
	describe('#modelDefinition', function() {
		it('should do modelDefinition right', function(done) {
			var modelDefinition = new ModelDefinition();
			modelDefinition.getMid();
			modelDefinition.getTable();

			done();
		})
	})
});