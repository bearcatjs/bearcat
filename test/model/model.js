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
		it('should do model right|error', function(done) {
			var bearcat = require('../../lib/bearcat');
			if (isBrowser()) {
				require('../../examples/model_test/bearcat-bootstrap.js');
			}
			var simplepath = require.resolve('../../examples/model_test/context.json');
			var paths = [simplepath];

			bearcat.getModel('xxx');
			bearcat.getRoute();
			bearcat.createApp(paths);
			bearcat.start(function() {
				var car = bearcat.getModel('car'); // get bean
				var r = car.$before('before')
					.$set('num', 100);

				expect(r).to.eql(undefined);

				var num = car.$get('num');
				expect(num).to.eql(100);

				r = car.$before('before')
					.$after(['transform'])
					.$set('num', 100);

				expect(r).to.eql(undefined);

				num = car.$get('num');
				expect(num).to.eql(10000);

				r = car.$before(['checkNum'])
					.$set('num', 'aaa');

				expect(r).to.be.an('object');

				num = car.$get('num');

				expect(num).to.eql(10000);

				r = car.$before()
					.$set('len', 'aaaaa6');

				expect(r).to.be.an('object');

				r = car.$after()
					.$pack({
						id: 100,
						num: 100,
						len: 100
					});

				num = car.$get('num');
				expect(num).to.eql(100);

				console.log(r);
				expect(r).to.be.an('object');

				r = car.$after()
					.$pack({
						id: 100,
						num: 100,
						len: "aaa"
					});

				car.run();

				expect(r).to.eql(undefined);

				r = car.$after(['transformError'])
					.$set('num', 100);

				expect(r).to.be.an('object');

				var carError = bearcat.getModel("carError");
				console.log(carError);

				bearcat.getModel('xxx');
				bearcat.stop();
				done();
			});
		});
	});
});