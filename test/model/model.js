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
				var r = car.$before('before')
					.$set('num', 100);

				expect(r).to.eql(true);

				var num = car.$get('num');
				expect(num).to.eql(100);

				r = car.$before('before')
					.$after(['transform'])
					.$set('num', 100);

				expect(r).to.eql(true);

				num = car.$get('num');
				expect(num).to.eql(10000);

				r = car.$before(['checkNum'])
					.$set('num', 'aaa');

				expect(r).to.be.an('object');

				num = car.$get('num');

				expect(num).to.eql(10000);

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