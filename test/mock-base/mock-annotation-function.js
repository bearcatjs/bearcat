var mock = {};

module.exports = mock;

mock.t1 = function() {

}

mock.t2 = function(name) {

}

mock.t3 = function() {
	this.id = 1;
}

mock.t4 = function($engine) {
	this.$engine = $engine;
}

mock.t5 = function() {
	this.$engine = null;
}

mock.t6 = function($engine, num) {
	this.$engine = $engine;
	this.$wheel = null;
	this.num = num;
}

mock.t7 = function() {
	this.$Vnum = "${car.num}";
}

mock.t8 = function() {
	this.$Tnum = "Number";
}

mock.t9 = function() {
	this.$id = "t9";
	this.$scope = "prototype";
	this.$order = 1;
	this.$init = "init";
	this.$destroy = "destroy";
	this.$factoryBean = "car";
	this.$factoryMethod = "run";
	this.$async = true;
	this.$abstract = true;
	this.$parent = "bus";
	this.$lazy = true;
	this.$factoryArgs = [{
		name: "name",
		value: "name"
	}];
	this.$proxy = true;
	this.$aop = [{
		"pointcut": "before:.*?runBefore",
		"advice": "doBefore",
		"order": 10
	}];
	this.$car = null;
	this.$bus = null;
}

var t10 = function() {
	this.$id = "t10";
	this.$aop = true;
}

t10.prototype.run = function() {
	var $pointcut = "before:.*?runBefore";
}

t10.prototype.fly = function() {
	var $other = "test";
}

mock.t10 = t10;

var t11 = function() {
	this.$id = "t11";
	this.$aop = true;
}

t11.prototype.run = function() {
	var $pointcut = "before:.*?runBefore";

	var $advice = "fly";
	var $order = 1;
	var $runtime = true;
}

t11.prototype.fly = function() {
	console.log('fly');
}

t11.prototype.boot = function() {
	var $pointcut = "after:.*?runBoot";
}

mock.t11 = t11;

var t12 = function() {
	this.$id = "t12";
	this.$scope = "prototype";
	//this.$wheel = null;
	/*this.$engine = null;
		this.$car = null;
	 */
}

mock.t12 = t12;

var t13 = function() {
	this.$id = "t13";
	this.$aop = true;
}

t13.prototype.run = function() {
	var $pointcut = "before:.*?run";
	// var $runtime = true;
}

mock.t13 = t13;