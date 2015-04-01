/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ApplicationContext
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'ApplicationContext');
var PlaceHolderConfigurer = require('../beans/support/placeHolderConfigurer');
var AutoProxyCreator = require('../aop/autoproxy/autoProxyCreator');
var ModelKeyMapResolver = require('../model/modelKeyMapResolver');
var AsyncScriptLoader = require('../resource/asyncScriptLoader');
var BootStrapLoader = require('../resource/bootStrapLoader');
var ResourceLoader = require('../resource/resourceLoader');
var defaultConstraints = require('../model/constraints');
var BeanFactory = require('../beans/beanFactory');
var EventEmitter = require('events').EventEmitter;
var RequireUtil = require('../util/requireUtil');
var Constant = require('../util/constant');
var FileUtil = require('../util/fileUtil');
var MetaUtil = require('../util/metaUtil');
var Utils = require('../util/utils');
var Path = RequireUtil.requirePath();
var Util = RequireUtil.requireUtil();
var DEFAULT_BASE = "";
var DEFAULT_LOAD_PATH = "";
var DEFAULT_HOT_RELOAD_PATH = "";

var Root;
(function() {
	Root = this;
}());

/**
 * ApplicationContext constructor function.
 *
 * @param  {Array} configLocations configuration paths
 * @api public
 */
var ApplicationContext = function(configLocations, opts) {
	this.opts = opts || {};
	this.configLocations = configLocations;
	this.loadBeans = [];
	this.active = false;
	this.reloadMap = {};
	this.beanFactory = null;
	this.startUpDate = null;
	this.resourceLoader = null;
	this.bootStrapLoader = null;
	this.asyncScriptLoader = null;
	this.cpath = DEFAULT_LOAD_PATH;
	this.hpath = DEFAULT_HOT_RELOAD_PATH;
	this.env = Constant.DEFAULT_ENV;
	this.base = DEFAULT_BASE;
	this.beanFactoryPostProcessors = [];
	EventEmitter.call(this);
	this.init();
}

module.exports = ApplicationContext;

Util.inherits(ApplicationContext, EventEmitter);

/**
 * ApplicationContext init.
 *
 * @api public
 */
ApplicationContext.prototype.init = function() {
	if (this.hasBeanFactory()) {
		this.destroyBeans();
		this.closeBeanFactory();
	}

	DEFAULT_BASE = process.cwd();

	if (this.configLocations.length) {
		var contextPath = this.configLocations[0];
		DEFAULT_BASE = Path.dirname(contextPath);
	}

	DEFAULT_LOAD_PATH = DEFAULT_BASE + "/config";
	DEFAULT_HOT_RELOAD_PATH = DEFAULT_BASE + "/app"; // equal to scan path

	this.cpath = DEFAULT_LOAD_PATH;
	this.hpath = DEFAULT_HOT_RELOAD_PATH;
	this.base = DEFAULT_BASE;

	this.createBeanFactory();
}

/**
 * ApplicationContext set container startUpDate.
 *
 * @param  {Number} startUpDate
 * @api public
 */
ApplicationContext.prototype.setStartupDate = function(startUpDate) {
	this.startUpDate = startUpDate;
}

/**
 * ApplicationContext get container startUpDate.
 *
 * @return  {Number} startUpDate
 * @api public
 */
ApplicationContext.prototype.getStartupDate = function() {
	return this.startUpDate;
}

/**
 * ApplicationContext get resourceLoader.
 *
 * @return  {Object} resourceLoader
 * @api public
 */
ApplicationContext.prototype.getResourceLoader = function() {
	this.resourceLoader = new ResourceLoader();
	return this.resourceLoader;
}

/**
 * ApplicationContext get asyncScriptLoader.
 *
 * @return  {Object} asyncScriptLoader
 * @api public
 */
ApplicationContext.prototype.getAsyncScriptLoader = function() {
	if (this.asyncScriptLoader) {
		return this.asyncScriptLoader;
	}

	this.asyncScriptLoader = new AsyncScriptLoader();
	this.asyncScriptLoader.setApplicationContext(this);
	return this.asyncScriptLoader;
}

