var lib = process.env.BEARCAT_COV ? 'lib-cov' : 'lib';

var ResourceLoader = require('../../' + lib + '/resource/resourceLoader');
var should = require('should');

describe('resourceLoader', function() {
	describe('#getResources', function() {
		it('should getResources right', function(done) {
			var simplepath = require.resolve('../../examples/simple/context.json');
			var resourceLoader = new ResourceLoader();
			var r = resourceLoader.load(simplepath);
			var p = resourceLoader.load(simplepath);
			r.should.eql(p);

			done();
		});
	});
});