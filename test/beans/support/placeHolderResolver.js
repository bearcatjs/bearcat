var lib = process.env.BEARCAT_COV ? 'lib-cov' : 'lib';

var PlaceHolderResolver = require('../../../' + lib + '/beans/support/placeHolderResolver');
var should = require('should');

describe('PlaceHolderResolver', function() {
	describe('simple', function() {
		it('should get bean right', function(done) {
			var placeHolderResolver = new PlaceHolderResolver();
			placeHolderResolver.setProperties();
			placeHolderResolver.doReplace();

			placeHolderResolver.doReplace("${host}");

			done();
		});
	});
});