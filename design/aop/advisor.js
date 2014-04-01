var advisor = function() {

}

advisor.prototype.log = function() {
	console.log('advisor aop log');
}


module.exports = {
	id: "advisor",
	func: advisor,
	aop: [{
		"pointcut": "before:aop.car.runLog",
		"advice": "log"
	}]
}