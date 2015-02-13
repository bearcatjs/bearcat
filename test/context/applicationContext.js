var ApplicationContext = require('../../lib/context/applicationContext');
var expect = require('expect.js');
var path = require('path');
// var fs = require('fs');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}

describe('applicationContext', function() {
	describe('simple', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple/context.json');
			if (isBrowser()) {
				require('../../examples/simple/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths, {
				BEARCAT_LOGGER: 'off'
			});
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car');

			done();
		});
	});

	describe('simple_inject', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_inject/context.json');
			if (isBrowser()) {
				require('../../examples/simple_inject/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car wheel');

			done();
		});
	});

	describe('simple_meta', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_meta/context.json');
			if (isBrowser()) {
				require('../../examples/simple_meta/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car');

			done();
		});
	});

	describe('simple_meta_error', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_meta_error/context.json');
			if (isBrowser()) {
				require('../../examples/simple_meta_error/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			done();
		});
	});

	describe('simple_meta_merge', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_meta_merge/context.json');
			if (isBrowser()) {
				require('../../examples/simple_meta_merge/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car' + 100);

			done();
		});
	});

	describe('simple_meta_mismatch', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_meta_mismatch/context.json');
			if (isBrowser()) {
				require('../../examples/simple_meta_merge/bearcat-bootstrap.js');
			}
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
			if (isBrowser()) {
				require('../../examples/simple_inject_meta/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car wheel');

			done();
		});
	});

	describe('simple_args_value', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_args_value/context.json');
			if (isBrowser()) {
				require('../../examples/simple_args_value/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car 100');

			done();
		});
	});

	describe('simple_args_type', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_args_type/context.json');
			if (isBrowser()) {
				require('../../examples/simple_args_type/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car', 200);
			var r = car.run();
			expect(r).to.eql('car 200');

			done();
		});
	});

	describe('simple_prototype', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_prototype/context.json');
			if (isBrowser()) {
				require('../../examples/simple_prototype/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car 1');

			var another_car = applicationContext.getBean('car');
			r = car.run();
			expect(r).to.eql('car 2');

			done();
		});
	});

	describe('simple_init_method', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_init_method/context.json');
			if (isBrowser()) {
				require('../../examples/simple_init_method/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();

			expect(r).to.eql('car 1');

			done();
		});
	});

	describe('simple_destroy_method', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_destroy_method/context.json');
			if (isBrowser()) {
				require('../../examples/simple_destroy_method/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car');

			applicationContext.on('destroyed', function() {
				done();
			});

			applicationContext.destroy();

			var isActive = applicationContext.isActive();
			expect(isActive).to.eql(false);
		});
	});

	describe('simple_async_init', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_async_init/context.json');
			if (isBrowser()) {
				require('../../examples/simple_async_init/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				var r = car.run();
				expect(r).to.eql('car 1');

				setTimeout(function() {
					done();
				}, 2000);
			})
			applicationContext.refresh();
		});
	});

	describe('simple_factory_bean', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_factory_bean/context.json');
			if (isBrowser()) {
				require('../../examples/simple_factory_bean/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				var r = car.run();
				expect(r).to.eql('car 0');

				done();
			})
			applicationContext.refresh();
		});
	});


	describe('simple_factory_bean_error', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_factory_bean_error/context.json');
			if (isBrowser()) {
				require('../../examples/simple_factory_bean_error/bearcat-bootstrap.js');
			}
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
			if (isBrowser()) {
				require('../../examples/simple_module_inject/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				var r = car.run();
				expect(r).to.eql('car wheel');

				done();
			})
			applicationContext.refresh();
		});
	});

	describe('simple_parent_bean', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_parent_bean/context.json');
			if (isBrowser()) {
				require('../../examples/simple_parent_bean/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var bus = applicationContext.getBean('bus');
				var r = bus.run();
				expect(r).to.eql('bus 100');

				var tank = applicationContext.getBean('tank');
				r = tank.run();
				expect(r).to.eql('tank 100');

				done();
			})
			applicationContext.refresh();
		});
	});

	describe('getBeanByMeta', function() {
		it('should getBeanByMeta right', function(done) {
			var simplepath = require.resolve('../../examples/simple/context.json');
			if (isBrowser()) {
				require('../../examples/simple/bearcat-bootstrap');
			}
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
			expect(r).to.eql('mcar' + 100);

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
			if (isBrowser()) {
				require('../../examples/simple/bearcat-bootstrap.js');
			}
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
			if (isBrowser()) {
				require('../../examples/simple_inject/bearcat-bootstrap.js');
			}
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
			if (isBrowser()) {
				require('../../examples/simple/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);

			applicationContext.refresh();

			var r = applicationContext.getEnv();
			expect(r).to.eql('dev');

			r = applicationContext.isRunning();
			expect(r).to.eql(true);

			r = applicationContext.containsBean('car');
			expect(r).to.eql(true);

			r = applicationContext.isSingleton('car');
			expect(r).to.eql(true);

			r = applicationContext.isPrototype('car');
			expect(r).to.eql(false);

			r = applicationContext.containsBeanDefinition('car');
			expect(r).to.eql(true);

			r = applicationContext.getBeanDefinition('car');

			applicationContext.removeBeanDefinition('car');
			r = applicationContext.containsBeanDefinition('car');
			expect(r).to.eql(false);

			done();
		});
	});

	describe('placeholder', function() {
		it('should placeholder right', function(done) {
			var simplepath = require.resolve('../../examples/placeholder/context.json');
			if (isBrowser()) {
				require('../../examples/placeholder/bearcat-bootstrap.js');
			}
			var paths = [simplepath];
			var path = require('path');

			var configPath = path.dirname(simplepath) + '/config';

			var applicationContext = new ApplicationContext(paths);
			applicationContext.setConfigPath(configPath);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car100');

			applicationContext.setEnv('prod');
			applicationContext.refresh();

			car = applicationContext.getBean('car');
			r = car.run();
			// expect(r).to.eql('car1000');

			done();
		});
	});

	describe('circle reference', function() {
		it('should circle reference right', function(done) {
			var simplepath = require.resolve('../../examples/circle_reference/context.json');
			if (isBrowser()) {
				require('../../examples/circle_reference/bearcat-bootstrap.js');
			}
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
			if (isBrowser()) {
				require('../../examples/simple_imports_context/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car');

			done();
		});
	});

	describe('simple_lazy_init', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_lazy_init/context.json');
			if (isBrowser()) {
				require('../../examples/simple_lazy_init/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car');

			done();
		});
	});

	describe('simple_abstract_parent', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_abstract_parent/context.json');
			if (isBrowser()) {
				require('../../examples/simple_abstract_parent/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var bus = applicationContext.getBean('bus');
			var Car = applicationContext.getBean('car');
			var tank = applicationContext.getBean('tank');
			tank.run();
			Car.call(bus);
			bus.run();
			bus.fly();

			done();
		});
	});

	describe('hot_reload', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/hot_reload/context.json');
			if (isBrowser()) {
				require('../../examples/hot_reload/bearcat-bootstrap.js');
			}
			var hotPath = path.dirname(simplepath) + '/hot';
			var paths = [simplepath];
			var applicationContext = new ApplicationContext(paths, {
				BEARCAT_HOT: 'on'
			});
			applicationContext.setHotPath(hotPath);
			applicationContext.refresh(function() {
				var car = applicationContext.getBean('car');
				var bus = applicationContext.getBean('bus');
				var r = car.run();

				expect(r).to.eql('car');

				r = bus.run();
				expect(r).to.eql('bus');

				var hotCarPath = require.resolve('../../examples/hot_reload/hot/car.js');
				var hotBusPath = require.resolve('../../examples/hot_reload/hot/bus.js');
				// var fs = require('fs');
				// require(hotCarPath);
				// require(hotBusPath);
				setTimeout(function() {
					// fs.appendFileSync(hotCarPath, "\n");
					// fs.appendFileSync(hotBusPath, "\n");
					done();
					// setTimeout(function() {
					// 	r = car.run();
					// 	expect(r).to.eql('car hot');

					// 	r = bus.run();
					// 	expect(r).to.eql('bus hot');

					// 	done();
					// }, 6000);
				}, 2000);
			});
		});
	});

	describe('context_namespace', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/context_namespace/context.json');
			if (isBrowser()) {
				require('../../examples/context_namespace/bearcat-bootstrap.js');
			}
			var paths = [simplepath];
			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh(function() {
				var car = applicationContext.getBean('app:car');
				var r = car.run();

				expect(r).to.eql('car');

				var car1 = applicationContext.getBean('app1:car');
				r = car1.run();
				expect(r).to.eql('car');

				var car2 = applicationContext.getBean('car2');
				r = car2.run();
				expect(r).to.eql('car car');

				done();
			});
		});
	});

	describe('simple_function_annotation', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_function_annotation/context.json');
			if (isBrowser()) {
				require('../../examples/simple_function_annotation/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				var r = car.run();

				expect(r).to.eql('car wheel');

				done();
			})
			applicationContext.refresh();
		});
	});

	describe('relative_scan', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/relative_scan/context.json');
			if (isBrowser()) {
				require('../../examples/relative_scan/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				var r = car.run();

				expect(r).to.eql('car wheel');

				done();
			})
			applicationContext.refresh();
		});
	});

	describe('complex_function_annotation', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/complex_function_annotation/context.json');
			if (isBrowser()) {
				require('../../examples/complex_function_annotation/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				var r = car.run();

				done();
			})
			applicationContext.refresh();
		});
	});
});