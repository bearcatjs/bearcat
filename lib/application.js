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

var app = exports = module.exports = {};

/**
 * Initialize the server.
 *
 *   - setup default configuration
 *   - setup default middleware
 *   - setup route reflection methods
 *
 * @api private
 */

app.init = function() {
	this.beanFactory = BeanFactory();

	this.defaultConfiguration();
};

app.defaultConfiguration = function() {
	// logger.debug("%j", "defaultConfiguration");
}

app.getBeanFactory = function() {
	return new BeanFactory();
}

app.getApplicationContext = function() {
	return new ApplicationContext();
}