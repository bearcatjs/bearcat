var ModelAttribute = require('../../lib/model/modelAttribute');
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
	describe('#modelAttribute', function() {
		it('should do modelAttribute right', function(done) {
			var modelAttribute = new ModelAttribute();
			var r = modelAttribute.filterType();
			expect(r).to.eql(undefined);

			modelAttribute.parse();
			modelAttribute.parse("aaa");
			modelAttribute.getExpression();
			modelAttribute.getName();
			modelAttribute.setType('aa');
			modelAttribute.getType();
			modelAttribute.setPrimary('aa');
			modelAttribute.getPrimary();
			modelAttribute.isPrimary();
			modelAttribute.setDefault('aaa');

			done();
		})
	})
});