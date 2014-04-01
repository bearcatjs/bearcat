var Proxy = require('./proxy');

var proxyFactory = function(target, interfaces) {
	this.target = target;
	this.interfaces = interfaces;
	this.advisors = null;
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

proxyFactory.prototype.setAdvisors = function(advisors) {
	this.advisors = advisors;
}

proxyFactory.prototype.getProxy = function() {
	var proxyObject = new Proxy();
	proxyObject.setTarget(this.getTarget());
	proxyObject.setInterfaces(this.getInterfaces());
	proxyObject.setAdvisors(this.advisors);
	return proxyObject;
}