var fs = require('fs');

var path = "beans";

var files = fs.readdirSync(path);

var beanFactory = {};

// for (var i = 0; i < files.length; i++) {
// 	var file = files[i];
// 	var m = require(file);
// 	var fun = m['fun'];
// 	var setting = m['setting'];

// 	var id = setting['id'];

// 	beanFactory[id] = m;
// }

var _car = require('./beans/car.js');
var _engine = require('./beans/engine.js');
var _wheel = require('./beans/wheel.js');

var car = new (_car.fun)();
var engine = new (_engine.fun)();
var wheel = new (_wheel.fun)();

car["engine"] = engine;
car["wheel"] = wheel;

car.run();