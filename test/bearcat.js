var should = require('should');

describe('bearcat', function() {
	describe('#getBeanFactory', function() {
		it('should get BeanFactory from bearcat', function(done) {
			var bearcat = require('../lib/bearcat');
			var simplepath = require.resolve('../examples/simple/context.json');
			var paths = [simplepath];

			bearcat.createApp(paths);
			bearcat.start(function() {
				var car = bearcat.getBean('car');
				var r = car.run();

				r.should.exist;
				r.should.be.eql('car');

				bearcat.stop();
				done();
			});
		})
	});

	describe('#bearcat handle error', function() {
		it('should handle error right', function(done) {
			var bearcat = require('../lib/bearcat');
			var simplepath = require.resolve('../examples/simple/context.json');
			var paths = [simplepath];

			bearcat.getBeanFactory();
			bearcat.getApplicationContext();
			bearcat.getBeanByMeta();
			bearcat.getBean();
			bearcat.getFunction();

			bearcat.start();
			bearcat.stop();

			var Bus = function() {}

			bearcat.createApp(paths);
			bearcat.start(function() {
				bearcat.getBeanFactory();
				bearcat.getApplicationContext();
				bearcat.getBeanByMeta({
					id: "bus",
					func: Bus
				});

				bearcat.getBean({
					id: "bus",
					func: Bus
				});

				bearcat.getBean();

				bearcat.getFunction('car');
				bearcat.start(function() {
					bearcat.getRoute("car", "run");
					bearcat.stop();
					bearcat.stop();
					done();
				});
			});
		})
	});
});