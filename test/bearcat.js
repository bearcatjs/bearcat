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

	describe('#bearcat handle error', function() {
		it('should handle error right', function(done) {
			var bearcat = require('../lib/bearcat');
			var simplepath = require.resolve('../examples/simple/context.json');
			var paths = [simplepath];
			bearcat.getBeanByFunc();

			bearcat.createApp(paths);
			bearcat.start(function() {
				var Bus = function() {
					this.$id = "bus";
				}

				Bus.prototype.run = function() {
					return 'bus';
				}

				var bus = bearcat.getBeanByFunc(Bus);
				var r = bus.run();
				r.should.exist;
				r.should.eql('bus');

				var bus1 = bearcat.getBean(Bus);
				r = bus1.run();
				r.should.exist;
				r.should.eql('bus');

				bearcat.getBean(function() {});
				bearcat.stop();
				done();
			});
		})
	});

	describe('#bearcat handle getBean meta func arguments', function() {
		it('should handle getBean meta func arguments right', function(done) {
			var bearcat = require('../lib/bearcat');
			var simplepath = require.resolve('../examples/simple/context.json');
			var paths = [simplepath];

			var Bus = function(num) {
				this.$id = "bus";
				this.num = num;
			}

			Bus.prototype.run = function() {
				return 'bus' + this.num;
			}

			bearcat.createApp(paths);
			bearcat.start(function() {
				var bus = bearcat.getBean(Bus, 100);
				var r = bus.run();
				r.should.exist;
				r.should.eql('bus100');

				done();
			});
		});
	});
});