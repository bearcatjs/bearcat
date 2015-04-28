var logger = require('pomelo-logger').getLogger('bearcat', 'ModuleFactory');

var ModuleFactory = function() {
	this.factoryMap = {};
	this.moduleMap = {};
}

ModuleFactory.prototype.define = function(id, factory) {
	if (this.factoryMap[id]) {
		logger.warn('module %s has been registered ...', id);
		return;
	}

	this.factoryMap[id] = factory;
}

ModuleFactory.prototype.require = function(id) {
	if (!this.moduleMap[id]) {
		var exports = {};
		var factory = this.factoryMap[id];

		if (!factory) {
			logger.warn('require file %s not exists ...', id);
			return;
		}

		var module = {
			exports: {}
		}

		factory(module.exports, module);
		this.moduleMap[id] = module.exports;
	}

	return this.moduleMap[id];
}

module.exports = ModuleFactory;