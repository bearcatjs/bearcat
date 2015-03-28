var contextPath = require.resolve('./context.json'); // to run simple example
var bearcat = require('../../lib/bearcat');

var SimpleBean = function() {
	this.$id = "simpleBean";
}

var getModel = function() {
	var simpleModel = bearcat.getModel('simpleModel');
}

var getBean = function() {
	var simpleBean = bearcat.getBean(SimpleBean);
}

var id = 1;
var f = function() {
	this.num1 = id++;
}

var getObj1 = function() {
	var obj = {
		num1: 0
	}
}

var getObj2 = function() {
	var obj = new f();
}

var n = 1000 * 1000;
bearcat.createApp([contextPath]);
bearcat.start(function() {
	var start = Date.now();

	for (var i = 0; i < n; i++) {
		// getObj2();
		// getModel();
		getBean();
	}

	console.log(Date.now() - start);
});