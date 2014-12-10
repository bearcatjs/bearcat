var PlaceHolderConfigurer = require('../../../lib/beans/support/placeHolderConfigurer');

describe('PlaceHolderConfigurer', function() {
	describe('placeHolderConfigurer', function() {
		it('should advice right', function(done) {
			var placeHolderConfigurer = new PlaceHolderConfigurer();
			placeHolderConfigurer.setBeanName('car');
			placeHolderConfigurer.getBeanName('car');

			placeHolderConfigurer.setProperties();

			done();
		});
	});
});