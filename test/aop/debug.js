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

// var simplepath = require.resolve('../../examples/aop/context.json');
// var paths = [simplepath];

// var applicationContext = new ApplicationContext(paths);
// applicationContext.refresh();

// var car = applicationContext.getBean('car');
// var r = car.runBeforeSync();
// console.log(r);
// var simplepath = require.resolve('../../examples/aop/context.json');
// var paths = [simplepath];

// var applicationContext = new ApplicationContext(paths);
// applicationContext.refresh();

// var car = applicationContext.getBean('car');
// var r = car.doRun(100);

var simplepath = require.resolve('../../examples/aop/context.json');
var paths = [simplepath];

var applicationContext = new ApplicationContext(paths);
applicationContext.refresh();

var car = applicationContext.getBean('car');

var r = car.doRunAfterSync();