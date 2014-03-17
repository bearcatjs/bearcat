/**
 * Application prototype.
 */

var BeanFactory = require('./beans/beanFactory');
var ApplicationContext = require('./context/applicationContext');
var logger = require('pomelo-logger').getLogger('bearcar', 'app');

var app = {};

/**
 * Initialize the server.
 *
 *   - setup default configuration
 *   - setup default middleware
 *   - setup route reflection methods
 *
 * @api private
 */

app.getBeanFactory = function() {
	return BeanFactory;
}

app.getApplicationContext = function() {
	return ApplicationContext;
}

module.exports = app;