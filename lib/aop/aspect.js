var aspect = function() {
	this.advisors = [];
	this.beanDefinition = null;
}

module.exports = aspect;

aspect.prototype.addAdvisor = function(advisor) {
	this.advisors.push(advisor);
}

aspect.prototype.getAdvisors = function() {
	return this.advisors;
}

aspect.prototype.setBeanDefinition = function(beanDefinition) {
	this.beanDefinition = beanDefinition;
}

aspect.prototype.getBeanDefinition = function() {
	return this.beanDefinition;
}