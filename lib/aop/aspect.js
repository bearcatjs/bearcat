var aspect = function() {
	this.advisors = [];
	this.beanName = null;
	this.beanDefinition = null;
	this.bean = null;
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

aspect.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

aspect.prototype.getBeanName = function() {
	return this.beanName;
}

aspect.prototype.setBean = function(bean) {
	this.bean = bean;
}

aspect.prototype.getBean = function() {
	return this.bean;
}