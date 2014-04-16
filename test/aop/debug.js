var ApplicationContext = require('../../lib/context/applicationContext');

// var simplepath = require.resolve('../../design/aop/context.json');
// var paths = [simplepath];

// var applicationContext = new ApplicationContext(paths);
// applicationContext.on('finishRefresh', function() {
// 	var car = applicationContext.getBean('car');
// 	var r = car.runLog(100, function(err, num) {
// 		console.log('car run result ' + num);
// 	});

// })
// applicationContext.refresh();

var lib = process.env.BEARCAT_COV ? 'lib-cov' : 'lib';

var ProxyFactory = require('../../' + lib + '/aop/framework/proxyFactory');

var should = require('should');

var Car = function() {}

var proxyFactory = new ProxyFactory(new Car(), ['run', 'runxx']);