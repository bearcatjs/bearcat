/**
 * Application prototype.
 */

var fs = require('fs');
var path = require('path');
var BeanFactory = require('./beans/beanFactory');
var metaLoader = require('./resource/metaLoader');
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
	this.loadBeans(__dirname + '/beans/support');
}

app.loadBeans = function(mpath) {
	var loader = new metaLoader();
	var metaObjects = loader.load(mpath);
	this.beanFactory.registryBeans(metaObjects);
}

app.getBeanFactory = function() {
	return this.beanFactory;
}