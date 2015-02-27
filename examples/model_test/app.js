var MockResultSet = require('./app/data/mockResultSet');
var contextPath = require.resolve('./context.json'); // to run simple example
var bearcat = require('../../lib/bearcat');

bearcat.createApp([contextPath]);
bearcat.start(function() {
	var car = bearcat.getModel('car'); // get bean
	car.$before('before')
		.$after(['transform'])
		.$set('num', 100);

	var num = car.$get('num');
	console.log(num);

	var r = car.$before(['checkNum'])
		.$set('num', 'aaa');

	console.log(r.stack);

	num = car.$get('num');
	console.log(car);
	console.log(num);
	var r;
	r = car.$before()
		.$set('len', 'aaaaa6');

	// console.log(r);
	// console.log(r.stack);
	var resultSet1 = MockResultSet.t1;
	var resultSet2 = MockResultSet.t2;

	var blogResult1 = bearcat.getModel('blogResult');
	// console.log(blogResult1.modelDefinition);
	for (var i = 0; i < resultSet1.length; i++) {
		var r = blogResult1.$packResultSet(resultSet1[i]);
		if (r) {
			console.log(r);
		}
	}
	blogResult1.run();
	var blogResult2 = bearcat.getModel('blogResult');

	for (var i = 0; i < resultSet2.length; i++) {
		var r = blogResult2.$packResultSet(resultSet2[i]);
		if (r) {
			console.log(r);
		}
	}
	blogResult2.run();
});