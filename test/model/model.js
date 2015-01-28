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
	describe('#model', function() {
		it('should do model right', function(done) {
			var bearcat = require('../../lib/bearcat');
			if (isBrowser()) {
				require('../../examples/model/bearcat-bootstrap.js');
			}
			var simplepath = require.resolve('../../examples/model/context.json');
			var paths = [simplepath];

			bearcat.getModel('xxx');
			bearcat.getRoute();
			bearcat.createApp(paths);
			bearcat.start(function() {
				var car = bearcat.getModel('car'); // get bean
				car.$before('before')
					.$after(['transform'])
					.$set('num', 100);

				var num = car.$get('num');
				expect(num).to.eql(100);

				var r = car.$before(['checkNum'])
					.$set('num', 'aaa');

				expect(r).to.be.an('object');

				num = car.$get('num');

				expect(num).to.eql(100);

				console.log(num);
				r = car.$before()
					.$set('len', 'aaaaa6');

				expect(r).to.be.an('object');
				bearcat.stop();
				done();
			});
		})
	});
});