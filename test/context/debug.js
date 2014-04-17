var ApplicationContext = require('../../lib/context/applicationContext');

// var simplepath = require.resolve('../../examples/simple_args_value/context.json');
// var paths = [simplepath];

// var applicationContext = new ApplicationContext(paths);
// applicationContext.refresh();

// var car = applicationContext.getBean('car');
// var r = car.run();
var simplepath = require.resolve('../../examples/simple_args_type/context.json');
var paths = [simplepath];

var applicationContext = new ApplicationContext(paths);
applicationContext.refresh();

var car = applicationContext.getBean('car', 200);
var r = car.run();
console.log(r);