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

/**
 * Bearcat createApp constructor function.
 *
 * @param  {Array}  configLocations context path array
 * @param  {Object} opts
 * @param  {String} opts.NODE_ENV                    setup env
 * @param  {String} opts.BEARCAT_ENV                 setup env
 * @param  {String} opts.NODE_CPATH                  setup config path
 * @param  {String} opts.BEARCAT_CPATH               setup config path
 * @param  {String} opts.BEARCAT_HPATH               setup hot reload path(s), usually it is the scan source directory(app by default)
 * @param  {String} opts.BEARCAT_LOGGER              setup 'off' to turn off bearcat logger configuration
 * @param  {String} opts.BEARCAT_HOT                 setup 'on' to turn on bearcat hot code reload
 * @param  {String} opts.BEARCAT_ANNOTATION          setup 'off' to turn off bearcat $ based annotation
 * @param  {String} opts.BEARCAT_GLOBAL  	         setup bearcat to be global object
 * @param  {String} opts.BEARCAT_FUNCTION_STRING  	 setup bearcat to use func.toString for $ based annotation
 *
 * @return {Object} bearcat object
 * @api public
 */
Bearcat.createApp = function(configLocations, opts) {
	if (this.state >= STATE_INITED) {
		Bearcat.stop();
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

	if (!Utils.checkObject(this.opts)) {
		logger.warn('Bearcat createApp opts must be object...');
	}

	this.applicationContext = new ApplicationContext(this.configLocations, this.opts);

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

	var env = "";

	if (Utils.checkBrowser()) {
		env = 'browser';
		this.applicationContext.setEnv(env);
	}

	if (Utils.checkCocos2dJsb()) {
		env = 'cocos2djsb';
		this.applicationContext.setEnv(env);
	}

	this.applicationContext.on('finishRefresh', function() {
		self.state = STATE_STARTED;
		env = self.applicationContext.getEnv();
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
		logger.warn('Bearcat application is not running now for %s', "getBeanFactory");
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
		logger.warn('Bearcat application is not running now for %s', "getApplicationContext");
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
		logger.warn('Bearcat application is not running now for %s %j', "getBeanByMeta", meta);
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
		logger.warn('Bearcat application is not running now for %s', "getBeanByFunc");
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
 * Bearcat define module(bean).
 *
 * Examples:
 *
 *    bearcat.define('car', function(exports, module) {
 *	     module.exports = function() {
 *	         console.log('run car...')
 *       }
 *    }, typeof module !== 'undefined' ? module : {});
 *
 * @param  {String}   id
 * @param  {Function} factory function
 * @param  {object}   context object
 * @api public
 */
Bearcat.define = function(id, factory, context) {
	return this.applicationContext.define(id, factory, context);
}

/**
 * Bearcat add module(bean) to IoC container through $ annotation function.
 *
 * Examples:
 *
 *	  var Car = bearcat.require('car');
 *
 * @param  {String} id
 * @api public
 */
Bearcat.require = function(id) {
	return this.applicationContext.require(id);
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
		logger.warn('Bearcat application is not running now for %s %s state: %d', "getBean", beanName, this.state);
		return;
	}

	var firstarg = beanName;
	var func = "";
	if (Utils.checkObject(firstarg)) {
		func = "getBeanByMeta";
	} else if (Utils.checkFunction(firstarg)) {
		func = "getBeanByFunc";
	} else if (Utils.checkString(firstarg)) {
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
		logger.warn('Bearcat application is not running now for %s %s state: %d', "getFunction", beanName, this.state);
		return;
	}

	return this.applicationContext.getBeanFunction(beanName);
}

/**
 * Bearcat get bean constructor function from IoC container through beanName, the same as bearcat.getFunction.
 *
 * Examples:
 *
 *
 *	  // through beanName
 *	  var Car = bearcat.getClass("car");
 *
 *
 * @param  {String}   beanName
 * @return {Function} bean constructor function
 * @api public
 */
Bearcat.getClass = function(beanName) {
	return Bearcat.getFunction(beanName);
}

/**
 * Bearcat shim to enable function inherits.
 *
 * Examples:
 *
 *
 *	  bearcat.extend("bus", "car");
 *
 *
 * @param  {String}   		beanName
 * @param  {String|Array}   superBeanName or superBeanName array
 * @api public
 */
Bearcat.extend = function(beanName, superBeanName) {
	if (!beanName || !superBeanName) {
		logger.error('[bearcat.extend] beanName or superBeanName can not be null');
		return;
	}

	this.applicationContext.extendBean(beanName, superBeanName);
}

/**
 * Bearcat call function used for inherits to call super constructor function.
 *
 * Examples:
 *
 *
 *	  bearcat.call("car", this);
 *
 *
 * @param  {String}   beanName
 * @param  {Object}   context
 * @api public
 */
Bearcat.call = function(beanName, context) {
	var beanFunction = Bearcat.getFunction(beanName);

	if (!beanFunction) {
		logger.error('[bearcat.call] bean function %s not exist', beanName);
		return;
	}

	var args = Array.prototype.slice.call(arguments, 2);
	beanFunction.apply(context, args);
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
		logger.warn('Bearcat application is not running now for %s %s state: %d', "getModel", modelId, this.state);
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

module.exports = Bearcat;