/**
 * ApplicationContext get bootStrapLoader.
 *
 * @return  {Object} bootStrapLoader
 * @api public
 */
ApplicationContext.prototype.getBootStrapLoader = function() {
	if (this.bootStrapLoader) {
		return this.bootStrapLoader;
	}

	this.bootStrapLoader = new BootStrapLoader();
	return this.bootStrapLoader;
}

/**
 * ApplicationContext get metaObjects resource from contextPath.
 *
 * @param   {String} cpath contextPath
 * @return  {Object} metaObjects
 * @api public
 */
ApplicationContext.prototype.getResource = function(cpath) {
	if (Root.__bearcatData__ && Root.__bearcatData__.metas) {
		return Root.__bearcatData__.metas;
	}

	return this.resourceLoader.load(cpath);
}

/**
 * ApplicationContext get contextPath locations.
 *
 * @return  {Array} contextPath locations
 * @api public
 */
ApplicationContext.prototype.getConfigLocations = function() {
	return this.configLocations;
}

/**
 * ApplicationContext add beanFactoryPostProcessor.
 *
 * @param  {Object} beanFactoryPostProcessor
 * @api public
 */
ApplicationContext.prototype.addBeanFactoryPostProcessor = function(beanFactoryPostProcessor) {
	this.beanFactoryPostProcessors.push(beanFactoryPostProcessor);
}

/**
 * ApplicationContext get beanFactoryPostProcessors.
 *
 * @return  {Array} beanFactoryPostProcessors
 * @api public
 */
ApplicationContext.prototype.getBeanFactoryProcessors = function() {
	return this.beanFactoryPostProcessors;
}

/**
 * ApplicationContext do refresh actions.
 * refresh beanFactory, preIntialize singleton Beans
 *
 * @param  {Function} cb callback function
 * @api public
 */
ApplicationContext.prototype.refresh = function(cb) {
	var self = this;
	cb = cb || function() {};

	// Prepare context for refresh
	self.prepareRefresh();

	// Refresh internal beanFactory
	self.refreshBeanFactory();

	// Try Async loading for dependencies
	self.tryAsyncLoading(function() {

		// Try loading from bearcat-bootstrap.js for dependencies
		self.tryBootStrapLoading();

		// Prepare beanFactory for this context
		self.prepareBeanFactory();

		self.postProcessBeanFactory();

		// Invoke factory processors registered as beans in the context.
		self.invokeBeanFactoryPostProcessors();

		// Register bean processors that intercept bean creation.
		self.registerBeanPostProcessors();

		// Instantiate all remaining (non-lazy-init) singletons
		self.finishBeanFactoryIntialization(function() {

			// Last step: publish corresponding event.
			self.finishRefresh();
			cb();
		});
	});
}

/**
 * ApplicationContext prepareRefresh.
 * init startUpDate, active status
 * get resourceLoader and load context paths
 *
 * @api private
 */
