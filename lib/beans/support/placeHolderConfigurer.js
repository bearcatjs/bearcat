/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat PlaceHolderConfigurer
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var PropertiesLoader = require('../../resource/propertiesLoader');
var BeanDefinitionVisitor = require('./beanDefinitionVisitor');
var PlaceHolderResolver = require('./placeHolderResolver');
var Constant = require('../../util/constant');
var Utils = require('../../util/utils');

var DEFAULT_LOAD_PATH = process.cwd() + "/config";

var PlaceHolderConfigurer = function() {
	this.beanName = null;
	this.env = Constant.DEFAULT_ENV;
	this.cpath = DEFAULT_LOAD_PATH;
	this.properties = {};
}

module.exports = PlaceHolderConfigurer;

PlaceHolderConfigurer.prototype.postProcessBeanFactory = function(beanFactory) {
	this.loadProperties();

	this.processProperties(beanFactory);
}

PlaceHolderConfigurer.prototype.loadProperties = function() {
	var properties = this.getPropertiesLoader().loadProperties(this.cpath, this.env);
	this.mergeProperties(properties);
}

PlaceHolderConfigurer.prototype.mergeProperties = function(properties) {
	for (var key in properties) {
		if (Utils.isNotNull(properties[key])) {
			this.properties[key] = properties[key];
		}
	}
}

PlaceHolderConfigurer.prototype.processProperties = function(beanFactory) {
	var valueResolver = new PlaceHolderResolver(this.properties);
	this.doProcessProperties(beanFactory, valueResolver);
}

PlaceHolderConfigurer.prototype.doProcessProperties = function(beanFactory, valueResolver) {
	var visitor = new BeanDefinitionVisitor(valueResolver);
	var beanDefinitions = beanFactory.getBeanDefinitions();

	for (var beanName in beanDefinitions) {
		var bd = beanDefinitions[beanName];

		visitor.visitBeanDefinition(bd);
	}
}

PlaceHolderConfigurer.prototype.getPropertiesLoader = function() {
	return new PropertiesLoader();
}

PlaceHolderConfigurer.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

PlaceHolderConfigurer.prototype.getBeanName = function() {
	return this.beanName;
}

PlaceHolderConfigurer.prototype.setBeanFactory = function(beanFactory) {
	this.beanFactory = beanFactory;
}

PlaceHolderConfigurer.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

PlaceHolderConfigurer.prototype.setEnv = function(env) {
	this.env = env;
}

PlaceHolderConfigurer.prototype.getEnv = function() {
	return this.env;
}

PlaceHolderConfigurer.prototype.setConfigPath = function(cpath) {
	this.cpath = cpath;
}

PlaceHolderConfigurer.prototype.getConfigPath = function() {
	return this.cpath;
}

PlaceHolderConfigurer.prototype.setProperties = function(properties) {
	this.properties = properties;
}

PlaceHolderConfigurer.prototype.getProperties = function() {
	return this.properties;
}