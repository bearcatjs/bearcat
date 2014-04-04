var advisor = function() {

}

module.exports = advisor;

advisor.prototype.log = function(next) {
	console.log('advisor aop log');
	next();
}

advisor.prototype.transaction = function(target, method, args, next) {
	target[method](function(err, results) {

	});
}

advisor.prototype.afterMethod = function(args, next) {

}

module.exports = {
	id: "advisor",
	func: advisor,
	aop: [{
		"pointcut": "before:*.runLog",
		"advice": "log"
	}]
}

/*
, {
	"pointcut": "around:*.runLog",
	"advice": "transaction"
}*/