ApplicationContext.prototype.prepareRefresh = function() {
	this.startUpDate = Date.now();

	this.active = true;

	var opts = this.opts;

	if (opts['NODE_ENV']) {
		process.env.NODE_ENV = opts['NODE_ENV'];
	}

	if (opts['BEARCAT_ENV']) {
		process.env.BEARCAT_ENV = opts['BEARCAT_ENV'];
	}

	if (opts['NODE_CPATH']) {
		process.env.NODE_CPATH = opts['NODE_CPATH'];
	}

	if (opts['BEARCAT_CPATH']) {
		process.env.BEARCAT_CPATH = opts['BEARCAT_CPATH'];
	}

	if (opts['BEARCAT_LOGGER'] && opts['BEARCAT_LOGGER'] === 'off') {
		process.env.BEARCAT_LOGGER = 'off';
	}

	if (opts['BEARCAT_HOT'] && opts['BEARCAT_HOT'] === 'on') {
		process.env.BEARCAT_HOT = 'on';
	}

	if (opts['BEARCAT_ANNOTATION'] && opts['BEARCAT_ANNOTATION'] === 'off') {
		process.env.BEARCAT_ANNOTATION = 'off';
	}

	if (opts['BEARCAT_FUNCTION_STRING']) {
		process.env.BEARCAT_FUNCTION_STRING = true;
	}

	this.getResourceLoader();

	this.beanFactoryPostProcessors = [];

	var args = Utils.parseArgs(process.argv);
	var env = this.getEnv();
	env = args.env || args['--env'] || process.env.NODE_ENV || process.env.BEARCAT_ENV || env || Constant.DEFAULT_ENV;

	this.setEnv(env);

	var cpath = this.getConfigPath();
	cpath = args.cpath || args['--cpath'] || process.env.NODE_CPATH || process.env.BEARCAT_CPATH || cpath;

	this.setConfigPath(cpath);

	if (Utils.checkBrowser()) {
		return;
	}

	MetaUtil.cleanUp();
	var base = this.getBase();

	if (process.env.BEARCAT_LOGGER !== 'off') {
		var originLoggerConfigPath = Path.join(cpath, Constant.LOGPATH);
		var presentLoggerConfigPath = Path.join(cpath, env, Constant.LOGPATH);
		if (FileUtil.existsSync(originLoggerConfigPath)) {
			require('pomelo-logger').configure(originLoggerConfigPath, {
				base: base
			});
		} else if (FileUtil.existsSync(presentLoggerConfigPath)) {
			require('pomelo-logger').configure(presentLoggerConfigPath, {
				base: base
			});
		} else {
			// logger.error('logger file path configuration is error.');
		}
	}

	var hpath = this.getHotPath();
	// BEARCAT_HPATH can be array
	// process.env.BEARCAT_HPATH will JSON.stringify this value
	// so do not use process.env.BEARCAT_HPATH
	hpath = args.hpath || args['--hpath'] || opts['BEARCAT_HPATH'] || hpath;
	this.setHotPath(hpath);

	if (process.env.BEARCAT_HOT === 'on') {
		this.hotReloadFileWatch(hpath);
	}
}

/**
 * ApplicationContext refreshBeanFactory.
 * reload beanFactory with refresh metaObjects
 *
 * @api private
 */
ApplicationContext.prototype.refreshBeanFactory = function() {
	this.configLocations = this.getConfigLocations();

	this.loadDefaultConstraints();

	var len = this.configLocations.length;
	for (var i = 0; i < len; i++) {
		this.beanFactory.registerBeans(this.getResource(this.configLocations[i]));
	}

	if (!len) {
		this.beanFactory.registerBeans(this.getResource());
	}
}

/**
 * ApplicationContext try async loading script files when in the frontend.
 *
 * @api private
 */
ApplicationContext.prototype.tryAsyncLoading = function(cb) {
	if (!Utils.checkBrowser() || Utils.checkCocos2dJsb()) {
		return cb();
	}

	var loadBeans = this.loadBeans;
	if (!loadBeans || !loadBeans.length) {
		return cb();
	}

	return this.doAsyncLoading(cb);
}

/**
 * ApplicationContext internal do async loading script files when in the frontend.
 *
 * @api private
 */
ApplicationContext.prototype.doAsyncLoading = function(cb) {
	var loadBeans = this.loadBeans;

	var asyncScriptLoader = this.getAsyncScriptLoader();

	return asyncScriptLoader.load(loadBeans, cb);
}

/**
 * ApplicationContext try loading script files from bearcat-bootstrap.js when in cocos2d-js jsb env.
 *
 * @api private
 */
ApplicationContext.prototype.tryBootStrapLoading = function() {
	if (!Utils.checkCocos2dJsb()) {
		return;
	}

	if (Root.__bearcatData__ && Root.__bearcatData__.idPaths) {
		idPaths = Root.__bearcatData__.idPaths;
		var bootStrapLoader = this.getBootStrapLoader();

		return bootStrapLoader.load(idPaths);
	}
}

/**
 * ApplicationContext prepareBeanFactory.
 * register default beans into beanFactory
 *
 * @api private
 */
