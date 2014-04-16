var ApplicationContext = require('../../lib/context/applicationContext');

// var simplepath = require.resolve('../../examples/simple_args_value/context.json');
// var paths = [simplepath];

// var applicationContext = new ApplicationContext(paths);
// applicationContext.refresh();

// var car = applicationContext.getBean('car');
// var r = car.run();
var simplepath = require.resolve('../../examples/placeholder/context.json');
var paths = [simplepath];
var path = require('path');

var configPath = path.dirname(simplepath) + '/config';

var applicationContext = new ApplicationContext(paths);
applicationContext.setConfigPath(configPath);
applicationContext.refresh();

var car = applicationContext.getBean('car');
var r = car.run();

applicationContext.setEnv('prod');
applicationContext.refresh();

car = applicationContext.getBean('car');
r = car.run();