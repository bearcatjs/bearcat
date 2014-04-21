var lib = process.env.BEARCAT_COV ? 'lib-cov' : 'lib';

var MetaLoader = require('../../' + lib + '/resource/metaLoader');
var should = require('should');

describe('metaLoader', function() {
	describe('#getResources', function() {
		it('should getResources right', function(done) {
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