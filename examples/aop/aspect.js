var Aspect = function() {

}

module.exports = Aspect;

Aspect.prototype.doBefore = function(next) {
	console.log('Aspect doBefore');
	next();
}

Aspect.prototype.doBeforeOrder = function(next) {
	console.log('Aspect doBeforeOrder');
	next();
}

Aspect.prototype.doBeforeError = function(next) {
	console.log('Aspect doBeforeError');
	next(new Error('doBeforeError'));
}

Aspect.prototype.doBeforeRuntime = function(num, next) {
	console.log('Aspect doBeforeRuntime ' + num);
	next();
}

Aspect.prototype.doAfter = function(err, r, next) {
	console.log('Aspect doAfter ' + r);
	next();
}

Aspect.prototype.doRunAfter = function(r, next) {
	console.log('Aspect doRunAfter ' + r);
	next();
}

Aspect.prototype.doAround = function(target, method, next) {
	console.log('Aspect doAround before');
	target[method](function(err, r) {

		console.log('Aspect doAround after ' + r);
		next(err, r + 100);
	});
}

Aspect.prototype.doAroundRuntime = function(target, method, num, next) {
	console.log('Aspect doAroundRuntime before ' + num);
	target[method](num, function(err, r) {

		console.log('Aspect doAroundRuntime after ' + r);
		next(err, r + 100);
	});
}