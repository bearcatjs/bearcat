var contextPath = require.resolve('./context.json'); // to run simple example
var bearcat = require('../../lib/bearcat');

bearcat.createApp([contextPath]);
bearcat.start(function() {
	var simpleModel = bearcat.getModel('simpleModel');
	simpleModel.$set('num1', 10);
	var num1 = simpleModel.$get('num1');

	console.log("$set num1 %d", num1);

	var r = simpleModel.$set('num2', 'aaa');
	if (r) {
		console.log(r.stack);
	}

	simpleModel.$pack({
		'num1': 5
	});

	num1 = simpleModel.$get('num1');

	console.log("$pack data num1 %d", num1);

	var num3 = simpleModel.$get('num3');

	console.log("$get default num3 %d", num3);

	var filterModel = bearcat.getModel('filterModel');

	filterModel.$before('checkNum').$set('num', 5);

	var filterNum = filterModel.$get('num');
	console.log("$set before filter %d", filterNum);

	r = filterModel.$before('checkNum').$set('num', 'aaa');
	if (r) {
		console.log(r.stack);
	}

	r = filterModel.$before('checkNum').$set('num', 20);
	if (r) {
		console.log(r.stack);
	}

	filterModel.$after('transformNum').$set('num', 3);
	filterNum = filterModel.$get('num');
	console.log("$set after filter %d", filterNum);

	var constaintModel = bearcat.getModel('constaintModel');
	r = constaintModel.$set("num1"); // the Error object
	if (r) {
		console.log(r.stack);
	}

	r = constaintModel.$set("num2"); // the Error object
	if (r) {
		console.log(r.stack);
	}

	constaintModel.$set("value", "aaa"); // ok

	var value = constaintModel.$get("value");
	console.log(value);

	r = constaintModel.$set("value", "aaaaaa"); // error

	if (r) {
		console.log(r.stack);
	}

	var builtinModel = bearcat.getModel('builtinModel');

	builtinModel.$set('numMax', 12); // ok
	var numMax = builtinModel.$get('numMax');
	console.log("builtinModel numMax %d", numMax);

	r = builtinModel.$set('numMax', 21); // error

	if (r) {
		console.log(r.stack);
	}

	builtinModel.$set('numMin', 10); // ok
	var numMin = builtinModel.$get('numMin');
	console.log("builtinModel numMin %d", numMin);

	r = builtinModel.$set('numMin', 9); // error

	if (r) {
		console.log(r.stack);
	}

	r = builtinModel.$set('numNotNull');

	if (r) {
		console.log(r.stack);
	}

	r = builtinModel.$set('numNull', 1);

	if (r) {
		console.log(r.stack);
	}

	builtinModel.$set('numPattern', 'test'); // ok

	var numPattern = builtinModel.$get('numPattern');
	console.log("builtinModel numPattern %s", numPattern);

	r = builtinModel.$set('numPattern', 't1est'); // error

	if (r) {
		console.log(r.stack);
	}

	builtinModel.$set('numSize', 'aaaaa'); // ok
	var numSize = builtinModel.$get('numSize');
	console.log("builtinModel numSize %s", numSize);

	r = builtinModel.$set('numSize', 'aaaaaaaaaaaaaaaaaaa'); // error

	if (r) {
		console.log(r.stack);
	}

	r = builtinModel.$set('numSize', 'a'); // error

	if (r) {
		console.log(r.stack);
	}
});