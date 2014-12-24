var ApplicationContext = require('../../lib/context/applicationContext');

var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}

describe('aop', function() {
	describe('before advice', function() {
		it('should do before advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runBefore(function(err, r) {
				expect(r).to.eql('car');

				done();
			});
		});

		it('should do before runtime advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runTimeBefore(100, function(err, r) {
				expect(r).to.eql('car' + 100);

				done();
			});
		});

		it('should do before error advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runBeforeError(function(err, r) {
				// expect(err).to.not.be.empty();

				done();
			});
		});
	});

	describe('after advice', function() {
		it('should do after advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runAfter(100, function(err, r) {
				expect(r).to.eql('car' + 100);

				done();
			});
		});
	});

	describe('around advice', function() {
		it('should do around advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runAround(function(err, r) {
				expect(r).to.eql('car' + 100);

				done();
			});
		});

		it('should do around runtime advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runTimeAround(100, function(err, r) {
				expect(r).to.eql('car100' + 100);

				done();
			});
		});
	});

	describe('no advice', function() {
		it('should do no advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.doRun(100);

			done();
		});
	});

	describe('no advice', function() {
		it('should do no advice object right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var obj = {
				test: 1
			};

			var r = car.doRunObj(obj);
			console.log(obj);
			done();
		});
	});

	describe('sync target method after advice', function() {
		it('should do sync target method after advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');

			var r = car.doRunAfterSync();
			done();
		});
	});

	describe('sync target method', function() {
		it('should do sync target method right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.runBeforeSync();

			done();
		});
	});
});