var advisor = function() {

}

advisor.prototype.log = function() {
	console.log('advisor aop log');
}

module.exports = {
	"id": "advisor",
	func: advisor,
	aop: [{
		"pointcut": "",
		"advice": "log"
	}]
}