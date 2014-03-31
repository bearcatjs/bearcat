var Proxy = require('../../lib/aop/proxy');
var targetCar = require('./car');

var interfaces = ['run'];

var proxyCar = new Proxy();
proxyCar.setTarget(new targetCar());
proxyCar.setInterfaces(interfaces);

proxyCar.run(100);