var ApplicationContext = require('../../lib/context/applicationContext');

var simplepath = require.resolve('../../examples/simple_module_inject/context.json');
var paths = [simplepath];

var applicationContext = new ApplicationContext(paths);
applicationContext.on('finishRefresh', function() {
	var car = applicationContext.getBean('car');
	var r = car.run();

})
applicationContext.refresh();