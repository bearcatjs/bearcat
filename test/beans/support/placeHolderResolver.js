var PlaceHolderResolver = require('../../../lib/beans/support/placeHolderResolver');

describe('PlaceHolderResolver', function() {
	describe('simple', function() {
		it('should get bean right', function(done) {
			var placeHolderResolver = new PlaceHolderResolver();
			placeHolderResolver.setProperties();
			placeHolderResolver.doReplace();

			placeHolderResolver.doReplace("${host}");

			placeHolderResolver.resolveStringValue(1);

			placeHolderResolver.resolveStringValue("aaa");

			placeHolderResolver.doReplace("aaa");

			placeHolderResolver.setProperties({
				host: "aaa"
			});

			placeHolderResolver.resolveStringValue("${aaa}aaa")
			placeHolderResolver.resolveStringValue("aaaaaa")
			done();
		});
	});
});