var targetSource = function(beanName, target) {
	this.beanName = beanName;
	this.target = target;
}

module.exports = targetSource;

targetSource.prototype.isStatic = function() {

}

targetSource.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

targetSource.prototype.getBeanName = function() {
	return this.beanName;
}

targetSource.prototype.getTarget = function() {
	return this.target;
}

targetSource.prototype.setTarget = function(target) {
	this.target = target;
}

targetSource.prototype.releaseTarget = function() {

}