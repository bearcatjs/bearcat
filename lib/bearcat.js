/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * |   _  )  |   ____)   /   \     |   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * |______)  |_______/__/     \__\ | _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat App
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var BeanFactory = require('./beans/beanFactory');
var ApplicationContext = require('./context/applicationContext');
var logger = require('pomelo-logger').getLogger('bearcar', 'app');

/**
 * Application states
 */
var STATE_INITED = 1; // app has inited
var STATE_START = 2; // app start
var STATE_STARTED = 3; // app has started
var STATE_STOPED = 4; // app has stoped

var Bearcat = {
	configLocations: null,
	applicationContext: null,
	state: STATE_INITED,
	startTime: null,
	app: null
};

// var Bearcat = function(configLocations) {
// 	this.configLocations = configLocations;
// 	this.applicationContext = null;
// 	this.state = STATE_INITED;
// 	this.startTime = null;
// }

module.exports = Bearcat;

Bearcat.createApp = function(configLocations) {
	this.configLocations = configLocations;
	return Bearcat;
}
/**
 * Get application
 */
Object.defineProperty(Bearcat, 'app', {
	get: function() {
		return Bearcat;
	}
});

Bearcat.start = function(cb) {
	this.startTime = Date.now();
	var self = this;
	if (this.state > STATE_INITED) {
		cb(new Error('application has already start.'));
		return;
	}
	this.state = STATE_START;
	var configLocations = this.configLocations;
	if (!configLocations) {
		// logger.error('Bearcat start error, configLocations null');
		cb(new Error('Bearcat start error, configLocations null'));
		return;
	}

	this.applicationContext = new ApplicationContext(configLocations);
	this.applicationContext.on('finishRefresh', function() {
		self.state = STATE_STARTED;
		logger.info('Bearcat startup in %s ms', Date.now() - self.startTime);
		cb();
	});

	this.applicationContext.refresh();
}

Bearcat.stop = function() {
	if (this.state > STATE_STARTED) {
		logger.warn('Bearcat application is not running now.');
		return;
	}
}

Bearcat.getBeanFactory = function() {
	if (this.state !== STATE_STARTED) {
		logger.warn('Bearcat application is not running now for %j', "getBeanFactory");
		return;
	}

	return this.applicationContext.getBeanFactory();
}

Bearcat.getApplicationContext = function() {
	if (this.state !== STATE_STARTED) {
		logger.warn('Bearcat application is not running now for %j', "getApplicationContext");
		return;
	}

	return this.applicationContext;
}

Bearcat.getBeanByMeta = function(meta) {
	if (this.state !== STATE_STARTED) {
		logger.warn('Bearcat application is not running now for %j', "getBeanByMeta");
		return;
	}

	return this.applicationContext.getBeanByMeta(meta);
}

Bearcat.getBean = function(beanName) {
	if (this.state !== STATE_STARTED) {
		logger.warn('Bearcat application is not running now for %j %j', "getBean", this.state);
		return;
	}

	arguments = Array.prototype.slice.apply(arguments);

	var firstarg = arguments[0];
	if (typeof firstarg === 'object') {
		return this.applicationContext.getBeanByMeta(firstarg);
	} else if (typeof firstarg === 'string') {
		return this.applicationContext.getBean.apply(this.applicationContext, arguments);
	} else {
		logger.error('Bearcat application unsupported getBean arguments for %j', "getBean");
	}
}

Bearcat.getRoute = function(bean, fnName) {
	return function(req, res, next) {
		return bean[fnName](req, res, next);
	}
}