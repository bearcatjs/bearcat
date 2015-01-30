var bearcat = require('../../lib/bearcat');

var simplepath = require.resolve('../../examples/model/context.json');
var paths = [simplepath];

bearcat.getModel('xxx');
bearcat.getRoute();
bearcat.createApp(paths);
bearcat.start(function() {
	var car = bearcat.getModel('car'); // get bean
	var r = car.$before('before')
		.$after(['transform'])
		.$set('num', 100);
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