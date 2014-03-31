var Proxy = require('./proxy');

var proxyFactory = function(target, interfaces) {
	this.target = target;
	this.interfaces = interfaces;
}

module.exports = proxyFactory;

proxyFactory.prototype.setTarget = function(target) {
	this.target = target;
}

proxyFactory.prototype.getTarget = function() {
	return this.target;
}

proxyFactory.prototype.setInterfaces = function(interfaces) {
	this.interfaces = interfaces;
}

proxyFactory.prototype.getInterfaces = function() {
	return this.interfaces;
}

proxyFactory.prototype.getProxy = function() {
	var proxyObject = new Proxy();
	proxyObject.setTarget(this.getTarget());
	proxyObject.setInterfaces(this.getInterfaces());
	return proxyObject;
}