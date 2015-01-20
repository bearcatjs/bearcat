var bearcat = require('../../lib/bearcat');
// var example_dir = 'simple'; // change this to run your examples
var example_dir = 'model';

var contextPath = require.resolve('./context.json'); // to run simple example

bearcat.createApp([contextPath]);
bearcat.start(function() {
	var car = bearcat.getModel('car'); // get bean
	// car.$before('before')
	// 	.$after(['transform'])
	// 	.$set('num', 100);

	// var num = car.$get('num');
	// console.log(num);

	// var r = car.$before(['checkNum'])
	// 	.$set('num', 'aaa');

	// console.log(r.stack);

	// num = car.$get('num');

	// console.log(num);
	var r;
	r = car.$before()
		.$set('len', 'aaaaa6');

	console.log(r);
	console.log(r.stack);
});