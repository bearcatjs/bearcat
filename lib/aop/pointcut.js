var Pointcut = function() {
	this.expression = null;
	this.adviceType = null;
	this.targetExpression = null;
}

module.exports = Pointcut;

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
	var expression = this.expression;
	if (!expression) {
		return;
	}

	var r = expression.split(':');
	if (Array.isArray(r) && r.length === 2) {
		this.setAdviceType(r[0]);
		this.setTargetExpression(r[1]);
	}
}

Pointcut.prototype.match = function(targetMethod) {
	return true;
}