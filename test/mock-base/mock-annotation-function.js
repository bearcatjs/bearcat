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