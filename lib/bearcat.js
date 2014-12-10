/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat App
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'app');
var ApplicationContext = require('./context/applicationContext');
var BeanFactory = require('./beans/beanFactory');
var Utils = require('./util/utils');

/*!
 * Application states
 */
var STATE_INITED = 1; // app has inited
var STATE_START = 2; // app start
var STATE_STARTED = 3; // app has started

/**
 * Bearcat app object.
 * @api public
 */
var Bearcat = {
	opts: null,
	configLocations: null,
	applicationContext: null,
	state: STATE_INITED,
	startTime: null
};

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
 * @param  {String} opts.BEARCAT_LOGGER      setup 'off' to turn off bearcat logger configuration
 * @param  {String} opts.BEARCAT_HOT         setup 'off' to turn off bearcat hot code reloading
 * @param  {String} opts.BEARCAT_ANNOTATION  setup 'off' to turn off bearcat $ based annotation
 *
 * @return {Object} bearcat object
 * @api public
 */
Bearcat.createApp = function(configLocations, opts) {
	// if (!Utils.checkArray(configLocations) && Utils.checkObject(configLocations)) {
	// 	opts = configLocations;
	// 	configLocations = [];
	// }

	this.opts = opts || {};
	this.configLocations = configLocations || [];
	return Bearcat;
}

/**
 * Bearcat start app.
 *
 * @param  {Function} cb start callback function
 * @api public
 */
Bearcat.start = function(cb) {
	if (this.state > STATE_INITED) {
		logger.warn('Bearcat has already start, run bearcat.stop to start again.');
		return cb();
	}

	if (!Utils.checkFunction(cb)) {
		cb = function() {}
	}

	this.startTime = Date.now();
	var self = this;

	var configLocations = this.configLocations;
	if (!configLocations) {
		return cb(new Error('Bearcat start error, configLocations null'));
	}

	var opts = this.opts;

	if (!Utils.checkObject(opts)) {
		logger.warn('Bearcat start opts must be object...');
	}

	this.applicationContext = new ApplicationContext(configLocations, opts);
	this.state = STATE_START;
	var env = self.applicationContext.getEnv();

	if (Utils.checkBrowser()) {
		self.applicationContext.setEnv(env);
		env = 'browser';
	}

	this.applicationContext.on('finishRefresh', function() {
		self.state = STATE_STARTED;
		logger.info('Bearcat startup in %s with %s ms', env, Date.now() - self.startTime);
		cb();
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
	this.state = STATE_INITED;
}

/**
 * Bearcat get beanFactory instance.
 *
 * @return  {Object} beanFactory instance
 * @api public
 */
Bearcat.getBeanFactory = function() {
	if (this.state === STATE_INITED) {
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
	if (this.state === STATE_INITED) {
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
	if (this.state === STATE_INITED) {
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
	if (this.state === STATE_INITED) {
		logger.warn('Bearcat application is not running now for %j', "getBeanByFunc");
		return;
	}

	return this.applicationContext.getBeanByFunc(func);
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
	if (this.state === STATE_INITED) {
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
	if (this.state === STATE_INITED) {
		logger.warn('Bearcat application is not running now for %j %j', "getFunction", this.state);
		return;
	}

	return Bearcat.getBeanFactory().getBeanFunction(beanName);
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
	var bean = Bearcat.getBean(beanName);
	return function(req, res, next) {
		return bean[fnName](req, res, next);
	}
}