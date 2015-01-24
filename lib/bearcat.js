/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat App
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'app');
var ApplicationContext = require('./context/applicationContext');
var EventEmitter = require('events').EventEmitter;
var BeanFactory = require('./beans/beanFactory');
var Package = require('../package.json');
var Utils = require('./util/utils');

var Root;
(function() {
	Root = this;
}());

/*!
 * Application states
 */
var STATE_NEW = 1; // app new
var STATE_INITED = 2; // app has inited
var STATE_START = 3; // app start
var STATE_STARTED = 4; // app has started

/**
 * Bearcat app object.
 * @api public
 */
var Bearcat = {
	opts: null,
	configLocations: null,
	applicationContext: null,
	state: STATE_NEW,
	startTime: null,
	version: Package.version
};

Bearcat['__proto__'] = EventEmitter.prototype;

module.exports = Bearcat;

/**
 * Bearcat createApp constructor function.
 *
 * @param  {Array}  configLocations context path array
 * @param  {Object} opts
 * @param  {String} opts.NODE_ENV            setup env
 * @param  {String} opts.BEARCAT_ENV         setup env
 * @param  {String} opts.NODE_CPATH          setup config path
 * @param  {String} opts.BEARCAT_CPATH       setup config path
 * @param  {String} opts.BEARCAT_HPATH       setup hot reload path, usually it is the scan source directory(app by default)
 * @param  {String} opts.BEARCAT_LOGGER      setup 'off' to turn off bearcat logger configuration
 * @param  {String} opts.BEARCAT_HOT         setup 'on' to turn on bearcat hot code reload
 * @param  {String} opts.BEARCAT_ANNOTATION  setup 'off' to turn off bearcat $ based annotation
 * @param  {String} opts.BEARCAT_GLOBAL  	 setup bearcat to be global object
 *
 * @return {Object} bearcat object
 * @api public
 */
Bearcat.createApp = function(configLocations, opts) {
	if (this.state >= STATE_INITED) {
		return;
	}

	if (!Utils.checkArray(configLocations) && Utils.checkObject(configLocations)) {
		opts = configLocations;
		configLocations = [];
	}

	this.opts = opts || {};
	this.configLocations = configLocations || [];

	if (this.opts['BEARCAT_GLOBAL']) {
		Root.bearcat = Bearcat;
	}

	var configLocations = this.configLocations;
	if (!configLocations) {
		return cb(new Error('Bearcat createApp error, configLocations null'));
	}

	if (!Utils.checkObject(this.opts)) {
		logger.warn('Bearcat createApp opts must be object...');
	}

	this.applicationContext = new ApplicationContext(configLocations, this.opts);

	this.state = STATE_INITED;
	return Bearcat;
}

/**
 * Bearcat start app.
 *
 * @param  {Function} cb start callback function
 * @api public
 */
Bearcat.start = function(cb) {
	if (!Utils.checkFunction(cb)) {
		cb = function() {}
	}

	if (this.state > STATE_INITED) {
		logger.warn('Bearcat has already start, run bearcat.stop to start again.');
		return cb();
	}

	if (this.state < STATE_INITED) {
		logger.warn('Bearcat does not inited, run bearcat.createApp to init.');
		return cb();
	}

	this.state = STATE_START;
	this.startTime = Date.now();
	var self = this;

	var env = this.applicationContext.getEnv();

	if (Utils.checkBrowser()) {
		this.applicationContext.setEnv(env);
		env = 'browser';
	}

	this.applicationContext.on('finishRefresh', function() {
		self.state = STATE_STARTED;
		logger.info('Bearcat startup in %s with %s ms', env, Date.now() - self.startTime);
		cb();
	});

	this.applicationContext.on('reload', function() {
		self.emit('reload');
	});

	this.applicationContext.refresh();
}

/**
 * Bearcat stop app.
 * it will stop internal applicationContext, destroy all singletonBeans
 *
 * @api public
 */
Bearcat.stop = function() {
	if (this.applicationContext) {
		this.applicationContext.destroy();
	}
	this.applicationContext = null;
	this.configLocations = null;
	this.startTime = null;
	this.state = STATE_NEW;
}

/**
 * Bearcat get beanFactory instance.
 *
 * @return  {Object} beanFactory instance
 * @api public
 */
Bearcat.getBeanFactory = function() {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %j', "getBeanFactory");
		return;
	}

	return this.applicationContext.getBeanFactory();
}

/**
 * Bearcat get applicationContext.
 *
 * @return  {Object} applicationContext
 * @api public
 */
Bearcat.getApplicationContext = function() {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %j', "getApplicationContext");
		return;
	}

	return this.applicationContext;
}

/**
 * Bearcat get bean from IoC container through meta argument.
 *
 * Examples:
 *
 *	  bearcat.getBeanByMeta({
 *		 id: "car",
 *		 func: Car // Car is a function constructor
 *	  });
 *
 * @param  {Object} meta meta object
 * @api public
 */
