var ResourceLoader = require('../../lib/resource/resourceLoader');
var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

describe('resourceLoader', function() {
	describe('#getResources', function() {
		it('should getResources right', function(done) {
			if (isBrowser()) {
				return done();
			}

			var simplepath = require.resolve('../../examples/simple/context.json');
			var resourceLoader = new ResourceLoader();
			var r = resourceLoader.load(simplepath);
			var p = resourceLoader.load(simplepath);
			expect(r).to.eql(p);

			done();
		});
	});
});