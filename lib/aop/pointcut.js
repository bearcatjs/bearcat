var Pointcut = function() {
	this.expression = null;
	this.adviceType = null;
	this.targetExpression = null;
}

module.exports = Pointcut;

Pointcut.prototype.getClassFilter = function() {

}

Pointcut.prototype.getMethodMatcher = function() {

}

Pointcut.prototype.setExpression = function(expression) {
	this.expression = expression;
}

Pointcut.prototype.getExpression = function() {
	return this.expression;
}

Pointcut.prototype.setAdviceType = function(adviceType) {
	this.adviceType = adviceType;
}

Pointcut.prototype.getAdviceType = function() {
	return this.adviceType;
}

Pointcut.prototype.setTargetExpression = function(targetExpression) {
	this.targetExpression = targetExpression;
}

Pointcut.prototype.getTargetExpression = function() {
	return this.targetExpression;
}

Pointcut.prototype.parse = function() {

}

Pointcut.prototype.match = function(targetMethod) {

}