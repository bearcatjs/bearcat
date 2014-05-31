var ApplicationContext = require('../../lib/context/applicationContext');
var should = require('should');

describe('applicationContext', function() {
	describe('simple', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			r.should.exist;
			r.should.eql('car');

			done();
		});
	});

	describe('simple_inject', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_inject/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			r.should.exist;
			r.should.eql('car wheel');

			done();
		});
	});

	describe('simple_meta', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_meta/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			r.should.exist;
			r.should.eql('car');

			done();
		});
	});

	describe('simple_meta_error', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_meta_error/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			done();
		});
	});

	describe('simple_meta_merge', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_meta_merge/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			r.should.exist;
			r.should.eql('car' + 100);

			done();
		});
	});

	describe('simple_meta_mismatch', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_meta_mismatch/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');

			done();
		});
	});

	describe('simple_inject_meta', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_inject_meta/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			r.should.exist;
			r.should.eql('car wheel');

			done();
		});
	});

	describe('simple_args_value', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_args_value/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			r.should.exist;
			r.should.eql('car 100');

			done();
		});
	});

	describe('simple_args_type', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_args_type/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car', 200);
			var r = car.run();
			r.should.exist;
			r.should.eql('car 200');

			done();
		});
	});

	describe('simple_prototype', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_prototype/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			r.should.exist;
			r.should.eql('car 1');

			var another_car = applicationContext.getBean('car');
			r = car.run();
			r.should.exist;
			r.should.eql('car 2');

			done();
		});
	});

	describe('simple_init_method', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_init_method/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			r.should.exist;
			r.should.eql('car 1');

			done();
		});
	});

	describe('simple_destroy_method', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_destroy_method/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			r.should.exist;
			r.should.eql('car');

			applicationContext.on('destroyed', function() {
				done();
			});

			applicationContext.destroy();

			var isActive = applicationContext.isActive();
			isActive.should.be.false;
		});
	});

	describe('simple_async_init', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_async_init/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				var r = car.run();
				r.should.exist;
				r.should.eql('car 1');

				done();
			})
			applicationContext.refresh();
		});
	});

	describe('simple_factory_bean', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_factory_bean/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				var r = car.run();
				r.should.exist;
				r.should.eql('car 0');

				done();
			})
			applicationContext.refresh();
		});
	});


	describe('simple_factory_bean_error', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_factory_bean_error/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				// var r = car.run();
				// r.should.exist;
				// r.should.eql('car 0');

				done();
			})
			applicationContext.refresh();
		});
	});

	describe('simple_module_inject', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_module_inject/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				var r = car.run();
				r.should.exist;
				r.should.eql('car wheel');

				done();
			})
			applicationContext.refresh();
		});
	});

	describe('simple_parent_bean', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_parent_bean/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var bus = applicationContext.getBean('bus');
				var r = bus.run();
				r.should.exist;
				r.should.eql('bus 100');

				var tank = applicationContext.getBean('tank');
				r = tank.run();
				r.should.exist;
				r.should.eql('tank 100');

				done();
			})
			applicationContext.refresh();
		});
	});

	describe('getBeanByMeta', function() {
		it('should getBeanByMeta right', function(done) {
			var simplepath = require.resolve('../../examples/simple/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);

			applicationContext.refresh();

			var CarM = function() {

			}

			CarM.prototype.run = function(num) {
				console.log('mcar' + num);
				return 'mcar' + num;
			}

			CarM.prototype.dyInit = function() {

			}

			CarM.prototype.a = 1;
			var mcar = applicationContext.getBeanByMeta({
				id: "mcar",
				func: CarM
			});

			var r = mcar.run(100);
			r.should.eql('mcar' + 100);

			// mcar.dyInit();

			var acar = applicationContext.getBeanByMeta({
				id: "acar"
			});

			var abcar = applicationContext.getBeanByMeta({});

			applicationContext.registerBeanMeta({});

			done();
		});
	});

	describe('startUpDate', function() {
		it('should startUpDate right', function(done) {
			var simplepath = require.resolve('../../examples/simple/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);

			applicationContext.refresh();

			applicationContext.setStartupDate(Date.now());
			applicationContext.getStartupDate();

			done();
		});
	});

	describe('refreshBeanFactory', function() {
		it('should refreshBeanFactory right', function(done) {
			var simplepath = require.resolve('../../examples/simple_inject/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);

			applicationContext.refresh();

			applicationContext.refresh();

			applicationContext.cancelRefresh();

			done();
		});
	});

	describe('get set', function() {
		it('should get set right', function(done) {
			var simplepath = require.resolve('../../examples/simple/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);

			applicationContext.refresh();

			var r = applicationContext.getEnv();
			r.should.eql('dev');

			r = applicationContext.isRunning();
			r.should.eql(true);

			r = applicationContext.containsBean('car');
			r.should.eql(true);

			r = applicationContext.isSingleton('car');
			r.should.eql(true);

			r = applicationContext.isPrototype('car');
			r.should.eql(false);

			r = applicationContext.containsBeanDefinition('car');
			r.should.eql(true);

			r = applicationContext.getBeanDefinition('car');
			r.should.exist;

			applicationContext.removeBeanDefinition('car');
			r = applicationContext.containsBeanDefinition('car');
			r.should.eql(false);

			done();
		});
	});

	describe('placeholder', function() {
		it('should placeholder right', function(done) {
			var simplepath = require.resolve('../../examples/placeholder/context.json');
			var paths = [simplepath];
			var path = require('path');

			var configPath = path.dirname(simplepath) + '/config';

			var applicationContext = new ApplicationContext(paths);
			applicationContext.setConfigPath(configPath);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			r.should.exist;
			r.should.eql('car100');

			applicationContext.setEnv('prod');
			applicationContext.refresh();

			car = applicationContext.getBean('car');
			r = car.run();
			r.should.exist;
			r.should.eql('car1000');

			done();
		});
	});

	describe('circle reference', function() {
		it('should circle reference right', function(done) {
			var simplepath = require.resolve('../../examples/circle_reference/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);

			applicationContext.refresh();

			applicationContext.getBean('xxx');

			done();
		});
	});

	describe('context path null', function() {
		it('should context path right', function(done) {
			var simplepath = require.resolve('../../examples/circle_reference/context.json') + 1;
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);

			applicationContext.refresh();

			done();
		});
	});

	describe('simple_imports_context', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_imports_context/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			r.should.exist;
			r.should.eql('car');

			done();
		});
	});

	describe('simple_lazy_init', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_lazy_init/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			r.should.exist;
			r.should.eql('car');

			done();
		});
	});

	describe('simple_abstract_parent', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_abstract_parent/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var bus = applicationContext.getBean('bus');
			var Car = applicationContext.getBean('car');
			Car.call(bus);
			bus.run();
			bus.fly();

			done();
		});
	});
});