Bearcat.getBeanByMeta = function(meta) {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %j', "getBeanByMeta");
		return;
	}

	return this.applicationContext.getBeanByMeta(meta);
}

/**
 * Bearcat get bean from IoC container through $ annotation function.
 *
 * Examples:
 *
 *	  bearcat.getBeanByFunc(function() {
 *		 this.$id = "car";
 *		 this.$scope = "prototype";
 *	  });
 *
 * @param  {Function} func $ annotation function
 * @api public
 */
Bearcat.getBeanByFunc = function(func) {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %j', "getBeanByFunc");
		return;
	}

	return this.applicationContext.getBeanByFunc(func);
}

/**
 * Bearcat add async loading beans, this just add beans needed to be loaded to bearcat.
 *
 * Examples:
 *
 *	  bearcat.use(['car']);
 *	  bearcat.use('car');
 *
 * @param  {Array|String} async loading beans id
 * @api public
 */
Bearcat.use = function(ids) {
	if (Utils.checkArray(ids)) {
		return this.applicationContext.use(ids);
	}

	if (Utils.checkString(ids)) {
		return this.applicationContext.use([ids]);
	}
}

/**
 * Bearcat async loading beans.
 *
 * Examples:
 *
 *	  bearcat.async(['car'], function(car) {
 *		  // car is ready
 *	  });
 *
 * @param  {Array|String} async loading beans id
 * @return {Function}     callback with loaded bean instances
 * @api public
 */
Bearcat.async = function(ids, cb) {
	if (Utils.checkArray(ids)) {
		return this.applicationContext.async(ids, cb);
	}

	if (Utils.checkString(ids)) {
		return this.applicationContext.async([ids], cb);
	}
}

/**
 * Bearcat add module(bean) to IoC container through $ annotation function.
 *
 * Examples:
 *
 *	  bearcat.module(function() {
 *		 this.$id = "car";
 *		 this.$scope = "prototype";
 *	  });
 *
 * @param  {Function} func $ annotation function
 * @api public
 */
Bearcat.module = function(func, context) {
	if (this.state < STATE_STARTED) {
		return this.applicationContext.module(func, context);
	} else {
		return this.getBean(func);
	}
}

/**
 * Bearcat get bean from IoC container through beanName or meta argument.
 *
 * Examples:
 *
 *
 *	  // through beanName
 *	  var car = bearcat.getBean("car");
 *
 *	  // through meta
 *	  var car = bearcat.getBean({
 *		 id: "car",
 *		 func: Car // Car is a function constructor
 *	  });
 *
 *	  // through $ annotation func
 *	  var car = bearcat.getBean(function() {
 *		 this.$id = "car";
 *		 this.$scope = "prototype";
 *	  });
 *
 * @param  {String} beanName
 * @return {Object} bean
 * @api public
 */
Bearcat.getBean = function(beanName) {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %j %j', "getBean", this.state);
		return;
	}

	arguments = Array.prototype.slice.apply(arguments);

	var firstarg = arguments[0];
	var func = "";
	if (typeof firstarg === 'object') {
		func = "getBeanByMeta";
	} else if (typeof firstarg === 'function') {
		func = "getBeanByFunc";
	} else if (typeof firstarg === 'string') {
		func = "getBean";
	} else {
		logger.error('Bearcat application unsupported getBean arguments for %s', beanName);
		return;
	}

	return this.applicationContext[func].apply(this.applicationContext, arguments);
}

/**
 * Bearcat get bean constructor function from IoC container through beanName.
 *
 * Examples:
 *
 *
 *	  // through beanName
 *	  var Car = bearcat.getFunction("car");
 *
 *
 * @param  {String}   beanName
 * @return {Function} bean constructor function
 * @api public
 */
Bearcat.getFunction = function(beanName) {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %j %j', "getFunction", this.state);
		return;
	}

	return this.applicationContext.getBeanFunction(beanName);
}

/**
 * Bearcat get model from bearcat through modelId.
 *
 * Examples:
 *
 *
 *	  // through modelId
 *	  var carModel = bearcat.getModel("car");
 *
 *
 * @param  {String}   modelId
 * @return {Object}   model
 * @api public
 */
Bearcat.getModel = function(modelId) {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %j %j', "getModel", this.state);
		return;
	}

	return this.applicationContext.getModel(modelId);
}

/**
 * Bearcat convenient function for using in MVC route mapping.
 *
 * Examples:
 *
 *
 *	  // express
 *	  var app = express();
 *	  app.get('/', bearcat.getRoute('bearController', 'index'));
 *
 *
 * @param  {String} beanName
 * @param  {String} fnName routeName
 * @api public
 */
Bearcat.getRoute = function(beanName, fnName) {
	if (this.state !== STATE_STARTED) {
		return;
	}

	var bean = this.getBean(beanName);
	return bean[fnName].bind(bean);
}