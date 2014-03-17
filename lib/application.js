/**
 * Application prototype.
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