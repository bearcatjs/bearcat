var app = require('./lib/application');
var ApplicationContext = require('./lib/context/applicationContext');
var ResourceLoader = require('./lib/resource/resourceLoader');

var p = process.cwd() + '/design/beans';

var main = function() {
	app.init();
	app.loadBeans(p);
	var beanFactory = app.getBeanFactory();
	// var wheel = beanFactory.getBean("wheel");
	// var engine = beanFactory.getBean("engine");
	var car = beanFactory.getBean("car", 100);

	// wheel.run();
	// engine.start();
	car.run();

	var car1 = beanFactory.getBean("car");

	// wheel.run();
	// engine.start();
	car1.run();

	// var countDownLatch = beanFactory.getBean("countDownLatch", 1, function() {
	// 	console.log("done");
	// });

	// countDownLatch.done();
	// var car = beanFactory.getBean("car");
}

var testApplicationContext = function() {
	var paths = ["moduleA/context.json"];
	var applicationContext = new ApplicationContext(paths);
	applicationContext.refresh();

	// setTimeout(function() {
		console.log('applicationContext refresh');
		applicationContext.refresh();
	// }, 10000);


	// applicationContext.destroyBeans();
}

var testResourceLoader = function() {
	var resourceLoader = new ResourceLoader();
	var metaObjects = resourceLoader.load("moduleA/context.json");
	console.log(metaObjects);
}

process.env.LOGGER_LINE = true;

// main();

testApplicationContext();

// testResourceLoader();