ApplicationContext.prototype.prepareBeanFactory = function() {
	var placeHolderConfigurer = new PlaceHolderConfigurer();
	if (Utils.isNotNull(this.env)) {
		placeHolderConfigurer.setEnv(this.env);
	}

	if (Utils.isNotNull(this.cpath)) {
		placeHolderConfigurer.setConfigPath(this.cpath);
	}

	var modelKeyMapResolver = new ModelKeyMapResolver();

	this.addBeanFactoryPostProcessor(placeHolderConfigurer);
	this.addBeanFactoryPostProcessor(modelKeyMapResolver);

}

/**
 * ApplicationContext registerBeanMeta.
 * register metaObject
 *
 * @param  {Object} metaObject
 * @api private
 */
ApplicationContext.prototype.registerBeanMeta = function(meta) {
	var id = meta['id'];
	if (!id) {
		logger.error('ApplicationContext registerBean error meta no id.');
		return;
	}

	var metaObject = {};
	metaObject[id] = meta;

	this.beanFactory.registerBeans(metaObject);
}

/**
 * ApplicationContext load default constraints.
 *
 * @api private
 */
ApplicationContext.prototype.loadDefaultConstraints = function() {
	for (var key in defaultConstraints) {
		this.getBeanByFunc(defaultConstraints[key]);
	}
}

/**
 * ApplicationContext hotReloadFileWatch.
 *
 * @param  {String} hpath hot reload path
 * @api private
 */
ApplicationContext.prototype.hotReloadFileWatch = function(hpath) {
	var self = this;
	var watcher = require('chokidar').watch(hpath, {
		ignored: /[\/\\]\./,
		ignoreInitial: true
	});

	if (!watcher) {
		return;
	}

	logger.info('bearcat hot reload watch %j', hpath);
	watcher.on('all', function(event, path) {
		if (event != 'change' && event != 'add') {
			return;
		}

		var filename = path;
		if (!Utils.checkString(filename)) {
			return;
		}

		var id = Utils.getFileName(filename, '.js'.length);

		if (!Utils.checkFileType(filename, '.js') || !Utils.isFile(filename)) {
			return;
		}

		var s = Math.floor(Math.random(0, 1) * 5);
		var p = Math.floor(Math.random(0, 1) * 100);

		var doHotReload = function() {
			logger.info('%j changed, bearcat start hot reloading ...', filename);
			var meta = Utils.myRequireHot(filename);
			if (!meta) {
				return;
			}

			if (Utils.checkFunction(meta)) {
				meta = MetaUtil.resolveFuncAnnotation(meta, null, true);
			}

			if (Utils.checkObject(meta)) {
				id = meta['id'];
				var func = meta['func'];

				if (event == 'add') {
					// dynamic add file
					logger.info('bearcat reload add bean %s', id);
					self.registerBeanMeta(meta);
				} else {
					if (id && Utils.checkFunction(func)) {
						var beanFactory = self.getBeanFactory();
						var beanFunc = beanFactory.getBeanFunction(id);

						self.doHotAddAttributes(meta, id);
						if (beanFunc) {
							var proto = func.prototype;

							for (var key in proto) {
								logger.info('bearcat reload update prototype %s:%s', id, key);
								beanFunc.prototype[key] = proto[key];
							}
						}
					}
				}
			}
			self.emit('reload');
			logger.info('Bearcat hot reloading done ...');
		}

		setTimeout(doHotReload, s * 1000 + p + s);
	});
}

/**
 * ApplicationContext do hot add attributes.
 *
 * @param  {Object} hot reload new metaObject
 * @param  {String} hot reload bean name
 * @api private
 */
