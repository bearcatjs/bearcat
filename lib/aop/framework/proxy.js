var Proxy = function() {
	this.target = null;
	this.interfaces = [];
	this.advisors = [];
}

Proxy.prototype.setTarget = function(target) {
	this.target = target;
}

Proxy.prototype.setInterfaces = function(interfaces) {
	var self = this;
	for (var i = 0; i < interfaces.length; i++) {
		(function(interface) {
			self.interfaces.push(interface);
			Proxy.prototype[interface] = function() {
				arguments = Array.prototype.slice.apply(arguments);

				return self.target[interface].apply(self.target, arguments);
			}
		})(interfaces[i]);
	}
}

Proxy.prototype.invoke = function() {
	var self = this;

}

Proxy.prototype.setAdvisors = function(advisors) {
	this.advisors = advisors;
}

module.exports = Proxy;