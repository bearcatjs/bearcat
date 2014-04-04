var DynamicAopProxy = require('./dynamicAopProxy');
var AdvisedSupport = require('./advisedSupport');
var util = require('util');

var ProxyFactory = function(target, interfaces) {
	this.beanFactory = null;
	AdvisedSupport.call(this);

	if(target) {
		this.setTarget(target);
	}

	if(Array.isArray()) {
		this.setInterfaces(interfaces);
	}
}

util.inherits(ProxyFactory, AdvisedSupport);

module.exports = ProxyFactory;

ProxyFactory.prototype.getProxy = function() {
	var proxyObject = new DynamicAopProxy(this);
	return proxyObject;
}