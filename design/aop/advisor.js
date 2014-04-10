var advisor = function() {

}

module.exports = advisor;

advisor.prototype.log = function(next) {
	console.log('advisor aop log');
	next();
}

advisor.prototype.transaction = function(target, method, next) {
	console.log('advisor around before');
	target[method](function(err, results) {

		console.log('advisor around after return');
		next();
	});
}

advisor.prototype.afterLog = function(next) {
	console.log('advisor after log');
	next();
}

advisor.prototype.transactionR = function(target, method, num, next) {
	console.log('advisor around before');

	target[method](num, function(err, results) {
		console.log('advisor around after return');
		next(err, results);
	});
}

advisor.prototype.afterLogR = function(err, num, next) {
	console.log('advisor after log');
	next();
}

module.exports = {
	id: "advisor",
	func: advisor,
	aop: [
		// {
		// 	"pointcut": "before:*.runLog",
		// 	"advice": "log"
		// }, 
		{
			"pointcut": "after:.*runLog",
			"advice": "afterLogR",
			"runtime": true
		}, {
			"pointcut": "around:.*runLog",
			"advice": "transactionR",
			"runtime": true
		}
	]
}