ApplicationContext.prototype.doHotAddAttributes = function(metaObject, beanName) {
	var beanFactory = this.getBeanFactory();
	var beanFunc = beanFactory.getBeanFunction(beanName);
	var beanDefinition = beanFactory.getBeanDefinition(beanName);

	if (!beanDefinition) {
		return;
	}

	var beanPrototype = beanFunc.prototype;
	var propsOn = beanDefinition.getPropsOn();
	var props = metaObject.props;

	if (!Utils.checkArray(props)) {
		return;
	}

	for (var i = 0; i < props.length; i++) {
		(function(w) {
			var name = w.name;
			var flag = 1;

			for (j = 0; j < propsOn.length; j++) {
				var p = propsOn[j];
				if (name === p.getName()) {
					flag = 0;
					break;
				}
			}

			// new prop attribute
			if (flag) {
				var value = w.value;
				var ref = w.ref;
				var key = "";
				if (ref) {
					key = Constant.DEFINE_GETTER_PREFIX + name;
				}

				logger.info('hot reload add attribute %s to %s', name, beanName);
				beanPrototype.__defineGetter__(name, function() {
					if (value) {
						return value;
					}

					if (ref) {
						if (!this[key]) {
							this[key] = beanFactory.getBean(ref);
						}

						return this[key];
					}
				});
			}
		})(props[i]);
	}
}

ApplicationContext.prototype.postProcessBeanFactory = function() {

}

/**
 * ApplicationContext register bean post processors.
 *
 * @api private
 */
ApplicationContext.prototype.registerBeanPostProcessors = function() {
	var autoProxyCreator = new AutoProxyCreator();
	autoProxyCreator.setBeanFactory(this.getBeanFactory());
	this.beanFactory.addBeanPostProcessor(autoProxyCreator);
}

/**
 * ApplicationContext invoke bean factory post processors.
 *
 * @api private
 */
ApplicationContext.prototype.invokeBeanFactoryPostProcessors = function() {
	var beanFactory = this.getBeanFactory();
	var postProcessors = this.getBeanFactoryProcessors();
	for (var i = 0; i < postProcessors.length; i++) {
		var postProcessor = postProcessors[i];
		postProcessor.postProcessBeanFactory(beanFactory);
	}
}

/**
 * ApplicationContext finish beanFactory singleton beans intialization.
 *
 * @param  {Function} cb callback function
 * @api private
 */
ApplicationContext.prototype.finishBeanFactoryIntialization = function(cb) {
	this.beanFactory.preInstantiateSingletons(cb);
}

/**
 * ApplicationContext finish refresh event emit.
 *
 * @api private
 */
ApplicationContext.prototype.finishRefresh = function() {
	var self = this;
	this.emit('finishRefresh');

	if (process.browser) {
		return;
	}

	var listeners = process.listeners('SIGINT');
	if (listeners && listeners.length) {
		return;
	}

	process.on('SIGINT', function() {
		logger.info('Bearcat starts destroying...');
		self.destroy();
		process.exit();
	});
}

/**
 * ApplicationContext cancel refresh.
 *
 * @api publish
 */
ApplicationContext.prototype.cancelRefresh = function() {
	this.active = false;
}

ApplicationContext.prototype.registerShutdownHook = function() {

}

/**
 * ApplicationContext destroy.
 *
 * @api public
 */
ApplicationContext.prototype.destroy = function() {
	this.close();
}

/**
 * ApplicationContext close.
 *
 * @api private
 */
ApplicationContext.prototype.close = function() {
	this.doClose();
}

/**
 * ApplicationContext do close.
 *
 * destroyBeans, closeBeanFactory, free resourceLoader, etc..
 * @api private
 */
ApplicationContext.prototype.doClose = function() {
	this.configLocations = null;
	this.startUpDate = null;
	this.active = false;
	if (this.hasBeanFactory()) {
		this.destroyBeans();
		this.closeBeanFactory();
	}

	MetaUtil.cleanUp();
	this.beanFactory = null;
	this.resourceLoader = null;
	this.beanFactoryPostProcessors = [];
	this.cpath = DEFAULT_LOAD_PATH;
	this.env = Constant.DEFAULT_ENV;
	this.emit('destroyed');
}

/**
 * ApplicationContext destroyBeans.
 *
 * @api private
 */
ApplicationContext.prototype.destroyBeans = function() {
	this.getBeanFactory().destroySingletons();
}

/**
 * ApplicationContext check whether applicationContext is active or not.
 *
 * @api public
 */
