var bearcat = require('../../lib/bearcat');

var simplepath = require.resolve('../../examples/model_test/context.json');
var paths = [simplepath];

bearcat.getModel('xxx');
bearcat.getRoute();
bearcat.createApp(paths);
bearcat.start(function() {
	var car = bearcat.getModel('car'); // get bean
	var r = car.$before('before')
		.$set('num', 100);

	var num = car.$get('num');

	r = car.$before('before')
		.$after(['transform'])
		.$set('num', 100);

	num = car.$get('num');

	r = car.$before(['checkNum'])
		.$set('num', 'aaa');

	num = car.$get('num');

	r = car.$before()
		.$set('len', 'aaaaa6');

	r = car.$after()
		.$pack({
			id: 100,
			num: 100,
			len: 100
		});

	num = car.$get('num');

	console.log(r);

	r = car.$after(['transformError'])
		.$set('num', 100);

	console.log('~~~~~~~~~~~~');
	console.log(r);

	var num = car.$get('num');
	r = car.$before(['checkNum'])
		.$set('num', 'aaa');
	console.log(r);

	num = car.$get('num');

	console.log(num);
	r = car.$before()
		.$set('len', 'aaaaa6');

	console.log(r);
	bearcat.stop();
});