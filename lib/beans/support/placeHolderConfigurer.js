/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat PlaceHolderConfigurer
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var PropertiesLoader = require('../../resource/propertiesLoader');
var BeanDefinitionVisitor = require('./beanDefinitionVisitor');
var PlaceHolderResolver = require('./placeHolderResolver');
var Constant = require('../../util/constant');
var Utils = require('../../util/utils');

var DEFAULT_LOAD_PATH = process.cwd() + "/config";

var Root;
(function() {
	Root = this;
}());

/**
 * PlaceHolderConfigurer constructor function.
 *
 * @api public
 */
var PlaceHolderConfigurer = function() {
	this.beanName = null;
	this.env = Constant.DEFAULT_ENV;
	this.cpath = DEFAULT_LOAD_PATH;
	this.properties = {};
}

/**
 * PlaceHolderConfigurer post process beanFactory.
 *
 * @param  {Object} beanFactory
 * @api public
 */
PlaceHolderConfigurer.prototype.postProcessBeanFactory = function(beanFactory) {
	this.loadProperties();

	this.processProperties(beanFactory);
}

/**
 * PlaceHolderConfigurer load properties by env.
 *
 * @api public
 */
PlaceHolderConfigurer.prototype.loadProperties = function() {
	var properties = null;

	if (Root.__bearcatData__ && Root.__bearcatData__.configData) {
		properties = Root.__bearcatData__.configData;
	} else {
		properties = this.getPropertiesLoader().loadProperties(this.getConfigPath(), this.getEnv());
	}

	this.mergeProperties(properties);
}

/**
 * PlaceHolderConfigurer merge properties.
 *
 * @param  {Object} properties
 * @api public
 */
PlaceHolderConfigurer.prototype.mergeProperties = function(properties) {
	for (var key in properties) {
		if (Utils.isNotNull(properties[key])) {
			this.properties[key] = properties[key];
		}
	}
}

/**
 * PlaceHolderConfigurer process properties.
 *
 * @param  {Object} beanFactory
 * @api public
 */
PlaceHolderConfigurer.prototype.processProperties = function(beanFactory) {
	var properties = this.getProperties();
	if (Utils.checkObjectEmpty(properties)) {
		return;
	}

	var valueResolver = new PlaceHolderResolver(properties);
	this.doProcessProperties(beanFactory, valueResolver);
}

/**
 * PlaceHolderConfigurer do process properties.
 *
 * @param  {Object} beanFactory
 * @param  {Object} valueResolver
 * @api private
 */
PlaceHolderConfigurer.prototype.doProcessProperties = function(beanFactory, valueResolver) {
	var visitor = new BeanDefinitionVisitor(valueResolver);
	var beanDefinitions = beanFactory.getBeanDefinitions();

	for (var beanName in beanDefinitions) {
		var bd = beanDefinitions[beanName];

		visitor.visitBeanDefinition(bd);
	}
}

/**
 * PlaceHolderConfigurer get properties loader.
 *
 * @return  {Object} properties loader
 * @api public
 */
PlaceHolderConfigurer.prototype.getPropertiesLoader = function() {
	return new PropertiesLoader();
}

/**
 * PlaceHolderConfigurer set beanName.
 *
 * @param  {String} beanName
 * @api public
 */
PlaceHolderConfigurer.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

/**
 * PlaceHolderConfigurer get beanName.
 *
 * @return  {String} beanName
 * @api public
 */
PlaceHolderConfigurer.prototype.getBeanName = function() {
	return this.beanName;
}

/**
 * PlaceHolderConfigurer set env.
 *
 * @param  {String} env
 * @api public
 */
PlaceHolderConfigurer.prototype.setEnv = function(env) {
	this.env = env;
}

/**
 * PlaceHolderConfigurer get env.
 *
 * @return  {String} env
 * @api public
 */
PlaceHolderConfigurer.prototype.getEnv = function() {
	return this.env;
}

/**
 * PlaceHolderConfigurer set configuration path.
 *
 * @param  {String} cpath configuration path
 * @api public
 */
PlaceHolderConfigurer.prototype.setConfigPath = function(cpath) {
	this.cpath = cpath;
}

/**
 * PlaceHolderConfigurer get configuration path.
 *
 * @return  {String} cpath configuration path
 * @api public
 */
PlaceHolderConfigurer.prototype.getConfigPath = function() {
	return this.cpath;
}

/**
 * PlaceHolderConfigurer set properties.
 *
 * @param  {Array} properties
 * @api public
 */
PlaceHolderConfigurer.prototype.setProperties = function(properties) {
	this.properties = properties;
}

/**
 * PlaceHolderConfigurer get properties.
 *
 * @return  {Array} properties
 * @api public
 */
PlaceHolderConfigurer.prototype.getProperties = function() {
	return this.properties;
}

module.exports = PlaceHolderConfigurer;