ApplicationContext.prototype.isActive = function() {
	return this.active;
}

/**
 * ApplicationContext getBean through beanName from applicationContext.
 *
 * @param   {String} beanName
 * @return  {Object} beanObject
 * @api public
 */
ApplicationContext.prototype.getBean = function(beanName) {
	var beanFactory = this.getBeanFactory();
	return beanFactory.getBean.apply(beanFactory, arguments);
}

/**
 * ApplicationContext getBean through metaObject from applicationContext.
 *
 * @param   {Object} meta metaObject
 * @return  {Object} beanObject
 * @api public
 */
ApplicationContext.prototype.getBeanByMeta = function(meta) {
	var id = meta['id'];
	if (!id) {
		logger.error('ApplicationContext getBeanByMeta error meta no id.');
		return;
	}

	if (!this.getBeanDefinition(id)) {
		this.registerBeanMeta(meta);

		this.invokeBeanFactoryPostProcessors();
	}

	arguments[0] = id;

	return this.beanFactory.getBeanProxy.apply(this.beanFactory, arguments);
}

/**
 * ApplicationContext getBean through $ annotation function from applicationContext.
 *
 * @param   {Function} func $ annotation function
 * @return  {Object}   beanObject
 * @api public
 */
ApplicationContext.prototype.getBeanByFunc = function(func) {
	var meta = MetaUtil.resolveFuncAnnotation(func);

	var id = meta['id'];
	if (!id) {
		logger.error('ApplicationContext getBeanByFunc error meta no id, add this.$id = "yourId" to your func.');
		return;
	}

	if (!this.getBeanDefinition(id)) {
		meta['lazy'] = true;
		this.registerBeanMeta(meta);

		this.invokeBeanFactoryPostProcessors();
	}

	arguments[0] = id;

	return this.beanFactory.getBeanProxy.apply(this.beanFactory, arguments);
}

/**
 * ApplicationContext getModel through modelId.
 *
 * @param   {String}   modelId
 * @return  {Object}   model
 * @api public
 */
ApplicationContext.prototype.getModel = function(modelId) {
	if (!modelId) {
		logger.error('ApplicationContext getModel error no modelId.');
		return;
	}

	return this.beanFactory.getModelProxy(modelId);
}

/**
 * ApplicationContext getModelDefinition through modelId.
 *
 * @param   {String}   modelId
 * @return  {Object}   modelDefinition
 * @api public
 */
ApplicationContext.prototype.getModelDefinition = function(modelId) {
	if (!modelId) {
		logger.error('ApplicationContext getModelDefinition error no modelId.');
		return;
	}

	return this.beanFactory.getModelDefinition(modelId);
}

/**
 * ApplicationContext get bean contructor function.
 *
 * @param  {String} beanName
 * @return {Function} bean constructor function
 * @api public
 */
ApplicationContext.prototype.getBeanFunction = function(beanName) {
	return this.beanFactory.getBeanFunction(beanName);
}

/**
 * ApplicationContext add module(bean) to IoC container through $ annotation function from applicationContext.
 *
 * @param   {Function} func $ annotation function
 * @api public
 */
ApplicationContext.prototype.module = function(func, context) {
	var meta = MetaUtil.resolveFuncAnnotation(func);
	var id = meta['id'];
	if (!id) {
		logger.error('ApplicationContext module error meta no id, add this.$id = "yourId" to your func.');
		return;
	}

	if (this.getBeanDefinition(id)) {
		return;
	}

	// node.js env
	if (!Utils.checkBrowser() && Utils.isNotNull(context) && context['exports']) {
		return context['exports'] = func;
	}

	// browser async load depended script files
	if (Utils.checkBrowser()) {
		var loader = this.getAsyncScriptLoader();
		loader.module(id, meta);
	}

	// register current bean meta
	return this.registerBeanMeta(meta);
}

/**
 * ApplicationContext add startup loaded bean ids.
 *
 * @param   {Array} startup loaded bean ids
 * @api public
 */
