var MetaLoader = require('../../lib/resource/metaLoader');

function isBrowser() {
	return typeof window !== 'undefined';
}

describe('metaLoader', function() {
	describe('#getResources', function() {
		it('should getResources right', function(done) {
			if (isBrowser()) {
				return done();
			}

			var metaLoader = new MetaLoader();
			metaLoader.load();
			metaLoader.load(require.resolve('./configLoader'));
			var path = require('path');
			var emptypath = require.resolve('../mock-base/mock-meta.js');
			// metaLoader.loadPath({}, path.dirname(emptypath) + '/empty');
			done();
		});
	});
});