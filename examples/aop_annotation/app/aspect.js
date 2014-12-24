var Aspect = function() {
	this.$id = "aspect";
	this.$aop = true;
}

Aspect.prototype.doBefore = function(next) {
	var $pointcut = "before:.*?runBefore";
	var $order = 10;

	console.log('Aspect doBefore');
	next();
}

Aspect.prototype.doBeforeOrder = function(next) {
	var $pointcut = "before:.*?runBefore";
	var $order = 100;

	console.log('Aspect doBeforeOrder');
	next();
}

Aspect.prototype.doBeforeError = function(next) {
	var $pointcut = "before:.*?runBeforeError";

	console.log('Aspect doBeforeError');
	next(new Error('doBeforeError'));
}

Aspect.prototype.doBeforeRuntime = function(num, next) {
	var $pointcut = "before:.*?runTimeBefore";
	var $runtime = true;

	console.log('Aspect doBeforeRuntime ' + num);
	next();
}

Aspect.prototype.doAfter = function(err, r, next) {
	var $pointcut = "after:.*?runAfter";

	console.log('Aspect doAfter ' + r);
	next();
}

Aspect.prototype.doRunAfter = function(r, next) {
	var $pointcut = "after:.*?doRunAfter";

	console.log('Aspect doRunAfter ' + r);
	next();
}

Aspect.prototype.doAround = function(target, method, next) {
	var $pointcut = "around:.*?runAround";

	console.log('Aspect doAround before');
	target[method](function(err, r) {

		console.log('Aspect doAround after ' + r);
		next(err, r + 100);
	});
}

Aspect.prototype.doAroundRuntime = function(target, method, num, next) {
	var $pointcut = "around:.*?runTimeAround";
	var $runtime = true;

	console.log('Aspect doAroundRuntime before ' + num);
	target[method](num, function(err, r) {

		console.log('Aspect doAroundRuntime after ' + r);
		next(err, r + 100);
	});
}

Aspect.prototype.doBeforeSync = function(next) {
	var $pointcut = "before:.*?runBeforeSync";

	// advice doBefore
	this.doBefore(next);
}

module.exports = Aspect;