ApplicationContext.prototype.use = function(ids) {
	this.loadBeans = this.loadBeans.concat(ids);
}

/**
 * ApplicationContext async load bean with bean ids.
 *
 * @param   {Array}    loaded bean ids
 * @param   {Function} callback function
 * @api public
 */
ApplicationContext.prototype.async = function(ids, cb) {
	var asyncScriptLoader = new AsyncScriptLoader();
	return asyncScriptLoader.load(loadBeans, cb);
}

/**
 * ApplicationContext check ApplicationContext contains bean or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.containsBean = function(beanName) {
	return this.getBeanFactory().containsBean(beanName);
}

/**
 * ApplicationContext check bean is a singleton or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.isSingleton = function(beanName) {
	return this.getBeanFactory().isSingleton(beanName);
}

/**
 * ApplicationContext check bean is a prototype or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.isPrototype = function(beanName) {
	return this.getBeanFactory().isPrototype(beanName);
}

/**
 * ApplicationContext check ApplicationContext contains beanName beanDefinition or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.containsBeanDefinition = function(beanName) {
	return this.getBeanFactory().containsBeanDefinition(beanName);
}

/**
 * ApplicationContext check whether applicationContext is running or not.
 *
 * @return {Boolean} true|false
 * @api public
 */
ApplicationContext.prototype.isRunning = function() {
	return this.active;
}

/**
 * ApplicationContext close beanFactory.
 *
 * @api public
 */
ApplicationContext.prototype.closeBeanFactory = function() {
	this.getBeanFactory().destroyBeanFactory();
	this.beanFactory = null;
}

/**
 * ApplicationContext check whether applicationContext has beanFactory or not.
 *
 * @return {Boolean} true|false
 * @api public
 */
ApplicationContext.prototype.hasBeanFactory = function() {
	return this.beanFactory != null;
}

/**
 * ApplicationContext getBeanFactory.
 *
 * @return {Object} beanFactory
 * @api public
 */
ApplicationContext.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

/**
 * ApplicationContext createBeanFactory.
 *
 * @api private
 */
ApplicationContext.prototype.createBeanFactory = function() {
	this.beanFactory = new BeanFactory();
}

/**
 * ApplicationContext get beanDefinition.
 *
 * @param  {String} beanName
 * @return {Object} beanDefinition
 * @api public
 */
ApplicationContext.prototype.getBeanDefinition = function(beanName) {
	return this.getBeanFactory().getBeanDefinition(beanName);
}

/**
 * ApplicationContext remove beanDefinition from ApplicationContext.
 *
 * @param  {String} beanName
 * @api public
 */
ApplicationContext.prototype.removeBeanDefinition = function(beanName) {
	return this.getBeanFactory().removeBeanDefinition(beanName);
}

/**
 * ApplicationContext set env.
 *
 * @param {String} env
 * @api public
 */
ApplicationContext.prototype.setEnv = function(env) {
	this.env = env;
}

/**
 * ApplicationContext get env.
 *
 * @return {String} env
 * @api public
 */
ApplicationContext.prototype.getEnv = function() {
	return this.env;
}

/**
 * ApplicationContext set config path.
 *
 * @param {String} cpath config path
 * @api public
 */
ApplicationContext.prototype.setConfigPath = function(cpath) {
	this.cpath = cpath;
}

/**
 * ApplicationContext get config path.
 *
 * @return {String} config path
 * @api public
 */
ApplicationContext.prototype.getConfigPath = function() {
	return this.cpath;
}

/**
 * ApplicationContext set hot reload path.
 *
 * @param {String} hpath hot reload path
 * @api public
 */
ApplicationContext.prototype.setHotPath = function(hpath) {
	this.hpath = hpath;
}

/**
 * ApplicationContext get hot reload path.
 *
 * @return {String} hpath hot reload path
 * @api public
 */
ApplicationContext.prototype.getHotPath = function() {
	return this.hpath;
}

/**
 * ApplicationContext get base path.
 *
 * @return {String} base path
 * @api public
 */
ApplicationContext.prototype.getBase = function() {
	return this.base;
}