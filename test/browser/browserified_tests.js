(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Aspect = function() {

}

module.exports = Aspect;

Aspect.prototype.doBefore = function(next) {
	console.log('Aspect doBefore');
	next();
}

Aspect.prototype.doBeforeOrder = function(next) {
	console.log('Aspect doBeforeOrder');
	next();
}

Aspect.prototype.doBeforeError = function(next) {
	console.log('Aspect doBeforeError');
	next(new Error('doBeforeError'));
}

Aspect.prototype.doBeforeRuntime = function(num, next) {
	console.log('Aspect doBeforeRuntime ' + num);
	next();
}

Aspect.prototype.doAfter = function(err, r, next) {
	console.log('Aspect doAfter ' + r);
	next();
}

Aspect.prototype.doRunAfter = function(r, next) {
	console.log('Aspect doRunAfter ' + r);
	next();
}

Aspect.prototype.doAround = function(target, method, next) {
	console.log('Aspect doAround before');
	target[method](function(err, r) {

		console.log('Aspect doAround after ' + r);
		next(err, r + 100);
	});
}

Aspect.prototype.doAroundRuntime = function(target, method, num, next) {
	console.log('Aspect doAroundRuntime before ' + num);
	target[method](num, function(err, r) {

		console.log('Aspect doAroundRuntime after ' + r);
		next(err, r + 100);
	});
}
},{}],2:[function(require,module,exports){
var Base = function() {

}

module.exports = Base;
},{}],3:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop/car"},"wheel":{"id":"wheel","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop/wheel"},"base":{"id":"base","proxy":false,"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop/base"},"aspect":{"id":"aspect","aop":[{"pointcut":"before:.*?runBefore","advice":"doBefore","order":10},{"pointcut":"before:.*?runBefore","advice":"doBeforeOrder","order":100},{"pointcut":"before:.*?runBeforeError","advice":"doBeforeError"},{"pointcut":"before:.*?runTimeBefore","advice":"doBeforeRuntime","runtime":true},{"pointcut":"after:.*?runAfter","advice":"doAfter"},{"pointcut":"after:.*?doRunAfter","advice":"doRunAfter"},{"pointcut":"around:.*?runAround","advice":"doAround"},{"pointcut":"around:.*?runTimeAround","advice":"doAroundRuntime","runtime":true},{"pointcut":"before:.*?runBeforeSync","advice":"doBefore"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop/aspect"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop/car.js");
Root.__bearcatData__.metas[id] = meta;
var id = "wheel";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop/wheel.js");
Root.__bearcatData__.metas[id] = meta;
var id = "base";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop/base.js");
Root.__bearcatData__.metas[id] = meta;
var id = "aspect";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop/aspect.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop/aspect.js":1,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop/base.js":2,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop/car.js":4,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop/wheel.js":5}],4:[function(require,module,exports){
var Car = function() {

}

Car.prototype.runBeforeSync = function() {
	console.log('runBeforeSync car...');
	return 'runBeforeSync';
}

Car.prototype.runBefore = function(cb) {
	console.log('runBefore car...');
	cb(null, 'car');
}

Car.prototype.runBeforeError = function(cb) {
	console.log('runBeforeError car...');
	cb(null, 'car');
}

Car.prototype.runTimeBefore = function(num, cb) {
	cb(null, 'car' + num);
}

Car.prototype.runAfter = function(num, cb) {
	cb(null, 'car' + num);
}

Car.prototype.runAround = function(cb) {
	cb(null, 'car');
}

Car.prototype.runTimeAround = function(num, cb) {
	cb(null, 'car' + num);
}

Car.prototype.doRun = function(num) {
	console.log('doRun ' + num);
}

Car.prototype.doRunObj = function(obj) {
	obj['a'] = 1;
}

Car.prototype.doRunAfterSync = function() {
	console.log('runAfterSync car...');
	return 'runAfterSync';
}

module.exports = Car;
},{}],5:[function(require,module,exports){
var Wheel = function() {

}

module.exports = Wheel;

Wheel.prototype.doWheel = function() {

}
},{}],6:[function(require,module,exports){
var Aspect = function() {
	this.$id = "aspect";
	this.$aop = true;
}

Aspect.prototype.doBefore = function(next) {
	var $pointcut = "before:.*?runBefore";
	var $order = 10;

	console.log('Aspect doBefore');
	next();
}

Aspect.prototype.doBeforeOrder = function(next) {
	var $pointcut = "before:.*?runBefore";
	var $order = 100;

	console.log('Aspect doBeforeOrder');
	next();
}

Aspect.prototype.doBeforeError = function(next) {
	var $pointcut = "before:.*?runBeforeError";

	console.log('Aspect doBeforeError');
	next(new Error('doBeforeError'));
}

Aspect.prototype.doBeforeRuntime = function(num, next) {
	var $pointcut = "before:.*?runTimeBefore";
	var $runtime = true;

	console.log('Aspect doBeforeRuntime ' + num);
	next();
}

Aspect.prototype.doAfter = function(err, r, next) {
	var $pointcut = "after:.*?runAfter";

	console.log('Aspect doAfter ' + r);
	next();
}

Aspect.prototype.doRunAfter = function(r, next) {
	var $pointcut = "after:.*?doRunAfter";

	console.log('Aspect doRunAfter ' + r);
	next();
}

Aspect.prototype.doAround = function(target, method, next) {
	var $pointcut = "around:.*?runAround";

	console.log('Aspect doAround before');
	target[method](function(err, r) {

		console.log('Aspect doAround after ' + r);
		next(err, r + 100);
	});
}

Aspect.prototype.doAroundRuntime = function(target, method, num, next) {
	var $pointcut = "around:.*?runTimeAround";
	var $runtime = true;

	console.log('Aspect doAroundRuntime before ' + num);
	target[method](num, function(err, r) {

		console.log('Aspect doAroundRuntime after ' + r);
		next(err, r + 100);
	});
}

Aspect.prototype.doBeforeSync = function(next) {
	var $pointcut = "before:.*?runBeforeSync";

	// advice doBefore
	this.doBefore(next);
}

module.exports = Aspect;
},{}],7:[function(require,module,exports){
var Base = function() {
	this.$id = "base";
	this.$proxy = false;
}

module.exports = Base;
},{}],8:[function(require,module,exports){
var Car = function() {
	this.$id = "car";
}

Car.prototype.runBeforeSync = function() {
	console.log('runBeforeSync car...');
	return 'runBeforeSync';
}

Car.prototype.runBefore = function(cb) {
	console.log('runBefore car...');
	cb(null, 'car');
}

Car.prototype.runBeforeError = function(cb) {
	console.log('runBeforeError car...');
	cb(null, 'car');
}

Car.prototype.runTimeBefore = function(num, cb) {
	cb(null, 'car' + num);
}

Car.prototype.runAfter = function(num, cb) {
	cb(null, 'car' + num);
}

Car.prototype.runAround = function(cb) {
	cb(null, 'car');
}

Car.prototype.runTimeAround = function(num, cb) {
	cb(null, 'car' + num);
}

Car.prototype.doRun = function(num) {
	console.log('doRun ' + num);
}

Car.prototype.doRunObj = function(obj) {
	obj['a'] = 1;
}

Car.prototype.doRunAfterSync = function() {
	console.log('runAfterSync car...');
	return 'runAfterSync';
}

Car.prototype.dyInit = function() {

}

module.exports = Car;
},{}],9:[function(require,module,exports){
var Wheel = function() {
	this.$id = "wheel";
}

Wheel.prototype.doWheel = function() {

}

module.exports = Wheel;
},{}],10:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"aspect":{"id":"aspect","aop":[{"advice":"doBefore","pointcut":"before:.*?runBefore","order":10},{"advice":"doBeforeOrder","pointcut":"before:.*?runBefore","order":100},{"advice":"doBeforeError","pointcut":"before:.*?runBeforeError"},{"advice":"doBeforeRuntime","pointcut":"before:.*?runTimeBefore","runtime":true},{"advice":"doAfter","pointcut":"after:.*?runAfter"},{"advice":"doRunAfter","pointcut":"after:.*?doRunAfter"},{"advice":"doAround","pointcut":"around:.*?runAround"},{"advice":"doAroundRuntime","pointcut":"around:.*?runTimeAround","runtime":true},{"advice":"doBeforeSync","pointcut":"before:.*?runBeforeSync"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop_annotation/app/aspect.js"},"base":{"id":"base","proxy":false,"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop_annotation/app/base.js"},"car":{"id":"car","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop_annotation/app/car.js"},"wheel":{"id":"wheel","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop_annotation/app/wheel.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "aspect";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop_annotation/app/aspect.js");
Root.__bearcatData__.metas[id] = meta;
var id = "base";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop_annotation/app/base.js");
Root.__bearcatData__.metas[id] = meta;
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop_annotation/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var id = "wheel";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop_annotation/app/wheel.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop_annotation/app/aspect.js":6,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop_annotation/app/base.js":7,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop_annotation/app/car.js":8,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/aop_annotation/app/wheel.js":9}],11:[function(require,module,exports){
var Bus = function() {
	this.$id = "bus";
	this.$car = null;
}

Bus.prototype.run = function() {
	console.log('run bus...');
	return 'bus';
}

module.exports = Bus;
},{}],12:[function(require,module,exports){
var Car = function() {
	this.$id = "car";
	this.$bus = null;
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car';
}

module.exports = Car;
},{}],13:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"bus":{"id":"bus","props":[{"name":"$car","ref":"car"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/circle_reference/app/bus.js"},"car":{"id":"car","props":[{"name":"$bus","ref":"bus"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/circle_reference/app/car.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "bus";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/circle_reference/app/bus.js");
Root.__bearcatData__.metas[id] = meta;
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/circle_reference/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/circle_reference/app/bus.js":11,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/circle_reference/app/car.js":12}],14:[function(require,module,exports){
var num = 1;

var Car = function() {
	this.$id = "car";
	// this.$scope = "singleton";
	this.$scope = "prototype";
	this["$engine"] = null; // use []
	var wheelName = "$wheel";
	this[wheelName] = null; // use variable
	this.num = num++;
	// this.$Tvalue = value;
};

Car.prototype["$light"] = null; // use variable in prototype

Car.prototype.run = function() {
	this.$engine.run();
	this.$light.shine();
	this.$wheel.run();
	console.log('car run %d ...', this.num);
}

module.exports = Car;
},{}],15:[function(require,module,exports){
var Engine = function() {
	this.$id = "engine";
}

Engine.prototype.run = function() {
	console.log('run engine...');
	return 'engine';
}

module.exports = Engine;
},{}],16:[function(require,module,exports){
var Light = function() {
	this.$id = "light";
}

Light.prototype.shine = function() {
	console.log('light shine...');
	return 'light';
}

module.exports = Light;
},{}],17:[function(require,module,exports){
var Wheel = function() {
	this.$id = "wheel";
}

Wheel.prototype.run = function() {
	console.log('run wheel...');
	return 'wheel';
}

module.exports = Wheel;
},{}],18:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","props":[{"name":"$engine","ref":"engine"},{"name":"$wheel","ref":"wheel"},{"name":"$light","ref":"light"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/car.js"},"engine":{"id":"engine","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/engine.js"},"light":{"id":"light","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/light.js"},"wheel":{"id":"wheel","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/wheel.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var id = "engine";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/engine.js");
Root.__bearcatData__.metas[id] = meta;
var id = "light";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/light.js");
Root.__bearcatData__.metas[id] = meta;
var id = "wheel";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/wheel.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/car.js":14,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/engine.js":15,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/light.js":16,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/wheel.js":17}],19:[function(require,module,exports){
var Car = function() {
	this.$id = "car";
}

Car.prototype.run = function() {
	console.log('run namespace: app car...');
	return 'car';
}

module.exports = Car;
},{}],20:[function(require,module,exports){
var Car = function() {
	this.$id = "car";
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car';
}

module.exports = Car;
},{}],21:[function(require,module,exports){
var Car = function() {
	this.$id = "car2";
	this.$Ncar = "app:car";
}

Car.prototype.run = function() {
	console.log('run car...');
	var r = this.$Ncar.run();
	return 'car ' + r;
}

module.exports = Car;
},{}],22:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"app:car":{"id":"car","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/context_namespace/app/car"},"app1:car":{"id":"car","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/context_namespace/app1/car"},"car":{"id":"car","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/context_namespace/app1/car.js"},"car2":{"id":"car2","props":[{"name":"$Ncar","ref":"app:car"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/context_namespace/app2/car.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "app:car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/context_namespace/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var id = "app1:car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/context_namespace/app1/car.js");
Root.__bearcatData__.metas[id] = meta;
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/context_namespace/app1/car.js");
Root.__bearcatData__.metas[id] = meta;
var id = "car2";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/context_namespace/app2/car.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/context_namespace/app/car.js":19,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/context_namespace/app1/car.js":20,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/context_namespace/app2/car.js":21}],23:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/hot_reload/car"},"bus":{"id":"bus","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/hot_reload/bus"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/hot_reload/car.js");
Root.__bearcatData__.metas[id] = meta;
var id = "bus";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/hot_reload/bus.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/hot_reload/bus.js":24,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/hot_reload/car.js":25}],24:[function(require,module,exports){
var Bus = function() {
	this.$id = "bus";
	this.$scope = "prototype";
}

Bus.prototype.run = function() {
	return 'bus';
}

module.exports = Bus;
},{}],25:[function(require,module,exports){
var Car = function() {

}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car';
}

module.exports = Car;
},{}],26:[function(require,module,exports){
var Util = require('util');

var NotNullConstraint = function() {
	this.$cid = "notNull";
	this.message = "%s must be not null for value %s";
}

NotNullConstraint.prototype.validate = function(key, value) {
	var message = this.message;
	if (!value) {
		return new Error(Util.format(message, key, value));
	}
}

module.exports = NotNullConstraint;
},{"util":165}],27:[function(require,module,exports){
var Util = require('util');

var SizeConstraint = function() {
	this.$cid = "carSize";
	this.$constraint = "$notNull";
	this.message = "key %s value %s length over max %d";
	this.max = null;
}

SizeConstraint.prototype.validate = function(key, value) {
	console.log('validate %s %s', key, value);

	var message = this.message;
	var maxLen = this.max;
	if (maxLen === null) {
		return;
	}

	if (value && value.length > maxLen) {
		return new Error(Util.format(message, key, value, maxLen));
	}
}

module.exports = SizeConstraint;
},{"util":165}],28:[function(require,module,exports){
var AuthorModel = function() {
	this.$mid = "author";
	this.$table = "ba_author";
	this.$prefix = "author_";
	this.id = "$primary;type:Number";
	this.name = "$type:String";
	this.create_at = "$type:Number";
	this.update_at = "$type:Number";
}

module.exports = AuthorModel;
},{}],29:[function(require,module,exports){
var BlogModel = function() {
	this.$mid = "blog";
	this.$table = "ba_blog";
	this.$prefix = "blog_";
	this.id = "$primary;type:Number";
	this.aid = "$type:Number";
	this.title = "$type:String";
	this.content = "$type:String";
	this.create_at = "$type:Number";
	this.update_at = "$type:Number";
}

module.exports = BlogModel;
},{}],30:[function(require,module,exports){
var BlogResultModel = function() {
	this.$mid = "blogResult";
	// this.$prefix = "blog_";
	this.blog = "$type:Object;ref:blog";
	this.author = "$type:Object;ref:author";
	// this.comments = "$type:Array;ref:comment";
	this.commentResults = "$type:Array;ref:commentResult";
}

BlogResultModel.prototype.run = function() {
	console.log("%j", this.blog);
	console.log("%j", this.author);
	// console.log("%j", this.comments);
	console.log("%j", this.commentResults);
	// console.log(this.comments)
}

module.exports = BlogResultModel;
},{}],31:[function(require,module,exports){
var CarErrorModel = function() {
	this.$mid = "carError";
	this.len1 = "$type:String;carSize(";
	this.len2 = "$type:String;carSize(a";
	this.len3 = "$type:String;(a";
	this.len4 = "$type:String;carSize(a)";
	this.len5 = "$type:String;carSize(a=)";
	this.len6 = "$type:String;carSize(a=1)";
	this.len7 = "$type:String;carxxSize(a=1)";
	this.len8 = "$xxxtype:String;carxxSize(a=1)";
}

CarErrorModel.prototype._modelInit = function() {

}

module.exports = CarErrorModel;
},{}],32:[function(require,module,exports){
var CarModel = function() {
	this.$mid = "car";
	this.$table = "ba_car";
	this.id = "$primary;type:Number;";
	this.num = "$type:Number;notNull";
	this.len = "$type:String;carSize(max=5)";
	this.place = "$balance;type:String;default:hangzhou";
	this.$utils = null;
}

CarModel.prototype.before = function() {
	return ["checkNum"];
}

CarModel.prototype.checkNum = function(key, value) {
	console.log('checkNum~~~ %s %s', key, value);
	if (typeof value !== 'number') {
		return new Error('num must be number');
	}
}

CarModel.prototype.transform = function() {
	console.log('transform~~~');
	this.num = 10000;
}

CarModel.prototype.transformError = function() {
	return new Error('transformError');
}

CarModel.prototype.run = function() {
	console.log('run');
}

module.exports = CarModel;
},{}],33:[function(require,module,exports){
var CommentModel = function() {
	this.$mid = "comment";
	this.$table = "ba_comment";
	this.$prefix = "comment_";
	this.id = "$primary;type:Number";
	this.aid = "$type:Number";
	this.bid = "$type:Number";
	this.content = "$type:String";
	this.create_at = "$type:Number";
	this.update_at = "$type:Number";
}

module.exports = CommentModel;
},{}],34:[function(require,module,exports){
var CommentResultModel = function() {
	this.$mid = "commentResult";
	this.author = "$type:Object;ref:author;prefix:comment_author_";
	this.comment = "$type:Object;ref:comment";
}

module.exports = CommentResultModel;
},{}],35:[function(require,module,exports){
var Utils = function() {
	this.$id = "utils";
}

module.exports = Utils;
},{}],36:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"notNull_$constraint":{"cid":"notNull","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/constraint/notNull.js","id":"notNull_$constraint"},"carSize_$constraint":{"cid":"carSize","constraint":"$notNull","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/constraint/size.js","id":"carSize_$constraint"},"author_$model":{"mid":"author","table":"ba_author","prefix":"author_","attributes":[{"name":"id","value":"$primary;type:Number"},{"name":"name","value":"$type:String"},{"name":"create_at","value":"$type:Number"},{"name":"update_at","value":"$type:Number"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/authorModel.js","id":"author_$model"},"blog_$model":{"mid":"blog","table":"ba_blog","prefix":"blog_","attributes":[{"name":"id","value":"$primary;type:Number"},{"name":"aid","value":"$type:Number"},{"name":"title","value":"$type:String"},{"name":"content","value":"$type:String"},{"name":"create_at","value":"$type:Number"},{"name":"update_at","value":"$type:Number"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/blogModel.js","id":"blog_$model"},"blogResult_$model":{"mid":"blogResult","attributes":[{"name":"blog","value":"$type:Object;ref:blog"},{"name":"author","value":"$type:Object;ref:author"},{"name":"commentResults","value":"$type:Array;ref:commentResult"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/blogResultModel.js","id":"blogResult_$model"},"carError_$model":{"mid":"carError","attributes":[{"name":"len1","value":"$type:String;carSize("},{"name":"len2","value":"$type:String;carSize(a"},{"name":"len3","value":"$type:String;(a"},{"name":"len4","value":"$type:String;carSize(a)"},{"name":"len5","value":"$type:String;carSize(a=)"},{"name":"len6","value":"$type:String;carSize(a=1)"},{"name":"len7","value":"$type:String;carxxSize(a=1)"},{"name":"len8","value":"$xxxtype:String;carxxSize(a=1)"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/carErrorModel.js","id":"carError_$model"},"car_$model":{"mid":"car","table":"ba_car","props":[{"name":"$utils","ref":"utils"}],"attributes":[{"name":"id","value":"$primary;type:Number;"},{"name":"num","value":"$type:Number;notNull"},{"name":"len","value":"$type:String;carSize(max=5)"},{"name":"place","value":"$balance;type:String;default:hangzhou"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/carModel.js","id":"car_$model"},"comment_$model":{"mid":"comment","table":"ba_comment","prefix":"comment_","attributes":[{"name":"id","value":"$primary;type:Number"},{"name":"aid","value":"$type:Number"},{"name":"bid","value":"$type:Number"},{"name":"content","value":"$type:String"},{"name":"create_at","value":"$type:Number"},{"name":"update_at","value":"$type:Number"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/commentModel.js","id":"comment_$model"},"commentResult_$model":{"mid":"commentResult","attributes":[{"name":"author","value":"$type:Object;ref:author;prefix:comment_author_"},{"name":"comment","value":"$type:Object;ref:comment"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/commentResultModel.js","id":"commentResult_$model"},"utils":{"id":"utils","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/util/utils.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "notNull_$constraint";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/constraint/notNull.js");
Root.__bearcatData__.metas[id] = meta;
var id = "carSize_$constraint";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/constraint/size.js");
Root.__bearcatData__.metas[id] = meta;
var id = "author_$model";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/authorModel.js");
Root.__bearcatData__.metas[id] = meta;
var id = "blog_$model";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/blogModel.js");
Root.__bearcatData__.metas[id] = meta;
var id = "blogResult_$model";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/blogResultModel.js");
Root.__bearcatData__.metas[id] = meta;
var id = "carError_$model";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/carErrorModel.js");
Root.__bearcatData__.metas[id] = meta;
var id = "car_$model";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/carModel.js");
Root.__bearcatData__.metas[id] = meta;
var id = "comment_$model";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/commentModel.js");
Root.__bearcatData__.metas[id] = meta;
var id = "commentResult_$model";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/commentResultModel.js");
Root.__bearcatData__.metas[id] = meta;
var id = "utils";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/util/utils.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/constraint/notNull.js":26,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/constraint/size.js":27,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/authorModel.js":28,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/blogModel.js":29,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/blogResultModel.js":30,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/carErrorModel.js":31,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/carModel.js":32,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/commentModel.js":33,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/model/commentResultModel.js":34,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/model_test/app/util/utils.js":35}],37:[function(require,module,exports){
var Car = function($engine) {
	this.$id = "car";
	this.$scope = "prototype";
	this.$engine = $engine;
	this.$wheel = null;
	this.$Vnum = "${car.num}";
}

Car.prototype.run = function() {
	this.$engine.run();
	var res = this.$wheel.run();
	console.log('run car...');
	return 'car ' + res;
}

module.exports = Car;
},{}],38:[function(require,module,exports){
module.exports=require(15)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/engine.js":15}],39:[function(require,module,exports){
module.exports=require(17)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/wheel.js":17}],40:[function(require,module,exports){
var Bus = function() {
	this.$id = "bus";
	this.$scope = "prototype";
	this.$engine = null;
	this.$wheel = null;
}

Bus.prototype.run = function() {
	this.$engine.run();
	var res = this.$wheel.run();
	console.log('run bus...');
	return 'bus ' + res;
}

module.exports = Bus;
},{}],41:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","scope":"prototype","props":[{"name":"$wheel","ref":"wheel"},{"name":"$Vnum","value":"${car.num}"}],"args":[{"name":"$engine","ref":"engine"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/multiple_scan/app1/car.js"},"engine":{"id":"engine","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/multiple_scan/app1/engine.js"},"wheel":{"id":"wheel","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/multiple_scan/app1/wheel.js"},"bus":{"id":"bus","scope":"prototype","props":[{"name":"$engine","ref":"engine"},{"name":"$wheel","ref":"wheel"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/multiple_scan/app2/bus.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/multiple_scan/app1/car.js");
Root.__bearcatData__.metas[id] = meta;
var id = "engine";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/multiple_scan/app1/engine.js");
Root.__bearcatData__.metas[id] = meta;
var id = "wheel";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/multiple_scan/app1/wheel.js");
Root.__bearcatData__.metas[id] = meta;
var id = "bus";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/multiple_scan/app2/bus.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/multiple_scan/app1/car.js":37,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/multiple_scan/app1/engine.js":38,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/multiple_scan/app1/wheel.js":39,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/multiple_scan/app2/bus.js":40}],42:[function(require,module,exports){
var Bus = function() {
	this.$id = "bus";
	this.$Vnum = "${car.num}";
}

Bus.prototype.run = function() {
	console.log('run bus' + this.$Vnum);
	return 'bus' + this.$Vnum;
}

module.exports = Bus;
},{}],43:[function(require,module,exports){
var Car = function() {
	this.$id = "car";
	this.$Vnum = "${car.num}";
	this.$Vonum = "${car.onum}";
	this.xnum = "${car.xnum}";
}

Car.prototype.run = function() {
	console.log('run car' + this.$Vnum);
	return 'car' + this.$Vnum;
}

Car.prototype.runo = function() {
	console.log(this.$Vonum);
}

Car.prototype.runx = function() {
	console.log(this.xnum);
}

module.exports = Car;
},{}],44:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"bus":{"id":"bus","props":[{"name":"$Vnum","value":"${car.num}"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/placeholder/app/bus.js"},"car":{"id":"car","props":[{"name":"$Vnum","value":"${car.num}"},{"name":"$Vonum","value":"${car.onum}"},{"name":"xnum","value":"${car.xnum}"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/placeholder/app/car.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "bus";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/placeholder/app/bus.js");
Root.__bearcatData__.metas[id] = meta;
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/placeholder/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {"appenders":[{"type":"console"}],"levels":{},"replaceConsole":false,"lineDebug":true,"car.num":100,"car.onum":{"num":100,"x":20,"y":30},"car.anum":101,"car.xnum":102,"parent":"bus"};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/placeholder/app/bus.js":42,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/placeholder/app/car.js":43}],45:[function(require,module,exports){
module.exports=require(37)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/multiple_scan/app1/car.js":37}],46:[function(require,module,exports){
module.exports=require(15)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/engine.js":15}],47:[function(require,module,exports){
module.exports=require(17)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/wheel.js":17}],48:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","scope":"prototype","props":[{"name":"$wheel","ref":"wheel"},{"name":"$Vnum","value":"${car.num}"}],"args":[{"name":"$engine","ref":"engine"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/relative_scan/app/car.js"},"engine":{"id":"engine","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/relative_scan/app/engine.js"},"wheel":{"id":"wheel","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/relative_scan/app/wheel.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/relative_scan/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var id = "engine";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/relative_scan/app/engine.js");
Root.__bearcatData__.metas[id] = meta;
var id = "wheel";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/relative_scan/app/wheel.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/relative_scan/app/car.js":45,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/relative_scan/app/engine.js":46,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/relative_scan/app/wheel.js":47}],49:[function(require,module,exports){
module.exports=require(20)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/context_namespace/app1/car.js":20}],50:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple/app/car.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple/app/car.js":49}],51:[function(require,module,exports){
var Bus = function() {

}

Bus.prototype.fly = function() {
	console.log('Bus fly');
}

module.exports = {
	func: Bus,
	id: "bus",
	parent: "car"
};
},{}],52:[function(require,module,exports){
var n = 1;

var Car = function() {
	n++;
};

Car.prototype.run = function() {
	this.engine.start();
	this.wheel.run();
	console.log(this.num);
	console.log(n);
}

Car.prototype.fly = function() {
	console.log('car fly');
}

module.exports = {
	func: Car,
	id: "car",
	abstract: true,
	props: [{
		name: "engine",
		ref: "engine"
	}, {
		name: "num",
		value: 100
	}, {
		name: "wheel",
		ref: "wheel"
	}]
};
},{}],53:[function(require,module,exports){
var Engine = function() {}

Engine.prototype.init = function() {
	console.log('init engine...');
}

Engine.prototype.destroy = function() {
	console.log('destroy engine...');
}

Engine.prototype.start = function() {
	console.log('starting engine...');
}

module.exports = {
	id: "engine",
	order: 2,
	func: Engine,
	initMethod: "init",
	destroyMethod: "destroy"
};
},{}],54:[function(require,module,exports){
var Tank = function(engine, wheel, num) {
	this.engine = engine;
	this.wheel = wheel;
	this.num = num;
}

Tank.prototype.run = function() {
	this.fly();
	return 'tank ' + this.num;
}

module.exports = {
	func: Tank,
	id: "tank",
	scope: "prototype",
	parent: "car",
	args: [{
		name: "engine",
		ref: "engine"
	}, {
		name: "wheel",
		ref: "wheel"
	}]
};
},{}],55:[function(require,module,exports){
var Wheel = function() {}

Wheel.prototype.init = function() {
	console.log('init wheel...');
}

Wheel.prototype.destroy = function() {
	console.log('destroy wheel...');
}

Wheel.prototype.run = function() {
	console.log('run wheel...');
}

module.exports = {
	id: "wheel",
	func: Wheel,
	initMethod: "init",
	destroyMethod: "destroy",
	order: 3
};
},{}],56:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"bus":{"id":"bus","parent":"car","ftype":"object","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/bus.js"},"car":{"id":"car","abstract":true,"props":[{"name":"engine","ref":"engine"},{"name":"num","value":100},{"name":"wheel","ref":"wheel"}],"ftype":"object","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/car.js"},"engine":{"id":"engine","order":2,"initMethod":"init","destroyMethod":"destroy","ftype":"object","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/engine.js"},"tank":{"id":"tank","scope":"prototype","parent":"car","args":[{"name":"engine","ref":"engine"},{"name":"wheel","ref":"wheel"}],"ftype":"object","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/tank.js"},"wheel":{"id":"wheel","initMethod":"init","destroyMethod":"destroy","order":3,"ftype":"object","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/wheel.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "bus";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/bus.js")["func"];
Root.__bearcatData__.metas[id] = meta;
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/car.js")["func"];
Root.__bearcatData__.metas[id] = meta;
var id = "engine";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/engine.js")["func"];
Root.__bearcatData__.metas[id] = meta;
var id = "tank";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/tank.js")["func"];
Root.__bearcatData__.metas[id] = meta;
var id = "wheel";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/wheel.js")["func"];
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/bus.js":51,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/car.js":52,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/engine.js":53,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/tank.js":54,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/wheel.js":55}],57:[function(require,module,exports){
var Car = function(num) {
	this.$id = "car";
	this.$scope = "prototype";
	this.$Tnum = num;
}

Car.prototype.run = function() {
	console.log('run car: ' + this.$Tnum);
	return 'car ' + this.$Tnum;
}

module.exports = Car;
},{}],58:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","scope":"prototype","props":[{"name":"$Tnum"}],"args":[{"name":"num","type":"Object"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_args_type/app/car.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_args_type/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_args_type/app/car.js":57}],59:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","args":[{"name":"num","value":100}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_args_value/car"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_args_value/car.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_args_value/car.js":60}],60:[function(require,module,exports){
var Car = function(num) {
	this.num = num;
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car ' + this.num;
}

module.exports = Car;
},{}],61:[function(require,module,exports){
var Bus = function() {
	this.$id = "bus";
	this.$init = "init";
	this.$order = 3;
}

Bus.prototype.init = function(cb) {
	console.log('init Bus...');
	setTimeout(function() {
		console.log('Bus asyncInit setTimeout');
		cb();
	}, 200);
}

Bus.prototype.run = function() {
	console.log('run bus...');
}

module.exports = Bus;
},{}],62:[function(require,module,exports){
var Car = function() {
	this.$id = "car";
	this.$init = "init";
	this.$order = 3;
	this.$wheel = null;
	this.$engine = null;
	this.num = 0;
}

Car.prototype.init = function() {
	console.log('init car...');
	this.num = 1;
	return 'init car';
}

Car.prototype.run = function() {
	this.$wheel.run();
	this.$engine.run();
	console.log('run car...');
	return 'car ' + this.num;
}

module.exports = Car;
},{}],63:[function(require,module,exports){
var Engine = function() {
	this.$id = "engine";
	this.$init = "init";
	this.$async = true;
}

Engine.prototype.init = function(cb) {
	console.log('engine init');
	cb();
}

Engine.prototype.run = function() {
	console.log('run engine...');
	return 'engine';
}

module.exports = Engine;
},{}],64:[function(require,module,exports){
var Wheel = function() {
	this.$id = "wheel";
	this.$init = "init";
	this.$order = 1;
	this.$async = true;
}

Wheel.prototype.init = function(cb) {
	console.log('init wheel...');
	setTimeout(function() {
		console.log('asyncInit setTimeout');
		cb();
	}, 100);
}

Wheel.prototype.run = function() {
	console.log('run wheel...');
	return 'wheel';
}

module.exports = Wheel;
},{}],65:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"bus":{"id":"bus","init":"init","order":3,"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_async_init/app/bus.js"},"car":{"id":"car","init":"init","order":3,"props":[{"name":"$wheel","ref":"wheel"},{"name":"$engine","ref":"engine"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_async_init/app/car.js"},"engine":{"id":"engine","init":"init","async":true,"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_async_init/app/engine.js"},"wheel":{"id":"wheel","init":"init","order":1,"async":true,"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_async_init/app/wheel.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "bus";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_async_init/app/bus.js");
Root.__bearcatData__.metas[id] = meta;
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_async_init/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var id = "engine";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_async_init/app/engine.js");
Root.__bearcatData__.metas[id] = meta;
var id = "wheel";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_async_init/app/wheel.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_async_init/app/bus.js":61,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_async_init/app/car.js":62,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_async_init/app/engine.js":63,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_async_init/app/wheel.js":64}],66:[function(require,module,exports){
var Car = function() {
	this.$id = "car";
	this.$destroy = "destroy";
}

Car.prototype.destroy = function() {
	console.log('destroy car...');
	return 'destroy car';
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car';
}

module.exports = Car;
},{}],67:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","destroy":"destroy","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_destroy_method/app/car.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_destroy_method/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_destroy_method/app/car.js":66}],68:[function(require,module,exports){
var Car = function() {
	this.$id = "car";
	this.$factoryBean = "carFactory";
	this.$factoryMethod = "createCar";
	this.num = 0;
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car ' + this.num;
}

module.exports = Car;
},{}],69:[function(require,module,exports){
var Car = require('./car');

var CarFactory = function() {
	this.$id = "carFactory";
	this.$wheel = null;
}

CarFactory.prototype.createCar = function() {
	console.log('CarFactory createCar...');
	this.$wheel.run();
	return new Car();
}

module.exports = CarFactory;
},{"./car":68}],70:[function(require,module,exports){
var Wheel = function() {
	this.$id = "wheel";
}

Wheel.prototype.run = function() {
	console.log('run Wheel...');
}

module.exports = Wheel;
},{}],71:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","factoryBean":"carFactory","factoryMethod":"createCar","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_factory_bean/app/car.js"},"carFactory":{"id":"carFactory","props":[{"name":"$wheel","ref":"wheel"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_factory_bean/app/carFactory.js"},"wheel":{"id":"wheel","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_factory_bean/app/wheel.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_factory_bean/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var id = "carFactory";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_factory_bean/app/carFactory.js");
Root.__bearcatData__.metas[id] = meta;
var id = "wheel";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_factory_bean/app/wheel.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_factory_bean/app/car.js":68,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_factory_bean/app/carFactory.js":69,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_factory_bean/app/wheel.js":70}],72:[function(require,module,exports){
var Car = function() {
	this.$id = "car";
	this.$factoryBean = "carFactory1";
	this.$factoryMethod = "createCar";
	this.num = 0;
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car ' + this.num;
}

module.exports = Car;
},{}],73:[function(require,module,exports){
var Car = require('./car');

var CarFactory = function() {
	this.$id = "CarFactory";
}

CarFactory.prototype.createCar = function() {
	console.log('CarFactory createCar...');
	return new Car();
}

module.exports = CarFactory;
},{"./car":72}],74:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","factoryBean":"carFactory1","factoryMethod":"createCar","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_factory_bean_error/app/car.js"},"CarFactory":{"id":"CarFactory","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_factory_bean_error/app/carFactory.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_factory_bean_error/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var id = "CarFactory";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_factory_bean_error/app/carFactory.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_factory_bean_error/app/car.js":72,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_factory_bean_error/app/carFactory.js":73}],75:[function(require,module,exports){
module.exports=require(37)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/multiple_scan/app1/car.js":37}],76:[function(require,module,exports){
module.exports=require(15)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/engine.js":15}],77:[function(require,module,exports){
module.exports=require(17)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/wheel.js":17}],78:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","scope":"prototype","props":[{"name":"$wheel","ref":"wheel"},{"name":"$Vnum","value":"${car.num}"}],"args":[{"name":"$engine","ref":"engine"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_function_annotation/app/car.js"},"engine":{"id":"engine","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_function_annotation/app/engine.js"},"wheel":{"id":"wheel","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_function_annotation/app/wheel.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_function_annotation/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var id = "engine";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_function_annotation/app/engine.js");
Root.__bearcatData__.metas[id] = meta;
var id = "wheel";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_function_annotation/app/wheel.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_function_annotation/app/car.js":75,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_function_annotation/app/engine.js":76,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_function_annotation/app/wheel.js":77}],79:[function(require,module,exports){
module.exports=require(20)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/context_namespace/app1/car.js":20}],80:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_imports_context/app/car.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_imports_context/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_imports_context/app/car.js":79}],81:[function(require,module,exports){
var Car = function() {
	this.$id = "car";
	this.$scope = "prototype";
	this.$init = "init";
	this.num = 0;
}

Car.prototype.init = function() {
	console.log('init car...');
	this.num = 1;
	return 'init car';
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car ' + this.num;
}

module.exports = Car;
},{}],82:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","scope":"prototype","init":"init","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_init_method/app/car.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_init_method/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_init_method/app/car.js":81}],83:[function(require,module,exports){
var Car = function($engine) {
	this.$id = "car";
	this.$engine = $engine;
	this.$wheel = null;
}

Car.prototype.run = function() {
	this.$engine.run();
	var res = this.$wheel.run();
	console.log('run car...');
	return 'car ' + res;
}

module.exports = Car;
},{}],84:[function(require,module,exports){
module.exports=require(15)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/engine.js":15}],85:[function(require,module,exports){
module.exports=require(17)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/wheel.js":17}],86:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","props":[{"name":"$wheel","ref":"wheel"}],"args":[{"name":"$engine","ref":"engine"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject/app/car.js"},"engine":{"id":"engine","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject/app/engine.js"},"wheel":{"id":"wheel","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject/app/wheel.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var id = "engine";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject/app/engine.js");
Root.__bearcatData__.metas[id] = meta;
var id = "wheel";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject/app/wheel.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject/app/car.js":83,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject/app/engine.js":84,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject/app/wheel.js":85}],87:[function(require,module,exports){
var Car = function() {
	this.$id = "car";
	this.$wheel = null;
}

Car.prototype.run = function() {
	var res = this.$wheel.run();
	console.log('run car...');
	return 'car ' + res;
}

module.exports = Car;
},{}],88:[function(require,module,exports){
module.exports=require(17)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/wheel.js":17}],89:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","props":[{"name":"$wheel","ref":"wheel"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject_meta/app/car.js"},"wheel":{"id":"wheel","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject_meta/app/wheel.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject_meta/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var id = "wheel";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject_meta/app/wheel.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject_meta/app/car.js":87,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject_meta/app/wheel.js":88}],90:[function(require,module,exports){
var Car = function() {
	this.$id = "car";
	this.$lazy = true;
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car';
}

module.exports = Car;
},{}],91:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","lazy":true,"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_lazy_init/app/car.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_lazy_init/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_lazy_init/app/car.js":90}],92:[function(require,module,exports){
var Car = function() {
	this.$id = "car";
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car';
}

module.exports = Car;
// {
// 	id: "car",
// 	func: Car
// };
},{}],93:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_meta/app/car.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_meta/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_meta/app/car.js":92}],94:[function(require,module,exports){
var Wheel = function(num) {
	this.$id = "wheel";
	this.$lazy = true;

	// init with arguments
	if (!num) {
		console.error('num must have...');
	}
}

module.exports = Wheel;
},{}],95:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"wheel":{"id":"wheel","lazy":true,"args":[{"name":"num","type":"Object"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_meta_error/app/wheel.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "wheel";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_meta_error/app/wheel.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_meta_error/app/wheel.js":94}],96:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","scope":"singleton","props":[{"name":"num","value":100}],"ftype":"object","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_meta_merge/car"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_meta_merge/car.js")["func"];
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_meta_merge/car.js":97}],97:[function(require,module,exports){
var Car = function() {
	this.num = null;
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car' + this.num;
}

module.exports = {
	id: "car",
	func: Car,
	scope: "singleton",
	props: [{
		name: "num",
		value: 100
	}]
};
},{}],98:[function(require,module,exports){
module.exports=require(87)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_inject_meta/app/car.js":87}],99:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"wheel":{"id":"wheel","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_module_inject/node_modules/moduleB/beans/wheel.js"},"car":{"id":"car","props":[{"name":"$wheel","ref":"wheel"}],"fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_module_inject/beans/car.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "wheel";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_module_inject/node_modules/moduleB/beans/wheel.js");
Root.__bearcatData__.metas[id] = meta;
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_module_inject/beans/car.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_module_inject/beans/car.js":98,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_module_inject/node_modules/moduleB/beans/wheel.js":100}],100:[function(require,module,exports){
module.exports=require(17)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/complex_function_annotation/app/wheel.js":17}],101:[function(require,module,exports){
var Bus = function(engine, wheel, num) {
	this.engine = engine;
	this.wheel = wheel;
	this.num = num;
}

Bus.prototype.run = function() {
	return 'bus ' + this.num;
}

module.exports = {
	func: Bus,
	id: "bus",
	parent: "car",
	args: [{
		name: "engine",
		ref: "engine"
	}, {
		name: "wheel",
		ref: "wheel"
	}]
};
},{}],102:[function(require,module,exports){
var n = 1;

var Car = function(engine, wheel, num) {
	this.engine = engine;
	this.wheel = wheel;
	this.num = num;
	n++;
};

Car.prototype.run = function() {
	this.engine.start();
	this.wheel.run();
	console.log(this.num);
}

module.exports = {
	func: Car,
	id: "car",
	args: [{
		name: "engine",
		ref: "engine"
	}, {
		name: "num",
		value: 100
	}, {
		name: "wheel",
		ref: "wheel"
	}],
	order: 1
};
},{}],103:[function(require,module,exports){
var Engine = function() {}
var fs = require('fs');

Engine.prototype.init = function() {
	console.log('init engine...');
}

Engine.prototype.destroy = function() {
	console.log('destroy engine...');
}

Engine.prototype.start = function() {
	console.log('starting engine...');
}

module.exports = {
	id: "engine",
	order: 2,
	func: Engine,
	initMethod: "init",
	destroyMethod: "destroy"
};
},{"fs":154}],104:[function(require,module,exports){
var Tank = function(engine, wheel, num) {
	this.engine = engine;
	this.wheel = wheel;
	this.num = num;
}

Tank.prototype.run = function() {
	return 'tank ' + this.num;
}

module.exports = {
	func: Tank,
	id: "tank",
	scope: "prototype",
	parent: "car",
	args: [{
		name: "engine",
		ref: "engine"
	}, {
		name: "wheel",
		ref: "wheel"
	}]
};
},{}],105:[function(require,module,exports){
module.exports=require(55)
},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_abstract_parent/beans/wheel.js":55}],106:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"bus":{"id":"bus","parent":"car","args":[{"name":"engine","ref":"engine"},{"name":"wheel","ref":"wheel"}],"ftype":"object","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_parent_bean/beans/bus.js"},"car":{"id":"car","args":[{"name":"engine","ref":"engine"},{"name":"num","value":100},{"name":"wheel","ref":"wheel"}],"order":1,"ftype":"object","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_parent_bean/beans/car.js"},"engine":{"id":"engine","order":2,"initMethod":"init","destroyMethod":"destroy","ftype":"object","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_parent_bean/beans/engine.js"},"tank":{"id":"tank","scope":"prototype","parent":"car","args":[{"name":"engine","ref":"engine"},{"name":"wheel","ref":"wheel"}],"ftype":"object","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_parent_bean/beans/tank.js"},"wheel":{"id":"wheel","initMethod":"init","destroyMethod":"destroy","order":3,"ftype":"object","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_parent_bean/beans/wheel.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "bus";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_parent_bean/beans/bus.js")["func"];
Root.__bearcatData__.metas[id] = meta;
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_parent_bean/beans/car.js")["func"];
Root.__bearcatData__.metas[id] = meta;
var id = "engine";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_parent_bean/beans/engine.js")["func"];
Root.__bearcatData__.metas[id] = meta;
var id = "tank";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_parent_bean/beans/tank.js")["func"];
Root.__bearcatData__.metas[id] = meta;
var id = "wheel";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_parent_bean/beans/wheel.js")["func"];
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_parent_bean/beans/bus.js":101,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_parent_bean/beans/car.js":102,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_parent_bean/beans/engine.js":103,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_parent_bean/beans/tank.js":104,"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_parent_bean/beans/wheel.js":105}],107:[function(require,module,exports){
var num = 1;
var Car = function() {
	this.$id = "car";
	this.$scope = "prototype";
}

Car.prototype.run = function() {
	console.log('run car...');
	return 'car ' + num++;
}

module.exports = Car;
},{}],108:[function(require,module,exports){
var Root;
(function() { Root = this; }());
var metas = {"car":{"id":"car","scope":"prototype","fpath":"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_prototype/app/car.js"}};
Root.__bearcatData__ = {};
Root.__bearcatData__.metas = {};
Root.__bearcatData__.configData = {};
var id = "car";
var meta = metas[id];
var fpath = meta["fpath"];
meta["func"] = require("/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_prototype/app/car.js");
Root.__bearcatData__.metas[id] = meta;
var properties = {};
Root.__bearcatData__.configData = properties;

},{"/home/fantasyni/projects/pomelo-projects/bearcat/examples/simple_prototype/app/car.js":107}],109:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat Advisor
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Pointcut = require('./pointcut');

/**
 * Advisor constructor function.
 *
 * @api public
 */
var Advisor = function() {
	this.pointcut = null;
	this.beanName = null;
	this.runtime = null;
	this.advice = null;
	this.order = null;
	this.bean = null;
}

/**
 * Advisor set pointcut.
 *
 * @param  {Object} pointcut pointcut object
 * @api public
 */
Advisor.prototype.setPointcut = function(pointcut) {
	if (!pointcut) {
		return;
	}

	var p = new Pointcut();
	p.setExpression(pointcut);

	this.pointcut = p;
}

/**
 * Advisor get pointcut.
 *
 * @return  {Object} pointcut object
 * @api public
 */
Advisor.prototype.getPointcut = function() {
	return this.pointcut;
}

/**
 * Advisor set advice function name.
 *
 * @param  {String} advice advice function name
 * @api public
 */
Advisor.prototype.setAdvice = function(advice) {
	this.advice = advice;
}

/**
 * Advisor get advice function name.
 *
 * @return  {String} advice function name
 * @api public
 */
Advisor.prototype.getAdvice = function() {
	return this.advice;
}

/**
 * Advisor set bean name.
 *
 * @param  {String} beanName bean name
 * @api public
 */
Advisor.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

/**
 * Advisor get bean name.
 *
 * @return  {String} bean name
 * @api public
 */
Advisor.prototype.getBeanName = function() {
	return this.beanName;
}

/**
 * Advisor set aspect bean.
 *
 * @param  {Object} bean aspect bean
 * @api public
 */
Advisor.prototype.setBean = function(bean) {
	this.bean = bean;
}

/**
 * Advisor get aspect bean.
 *
 * @return  {Object} aspect bean
 * @api public
 */
Advisor.prototype.getBean = function() {
	return this.bean;
}

/**
 * Advisor set advisor chain order.
 *
 * @param  {Number} order order number
 * @api public
 */
Advisor.prototype.setOrder = function(order) {
	this.order = order;
}

/**
 * Advisor get advisor chain order.
 *
 * @return  {Number} order number
 * @api public
 */
Advisor.prototype.getOrder = function() {
	return this.order;
}

/**
 * Advisor set if advisor is runtime.
 *
 * @param  {Boolean} runtime runtime true|false
 * @api public
 */
Advisor.prototype.setRuntime = function(runtime) {
	this.runtime = runtime;
}

/**
 * Advisor get if advisor is runtime.
 *
 * @return  {Boolean} runtime true|false
 * @api public
 */
Advisor.prototype.isRuntime = function() {
	return this.runtime;
}

/**
 * Advisor do parse pointcut,advice.
 *
 * @api public
 */
Advisor.prototype.parse = function() {
	this.pointcut.parse();
}

module.exports = Advisor;
},{"./pointcut":116}],110:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat Aspect
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

/**
 * Aspect constructor function.
 *
 * @api public
 */
var Aspect = function() {
	this.advisors = [];
	this.beanName = null;
	this.beanDefinition = null;
	this.bean = null;
}

/**
 * Aspect add advisor.
 *
 * @param  {Object} advisor advisor object
 * @api public
 */
Aspect.prototype.addAdvisor = function(advisor) {
	this.advisors.push(advisor);
}

/**
 * Aspect get advisors.
 *
 * @return  {Array} advisors
 * @api public
 */
Aspect.prototype.getAdvisors = function() {
	return this.advisors;
}

/**
 * Aspect set beanDefinition.
 *
 * @param  {Object} beanDefinition beanDefinition object
 * @api public
 */
Aspect.prototype.setBeanDefinition = function(beanDefinition) {
	this.beanDefinition = beanDefinition;
}

/**
 * Aspect get beanDefinition.
 *
 * @return  {Object} beanDefinition object
 * @api public
 */
Aspect.prototype.getBeanDefinition = function() {
	return this.beanDefinition;
}

/**
 * Aspect set beanName.
 *
 * @param  {String} beanName
 * @api public
 */
Aspect.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

/**
 * Aspect get beanName.
 *
 * @return  {String} beanName
 * @api public
 */
Aspect.prototype.getBeanName = function() {
	return this.beanName;
}

/**
 * Aspect set aspect bean.
 *
 * @param  {Object} bean aspect bean object
 * @api public
 */
Aspect.prototype.setBean = function(bean) {
	this.bean = bean;
}

/**
 * Aspect get aspect bean.
 *
 * @return  {Object} aspect bean object
 * @api public
 */
Aspect.prototype.getBean = function() {
	return this.bean;
}

module.exports = Aspect;
},{}],111:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat AutoProxyCreator
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var ProxyFactory = require('../framework/proxyFactory');
var TargetSource = require('../targetSource');
var AopUtil = require('../../util/aopUtil');
var Utils = require('../../util/utils');

/**
 * AutoProxyCreator constructor function.
 * it is a beanPostProcessor
 * @api public
 */
var AutoProxyCreator = function() {
	this.beanFactory = null;
}

/**
 * AutoProxyCreator beanPostProcessor before filter wrap bean if necessary.
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @return {Object} bean object
 * @api public
 */
AutoProxyCreator.prototype.before = function(beanObject, beanName) {
	return beanObject;
}

/**
 * AutoProxyCreator beanPostProcessor after filter wrap bean if necessary.
 * it may return target proxy object if necessary
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @return {Object} bean object
 * @api public
 */
AutoProxyCreator.prototype.after = function(beanObject, beanName) {
	return this.wrapIfNecessary(beanObject, beanName);
}

/**
 * AutoProxyCreator set beanFactory.
 *
 * @param  {Object} beanFactory beanFactory object
 * @api public
 */
AutoProxyCreator.prototype.setBeanFactory = function(beanFactory) {
	this.beanFactory = beanFactory;
}

/**
 * AutoProxyCreator get beanFactory.
 *
 * @return  {Object} beanFactory object
 * @api public
 */
AutoProxyCreator.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

/**
 * AutoProxyCreator wrap bean if necessary.
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
AutoProxyCreator.prototype.wrapIfNecessary = function(beanObject, beanName) {
	var beanDefinition = this.beanFactory.getBeanDefinition(beanName);
	// class do not need to be proxied
	if (!beanDefinition.needProxy()) {
		return beanObject;
	}

	// aspect beanObject do not need to proxy
	if (beanDefinition.isAspect()) {
		return beanObject;
	}

	var advisors = this.getAdvisorsForBean(beanObject, beanName);

	if (Utils.checkArray(advisors) && advisors.length) {
		var proxy = this.createProxy(beanObject, beanName, advisors, new TargetSource(beanName, beanObject));
		return proxy;
	}

	return beanObject;
}

/**
 * AutoProxyCreator create proxy object with specific advisors and targetSource.
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @param  {Array}  advisors advisors list
 * @param  {Object} targetSource targetSource object
 * @return {Object} bean proxy object
 * @api private
 */
AutoProxyCreator.prototype.createProxy = function(beanObject, beanName, advisors, targetSource) {
	var proxyFactory = new ProxyFactory();
	proxyFactory.setBeanFactory(this.getBeanFactory());
	proxyFactory.setTarget(targetSource);
	var methods = AopUtil.getMethodsFromObject(beanObject);
	proxyFactory.setInterfaces(methods);

	for (var i = 0; i < advisors.length; i++) {
		proxyFactory.addAdvisor(advisors[i]);
	}

	return proxyFactory.getProxy();
}

/**
 * AutoProxyCreator get advisors for bean.
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @return {Array}  advisors list
 * @api private
 */
AutoProxyCreator.prototype.getAdvisorsForBean = function(beanObject, beanName) {
	return this.findEligibleAdvisors(beanObject, beanName);
}

/**
 * AutoProxyCreator find eligible advisors.
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @return {Array}  advisors list
 * @api private
 */
AutoProxyCreator.prototype.findEligibleAdvisors = function(beanObject, beanName) {
	var candidateAdvisors = this.findCandidateAdvisors(beanObject, beanName);
	return this.findAdvisorsThatCanApply(beanObject, beanName, candidateAdvisors);
}

/**
 * AutoProxyCreator find all candidate advisors for bean.
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @return {Array}  advisors list
 * @api private
 */
AutoProxyCreator.prototype.findCandidateAdvisors = function(beanObject, beanName) {
	var aspects = this.beanFactory.getAspects();

	var candidateAdvisors = [];

	for (var i = 0; i < aspects.length; i++) {
		var aspect = aspects[i];
		var beanName = aspect.getBeanName();
		var aspectBean = this.beanFactory.getBean(beanName);
		aspect.setBean(aspectBean);
		var advisors = aspect.getAdvisors();
		for (var j = 0; j < advisors.length; j++) {
			var advisor = advisors[j];
			advisor.setBean(aspectBean);
			candidateAdvisors.push(advisor);
		}
	}

	return candidateAdvisors;
}

/**
 * AutoProxyCreator find all candidate advisors appliable for bean.
 *
 * @param  {Object} beanObject bean object
 * @param  {String} beanName
 * @param  {Array}  candidateAdvisors
 * @return {Array}  advisors list
 * @api private
 */
AutoProxyCreator.prototype.findAdvisorsThatCanApply = function(beanObject, beanName, candidateAdvisors) {
	var advisors = [];

	for (var i = 0; i < candidateAdvisors.length; i++) {
		var advisor = candidateAdvisors[i];
		if (this.canApply(advisor, beanObject, beanName)) {
			advisors.push(advisor);
		}
	}

	advisors = AopUtil.sortAdvisorsByOrder(advisors);

	return advisors;
}

/**
 * AutoProxyCreator check whether an advisor can be applied to the specific bean.
 *
 * @param  {Object}  advisor
 * @param  {Object}  beanObject
 * @param  {String}  beanName
 * @return {Boolean} true|false
 * @api private
 */
AutoProxyCreator.prototype.canApply = function(advisor, beanObject, beanName) {
	var methods = AopUtil.getMethodsFromObject(beanObject);

	var pointcut = advisor.getPointcut();

	for (var i = 0; i < methods.length; i++) {
		var targetMethod = beanName + '.' + methods[i];

		if (pointcut.match(targetMethod)) {
			return true;
		}
	}

	return false;
}

module.exports = AutoProxyCreator;
},{"../../util/aopUtil":142,"../../util/utils":151,"../framework/proxyFactory":115,"../targetSource":117}],112:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat AdvisedSupport
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */
var Utils = require('../../util/utils');

/**
 * AdvisedSupport constructor function.
 * @api public
 */
var AdvisedSupport = function() {
	this.advisors = [];
	this.interfaces = [];
	this.methodCache = {};
	this.beanFactory = null;
	this.targetSource = null;
	this.advisorChainFactory = null;
}

/**
 * set target.
 *
 * @param  {Object} target target object
 * @api public
 */
AdvisedSupport.prototype.setTarget = function(target) {
	this.setTargetSource(target);
}

/**
 * set target source.
 *
 * @param  {Object} targetSource object
 * @api public
 */
AdvisedSupport.prototype.setTargetSource = function(targetSource) {
	this.targetSource = targetSource;
}

/**
 * get target source.
 *
 * @return  {Object} targetSource object
 * @api public
 */
AdvisedSupport.prototype.getTargetSource = function() {
	return this.targetSource;
}

/**
 * set proxy interfaces.
 *
 * @param  {Array} interfaces proxy interfaces
 * @api public
 */
AdvisedSupport.prototype.setInterfaces = function(interfaces) {
	for (var i = 0; i < interfaces.length; i++) {
		this.addInterface(interfaces[i]);
	}
}

/**
 * add proxy interface.
 *
 * @param  {String} interface proxy interface
 * @api public
 */
AdvisedSupport.prototype.addInterface = function(interface) {
	this.interfaces.push(interface);
}

/**
 * get proxy interfaces.
 *
 * @return  {Array} proxy interfaces
 * @api public
 */
AdvisedSupport.prototype.getInterfaces = function() {
	return this.interfaces;
}

/**
 * get advisors.
 *
 * @return  {Array} advisors
 * @api public
 */
AdvisedSupport.prototype.getAdvisors = function() {
	return this.advisors;
}

/**
 * add advisor.
 *
 * @param  {Object} advisor
 * @api public
 */
AdvisedSupport.prototype.addAdvisor = function(advisor) {
	this.advisors.push(advisor);
}

/**
 * get beanFactory.
 *
 * @return  {Object} beanFactory object
 * @api public
 */
AdvisedSupport.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

/**
 * set beanFactory.
 *
 * @param  {Object} beanFactory beanFactory object
 * @api public
 */
AdvisedSupport.prototype.setBeanFactory = function(beanFactory) {
	this.beanFactory = beanFactory;
}

/**
 * get interception advisors for bean.
 *
 * @param   {String} method
 * @param   {String} beanName
 * @param   {String} adviceType
 * @return  {Object} interception advisors
 * @api public
 */
AdvisedSupport.prototype.getInterceptionAdvice = function(method, beanName, adviceType) {
	var cacheKey = method + "_" + adviceType;
	var cached = this.methodCache[cacheKey];

	if (!cached) {
		cached = this.doGetInterceptionAdvice(method, beanName, adviceType);
		this.methodCache[cacheKey] = cached;
	}

	return cached;
}

/**
 * do get interception advisors for bean.
 *
 * @param   {String} method
 * @param   {String} beanName
 * @param   {String} adviceType
 * @return  {Object} interception advisors
 * @api private
 */
AdvisedSupport.prototype.doGetInterceptionAdvice = function(method, beanName, adviceType) {
	var interceptorList = [];
	var advisors = this.getAdvisors();
	var targetMethod = beanName + '.' + method;

	for (var i = 0; i < advisors.length; i++) {
		var advisor = advisors[i];
		var pointcut = advisor.getPointcut();
		if (pointcut.getAdviceType() !== adviceType) {
			continue;
		}

		if (pointcut.match(targetMethod)) {
			interceptorList.push(advisor);
		}
	}

	interceptorList.sort(Utils.compareByOrder);

	return interceptorList;
}

module.exports = AdvisedSupport;
},{"../../util/utils":151}],113:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat DynamicAopProxy
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'DynamicAopProxy');
var Constant = require('../../util/constant');
var Utils = require('../../util/utils');

/**
 * DynamicAopProxy constructor function.
 *
 * @param  {Object} advised advisedSupport object
 * @api public
 */
var DynamicAopProxy = function(advised) {
	this.advised = advised;
	this.dyInit();
}

/**
 * DynamicAopProxy init function.
 * it will add proxy interfaces to DynamicAopProxy prototype, and proxy to invoke function
 *
 * @api public
 */
DynamicAopProxy.prototype.dyInit = function() {
	if (!this.advised) {
		logger.error('DynamicAopProxy init error no advised');
		return;
	}

	var interfaces = this.advised.getInterfaces();
	var self = this;
	for (var i = 0; i < interfaces.length; i++) {
		(function(interface) {
			if (checkFuncName(interface)) {
				logger.error('init error proxy method interface %j the same as DynamicAopProxy, rename this name to another.', interface)
				return;
			};

			self[interface] = function() {
				arguments = Array.prototype.slice.apply(arguments);
				return self.dyInvoke(interface, arguments);
			}
		})(interfaces[i]);
	}
}

/**
 * DynamicAopProxy proxy invoke function.
 * all target proxy function invoke will delegate to this function
 *
 * @param  {String} method proxy method name
 * @param  {Array}  args proxy method invoke arguments
 *
 * @api private
 */
DynamicAopProxy.prototype.dyInvoke = function(method, args) {
	var self = this;
	var invokeCb = args.pop();
	var flag = false;
	if (!Utils.checkFunction(invokeCb)) {
		// aop target args last must be next function
		// if (invokeCb) {
		args.push(invokeCb);
		// }
		invokeCb = function() {};
		flag = true;
	}

	var targetSource = this.advised.getTargetSource();
	var beanName = targetSource.getBeanName();
	var target = targetSource.getTarget();

	var adviseType = Constant.AOP_ADVICE_BEFORE;
	var beforeAdvisors = this.advised.getInterceptionAdvice(method, beanName, adviseType);

	adviseType = Constant.AOP_ADVICE_AROUND;
	var aroundAdvisors = this.advised.getInterceptionAdvice(method, beanName, adviseType);

	var needAround = false;
	if (Utils.checkArray(aroundAdvisors) && aroundAdvisors.length) {
		needAround = true;
	}

	adviseType = Constant.AOP_ADVICE_AFTER;
	var afterAdvisors = this.advised.getInterceptionAdvice(method, beanName, adviseType);

	var needAfter = false;
	if (Utils.checkArray(afterAdvisors) && afterAdvisors.length) {
		needAfter = true;
	}

	return this.doInvokeAdvisorsBefore(method, args, beforeAdvisors, function(err) {
		if (err) {
			return invokeCb(err);
		}

		if (needAround) {
			self.doInvokeAdvisorsAround(target, method, args, aroundAdvisors, function() {
				arguments = Array.prototype.slice.apply(arguments);
				invokeCb.apply(null, arguments);
				self.doInvokeAdvisorsAfter(method, arguments, afterAdvisors, function() {});
			});
		} else {
			var next = function() {
				arguments = Array.prototype.slice.apply(arguments);
				invokeCb.apply(null, arguments);
				self.doInvokeAdvisorsAfter(method, arguments, afterAdvisors, function() {});
			}

			if (!flag) {
				args.push(next);
				return target[method].apply(target, args);
			} else {
				var r = target[method].apply(target, args);
				if (needAfter) {
					self.doInvokeAdvisorsAfter(method, r, afterAdvisors, function() {});
				}

				return r;
			}
		}
	});
}

/**
 * DynamicAopProxy do invoke before advisors chain.
 *
 * @param  {String}   method proxy method name
 * @param  {Array}    args proxy method invoke arguments
 * @param  {Object}   advisors target advisors
 * @param  {Function} cb callback function
 *
 * @api private
 */
DynamicAopProxy.prototype.doInvokeAdvisorsBefore = function(method, args, advisors, cb) {
	var index = 0;

	args = Array.prototype.slice.apply(args);

	if (!advisors || !Utils.checkArray(advisors) || !advisors.length) {
		return cb();
	}

	var next = function(err) {
		if (err || index >= advisors.length) {
			return cb(err);
		}

		var advisor = advisors[index++];
		var advise = advisor.getAdvice();
		var aspectBean = advisor.getBean();

		var _next = function(err) {
			next(err);
		};

		if (advisor.isRuntime()) {
			args.push(_next);
			aspectBean[advise].apply(aspectBean, args);
		} else {
			aspectBean[advise](_next);
		}
	}

	next();
}

/**
 * DynamicAopProxy do invoke around advisors chain.
 *
 * @param  {Object}   target target object
 * @param  {String}   method proxy method name
 * @param  {Array}    args proxy method invoke arguments
 * @param  {Object}   advisors target advisors
 * @param  {Function} cb callback function
 *
 * @api private
 */
DynamicAopProxy.prototype.doInvokeAdvisorsAround = function(target, method, args, advisors, cb) {
	var advisor = advisors[0];
	var advise = advisor.getAdvice();
	var aspectBean = advisor.getBean();

	// if (Utils.checkObject(args)) {
	// 	args = Array.prototype.slice.apply(args);
	// }

	if (advisor.isRuntime()) {
		args.unshift(method);
		args.unshift(target);
		args.push(cb);
		aspectBean[advise].apply(aspectBean, args);
	} else {
		aspectBean[advise](target, method, cb);
	}
}

/**
 * DynamicAopProxy do invoke after advisors chain.
 *
 * @param  {String}   method proxy method name
 * @param  {Array}    args proxy method invoke arguments
 * @param  {Object}   advisors target advisors
 * @param  {Function} cb callback function
 *
 * @api private
 */
DynamicAopProxy.prototype.doInvokeAdvisorsAfter = function(method, args, advisors, cb) {
	var index = 0;

	if (!advisors || !Utils.checkArray(advisors) || !advisors.length) {
		return cb();
	}

	// if (Utils.checkObject(args)) {
	// 	args = Array.prototype.slice.apply(args);
	// } else 
	if (!Utils.checkArray(args)) {
		args = [args];
	}

	var next = function(err) {
		if (err || index >= advisors.length) {
			return cb(err);
		}

		var advisor = advisors[index++];
		var advise = advisor.getAdvice();
		var aspectBean = advisor.getBean();

		var _next = function(err) {
			next(err);
		};

		args.push(_next);
		aspectBean[advise].apply(aspectBean, args);
	}

	next();
}

var names = ["dyInit", "dyInvoke", "doInvokeAdvisorsBefore",
	"doInvokeAdvisorsAround", "doInvokeAdvisorsAfter"
];

var checkFuncName = function(name) {
	for (var i = 0; i < names.length; i++) {
		if (name === names[i]) {
			return true;
		}
	}

	return false;
}

module.exports = DynamicAopProxy;
},{"../../util/constant":144,"../../util/utils":151,"pomelo-logger":169}],114:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat DynamicMetaProxy
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'DynamicMetaProxy');
var Utils = require('../../util/utils');

/**
 * DynamicMetaProxy constructor function.
 * this proxy will be used in bearcat.getBeanByMeta()
 * getBeanByMeta will first return a dynamicMetaProxy,
 * when target bean invoked, it will call getBean to get the target object
 *
 * @api public
 */
var DynamicMetaProxy = function() {
	this.args = null;
	this.target = null;
	this.beanFactory = null;
	this.beanDefinition = null;
}

/**
 * DynamicMetaProxy init function.
 *
 * @api public
 */
DynamicMetaProxy.prototype._dyInit = function() {
	var beanDefinition = this.beanDefinition;
	if (!beanDefinition) {
		logger.error('init error no beanDefinition.');
		return;
	}

	var self = this;

	var func = beanDefinition.getFunc();

	if (Utils.checkFunction(func)) {
		var proto = func.prototype;
		for (interface in proto) {
			if (Utils.checkFunction(proto[interface])) {
				(function(method) {
					if (checkFuncName(method)) {
						logger.error('init error proxy method interface %j the same as DynamicMetaProxy, rename this name to another.', method)
						return;
					};

					self[method] = function() {
						return self._dyInvoke(method, arguments);
					};
				})(interface);
			}
		}
	}
}

/**
 * DynamicMetaProxy proxy invoke function.
 *
 * @param  {String} method proxy method name
 * @param  {Array}  args target invoke arguments
 * @api private
 */
DynamicMetaProxy.prototype._dyInvoke = function(method, args) {
	var targetBean = this._getBean();
	if (Utils.checkFunction(targetBean[method])) {
		return targetBean[method].apply(targetBean, args);
	} else {
		logger.error('invoke error no such method %s in the target bean', method);
	}
}

/**
 * DynamicMetaProxy get target bean through beanFactory.
 *
 * @return  {Object}  target bean
 * @api public
 */
DynamicMetaProxy.prototype._getBean = function() {
	var args = this.args;

	var beanFactory = this.beanFactory;
	if (!this.target) {
		this.target = beanFactory.getBean.apply(beanFactory, args);
	}

	return this.target;
}

var names = ["_dyInit", "_dyInvoke", "_getBean"];

var checkFuncName = function(name) {
	for (var i = 0; i < names.length; i++) {
		if (name === names[i]) {
			return true;
		}
	}

	return false;
}

module.exports = DynamicMetaProxy;
},{"../../util/utils":151,"pomelo-logger":169}],115:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat DynamicAopProxy
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var RequireUtil = require('../../util/requireUtil');
var DynamicAopProxy = require('./dynamicAopProxy');
var AdvisedSupport = require('./advisedSupport');
var Utils = require('../../util/utils');
var Util = RequireUtil.requireUtil();

/**
 * ProxyFactory constructor function.
 *
 * @param  {Object} target target object
 * @param  {Array}  interfaces proxy interfaces
 * @api public
 */
var ProxyFactory = function(target, interfaces) {
	this.beanFactory = null;
	AdvisedSupport.call(this);

	if (target) {
		this.setTarget(target);
	}

	if (Utils.checkArray(interfaces)) {
		this.setInterfaces(interfaces);
	}
}

Util.inherits(ProxyFactory, AdvisedSupport);

/**
 * ProxyFactory get dynamic proxy.
 *
 * @return  {Object} dynamic proxy object
 * @api public
 */
ProxyFactory.prototype.getProxy = function() {
	var beanFactory = this.getBeanFactory();
	var proxyObject = new DynamicAopProxy(this);
	return proxyObject;
}

module.exports = ProxyFactory;
},{"../../util/requireUtil":149,"../../util/utils":151,"./advisedSupport":112,"./dynamicAopProxy":113}],116:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat Pointcut
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Utils = require('../util/utils');

/**
 * Pointcut constructor function.
 *
 * @api public
 */
var Pointcut = function() {
	this.expression = null;
	this.adviceType = null;
	this.targetExpression = null;
}

/**
 * Pointcut set expression.
 *
 * @param  {String} expression pointcut expression
 * @api public
 */
Pointcut.prototype.setExpression = function(expression) {
	this.expression = expression;
}

/**
 * Pointcut get expression.
 *
 * @param  {String} pointcut expression
 * @api public
 */
Pointcut.prototype.getExpression = function() {
	return this.expression;
}

/**
 * Pointcut set adviceType: before, after, around.
 *
 * @param  {String} adviceType
 * @api public
 */
Pointcut.prototype.setAdviceType = function(adviceType) {
	this.adviceType = adviceType;
}

/**
 * Pointcut get adviceType: before, after, around.
 *
 * @param  {String} adviceType
 * @api public
 */
Pointcut.prototype.getAdviceType = function() {
	return this.adviceType;
}

/**
 * Pointcut set target pointcut expression.
 *
 * @param  {String} target pointcut expression
 * @api public
 */
Pointcut.prototype.setTargetExpression = function(targetExpression) {
	this.targetExpression = new RegExp(targetExpression);
}

/**
 * Pointcut get target pointcut expression.
 *
 * @return  {String} target pointcut expression
 * @api public
 */
Pointcut.prototype.getTargetExpression = function() {
	return this.targetExpression;
}

/**
 * Pointcut parse pointcut expression.
 *
 * @api public
 */
Pointcut.prototype.parse = function() {
	var expression = this.getExpression();
	if (!expression) {
		return;
	}

	var r = expression.split(':');
	if (Utils.checkArray(r) && r.length === 2) {
		this.setAdviceType(r[0]);
		this.setTargetExpression(r[1]);
	}
}

/**
 * Pointcut check whether pointcut match targetMethod.
 *
 * @param  {String} targetMethod target method name
 * @api public
 */
Pointcut.prototype.match = function(targetMethod) {
	var targetExpression = this.getTargetExpression();

	return targetMethod.match(targetExpression);
}

module.exports = Pointcut;
},{"../util/utils":151}],117:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat TargetSource
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

/**
 * TargetSource constructor function.
 *
 * @param  {String} beanName
 * @param  {Object} target target object
 * @api public
 */
var TargetSource = function(beanName, target) {
	this.beanName = beanName;
	this.target = target;
}

/**
 * TargetSource set beanName.
 *
 * @param  {String} beanName
 * @api public
 */
TargetSource.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

/**
 * TargetSource get beanName.
 *
 * @return  {String} beanName
 * @api public
 */
TargetSource.prototype.getBeanName = function() {
	return this.beanName;
}

/**
 * TargetSource set target.
 *
 * @param  {Object} target target object
 * @api public
 */
TargetSource.prototype.setTarget = function(target) {
	this.target = target;
}

/**
 * TargetSource get target.
 *
 * @return  {Object} target object
 * @api public
 */
TargetSource.prototype.getTarget = function() {
	return this.target;
}

TargetSource.prototype.releaseTarget = function() {

}

module.exports = TargetSource;
},{}],118:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanFactory
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'BeanFactory');
var DynamicMetaProxy = require('../aop/framework/dynamicMetaProxy');
var SingletonBeanFactory = require('./singletonBeanFactory');
var ModelConstraint = require('../model/modelConstraint');
var ModelDefinition = require('../model/modelDefinition');
var BeanDefinition = require('./support/beanDefinition');
var ValidatorUtil = require('../util/validatorUtil');
var ModelFilter = require('../model/modelFilter');
var ModelProxy = require('../model/modelProxy');
var ModelUtil = require('../util/modelUtil');
var Constant = require('../util/constant');
var BeanUtil = require('../util/beanUtil');
var AopUtil = require('../util/aopUtil');
var Aspect = require('../aop/aspect');
var Utils = require('../util/utils');

/**
 * BeanFactory constructor function.
 *
 * @api public
 */
var BeanFactory = function() {
	this.aspects = [];
	this.modelMap = {};
	this.initCbMap = {};
	this.beanCurMap = {};
	this.constraints = {};
	this.tableModelMap = {};
	this.beanFunctions = {};
	this.beanDefinitions = {};
	this.beanPostProcessors = [];
	this.singletonBeanFactory = new SingletonBeanFactory(this);
}

/**
 * BeanFactory get bean instance through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api public
 */
BeanFactory.prototype.getBean = function(beanName) {
	if (this.beanCurMap[beanName]) {
		logger.error("circle reference beanName " + beanName + " is in creating");
		return;
	}

	this.beanCurMap[beanName] = true;
	var beanObject = this.doGetBean.apply(this, arguments);
	delete this.beanCurMap[beanName];

	return beanObject;
}

/**
 * BeanFactory get bean proxy through BeanFactory IoC container for lazy init bean.
 * when invoke bean proxy, proxy will invoke getBean to get the target bean
 *
 * @param  {String} beanName
 * @return {Object} bean proxy object
 * @api public
 */
BeanFactory.prototype.getBeanProxy = function(beanName) {
	return this.doGetBeanProxy.apply(this, arguments);
}

/**
 * BeanFactory get model through BeanFactory IoC container.
 *
 * @param  {String} modelId
 * @return {Object} model proxy object
 * @api public
 */
BeanFactory.prototype.getModelProxy = function(modelId) {
	return this.doGetModelProxy(modelId);
}

/**
 * BeanFactory get constraint through BeanFactory IoC container.
 *
 * @param  {String} cid
 * @return {Object} constraint bean object
 * @api public
 */
BeanFactory.prototype.getConstraint = function(cid) {
	return this.doGetConstraint(cid);
}

/**
 * BeanFactory do get bean instance through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
BeanFactory.prototype.doGetBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	if (!beanDefinition) {
		logger.error('BeanFactory beanDefinition null for %j', beanName);
		return null;
	}

	if (beanDefinition.isAbstract()) {
		logger.warn('abstract bean can not get bean instance, you can use bearcat.getFunction to get constructor function of the bean');
		return this.getBeanFunction(beanName);
	}

	if (beanDefinition.hasParentBean()) {
		beanDefinition = this.setParentBean(beanName);
	}

	// if (beanDefinition.isLazyInit()) {
	// 	return this.getBeanProxy.apply(this, arguments);
	// }

	if (beanDefinition.isSingleton()) {
		return this.singletonBeanFactory.getSingleton.apply(this.singletonBeanFactory, arguments);
	} else if (beanDefinition.isPrototype()) {

		return this.createBean.apply(this, arguments);
	}
}

/**
 * BeanFactory do get bean proxy through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean proxy object
 * @api private
 */
BeanFactory.prototype.doGetBeanProxy = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	if (!beanDefinition) {
		logger.error('BeanFactory beanDefinition null for %j', beanName);
		return null;
	}

	var dynamicMetaProxy = new DynamicMetaProxy();
	dynamicMetaProxy['beanDefinition'] = beanDefinition;
	dynamicMetaProxy['beanFactory'] = this;
	dynamicMetaProxy['args'] = arguments;
	dynamicMetaProxy._dyInit();

	return dynamicMetaProxy;
}

/**
 * BeanFactory do get model through BeanFactory IoC container.
 *
 * @param  {String} modelId
 * @return {Object} model proxy
 * @api private
 */
BeanFactory.prototype.doGetModelProxy = function(modelId) {
	var modelDefinition = this.getModelDefinition(modelId);

	if (!modelDefinition) {
		logger.error('BeanFactory modelDefinition null for %j', modelId);
		return null;
	}

	var beanName = modelDefinition.getId();
	var beanDefinition = this.getBeanDefinition(beanName);

	if (!beanDefinition) {
		logger.error('BeanFactory beanDefinition null for %j', modelId);
		return null;
	}

	var modelFilter = new ModelFilter();
	modelFilter.setModelDefinition(modelDefinition);

	var modelProxy = new ModelProxy();
	var modelBean = this.getBean(beanName);
	var modelFields = modelDefinition.getFields();

	for (var key in modelFields) {
		var modelField = modelFields[key];
		var modelDefault = modelField.getDefault();
		var modelFieldType = modelField.getType();
		if (Utils.isNotNull(modelDefault)) {
			if (modelFieldType === Constant.TYPE_NUMBER) {
				modelDefault = parseInt(modelDefault);
			}
			modelBean[key] = modelDefault;
		}
	}

	modelFilter.setModel(modelBean);
	modelProxy['model'] = modelBean;
	modelProxy['beanFactory'] = this;
	modelProxy['modelFilter'] = modelFilter;
	modelProxy['beanDefinition'] = beanDefinition;
	modelProxy['modelDefinition'] = modelDefinition;

	modelProxy._modelInit();

	return modelProxy;
}

/**
 * BeanFactory do get constraint through BeanFactory IoC container.
 *
 * @param  {String} cid
 * @return {Object} constraint bean object
 * @api private
 */
BeanFactory.prototype.doGetConstraint = function(cid) {
	var constraintDefinition = this.getConstraintDefinition(cid);

	if (!constraintDefinition) {
		logger.error('BeanFactory constraintDefinition null for %j', cid);
		return null;
	}

	var beanName = constraintDefinition.getId();
	return this.getBean(beanName);
}

/**
 * BeanFactory create bean instance through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
BeanFactory.prototype.createBean = function(beanName) {
	var beanObject = this.doCreateBean.apply(this, arguments);
	beanObject = this.initBean(beanObject, beanName, this.getInitCb(beanName));

	return beanObject;
}

/**
 * BeanFactory do create bean instance through BeanFactory IoC container.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
BeanFactory.prototype.doCreateBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	if (!beanDefinition) {
		return null;
	}

	if (beanDefinition.hasFactoryBean()) {
		return this.getBeanFromFactoryBean.apply(this, arguments);
	}

	var argsOn = beanDefinition.getArgsOn();
	var propsOn = beanDefinition.getPropsOn();
	var func = this.getBeanFunction(beanName);
	if (!func) {
		return null;
	}

	var dependsBeans = this.getDependsBeanValues(argsOn, arguments);
	var dependsApplyArgs = this.getDependsApplyArgs(dependsBeans);

	var beanObject = Object.create(func.prototype);

	func.apply(beanObject, dependsApplyArgs);

	dependsBeans = this.getDependsBeanValues(propsOn);
	if (Utils.checkArray(dependsBeans)) {
		for (var i = 0; i < dependsBeans.length; i++) {
			var wbean = dependsBeans[i];
			var name = wbean.getName();
			if (wbean.getDependType() === Constant.DEPEND_TYPE_BEAN) {
				beanObject[name] = wbean.getBean();
			} else if (wbean.getDependType() === Constant.DEPEND_TYPE_VALUE) {
				beanObject[name] = wbean.getValue();
			}
			// no this case
			// else if (wbean.getDependType() === Constant.DEPEND_TYPE_VAR) {
			// beanObject[name] = wbean.getValueOnce();
			// } 
			else {
				// Constant.DEPEND_TYPE_ERROR
			}
		}
	}

	return beanObject;
}

/**
 * BeanFactory init bean with init method.
 *
 * @param  {Object}   beanObject
 * @param  {String}   beanName
 * @param  {Function} cb async init callback function
 * @api private
 */
BeanFactory.prototype.initBean = function(beanObject, beanName, cb) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return;
	}

	beanObject = this.applyBeanPostProcessorsBeforeInitialization(beanObject, beanName);

	this.invokeInitMethods(beanObject, beanName, cb);

	beanObject = this.applyBeanPostProcessorsAfterInitialization(beanObject, beanName);

	return beanObject;
}

/**
 * BeanFactory invoke init method.
 *
 * @param  {Object}   beanObject
 * @param  {String}   beanName
 * @param  {Function} cb async init callback function
 * @api private
 */
BeanFactory.prototype.invokeInitMethods = function(beanObject, beanName, cb) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return;
	}

	if (beanDefinition.hasInitMethod()) {
		var initMethodName = beanDefinition.getInitMethodName();

		// run init method
		var initMethod = beanObject[initMethodName];
		if (Utils.checkFunction(initMethod)) {
			initMethod.call(beanObject, cb);
		}
	}
}

/**
 * BeanFactory get bean instance from factoryBean's factory method.
 *
 * @param  {String} beanName
 * @return {Object} bean object
 * @api private
 */
BeanFactory.prototype.getBeanFromFactoryBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);

	var factoryBeanName = beanDefinition.getFactoryBeanName();
	var factoryMethodName = beanDefinition.getFactoryMethodName();
	var factoryArgsOn = beanDefinition.getFactoryArgsOn();

	var factoryBean = this.getBean(factoryBeanName);

	if (!factoryBean) {
		return null;
	}

	var factoryMethod = factoryBean[factoryMethodName];

	var dependsBeans = this.getDependsBeanValues(factoryArgsOn, arguments);

	var dependsApplyArgs = this.getDependsApplyArgs(dependsBeans);

	var beanObject = factoryMethod.apply(factoryBean, dependsApplyArgs);

	return beanObject;
}

/**
 * BeanFactory get denpended beans or values.
 *
 * @param  {Array} dependsOn
 * @param  {Array} args arguments
 * @return {Array} depended bean value list
 * @api private
 */
BeanFactory.prototype.getDependsBeanValues = function(dependsOn, args) {
	var r = [];
	if (!Utils.checkArray(dependsOn)) {
		return r;
	}

	var s = 1;
	for (var i = 0; i < dependsOn.length; i++) {
		var wbean = dependsOn[i];
		var beanName = wbean.getRef();

		if (wbean.getDependType() === Constant.DEPEND_TYPE_BEAN) {
			var bean = this.getBean(beanName);
			if (bean) {
				wbean.setBean(bean);
			}
		}

		if (wbean.getDependType() === Constant.DEPEND_TYPE_VAR) {
			var value = args[s++];
			wbean.setValue(value);
		}

		r.push(wbean);
	}

	return r;
}

/**
 * BeanFactory get depended apply arguments.
 *
 * @param  {Array} dependsOn
 * @return {Array} depended bean apply list
 * @api private
 */
BeanFactory.prototype.getDependsApplyArgs = function(dependsOn) {
	var r = [];

	if (!Utils.checkArray(dependsOn)) {
		return r;
	}

	for (var i = 0; i < dependsOn.length; i++) {
		var wbean = dependsOn[i];
		if (wbean.getDependType() === Constant.DEPEND_TYPE_BEAN) {
			r.push(wbean.getBean());
		} else if (wbean.getDependType() === Constant.DEPEND_TYPE_VALUE) {
			r.push(wbean.getValue());
		} else if (wbean.getDependType() === Constant.DEPEND_TYPE_VAR) {
			r.push(wbean.getValueOnce());
		} else {
			// DEPEND_TYPE_ERROR
			logger.error("getDependsApplyArgs depends args type error %j", wbean);
		}
	}

	return r;
}

/**
 * BeanFactory set parent bean.
 *
 * @param  {String} beanName
 * @return {Object} beanDefinition
 * @api public
 */
BeanFactory.prototype.setParentBean = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return null;
	}

	var parentName = beanDefinition.getParentName();
	var parentBeanDefintion = this.getBeanDefinition(parentName);

	var func = this.getBeanFunction(beanName);

	var parentFunc = this.getBeanFunction(parentName);

	if (parentFunc) {
		var proto = parentFunc.prototype;
		for (var key in proto) {
			if (!func.prototype[key]) {
				func.prototype[key] = proto[key];
			}
		}
	}

	if (parentBeanDefintion) {
		beanDefinition.setParentBean(parentBeanDefintion);
		beanDefinition.setArgsOn(parentBeanDefintion.getArgs());
		beanDefinition.setPropsOn(parentBeanDefintion.getProps());
		beanDefinition.setFactoryArgsOn(parentBeanDefintion.getFactoryArgs());
	}

	return beanDefinition;
}

/**
 * BeanFactory register beans through metaObjects into BeanFactory.
 *
 * @param  {Object} metaObjects
 * @api public
 */
BeanFactory.prototype.registerBeans = function(metaObjects) {
	for (var beanName in metaObjects) {
		this.registerBean(beanName, metaObjects[beanName]);
	}
}

/**
 * BeanFactory register bean through metaObject into BeanFactory.
 *
 * @param  {String} beanName
 * @param  {Object} metaObjects
 * @api public
 */
BeanFactory.prototype.registerBean = function(beanName, metaObject) {
	var func = metaObject.func;

	var validateResult = ValidatorUtil.metaValidator(metaObject);
	if (validateResult !== true) {
		logger.error("registryBean %j metaObject %j validate error %s", beanName, metaObject, validateResult.stack);
		return;
	}

	var mid = metaObject.mid;
	if (mid) {
		// register bearcat model
		this.registerModel(beanName, mid, metaObject);
	}

	var cid = metaObject.cid;
	if (cid) {
		// register bearcat constraint
		this.registerConstraint(beanName, cid, metaObject);
	}

	if (func && Utils.checkFunction(func) && !this.getBeanFunction(beanName)) {
		this.setBeanFunction(beanName, func);
	}

	var order = metaObject.order;
	var parentName = metaObject.parent;
	var initMethodName = metaObject.init;
	var destroyMethodName = metaObject.destroy;
	var factoryBeanName = metaObject.factoryBean;
	var factoryMethodName = metaObject.factoryMethod;
	var scope = metaObject.scope || Constant.SCOPE_DEFAULT;
	var args = metaObject.args || Constant.ARGS_DEFAULT;
	var props = metaObject.props || Constant.PROPS_DEFAULT;
	var factoryArgsOn = metaObject.factoryArgs || Constant.ARGS_DEFAULT;
	var asyncInit = metaObject.async || Constant.ASYNC_INIT_DEFAULT;
	var lazyInit = metaObject.lazy || Constant.LAZY_INIT_DEFAULT;
	var abstract = metaObject.abstract || Constant.ABSTRACT_DEFAULT;
	var proxy = metaObject.proxy;
	if (!Utils.isNotNull(proxy)) {
		proxy = Constant.PROXY_DEFAULT;
	}

	var aop = metaObject.aop;

	var beanDefinition = null;
	beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		beanDefinition = new BeanDefinition();
	}

	// model scope should be prototype
	if (mid) {
		scope = Constant.SCOPE_PROTOTYPE;
	}

	beanDefinition.setFunc(func);
	beanDefinition.setOrder(order);
	beanDefinition.setScope(scope);
	beanDefinition.setProxy(proxy);
	beanDefinition.setBeanName(beanName);
	beanDefinition.setLazyInit(lazyInit);
	beanDefinition.setAbstract(abstract);
	beanDefinition.setAsyncInit(asyncInit);
	beanDefinition.setParentName(parentName);
	beanDefinition.setInitMethodName(initMethodName);
	beanDefinition.setFactoryBeanName(factoryBeanName);
	beanDefinition.setFactoryMethodName(factoryMethodName);
	beanDefinition.setDestroyMethodName(destroyMethodName);
	beanDefinition.setArgsOn(BeanUtil.buildBeanWrapper(args));
	beanDefinition.setPropsOn(BeanUtil.buildBeanWrapper(props));
	beanDefinition.setFactoryArgsOn(BeanUtil.buildBeanWrapper(factoryArgsOn));

	if (aop && Utils.checkArray(aop)) {
		var aspect = AopUtil.buildAspect(aop, beanDefinition);
		this.aspects.push(aspect);
		beanDefinition.setAspect(true);
	}

	this.beanDefinitions[beanName] = beanDefinition;
}

/**
 * BeanFactory register model through metaObject into BeanFactory.
 *
 * @param  {String} beanName bean id
 * @param  {String} modelId  model id
 * @param  {Object} metaObject
 * @api public
 */
BeanFactory.prototype.registerModel = function(beanName, modelId, metaObject) {
	var modelDefinition = null;
	modelDefinition = this.getModelDefinition(modelId);
	if (!modelDefinition) {
		modelDefinition = new ModelDefinition();
	}

	var table = metaObject.table;
	var prefix = metaObject.prefix;
	var attributes = metaObject.attributes;

	var resolvedAttributes = ModelUtil.buildModelAttribute(attributes, this);

	modelDefinition.setId(beanName);
	modelDefinition.setMid(modelId);
	modelDefinition.setTable(table);
	modelDefinition.setPrefix(prefix);
	modelDefinition.setFields(resolvedAttributes['fields']);
	modelDefinition.setBalance(resolvedAttributes['balance']);
	modelDefinition.setRefFields(resolvedAttributes['refFields']);
	modelDefinition.setOneToMany(resolvedAttributes['oneToMany']);

	if (Utils.isNotNull(table)) {
		this.setTableModelMap(table, modelDefinition);
	}

	this.modelMap[modelId] = modelDefinition;
}

/**
 * BeanFactory register constraint through metaObject into BeanFactory.
 *
 * @param  {String} beanName bean id
 * @param  {String} cid      constraint id
 * @param  {Object} metaObject
 * @api public
 */
BeanFactory.prototype.registerConstraint = function(beanName, cid, metaObject) {
	var constraintDefinition = null;
	constraintDefinition = this.getConstraintDefinition(cid);
	if (!constraintDefinition) {
		constraintDefinition = new ModelConstraint();
	}

	var message = metaObject.message;
	var constraint = metaObject.constraint;

	constraintDefinition.setId(beanName);
	constraintDefinition.setCid(cid);
	constraintDefinition.setConstraint(constraint);

	this.constraints[cid] = constraintDefinition;
}

/**
 * BeanFactory instantiating singletion beans in advance.
 *
 * @param  {Function} cb callback function
 * @api public
 */
BeanFactory.prototype.preInstantiateSingletons = function(cb) {
	var beanDefinitionOrderList = BeanUtil.sortBeanDefinitions(this.beanDefinitions, this);
	var self = this;

	var index = 0;
	var next = function(err) {
		if (err || index >= beanDefinitionOrderList.length) {
			return cb(err);
		}

		var beanDefinition = beanDefinitionOrderList[index++];
		var beanName = beanDefinition.getBeanName();

		if (beanDefinition.isAsyncInit()) {
			if (!self.singletonBeanFactory.containsSingleton(beanName)) {
				var initCb = function() {
					next();
				}
				self.setInitCb(beanName, initCb);
				self.getBean(beanName);
			} else {
				self.getBean(beanName);
				next()
			}
		} else {
			var initCb = function() {}
			self.setInitCb(beanName, initCb);
			self.getBean(beanName);
			next();
		}
	}

	next();
}

/**
 * BeanFactory add beanPostProcessor to BeanFactory.
 * @param  {Object} beanPostProcessor
 * @api public
 */
BeanFactory.prototype.addBeanPostProcessor = function(beanPostProcessor) {
	this.beanPostProcessors.push(beanPostProcessor);
}

/**
 * BeanFactory get beanPostProcessors.
 * @return {Object} beanPostProcessors
 * @api public
 */
BeanFactory.prototype.getBeanPostProcessors = function() {
	return this.beanPostProcessors;
}

/**
 * BeanFactory apply beanPostBeforeProcessors.
 * @param  {Object} beanObject
 * @param  {String} beanName
 * @return {Object} beanObject
 * @api private
 */
BeanFactory.prototype.applyBeanPostProcessorsBeforeInitialization = function(beanObject, beanName) {
	var result = beanObject;

	var beanPostProcessors = this.getBeanPostProcessors();
	for (var i = 0; i < beanPostProcessors.length; i++) {
		var beanProcessor = beanPostProcessors[i];
		result = beanProcessor.before(result, beanName);
		if (!result) {
			return result;
		}
	}

	return result;
}

/**
 * BeanFactory apply beanPostAfterProcessors.
 * @param  {Object} beanObject
 * @param  {String} beanName
 * @return {Object} beanObject
 * @api private
 */
BeanFactory.prototype.applyBeanPostProcessorsAfterInitialization = function(beanObject, beanName) {
	var result = beanObject;

	var beanPostProcessors = this.getBeanPostProcessors();
	for (var i = 0; i < beanPostProcessors.length; i++) {
		var beanProcessor = beanPostProcessors[i];
		result = beanProcessor.after(result, beanName);
		if (!result) {
			return result;
		}
	}

	return result;
}

/**
 * BeanFactory destroy singletons.
 *
 * @api public
 */
BeanFactory.prototype.destroySingletons = function() {
	var singletonNames = this.singletonBeanFactory.getSingletonNames();

	for (var i = 0; i < singletonNames.length; i++) {
		this.destroySingleton(singletonNames[i]);
	}
}

/**
 * BeanFactory destroy BeanFactory.
 *
 * @api public
 */
BeanFactory.prototype.destroyBeanFactory = function() {
	this.initCbMap = null;
	this.beanCurMap = null;
	this.beanFunctions = null;
	this.beanDefinitions = null;
	this.singletonBeanFactory = null;
}

/**
 * BeanFactory destroy singleton.
 *
 * @param  {String} beanName
 * @api public
 */
BeanFactory.prototype.destroySingleton = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return;
	}

	var beanObject = this.getBean(beanName);

	this.destroyBean(beanName, beanObject);

	this.singletonBeanFactory.removeSingleton(beanName);
}

/**
 * BeanFactory destroy bean.
 *
 * @param  {String} beanName
 * @param  {Object} beanObject
 * @api public
 */
BeanFactory.prototype.destroyBean = function(beanName, beanObject) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (!beanDefinition) {
		return;
	}

	var destroyMethodName = beanDefinition.getDestroyMethodName();

	var destroyMethod = beanObject[destroyMethodName];
	if (Utils.checkFunction(destroyMethod)) {
		destroyMethod.call(beanObject);
	}

	this.removeFunction(beanName);
	this.removeBeanDefinition(beanName);
}

/**
 * BeanFactory check bean is a singleton or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
BeanFactory.prototype.isSingleton = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (beanDefinition) {
		return beanDefinition.isSingleton();
	} else {
		return false;
	}
}

/**
 * BeanFactory check bean is a prototype or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
BeanFactory.prototype.isPrototype = function(beanName) {
	var beanDefinition = this.getBeanDefinition(beanName);
	if (beanDefinition) {
		return beanDefinition.isPrototype();
	} else {
		return false;
	}
}

/**
 * BeanFactory check BeanFactory contains bean or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
BeanFactory.prototype.containsBean = function(beanName) {
	return !!this.getBeanFunction(beanName) && !!this.getBeanDefinition(beanName);
}

/**
 * BeanFactory get bean contructor function.
 *
 * @param  {String} beanName
 * @return {Function} bean constructor function
 * @api public
 */
BeanFactory.prototype.getBeanFunction = function(beanName) {
	return this.beanFunctions[beanName];
}

/**
 * BeanFactory set bean contructor function.
 *
 * @param  {String}   beanName
 * @param  {Function} func bean constructor function
 * @api public
 */
BeanFactory.prototype.setBeanFunction = function(beanName, func) {
	this.beanFunctions[beanName] = func;
}

/**
 * BeanFactory remove bean contructor function from BeanFactory.
 *
 * @param  {String} beanName
 * @api public
 */
BeanFactory.prototype.removeFunction = function(beanName) {
	delete this.beanFunctions[beanName];
}

/**
 * BeanFactory get init method.
 *
 * @param  {String}   beanName
 * @return {Function} bean init method
 * @api public
 */
BeanFactory.prototype.getInitCb = function(beanName) {
	if (!this.initCbMap[beanName]) {
		this.initCbMap[beanName] = Constant.INIT_CB_DEFAULT;
	}

	return this.initCbMap[beanName];
}

/**
 * BeanFactory set init method.
 *
 * @param  {String}   beanName
 * @param  {Function} initCb bean init method
 * @api public
 */
BeanFactory.prototype.setInitCb = function(beanName, initCb) {
	this.initCbMap[beanName] = initCb;
}

/**
 * BeanFactory get beanDefinition.
 *
 * @param  {String} beanName
 * @return {Object} beanDefinition
 * @api public
 */
BeanFactory.prototype.getBeanDefinition = function(beanName) {
	return this.beanDefinitions[beanName];
}

/**
 * BeanFactory get beanDefinitions.
 *
 * @return {Object} beanDefinitions
 * @api public
 */
BeanFactory.prototype.getBeanDefinitions = function() {
	return this.beanDefinitions;
}

/**
 * BeanFactory remove beanDefinition from BeanFactory.
 *
 * @param  {String} beanName
 * @api public
 */
BeanFactory.prototype.removeBeanDefinition = function(beanName) {
	delete this.beanDefinitions[beanName];
}

/**
 * BeanFactory check BeanFactory contains beanName beanDefinition or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
BeanFactory.prototype.containsBeanDefinition = function(beanName) {
	return !!this.getBeanDefinition(beanName);
}

/**
 * BeanFactory get aspects.
 *
 * @return {Array} aspects
 * @api public
 */
BeanFactory.prototype.getAspects = function() {
	return this.aspects;
}

/**
 * BeanFactory get modelDefinition.
 *
 * @param  {String} modelId
 * @return {Object} modelDefinition
 * @api public
 */
BeanFactory.prototype.getModelDefinition = function(modelId) {
	return this.modelMap[modelId];
}

/**
 * BeanFactory get modelDefinitions.
 *
 * @return {Object} modelDefinition map
 * @api public
 */
BeanFactory.prototype.getModelDefinitions = function() {
	return this.modelMap;
}

/**
 * BeanFactory get getConstraintDefinition.
 *
 * @param  {String} cid
 * @return {Object} getConstraintDefinition
 * @api public
 */
BeanFactory.prototype.getConstraintDefinition = function(cid) {
	return this.constraints[cid];
}

/**
 * BeanFactory set table model map.
 *
 * @param  {String} table name
 * @param  {Object} modelDefinition
 * @api public
 */
BeanFactory.prototype.setTableModelMap = function(table, modelDefinition) {
	this.tableModelMap[table] = modelDefinition;
}

/**
 * BeanFactory get modelDefinition by table.
 *
 * @param   {String} table name
 * @return  {Object} modelDefinition
 * @api public
 */
BeanFactory.prototype.getModelDefinitionByTable = function(table) {
	return this.tableModelMap[table];
}

module.exports = BeanFactory;
},{"../aop/aspect":110,"../aop/framework/dynamicMetaProxy":114,"../model/modelConstraint":131,"../model/modelDefinition":132,"../model/modelFilter":133,"../model/modelProxy":135,"../util/aopUtil":142,"../util/beanUtil":143,"../util/constant":144,"../util/modelUtil":147,"../util/utils":151,"../util/validatorUtil":152,"./singletonBeanFactory":120,"./support/beanDefinition":121,"pomelo-logger":169}],119:[function(require,module,exports){
var logger = require('pomelo-logger').getLogger('bearcat', 'ModuleFactory');

var ModuleFactory = function() {
	this.factoryMap = {};
	this.moduleMap = {};
}

ModuleFactory.prototype.define = function(id, factory) {
	if (this.factoryMap[id]) {
		logger.warn('module %s has been registered ...', id);
		return;
	}

	this.factoryMap[id] = factory;
}

ModuleFactory.prototype.require = function(id) {
	if (!this.moduleMap[id]) {
		var exports = {};
		var factory = this.factoryMap[id];

		if (!factory) {
			logger.warn('require file %s not exists ...', id);
			return;
		}

		var module = {
			exports: {}
		}

		factory(module.exports, module);
		this.moduleMap[id] = module.exports;
	}

	return this.moduleMap[id];
}

module.exports = ModuleFactory;
},{"pomelo-logger":169}],120:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat SingletonBeanFactory
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'SingletonBeanFactory');

/**
 * SingletonBeanFactory constructor function.
 *
 * @api public
 */
var SingletonBeanFactory = function(beanFactory) {
	this.beanFactory = beanFactory;
	this.singletonObjects = {};
}

/**
 * SingletonBeanFactory add singleton to SingletonBeanFactory.
 *
 * @param  {String} beanName
 * @param  {Object} beanObject
 * @api public
 */
SingletonBeanFactory.prototype.addSingleton = function(beanName, beanObject) {
	this.singletonObjects[beanName] = beanObject;
}

/**
 * SingletonBeanFactory check SingletonBeanFactory contains singleton or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
SingletonBeanFactory.prototype.containsSingleton = function(beanName) {
	return !!this.singletonObjects[beanName];
}

/**
 * SingletonBeanFactory get singleton from SingletonBeanFactory.
 *
 * @param  {String} beanName
 * @return {Object} singletonObject
 * @api public
 */
SingletonBeanFactory.prototype.getSingleton = function(beanName) {
	var beanFactory = this.beanFactory;

	var bean = this.singletonObjects[beanName];
	if (bean) {
		return bean;
	} else {
		bean = beanFactory.createBean.apply(beanFactory, arguments);
	}

	this.addSingleton(beanName, bean);

	return bean;
}

/**
 * SingletonBeanFactory get all singleton names from SingletonBeanFactory.
 *
 * @api public
 */
SingletonBeanFactory.prototype.getSingletonNames = function() {
	var r = [];
	for (var name in this.singletonObjects) {
		r.push(name);
	}

	return r;
}

/**
 * SingletonBeanFactory remove singleton from SingletonBeanFactory.
 *
 * @param  {String} beanName
 * @api public
 */
SingletonBeanFactory.prototype.removeSingleton = function(beanName) {
	delete this.singletonObjects[beanName];
}

module.exports = SingletonBeanFactory;
},{"pomelo-logger":169}],121:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanDefinition
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Constant = require('../../util/constant');
var BeanUtils = require('../../util/beanUtil');
var Utils = require('../../util/utils');

/**
 * BeanDefinition constructor function.
 *
 * @api public
 */
var BeanDefinition = function() {
	this.argsOn = [];
	this.propsOn = [];
	this.func = null;
	this.order = null;
	this.proxy = true;
	this.aspect = false;
	this.abstract = false;
	this.lazyInit = false;
	this.asyncInit = false;
	this.parentName = null;
	this.parentBean = null;
	this.beanName = null;
	this.factoryArgsOn = {};
	this.factoryBeanName = null;
	this.factoryMethodName = null;
	this.initMethodName = null;
	this.destroyMethodName = null;
	this.scope = Constant.SCOPE_DEFAULT;
}

/**
 * BeanDefinition get parentName.
 *
 * @return  {String} parentName
 * @api public
 */
BeanDefinition.prototype.getParentName = function() {
	return this.parentName;
}

/**
 * BeanDefinition set parentName.
 *
 * @param  {String} parentName
 * @api public
 */
BeanDefinition.prototype.setParentName = function(parentName) {
	if (!parentName) {
		return;
	}
	this.parentName = parentName;
}

/**
 * BeanDefinition check whether has parent bean.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.hasParentBean = function() {
	return this.getParentName() && !this.getParentBean();
}

/**
 * BeanDefinition get parent bean.
 *
 * @return  {Object} parent bean
 * @api public
 */
BeanDefinition.prototype.getParentBean = function() {
	return this.parentBean;
}

/**
 * BeanDefinition set parent bean.
 *
 * @param  {Object} parentBean parent bean
 * @api public
 */
BeanDefinition.prototype.setParentBean = function(parentBean) {
	if (!parentBean) {
		return;
	}
	this.parentBean = parentBean;
}

/**
 * BeanDefinition get beanName.
 *
 * @return  {String} beanName
 * @api public
 */
BeanDefinition.prototype.getBeanName = function() {
	return this.beanName;
}

/**
 * BeanDefinition set beanName.
 *
 * @param  {String} beanName
 * @api public
 */
BeanDefinition.prototype.setBeanName = function(beanName) {
	if (!beanName) {
		return;
	}
	return this.beanName = beanName;
}

/**
 * BeanDefinition get factoryBeanName.
 *
 * @return  {String} factoryBeanName
 * @api public
 */
BeanDefinition.prototype.getFactoryBeanName = function() {
	if (this.factoryBeanName) {
		return this.factoryBeanName;
	} else {
		if (this.parentBean) {
			return this.parentBean.factoryBeanName;
		}
	}
}

/**
 * BeanDefinition set factoryBeanName.
 *
 * @param  {String} factoryBeanName
 * @api public
 */
BeanDefinition.prototype.setFactoryBeanName = function(factoryBeanName) {
	if (!factoryBeanName) {
		return;
	}
	this.factoryBeanName = factoryBeanName;
}

/**
 * BeanDefinition get factoryMethodName.
 *
 * @return  {String} factoryMethodName
 * @api public
 */
BeanDefinition.prototype.getFactoryMethodName = function() {
	if (this.factoryMethodName) {
		return this.factoryMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.factoryMethodName;
		}
	}
}

/**
 * BeanDefinition set factoryMethodName.
 *
 * @param  {String} factoryMethodName
 * @api public
 */
BeanDefinition.prototype.setFactoryMethodName = function(factoryMethodName) {
	if (!factoryMethodName) {
		return;
	}
	this.factoryMethodName = factoryMethodName;
}

/**
 * BeanDefinition get bean scope: singleton(default), prototype.
 *
 * @return  {String} scope
 * @api public
 */
BeanDefinition.prototype.getScope = function() {
	return this.scope;
}

/**
 * BeanDefinition set bean scope: singleton(default), prototype.
 *
 * @param  {String} scope
 * @api public
 */
BeanDefinition.prototype.setScope = function(scope) {
	if (!scope) {
		return;
	}
	this.scope = scope;
}

/**
 * BeanDefinition check whether is abstract.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isAbstract = function() {
	return this.abstract;
}

/**
 * BeanDefinition set abstract.
 *
 * @param  {Boolean} lazyInit true|false
 * @api public
 */
BeanDefinition.prototype.setAbstract = function(abstract) {
	if (Utils.isNotNull(abstract)) {
		this.abstract = abstract;
	}
}

/**
 * BeanDefinition check whether is lazyInit.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isLazyInit = function() {
	if (this.lazyInit) {
		return this.lazyInit;
	} else {
		if (this.parentBean) {
			return this.parentBean.lazyInit;
		}
	}
}

/**
 * BeanDefinition  set lazyInit.
 *
 * @param  {Boolean} lazyInit true|false
 * @api public
 */
BeanDefinition.prototype.setLazyInit = function(lazyInit) {
	if (Utils.isNotNull(lazyInit)) {
		this.lazyInit = lazyInit;
	}
}

/**
 * BeanDefinition check whether need to be proxied or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.needProxy = function() {
	return this.proxy;
}

/**
 * BeanDefinition set bean need proxy or not.
 *
 * @param  {Boolean} proxy true|false
 * @api public
 */
BeanDefinition.prototype.setProxy = function(proxy) {
	if (Utils.isNotNull(proxy)) {
		this.proxy = proxy;
	}
}

/**
 * BeanDefinition check whether is asyncInit.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isAsyncInit = function() {
	if (this.asyncInit) {
		return this.asyncInit;
	} else {
		if (this.parentBean) {
			return this.parentBean.asyncInit;
		}
	}
}

/**
 * BeanDefinition set bean asyncInit or not.
 *
 * @param  {Boolean} asyncInit true|false
 * @api public
 */
BeanDefinition.prototype.setAsyncInit = function(asyncInit) {
	if (Utils.isNotNull(asyncInit)) {
		this.asyncInit = asyncInit;
	}
}

/**
 * BeanDefinition set bean an aspect or not.
 *
 * @param  {Boolean} aspect true|false
 * @api public
 */
BeanDefinition.prototype.setAspect = function(aspect) {
	if (Utils.isNotNull(aspect)) {
		this.aspect = aspect;
	}
}

/**
 * BeanDefinition check whether is a aspect.
 * an aspect do not need to be proxied
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isAspect = function() {
	if (this.aspect) {
		return this.aspect;
	} else {
		if (this.parentBean) {
			return this.parentBean.aspect;
		}
	}
}

/**
 * BeanDefinition get bean props settings.
 *
 * @return  {Array} props settings
 * @api public
 */
BeanDefinition.prototype.getProps = function() {
	return this.propsOn;
}

/**
 * BeanDefinition get bean props settings.
 *
 * @return  {Array} props settings
 * @api public
 */
BeanDefinition.prototype.getPropsOn = function() {
	return this.propsOn;
}

/**
 * BeanDefinition set bean props settings.
 *
 * @param  {Array} propsOn props settings
 * @api public
 */
BeanDefinition.prototype.setPropsOn = function(propsOn) {
	if (!propsOn || !Utils.checkArray(propsOn) || !propsOn.length) {
		return;
	}
	this.updateSettingsOn(this, Constant.SETTINGS_PROPS_ON, propsOn);
}

/**
 * BeanDefinition get bean args settings.
 *
 * @return  {Array} args settings
 * @api public
 */
BeanDefinition.prototype.getArgs = function() {
	return this.argsOn;
}

/**
 * BeanDefinition get bean args settings.
 *
 * @return  {Array} args settings
 * @api public
 */
BeanDefinition.prototype.getArgsOn = function() {
	return this.argsOn;
}

/**
 * BeanDefinition set bean args settings.
 *
 * @param  {Array} argsOn args settings
 * @api public
 */
BeanDefinition.prototype.setArgsOn = function(argsOn) {
	if (!argsOn || !Utils.checkArray(argsOn) || !argsOn.length) {
		return;
	}
	this.updateSettingsOn(this, Constant.SETTINGS_ARGS_ON, argsOn);
}

/**
 * BeanDefinition get bean factory args settings.
 *
 * @return  {Array} factory args settings
 * @api public
 */
BeanDefinition.prototype.getFactoryArgs = function() {
	return this.factoryArgsOn;
}

/**
 * BeanDefinition get bean factory args settings.
 *
 * @return  {Array} factory args settings
 * @api public
 */
BeanDefinition.prototype.getFactoryArgsOn = function() {
	return this.factoryArgsOn;
}

/**
 * BeanDefinition set factory args settings.
 *
 * @param  {Array} factoryArgsOn factory args settings
 * @api public
 */
BeanDefinition.prototype.setFactoryArgsOn = function(factoryArgsOn) {
	if (!factoryArgsOn || !Utils.checkArray(factoryArgsOn) || !factoryArgsOn.length) {
		return;
	}
	this.updateSettingsOn(this, Constant.SETTINGS_FACTORY_ARGS_ON, factoryArgsOn);
}

/**
 * BeanDefinition get bean init method name.
 *
 * @return  {String} bean init method name
 * @api public
 */
BeanDefinition.prototype.getInitMethodName = function() {
	if (this.initMethodName) {
		return this.initMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.initMethodName;
		}
	}
}

/**
 * BeanDefinition set bean init method name.
 *
 * @param  {String} initMethodName bean init method name
 * @api public
 */
BeanDefinition.prototype.setInitMethodName = function(initMethodName) {
	if (!initMethodName) {
		return;
	}
	this.initMethodName = initMethodName;
}

/**
 * BeanDefinition get bean destroy method name.
 *
 * @return  {String} bean destroy method name
 * @api public
 */
BeanDefinition.prototype.getDestroyMethodName = function() {
	if (this.destroyMethodName) {
		return this.destroyMethodName;
	} else {
		if (this.parentBean) {
			return this.parentBean.destroyMethodName;
		}
	}
}

/**
 * BeanDefinition set bean destroy method name.
 *
 * @param  {String} destroyMethodName bean destroy method name
 * @api public
 */
BeanDefinition.prototype.setDestroyMethodName = function(destroyMethodName) {
	if (!destroyMethodName) {
		return;
	}
	this.destroyMethodName = destroyMethodName;
}

/**
 * BeanDefinition get bean constructor function.
 *
 * @return  {Function} bean constructor function
 * @api public
 */
BeanDefinition.prototype.getFunc = function() {
	return this.func;
}

/**
 * BeanDefinition set bean constructor function.
 *
 * @param  {Function} func bean constructor function
 * @api public
 */
BeanDefinition.prototype.setFunc = function(func) {
	if (!this.func) {
		this.func = func;
	}
}

/**
 * BeanDefinition get bean order.
 *
 * @return  {Number} bean order
 * @api public
 */
BeanDefinition.prototype.getOrder = function() {
	if (this.order || this.order == 0) {
		return this.order;
	} else {
		if (this.parentBean) {
			return this.parentBean.order;
		}
	}
}

/**
 * BeanDefinition set bean order.
 *
 * @param  {Number} order bean order
 * @api public
 */
BeanDefinition.prototype.setOrder = function(order) {
	if (Utils.isNotNull(order)) {
		this.order = order;
	}
}

/**
 * BeanDefinition check bean whether is singleton or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isSingleton = function() {
	return this.scope === Constant.SCOPE_SINGLETON;
}

/**
 * BeanDefinition check bean whether is prototype or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.isPrototype = function() {
	return this.scope === Constant.SCOPE_PROTOTYPE;
}

/**
 * BeanDefinition check bean whether has factoryBean or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.hasFactoryBean = function() {
	return Utils.isNotNull(this.factoryBeanName) && Utils.isNotNull(this.factoryMethodName);
}

/**
 * BeanDefinition check bean whether has initMethod or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.hasInitMethod = function() {
	return Utils.isNotNull(this.initMethodName);
}

/**
 * BeanDefinition check bean whether has parent or not.
 *
 * @return  {Boolean} true|false
 * @api public
 */
BeanDefinition.prototype.hasParent = function() {
	return Utils.isNotNull(this.parentName);
}

/**
 * BeanDefinition update settings.
 *
 * @param  {Object} beanDefinition
 * @param  {String} key key: propsOn, argsOn, factoryArgsOn
 * @param  {Array}  settingsOn settings
 * @api private
 */
BeanDefinition.prototype.updateSettingsOn = function(BeanDefinition, key, settingsOn) {
	var settings = BeanDefinition[key];

	var settingsMap = BeanUtils.getBeanSettingsMap(settings);
	var settingsOnMap = BeanUtils.getBeanSettingsMap(settingsOn);

	for (var name in settingsOnMap) {
		if (!settingsMap[name]) {
			settingsMap[name] = settingsOnMap[name];
		}
	}

	BeanDefinition[key] = BeanUtils.getBeanSettingsArray(settingsMap);
}

module.exports = BeanDefinition;
},{"../../util/beanUtil":143,"../../util/constant":144,"../../util/utils":151}],122:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanDefinitionVisitor
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */
var logger = require('pomelo-logger').getLogger('bearcat', 'BeanDefinitionVisitor');
var Constant = require('../../util/constant');
var Utils = require('../../util/utils');

/**
 * BeanDefinitionVisitor constructor function.
 *
 * @api public
 */
var BeanDefinitionVisitor = function(valueResolver) {
	this.valueResolver = valueResolver;
}

/**
 * BeanDefinitionVisitor set valueResolver.
 *
 * @param  {Object} valueResolver
 * @api public
 */
BeanDefinitionVisitor.prototype.setValueResolver = function(valueResolver) {
	this.valueResolver = valueResolver;
}

/**
 * BeanDefinitionVisitor get valueResolver.
 *
 * @return  {Object} valueResolver
 * @api public
 */
BeanDefinitionVisitor.prototype.getValueResolver = function() {
	return this.valueResolver;
}

/**
 * BeanDefinitionVisitor resolve string value.
 *
 * @param  {String} strVal string value
 * @api public
 */
BeanDefinitionVisitor.prototype.resolveStringValue = function(strVal) {
	if (!this.valueResolver) {
		logger.error('No StringValueResolver specified');
		return;
	}

	var resolvedValue = this.getValueResolver().resolveStringValue(strVal);

	return resolvedValue;
}

/**
 * BeanDefinitionVisitor visit beanDefinition.
 *
 * @param  {Object} beanDefinition
 * @api public
 */
BeanDefinitionVisitor.prototype.visitBeanDefinition = function(beanDefinition) {
	this.visitParentName(beanDefinition);
	this.visitPropertyValues(beanDefinition);
	this.visitArgumentsValues(beanDefinition);
}

/**
 * BeanDefinitionVisitor visit parentName in beanDefinition.
 *
 * @param  {Object} beanDefinition
 * @api private
 */
BeanDefinitionVisitor.prototype.visitParentName = function(beanDefinition) {
	var parentName = beanDefinition.getParentName();

	if (Utils.isNotNull(parentName)) {
		var resolvedName = this.resolveStringValue(parentName);
		if (parentName !== resolvedName && Utils.isNotNull(resolvedName)) {
			beanDefinition.setParentName(resolvedName);
		}
	}
}

/**
 * BeanDefinitionVisitor visit properties values in beanDefinition.
 *
 * @param  {Object} beanDefinition
 * @api private
 */
BeanDefinitionVisitor.prototype.visitPropertyValues = function(beanDefinition) {
	var props = beanDefinition.getProps();
	for (var i = 0; i < props.length; i++) {
		var wbean = props[i];
		if (wbean.getDependType() === Constant.DEPEND_TYPE_VALUE) {
			var value = wbean.getValue();
			var resolvedValue = this.resolveStringValue(value);
			if (value !== resolvedValue && Utils.isNotNull(resolvedValue)) {
				wbean.setValue(resolvedValue);
			}
		}
	}
}

/**
 * BeanDefinitionVisitor visit argument values in beanDefinition.
 *
 * @param  {Object} beanDefinition
 * @api private
 */
BeanDefinitionVisitor.prototype.visitArgumentsValues = function(beanDefinition) {
	var args = beanDefinition.getArgs();
	for (var i = 0; i < args.length; i++) {
		var wbean = args[i];
		if (wbean.getDependType() === Constant.DEPEND_TYPE_VALUE) {
			var value = wbean.getValue();
			var resolvedValue = this.resolveStringValue(value);
			if (value !== resolvedValue && Utils.isNotNull(resolvedValue)) {
				wbean.setValue(resolvedValue);
			}
		}
	}
}

module.exports = BeanDefinitionVisitor;
},{"../../util/constant":144,"../../util/utils":151,"pomelo-logger":169}],123:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanModule
 * modified from seajs module.js
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>, http://seajs.org
 * MIT Licensed
 */

var RequestUtil = require('../../util/requestUtil');
var Utils = require('../../util/utils');

var anonymousMeta;

var fetchingList = {};
var fetchedList = {};
var callbackList = {};

var STATUS = {
	// 0 - init
	INIT: 0,
	// 1 - The `module.uri` is being fetched
	FETCHING: 1,
	// 2 - The meta data has been saved to cachedMods
	SAVED: 2,
	// 3 - The `module.dependencies` are being loaded
	LOADING: 3,
	// 4 - The module are ready to execute
	LOADED: 4,
	// 5 - 404
	ERROR: 5
}

/**
 * BeanModule constructor function.
 *
 * @param  {String}  uri
 * @param  {Array}   dependencies
 * @param  {Object}  loader reference
 * @api public
 */
var BeanModule = function(uri, deps, loader) {
	this.uri = uri;
	this.dependencies = deps || [];
	this.deps = {};
	this.remain = 0;
	this.entries = [];
	this.history = {};
	this.loader = loader;
	this.callback = null;
	this.status = STATUS.INIT;
}

/**
 * BeanModule resolve dependencies uri.
 *
 * @api private
 */
BeanModule.prototype.resolve = function() {
	var mod = this
	var ids = mod.dependencies
	var uris = []

	var loader = this.getLoader();
	var len = ids.length;
	for (var i = 0; i < len; i++) {
		uris[i] = loader.resolve(ids[i], mod.uri);
	}

	return uris
}

/**
 * BeanModule pass entry node into dependencies.
 *
 * @api private
 */
BeanModule.prototype.pass = function() {
	var mod = this

	var len = mod.dependencies.length

	// mod.entries changes dynamiclly
	for (var i = 0; i < mod.entries.length; i++) {
		var entry = mod.entries[i];

		var count = 0
		for (var j = 0; j < len; j++) {
			var m = mod.deps[mod.dependencies[j]]
				// If the module is unload and unused in the entry, pass entry to it
			if (m.status < STATUS.LOADED && !entry.history.hasOwnProperty(m.uri)) {
				entry.history[m.uri] = true
				count++
				m.entries.push(entry)
				if (m.status === STATUS.LOADING) {
					m.pass()
				}
			}
		}
		// If has passed the entry to it's dependencies, modify the entry's count and del it in the module
		if (count > 0) {
			entry.remain += count - 1
			mod.entries.shift()
			i--
		}
	}
}

/**
 * BeanModule load script files.
 *
 * @api private
 */
BeanModule.prototype.load = function() {
	var mod = this;

	if (this.status >= STATUS.LOADING) {
		return;
	}

	var loader = this.getLoader();
	mod.status = STATUS.LOADING;

	var uris = mod.resolve();

	for (var i = 0, len = uris.length; i < len; i++) {
		mod.deps[mod.dependencies[i]] = loader.get(uris[i])
	}

	// Pass entry to it's dependencies
	mod.pass();

	// If module has entries not be passed, call onload
	if (mod.entries.length) {
		mod.onload()
		return
	}

	// Begin parallel loading
	var requestCache = {};
	var m;

	for (i = 0; i < len; i++) {
		m = loader.get(uris[i]);

		if (m.status < STATUS.FETCHING) {
			m.fetch(requestCache)
		} else if (m.status === STATUS.SAVED) {
			m.load()
		}
	}

	// Send all requests at last to avoid cache bug in IE6-9. Issues#808
	for (var requestUri in requestCache) {
		if (requestCache.hasOwnProperty(requestUri)) {
			requestCache[requestUri]()
		}
	}
}

/**
 * BeanModule onload script file event callback.
 *
 * @api private
 */
BeanModule.prototype.onload = function() {
	var mod = this
	mod.status = STATUS.LOADED

	// When sometimes cached in IE, exec will occur before onload, make sure len is an number
	var len = (mod.entries || []).length;
	for (var i = 0; i < len; i++) {
		var entry = mod.entries[i]
		if (--entry.remain === 0) {
			entry.callback()
		}
	}

	delete mod.entries
}

/**
 * BeanModule error callback.
 *
 * @api private
 */
BeanModule.prototype.error = function() {
	var mod = this
	mod.onload()
	mod.status = STATUS.ERROR
}

/**
 * BeanModule fetch script files using async <script> or from webworker.
 *
 * @param  {Object}  request cache
 * @api private
 */
BeanModule.prototype.fetch = function(requestCache) {
	var mod = this
	var uri = mod.uri
	console.log('do fetch ' + uri);

	var loader = this.getLoader();
	mod.status = STATUS.FETCHING

	// Emit `fetch` event for plugins such as combo plugin
	var emitData = {
		uri: uri
	}

	var requestUri = emitData.requestUri || uri

	// Empty uri or have been fetched
	if (!requestUri || fetchedList.hasOwnProperty(requestUri)) {
		mod.load()
		return
	}

	if (fetchingList.hasOwnProperty(requestUri)) {
		callbackList[requestUri].push(mod)
		return
	}

	fetchingList[requestUri] = true
	callbackList[requestUri] = [mod]

	// Emit `request` event for plugins such as text plugin
	emitData = {
		uri: uri,
		requestUri: requestUri,
		onRequest: onRequest,
		// charset: Utils.checkFunction(data.charset) ? data.charset(requestUri) || 'utf-8' : data.charset,
		// crossorigin: Utils.checkFunction(data.crossorigin) ? data.crossorigin(requestUri) : data.crossorigin
		charset: 'utf-8',
		crossorigin: false
	}

	if (!emitData.requested) {
		requestCache ?
			requestCache[emitData.requestUri] = sendRequest :
			sendRequest()
	}

	function sendRequest() {
		RequestUtil.request(emitData.requestUri, emitData.onRequest, emitData.charset, emitData.crossorigin)
	}

	function onRequest(error) {
		delete fetchingList[requestUri]
		fetchedList[requestUri] = true

		// Save meta data of anonymous module
		if (anonymousMeta) {
			loader.save(uri, anonymousMeta)
			anonymousMeta = null
		}

		// Call callbacks
		var m, mods = callbackList[requestUri]
		delete callbackList[requestUri]
		while ((m = mods.shift())) {
			// When 404 occurs, the params error will be true
			if (error === true) {
				m.error()
			} else {
				m.load()
			}
		}
	}
}

/**
 * BeanModule add entry.
 *
 * @param  {Object}  entry node
 * @api public
 */
BeanModule.prototype.addEntry = function(entry) {
	this.entries.push(entry);
}

/**
 * BeanModule set remain number to be loaded.
 *
 * @param  {Number}  remain number
 * @api public
 */
BeanModule.prototype.setRemain = function(remain) {
	this.remain = remain;
}

/**
 * BeanModule set loader.
 *
 * @param  {Object}  loader reference
 * @api public
 */
BeanModule.prototype.setLoader = function(loader) {
	this.loader = loader;
}

/**
 * BeanModule get loader.
 *
 * @return  {Object}  loader reference
 * @api public
 */
BeanModule.prototype.getLoader = function() {
	return this.loader;
}

BeanModule.STATUS = STATUS;
BeanModule.anonymousMeta = anonymousMeta;

module.exports = BeanModule;
},{"../../util/requestUtil":148,"../../util/utils":151}],124:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanWrapper
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'BeanWrapper');

var Constant = require('../../util/constant');
var Utils = require('../../util/utils');

/**
 * BeanWrapper constructor function.
 *
 * @api public
 */
var BeanWrapper = function() {
	this.name = null;
	this.type = null;
	this.value = null;
	this.ref = null;
	this.role = null; // DEPENDS_ARGS, DEPENDS_PROPS
	this.bean = null; // bean dependency inject instance
}

/**
 * BeanWrapper get depend type.
 *
 * @return  {String} depend type
 * @api public
 */
BeanWrapper.prototype.getDependType = function() {
	return this.role;
}

/**
 * BeanWrapper get name.
 *
 * @return  {String} name
 * @api public
 */
BeanWrapper.prototype.getName = function() {
	return this.name;
}

/**
 * BeanWrapper set name.
 *
 * @param  {String} name
 * @api public
 */
BeanWrapper.prototype.setName = function(name) {
	this.name = name;
}

/**
 * BeanWrapper get type.
 *
 * @return  {String} type
 * @api public
 */
BeanWrapper.prototype.getType = function() {
	return this.type;
}

/**
 * BeanWrapper set type.
 *
 * @param  {String} type
 * @api public
 */
BeanWrapper.prototype.setType = function(type) {
	this.type = type;
}

/**
 * BeanWrapper get value.
 *
 * @return  {String} value
 * @api public
 */
BeanWrapper.prototype.getValue = function() {
	return this.value;
}

/**
 * BeanWrapper set value.
 *
 * @param  {String} value
 * @api public
 */
BeanWrapper.prototype.setValue = function(value) {
	this.value = value;
}

/**
 * BeanWrapper get value once.
 *
 * prototype bean may share DEPEND_TYPE_VAR value
 *
 * @return  {String} value
 * @api public
 */
BeanWrapper.prototype.getValueOnce = function() {
	var value = this.value;
	this.value = null;
	return value;
}

/**
 * BeanWrapper get ref bean.
 *
 * @return  {String} ref bean
 * @api public
 */
BeanWrapper.prototype.getRef = function() {
	return this.ref;
}

/**
 * BeanWrapper set ref bean.
 *
 * @param  {String} ref reference bean
 * @api public
 */
BeanWrapper.prototype.setRef = function(ref) {
	this.ref = ref;
}

/**
 * BeanWrapper get role.
 *
 * @return  {String} role
 * @api public
 */
BeanWrapper.prototype.getRole = function() {
	return this.role;
}

/**
 * BeanWrapper set role.
 *
 * @api public
 */
BeanWrapper.prototype.setRole = function() {
	var role = Constant.DEPEND_TYPE_ERROR;

	if (!this.name) {
		role = Constant.DEPEND_TYPE_ERROR;
	}

	if (this.ref) {
		role = Constant.DEPEND_TYPE_BEAN;
	}

	if (this.value) {
		role = Constant.DEPEND_TYPE_VALUE;
	}

	if (this.type) {
		if (Utils.checkType(this.type)) {
			role = Constant.DEPEND_TYPE_VAR;
		}
	}

	this.role = role;
}

/**
 * BeanWrapper get bean.
 *
 * @return  {Object} bean
 * @api public
 */
BeanWrapper.prototype.getBean = function() {
	return this.bean;
}

/**
 * BeanWrapper set bean.
 *
 * @param  {Object} bean
 * @api public
 */
BeanWrapper.prototype.setBean = function(bean) {
	this.bean = bean;
}

module.exports = BeanWrapper;
},{"../../util/constant":144,"../../util/utils":151,"pomelo-logger":169}],125:[function(require,module,exports){
(function (process){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat PlaceHolderConfigurer
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var PropertiesLoader = require('../../resource/propertiesLoader');
var BeanDefinitionVisitor = require('./beanDefinitionVisitor');
var PlaceHolderResolver = require('./placeHolderResolver');
var Constant = require('../../util/constant');
var Utils = require('../../util/utils');

var DEFAULT_LOAD_PATH = process.cwd() + "/config";

var Root;
(function() {
	Root = this;
}());

/**
 * PlaceHolderConfigurer constructor function.
 *
 * @api public
 */
var PlaceHolderConfigurer = function() {
	this.beanName = null;
	this.env = Constant.DEFAULT_ENV;
	this.cpath = DEFAULT_LOAD_PATH;
	this.properties = {};
}

/**
 * PlaceHolderConfigurer post process beanFactory.
 *
 * @param  {Object} beanFactory
 * @api public
 */
PlaceHolderConfigurer.prototype.postProcessBeanFactory = function(beanFactory) {
	this.loadProperties();

	this.processProperties(beanFactory);
}

/**
 * PlaceHolderConfigurer load properties by env.
 *
 * @api public
 */
PlaceHolderConfigurer.prototype.loadProperties = function() {
	var properties = null;

	if (Root.__bearcatData__ && Root.__bearcatData__.configData) {
		properties = Root.__bearcatData__.configData;
	} else {
		properties = this.getPropertiesLoader().loadProperties(this.getConfigPath(), this.getEnv());
	}

	this.mergeProperties(properties);
}

/**
 * PlaceHolderConfigurer merge properties.
 *
 * @param  {Object} properties
 * @api public
 */
PlaceHolderConfigurer.prototype.mergeProperties = function(properties) {
	for (var key in properties) {
		if (Utils.isNotNull(properties[key])) {
			this.properties[key] = properties[key];
		}
	}
}

/**
 * PlaceHolderConfigurer process properties.
 *
 * @param  {Object} beanFactory
 * @api public
 */
PlaceHolderConfigurer.prototype.processProperties = function(beanFactory) {
	var properties = this.getProperties();
	if (Utils.checkObjectEmpty(properties)) {
		return;
	}

	var valueResolver = new PlaceHolderResolver(properties);
	this.doProcessProperties(beanFactory, valueResolver);
}

/**
 * PlaceHolderConfigurer do process properties.
 *
 * @param  {Object} beanFactory
 * @param  {Object} valueResolver
 * @api private
 */
PlaceHolderConfigurer.prototype.doProcessProperties = function(beanFactory, valueResolver) {
	var visitor = new BeanDefinitionVisitor(valueResolver);
	var beanDefinitions = beanFactory.getBeanDefinitions();

	for (var beanName in beanDefinitions) {
		var bd = beanDefinitions[beanName];

		visitor.visitBeanDefinition(bd);
	}
}

/**
 * PlaceHolderConfigurer get properties loader.
 *
 * @return  {Object} properties loader
 * @api public
 */
PlaceHolderConfigurer.prototype.getPropertiesLoader = function() {
	return new PropertiesLoader();
}

/**
 * PlaceHolderConfigurer set beanName.
 *
 * @param  {String} beanName
 * @api public
 */
PlaceHolderConfigurer.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

/**
 * PlaceHolderConfigurer get beanName.
 *
 * @return  {String} beanName
 * @api public
 */
PlaceHolderConfigurer.prototype.getBeanName = function() {
	return this.beanName;
}

/**
 * PlaceHolderConfigurer set env.
 *
 * @param  {String} env
 * @api public
 */
PlaceHolderConfigurer.prototype.setEnv = function(env) {
	this.env = env;
}

/**
 * PlaceHolderConfigurer get env.
 *
 * @return  {String} env
 * @api public
 */
PlaceHolderConfigurer.prototype.getEnv = function() {
	return this.env;
}

/**
 * PlaceHolderConfigurer set configuration path.
 *
 * @param  {String} cpath configuration path
 * @api public
 */
PlaceHolderConfigurer.prototype.setConfigPath = function(cpath) {
	this.cpath = cpath;
}

/**
 * PlaceHolderConfigurer get configuration path.
 *
 * @return  {String} cpath configuration path
 * @api public
 */
PlaceHolderConfigurer.prototype.getConfigPath = function() {
	return this.cpath;
}

/**
 * PlaceHolderConfigurer set properties.
 *
 * @param  {Array} properties
 * @api public
 */
PlaceHolderConfigurer.prototype.setProperties = function(properties) {
	this.properties = properties;
}

/**
 * PlaceHolderConfigurer get properties.
 *
 * @return  {Array} properties
 * @api public
 */
PlaceHolderConfigurer.prototype.getProperties = function() {
	return this.properties;
}

module.exports = PlaceHolderConfigurer;
}).call(this,require('_process'))
},{"../../resource/propertiesLoader":140,"../../util/constant":144,"../../util/utils":151,"./beanDefinitionVisitor":122,"./placeHolderResolver":126,"_process":163}],126:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat PlaceHolderResolver
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */
var Utils = require('../../util/utils');

var DEFAULT_PLACEHOLDER_PREFIX = "${";
var DEFAULT_PLACEHOLDER_SUFFIX = "}";
var DEFAULT_VALUE_SEPARATOR = ":";

/**
 * PlaceHolderResolver constructor function.
 *
 * @param  {Array} properties
 * @api public
 */
var PlaceHolderResolver = function(properties) {
	this.placeholderPrefix = DEFAULT_PLACEHOLDER_PREFIX;
	this.placeholderSuffix = DEFAULT_PLACEHOLDER_SUFFIX;
	this.valueSeparator = DEFAULT_VALUE_SEPARATOR;
	this.properties = properties;
}

/**
 * PlaceHolderResolver resolve string value.
 *
 * @param  {String} strVal string value
 * @api public
 */
PlaceHolderResolver.prototype.resolveStringValue = function(strVal) {
	if (!Utils.checkString(strVal)) {
		return null;
	}

	var resolvedValue = this.doReplace(strVal);

	if (!Utils.isNotNull(resolvedValue)) {
		resolvedValue = strVal;
	}

	return resolvedValue;
}

/**
 * PlaceHolderResolver set properties.
 *
 * @param  {Array} properties
 * @api public
 */
PlaceHolderResolver.prototype.setProperties = function(properties) {
	this.properties = properties;
}

/**
 * PlaceHolderResolver get properties.
 *
 * @return  {Array} properties
 * @api public
 */
PlaceHolderResolver.prototype.getProperties = function() {
	return this.properties;
}

/**
 * PlaceHolderResolver replace string value.
 *
 * @param  {String} strVal string value
 * @api private
 */
PlaceHolderResolver.prototype.doReplace = function(strVal) {
	var properties = this.getProperties();
	if (!strVal || !properties) {
		return null;
	}

	var ptn = /\$\{(.*?)\}/g;
	var m, placeHolder, res = '',
		lastIndex = 0,
		head;
	var flag = true;
	var count = 0;
	while ((m = ptn.exec(strVal))) {
		placeHolder = m[1];

		head = strVal.substring(lastIndex, m.index);
		if (head.length) {
			res += head;
		}
		lastIndex = ptn.lastIndex;
		if (count == 0 && !head.length) {
			res = properties[placeHolder];
		} else {
			res += properties[placeHolder];
		}
		flag = false;
	}

	if (lastIndex < strVal.length) {
		res += strVal.substring(lastIndex);
	}

	if (flag) {
		return null;
	}
	return res;
}

module.exports = PlaceHolderResolver;
},{"../../util/utils":151}],127:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat App
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'app');
var ApplicationContext = require('./context/applicationContext');
var EventEmitter = require('events').EventEmitter;
var BeanFactory = require('./beans/beanFactory');
var Package = require('../package.json');
var Utils = require('./util/utils');

var Root;
(function() {
	Root = this;
}());

/*!
 * Application states
 */
var STATE_NEW = 1; // app new
var STATE_INITED = 2; // app has inited
var STATE_START = 3; // app start
var STATE_STARTED = 4; // app has started

/**
 * Bearcat app object.
 * @api public
 */
var Bearcat = {
	opts: null,
	configLocations: null,
	applicationContext: null,
	state: STATE_NEW,
	startTime: null,
	version: Package.version
};

Bearcat['__proto__'] = EventEmitter.prototype;

/**
 * Bearcat createApp constructor function.
 *
 * @param  {Array}  configLocations context path array
 * @param  {Object} opts
 * @param  {String} opts.NODE_ENV                    setup env
 * @param  {String} opts.BEARCAT_ENV                 setup env
 * @param  {String} opts.NODE_CPATH                  setup config path
 * @param  {String} opts.BEARCAT_CPATH               setup config path
 * @param  {String} opts.BEARCAT_HPATH               setup hot reload path(s), usually it is the scan source directory(app by default)
 * @param  {String} opts.BEARCAT_LOGGER              setup 'off' to turn off bearcat logger configuration
 * @param  {String} opts.BEARCAT_HOT                 setup 'on' to turn on bearcat hot code reload
 * @param  {String} opts.BEARCAT_ANNOTATION          setup 'off' to turn off bearcat $ based annotation
 * @param  {String} opts.BEARCAT_GLOBAL  	         setup bearcat to be global object
 * @param  {String} opts.BEARCAT_FUNCTION_STRING  	 setup bearcat to use func.toString for $ based annotation
 *
 * @return {Object} bearcat object
 * @api public
 */
Bearcat.createApp = function(configLocations, opts) {
	if (this.state >= STATE_INITED) {
		Bearcat.stop();
	}

	if (!Utils.checkArray(configLocations) && Utils.checkObject(configLocations)) {
		opts = configLocations;
		configLocations = [];
	}

	this.opts = opts || {};
	this.configLocations = configLocations || [];

	if (this.opts['BEARCAT_GLOBAL']) {
		Root.bearcat = Bearcat;
	}

	if (!Utils.checkObject(this.opts)) {
		logger.warn('Bearcat createApp opts must be object...');
	}

	this.applicationContext = new ApplicationContext(this.configLocations, this.opts);

	this.state = STATE_INITED;
	return Bearcat;
}

/**
 * Bearcat start app.
 *
 * @param  {Function} cb start callback function
 * @api public
 */
Bearcat.start = function(cb) {
	if (!Utils.checkFunction(cb)) {
		cb = function() {}
	}

	if (this.state > STATE_INITED) {
		logger.warn('Bearcat has already start, run bearcat.stop to start again.');
		return cb();
	}

	if (this.state < STATE_INITED) {
		logger.warn('Bearcat does not inited, run bearcat.createApp to init.');
		return cb();
	}

	this.state = STATE_START;
	this.startTime = Date.now();
	var self = this;

	var env = "";

	if (Utils.checkBrowser()) {
		env = 'browser';
		this.applicationContext.setEnv(env);
	}

	if (Utils.checkCocos2dJsb()) {
		env = 'cocos2djsb';
		this.applicationContext.setEnv(env);
	}

	this.applicationContext.on('finishRefresh', function() {
		self.state = STATE_STARTED;
		env = self.applicationContext.getEnv();
		logger.info('Bearcat startup in %s with %s ms', env, Date.now() - self.startTime);
		cb();
	});

	this.applicationContext.on('reload', function() {
		self.emit('reload');
	});

	this.applicationContext.refresh();
}

/**
 * Bearcat stop app.
 * it will stop internal applicationContext, destroy all singletonBeans
 *
 * @api public
 */
Bearcat.stop = function() {
	if (this.applicationContext) {
		this.applicationContext.destroy();
	}
	this.applicationContext = null;
	this.configLocations = null;
	this.startTime = null;
	this.state = STATE_NEW;
}

/**
 * Bearcat get beanFactory instance.
 *
 * @return  {Object} beanFactory instance
 * @api public
 */
Bearcat.getBeanFactory = function() {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %s', "getBeanFactory");
		return;
	}

	return this.applicationContext.getBeanFactory();
}

/**
 * Bearcat get applicationContext.
 *
 * @return  {Object} applicationContext
 * @api public
 */
Bearcat.getApplicationContext = function() {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %s', "getApplicationContext");
		return;
	}

	return this.applicationContext;
}

/**
 * Bearcat get bean from IoC container through meta argument.
 *
 * Examples:
 *
 *	  bearcat.getBeanByMeta({
 *		 id: "car",
 *		 func: Car // Car is a function constructor
 *	  });
 *
 * @param  {Object} meta meta object
 * @api public
 */
Bearcat.getBeanByMeta = function(meta) {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %s %j', "getBeanByMeta", meta);
		return;
	}

	return this.applicationContext.getBeanByMeta(meta);
}

/**
 * Bearcat get bean from IoC container through $ annotation function.
 *
 * Examples:
 *
 *	  bearcat.getBeanByFunc(function() {
 *		 this.$id = "car";
 *		 this.$scope = "prototype";
 *	  });
 *
 * @param  {Function} func $ annotation function
 * @api public
 */
Bearcat.getBeanByFunc = function(func) {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %s', "getBeanByFunc");
		return;
	}

	return this.applicationContext.getBeanByFunc(func);
}

/**
 * Bearcat add async loading beans, this just add beans needed to be loaded to bearcat.
 *
 * Examples:
 *
 *	  bearcat.use(['car']);
 *	  bearcat.use('car');
 *
 * @param  {Array|String} async loading beans id
 * @api public
 */
Bearcat.use = function(ids) {
	if (Utils.checkArray(ids)) {
		return this.applicationContext.use(ids);
	}

	if (Utils.checkString(ids)) {
		return this.applicationContext.use([ids]);
	}
}

/**
 * Bearcat async loading beans.
 *
 * Examples:
 *
 *	  bearcat.async(['car'], function(car) {
 *		  // car is ready
 *	  });
 *
 * @param  {Array|String} async loading beans id
 * @return {Function}     callback with loaded bean instances
 * @api public
 */
Bearcat.async = function(ids, cb) {
	if (Utils.checkArray(ids)) {
		return this.applicationContext.async(ids, cb);
	}

	if (Utils.checkString(ids)) {
		return this.applicationContext.async([ids], cb);
	}
}

/**
 * Bearcat add module(bean) to IoC container through $ annotation function.
 *
 * Examples:
 *
 *	  bearcat.module(function() {
 *		 this.$id = "car";
 *		 this.$scope = "prototype";
 *	  });
 *
 * @param  {Function} func $ annotation function
 * @api public
 */
Bearcat.module = function(func, context) {
	if (this.state < STATE_STARTED) {
		return this.applicationContext.module(func, context);
	} else {
		return this.getBean(func);
	}
}

/**
 * Bearcat define module(bean).
 *
 * Examples:
 *
 *    bearcat.define('car', function(exports, module) {
 *	     module.exports = function() {
 *	         console.log('run car...')
 *       }
 *    }, typeof module !== 'undefined' ? module : {});
 *
 * @param  {String}   id
 * @param  {Function} factory function
 * @param  {object}   context object
 * @api public
 */
Bearcat.define = function(id, factory, context) {
	return this.applicationContext.define(id, factory, context);
}

/**
 * Bearcat add module(bean) to IoC container through $ annotation function.
 *
 * Examples:
 *
 *	  var Car = bearcat.require('car');
 *
 * @param  {String} id
 * @api public
 */
Bearcat.require = function(id) {
	return this.applicationContext.require(id);
}

/**
 * Bearcat get bean from IoC container through beanName or meta argument.
 *
 * Examples:
 *
 *
 *	  // through beanName
 *	  var car = bearcat.getBean("car");
 *
 *	  // through meta
 *	  var car = bearcat.getBean({
 *		 id: "car",
 *		 func: Car // Car is a function constructor
 *	  });
 *
 *	  // through $ annotation func
 *	  var car = bearcat.getBean(function() {
 *		 this.$id = "car";
 *		 this.$scope = "prototype";
 *	  });
 *
 * @param  {String} beanName
 * @return {Object} bean
 * @api public
 */
Bearcat.getBean = function(beanName) {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %s %s state: %d', "getBean", beanName, this.state);
		return;
	}

	var firstarg = beanName;
	var func = "";
	if (Utils.checkObject(firstarg)) {
		func = "getBeanByMeta";
	} else if (Utils.checkFunction(firstarg)) {
		func = "getBeanByFunc";
	} else if (Utils.checkString(firstarg)) {
		func = "getBean";
	} else {
		logger.error('Bearcat application unsupported getBean arguments for %s', beanName);
		return;
	}

	return this.applicationContext[func].apply(this.applicationContext, arguments);
}

/**
 * Bearcat get bean constructor function from IoC container through beanName.
 *
 * Examples:
 *
 *
 *	  // through beanName
 *	  var Car = bearcat.getFunction("car");
 *
 *
 * @param  {String}   beanName
 * @return {Function} bean constructor function
 * @api public
 */
Bearcat.getFunction = function(beanName) {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %s %s state: %d', "getFunction", beanName, this.state);
		return;
	}

	return this.applicationContext.getBeanFunction(beanName);
}

/**
 * Bearcat get bean constructor function from IoC container through beanName, the same as bearcat.getFunction.
 *
 * Examples:
 *
 *
 *	  // through beanName
 *	  var Car = bearcat.getClass("car");
 *
 *
 * @param  {String}   beanName
 * @return {Function} bean constructor function
 * @api public
 */
Bearcat.getClass = function(beanName) {
	return Bearcat.getFunction(beanName);
}

/**
 * Bearcat get model from bearcat through modelId.
 *
 * Examples:
 *
 *
 *	  // through modelId
 *	  var carModel = bearcat.getModel("car");
 *
 *
 * @param  {String}   modelId
 * @return {Object}   model
 * @api public
 */
Bearcat.getModel = function(modelId) {
	if (this.state <= STATE_INITED) {
		logger.warn('Bearcat application is not running now for %s %s state: %d', "getModel", modelId, this.state);
		return;
	}

	return this.applicationContext.getModel(modelId);
}

/**
 * Bearcat convenient function for using in MVC route mapping.
 *
 * Examples:
 *
 *
 *	  // express
 *	  var app = express();
 *	  app.get('/', bearcat.getRoute('bearController', 'index'));
 *
 *
 * @param  {String} beanName
 * @param  {String} fnName routeName
 * @api public
 */
Bearcat.getRoute = function(beanName, fnName) {
	if (this.state !== STATE_STARTED) {
		return;
	}

	var bean = this.getBean(beanName);
	return bean[fnName].bind(bean);
}

module.exports = Bearcat;
},{"../package.json":166,"./beans/beanFactory":118,"./context/applicationContext":128,"./util/utils":151,"events":159,"pomelo-logger":169}],128:[function(require,module,exports){
(function (process){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ApplicationContext
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'ApplicationContext');
var PlaceHolderConfigurer = require('../beans/support/placeHolderConfigurer');
var AutoProxyCreator = require('../aop/autoproxy/autoProxyCreator');
var ModelKeyMapResolver = require('../model/modelKeyMapResolver');
var AsyncScriptLoader = require('../resource/asyncScriptLoader');
var BootStrapLoader = require('../resource/bootStrapLoader');
var ResourceLoader = require('../resource/resourceLoader');
var defaultConstraints = require('../model/constraints');
var ModuleFactory = require('../beans/moduleFactory');
var BeanFactory = require('../beans/beanFactory');
var EventEmitter = require('events').EventEmitter;
var RequireUtil = require('../util/requireUtil');
var Constant = require('../util/constant');
var FileUtil = require('../util/fileUtil');
var MetaUtil = require('../util/metaUtil');
var Utils = require('../util/utils');
var Path = RequireUtil.requirePath();
var Util = RequireUtil.requireUtil();
var DEFAULT_BASE = "";
var DEFAULT_LOAD_PATH = "";
var DEFAULT_HOT_RELOAD_PATH = "";

var Root;
(function() {
	Root = this;
}());

/**
 * ApplicationContext constructor function.
 *
 * @param  {Array} configLocations configuration paths
 * @api public
 */
var ApplicationContext = function(configLocations, opts) {
	this.opts = opts || {};
	this.configLocations = configLocations;
	this.loadBeans = [];
	this.active = false;
	this.reloadMap = {};
	this.beanFactory = null;
	this.startUpDate = null;
	this.moduleFactory = null;
	this.resourceLoader = null;
	this.bootStrapLoader = null;
	this.asyncScriptLoader = null;
	this.cpath = DEFAULT_LOAD_PATH;
	this.hpath = DEFAULT_HOT_RELOAD_PATH;
	this.env = Constant.DEFAULT_ENV;
	this.base = DEFAULT_BASE;
	this.beanFactoryPostProcessors = [];
	EventEmitter.call(this);
	this.init();
}

module.exports = ApplicationContext;

Util.inherits(ApplicationContext, EventEmitter);

/**
 * ApplicationContext init.
 *
 * @api public
 */
ApplicationContext.prototype.init = function() {
	if (this.hasBeanFactory()) {
		this.destroyBeans();
		this.closeBeanFactory();
	}

	DEFAULT_BASE = process.cwd();

	if (this.configLocations.length) {
		var contextPath = this.configLocations[0];
		DEFAULT_BASE = Path.dirname(contextPath);
	}

	DEFAULT_LOAD_PATH = DEFAULT_BASE + "/config";
	DEFAULT_HOT_RELOAD_PATH = DEFAULT_BASE + "/app"; // equal to scan path

	this.cpath = DEFAULT_LOAD_PATH;
	this.hpath = DEFAULT_HOT_RELOAD_PATH;
	this.base = DEFAULT_BASE;

	this.createBeanFactory();
}

/**
 * ApplicationContext set container startUpDate.
 *
 * @param  {Number} startUpDate
 * @api public
 */
ApplicationContext.prototype.setStartupDate = function(startUpDate) {
	this.startUpDate = startUpDate;
}

/**
 * ApplicationContext get container startUpDate.
 *
 * @return  {Number} startUpDate
 * @api public
 */
ApplicationContext.prototype.getStartupDate = function() {
	return this.startUpDate;
}

/**
 * ApplicationContext get resourceLoader.
 *
 * @return  {Object} resourceLoader
 * @api public
 */
ApplicationContext.prototype.getResourceLoader = function() {
	this.resourceLoader = new ResourceLoader();
	return this.resourceLoader;
}

/**
 * ApplicationContext get asyncScriptLoader.
 *
 * @return  {Object} asyncScriptLoader
 * @api public
 */
ApplicationContext.prototype.getAsyncScriptLoader = function() {
	if (this.asyncScriptLoader) {
		return this.asyncScriptLoader;
	}

	this.asyncScriptLoader = new AsyncScriptLoader();
	this.asyncScriptLoader.setApplicationContext(this);
	return this.asyncScriptLoader;
}

/**
 * ApplicationContext get bootStrapLoader.
 *
 * @return  {Object} bootStrapLoader
 * @api public
 */
ApplicationContext.prototype.getBootStrapLoader = function() {
	if (this.bootStrapLoader) {
		return this.bootStrapLoader;
	}

	this.bootStrapLoader = new BootStrapLoader();
	return this.bootStrapLoader;
}

/**
 * ApplicationContext get metaObjects resource from contextPath.
 *
 * @param   {String} cpath contextPath
 * @return  {Object} metaObjects
 * @api public
 */
ApplicationContext.prototype.getResource = function(cpath) {
	if (Root.__bearcatData__ && Root.__bearcatData__.metas) {
		return Root.__bearcatData__.metas;
	}

	return this.resourceLoader.load(cpath);
}

/**
 * ApplicationContext get contextPath locations.
 *
 * @return  {Array} contextPath locations
 * @api public
 */
ApplicationContext.prototype.getConfigLocations = function() {
	return this.configLocations;
}

/**
 * ApplicationContext add beanFactoryPostProcessor.
 *
 * @param  {Object} beanFactoryPostProcessor
 * @api public
 */
ApplicationContext.prototype.addBeanFactoryPostProcessor = function(beanFactoryPostProcessor) {
	this.beanFactoryPostProcessors.push(beanFactoryPostProcessor);
}

/**
 * ApplicationContext get beanFactoryPostProcessors.
 *
 * @return  {Array} beanFactoryPostProcessors
 * @api public
 */
ApplicationContext.prototype.getBeanFactoryProcessors = function() {
	return this.beanFactoryPostProcessors;
}

/**
 * ApplicationContext do refresh actions.
 * refresh beanFactory, preIntialize singleton Beans
 *
 * @param  {Function} cb callback function
 * @api public
 */
ApplicationContext.prototype.refresh = function(cb) {
	var self = this;
	cb = cb || function() {};

	// Prepare context for refresh
	self.prepareRefresh();

	// Refresh internal beanFactory
	self.refreshBeanFactory();

	// Try Async loading for dependencies
	self.tryAsyncLoading(function() {

		// Try loading from bearcat-bootstrap.js for dependencies
		self.tryBootStrapLoading();

		// Prepare beanFactory for this context
		self.prepareBeanFactory();

		self.postProcessBeanFactory();

		// Invoke factory processors registered as beans in the context.
		self.invokeBeanFactoryPostProcessors();

		// Register bean processors that intercept bean creation.
		self.registerBeanPostProcessors();

		// Instantiate all remaining (non-lazy-init) singletons
		self.finishBeanFactoryIntialization(function() {

			// Last step: publish corresponding event.
			self.finishRefresh();
			cb();
		});
	});
}

/**
 * ApplicationContext prepareRefresh.
 * init startUpDate, active status
 * get resourceLoader and load context paths
 *
 * @api private
 */
ApplicationContext.prototype.prepareRefresh = function() {
	this.startUpDate = Date.now();

	this.active = true;

	var opts = this.opts;

	if (opts['NODE_ENV']) {
		process.env.NODE_ENV = opts['NODE_ENV'];
	}

	if (opts['BEARCAT_ENV']) {
		process.env.BEARCAT_ENV = opts['BEARCAT_ENV'];
	}

	if (opts['NODE_CPATH']) {
		process.env.NODE_CPATH = opts['NODE_CPATH'];
	}

	if (opts['BEARCAT_CPATH']) {
		process.env.BEARCAT_CPATH = opts['BEARCAT_CPATH'];
	}

	if (opts['BEARCAT_LOGGER'] && opts['BEARCAT_LOGGER'] === 'off') {
		process.env.BEARCAT_LOGGER = 'off';
	}

	if (opts['BEARCAT_HOT'] && opts['BEARCAT_HOT'] === 'on') {
		process.env.BEARCAT_HOT = 'on';
	}

	if (opts['BEARCAT_ANNOTATION'] && opts['BEARCAT_ANNOTATION'] === 'off') {
		process.env.BEARCAT_ANNOTATION = 'off';
	}

	if (opts['BEARCAT_FUNCTION_STRING']) {
		process.env.BEARCAT_FUNCTION_STRING = true;
	}

	this.getResourceLoader();

	this.beanFactoryPostProcessors = [];

	var args = Utils.parseArgs(process.argv);
	var env = this.getEnv();
	env = args.env || args['--env'] || process.env.NODE_ENV || process.env.BEARCAT_ENV || env || Constant.DEFAULT_ENV;

	this.setEnv(env);

	var cpath = this.getConfigPath();
	cpath = args.cpath || args['--cpath'] || process.env.NODE_CPATH || process.env.BEARCAT_CPATH || cpath;

	this.setConfigPath(cpath);

	if (Utils.checkBrowser()) {
		return;
	}

	MetaUtil.cleanUp();
	var base = this.getBase();

	if (process.env.BEARCAT_LOGGER !== 'off') {
		var originLoggerConfigPath = Path.join(cpath, Constant.LOGPATH);
		var presentLoggerConfigPath = Path.join(cpath, env, Constant.LOGPATH);
		if (FileUtil.existsSync(originLoggerConfigPath)) {
			require('pomelo-logger').configure(originLoggerConfigPath, {
				base: base
			});
		} else if (FileUtil.existsSync(presentLoggerConfigPath)) {
			require('pomelo-logger').configure(presentLoggerConfigPath, {
				base: base
			});
		} else {
			// logger.error('logger file path configuration is error.');
		}
	}

	var hpath = this.getHotPath();
	// BEARCAT_HPATH can be array
	// process.env.BEARCAT_HPATH will JSON.stringify this value
	// so do not use process.env.BEARCAT_HPATH
	hpath = args.hpath || args['--hpath'] || opts['BEARCAT_HPATH'] || hpath;
	this.setHotPath(hpath);

	if (process.env.BEARCAT_HOT === 'on') {
		this.hotReloadFileWatch(hpath);
	}
}

/**
 * ApplicationContext refreshBeanFactory.
 * reload beanFactory with refresh metaObjects
 *
 * @api private
 */
ApplicationContext.prototype.refreshBeanFactory = function() {
	this.configLocations = this.getConfigLocations();

	this.loadDefaultConstraints();

	var len = this.configLocations.length;
	for (var i = 0; i < len; i++) {
		this.beanFactory.registerBeans(this.getResource(this.configLocations[i]));
	}

	if (!len) {
		this.beanFactory.registerBeans(this.getResource());
	}
}

/**
 * ApplicationContext try async loading script files when in the frontend.
 *
 * @api private
 */
ApplicationContext.prototype.tryAsyncLoading = function(cb) {
	if (!Utils.checkBrowser() || Utils.checkCocos2dJsb()) {
		return cb();
	}

	var loadBeans = this.loadBeans;
	if (!loadBeans || !loadBeans.length) {
		return cb();
	}

	return this.doAsyncLoading(cb);
}

/**
 * ApplicationContext internal do async loading script files when in the frontend.
 *
 * @api private
 */
ApplicationContext.prototype.doAsyncLoading = function(cb) {
	var loadBeans = this.loadBeans;

	var asyncScriptLoader = this.getAsyncScriptLoader();

	return asyncScriptLoader.load(loadBeans, cb);
}

/**
 * ApplicationContext try loading script files from bearcat-bootstrap.js when in cocos2d-js jsb env.
 *
 * @api private
 */
ApplicationContext.prototype.tryBootStrapLoading = function() {
	if (!Utils.checkCocos2dJsb()) {
		return;
	}

	if (Root.__bearcatData__ && Root.__bearcatData__.idPaths) {
		idPaths = Root.__bearcatData__.idPaths;
		var bootStrapLoader = this.getBootStrapLoader();

		return bootStrapLoader.load(idPaths);
	}
}

/**
 * ApplicationContext prepareBeanFactory.
 * register default beans into beanFactory
 *
 * @api private
 */
ApplicationContext.prototype.prepareBeanFactory = function() {
	var placeHolderConfigurer = new PlaceHolderConfigurer();
	if (Utils.isNotNull(this.env)) {
		placeHolderConfigurer.setEnv(this.env);
	}

	if (Utils.isNotNull(this.cpath)) {
		placeHolderConfigurer.setConfigPath(this.cpath);
	}

	var modelKeyMapResolver = new ModelKeyMapResolver();

	this.addBeanFactoryPostProcessor(placeHolderConfigurer);
	this.addBeanFactoryPostProcessor(modelKeyMapResolver);

}

/**
 * ApplicationContext registerBeanMeta.
 * register metaObject
 *
 * @param  {Object} metaObject
 * @api private
 */
ApplicationContext.prototype.registerBeanMeta = function(meta) {
	var id = meta['id'];
	if (!id) {
		logger.error('ApplicationContext registerBean error meta no id.');
		return;
	}

	var metaObject = {};
	metaObject[id] = meta;

	this.beanFactory.registerBeans(metaObject);
}

/**
 * ApplicationContext load default constraints.
 *
 * @api private
 */
ApplicationContext.prototype.loadDefaultConstraints = function() {
	for (var key in defaultConstraints) {
		this.getBeanByFunc(defaultConstraints[key]);
	}
}

/**
 * ApplicationContext hotReloadFileWatch.
 *
 * @param  {String} hpath hot reload path
 * @api private
 */
ApplicationContext.prototype.hotReloadFileWatch = function(hpath) {
	var self = this;
	var watcher = require('chokidar').watch(hpath, {
		ignored: /[\/\\]\./,
		ignoreInitial: true
	});

	if (!watcher) {
		return;
	}

	logger.info('bearcat hot reload watch %j', hpath);
	watcher.on('all', function(event, path) {
		if (event != 'change' && event != 'add') {
			return;
		}

		var filename = path;
		if (!Utils.checkString(filename)) {
			return;
		}

		var id = Utils.getFileName(filename, '.js'.length);

		if (!Utils.checkFileType(filename, '.js') || !Utils.isFile(filename)) {
			return;
		}

		var pid = process.pid;
		var s = Math.floor(Math.random(0, 1) * 5);
		var m = Math.floor(Math.random(0, 1) * 10);
		var p = Math.floor(Math.random(0, 1) * 100);
		var t = s * 1000 + p * (pid % 100) + p + s * m;

		var doHotReload = function() {
			logger.info('%s changed, bearcat start hot reloading %d ...', filename, t);
			var meta = Utils.myRequireHot(filename);
			if (!meta) {
				return;
			}

			if (Utils.checkFunction(meta)) {
				meta = MetaUtil.resolveFuncAnnotation(meta, null, true);
			}

			if (Utils.checkObject(meta)) {
				id = meta['id'];
				var func = meta['func'];

				if (event == 'add') {
					// dynamic add file
					logger.info('bearcat reload add bean %s', id);
					self.registerBeanMeta(meta);
				} else {
					if (id && Utils.checkFunction(func)) {
						var beanFactory = self.getBeanFactory();
						var beanFunc = beanFactory.getBeanFunction(id);

						self.doHotAddAttributes(meta, id);
						if (beanFunc) {
							var proto = func.prototype;

							logger.info('bearcat reload update bean %s', id);
							for (var key in proto) {
								// logger.info('bearcat reload update prototype %s:%s', id, key);
								beanFunc.prototype[key] = proto[key];
							}
						}
					}
				}
			}
			self.emit('reload');
			logger.info('bearcat hot reloading done ...');
		}

		setTimeout(doHotReload, t);
	});
}

/**
 * ApplicationContext do hot add attributes.
 *
 * @param  {Object} hot reload new metaObject
 * @param  {String} hot reload bean name
 * @api private
 */
ApplicationContext.prototype.doHotAddAttributes = function(metaObject, beanName) {
	var beanFactory = this.getBeanFactory();
	var beanFunc = beanFactory.getBeanFunction(beanName);
	var beanDefinition = beanFactory.getBeanDefinition(beanName);

	if (!beanDefinition) {
		return;
	}

	var beanPrototype = beanFunc.prototype;
	var propsOn = beanDefinition.getPropsOn();
	var props = metaObject.props;

	if (!Utils.checkArray(props)) {
		return;
	}

	for (var i = 0; i < props.length; i++) {
		(function(w) {
			var name = w.name;
			var flag = 1;

			for (j = 0; j < propsOn.length; j++) {
				var p = propsOn[j];
				if (name === p.getName()) {
					flag = 0;
					break;
				}
			}

			// new prop attribute
			if (flag) {
				var value = w.value;
				var ref = w.ref;
				var key = "";
				if (ref) {
					key = Constant.DEFINE_GETTER_PREFIX + name;
				}

				logger.info('hot reload add attribute %s to %s', name, beanName);
				beanPrototype.__defineGetter__(name, function() {
					if (value) {
						return value;
					}

					if (ref) {
						if (!this[key]) {
							this[key] = beanFactory.getBean(ref);
						}

						return this[key];
					}
				});
			}
		})(props[i]);
	}
}

ApplicationContext.prototype.postProcessBeanFactory = function() {

}

/**
 * ApplicationContext register bean post processors.
 *
 * @api private
 */
ApplicationContext.prototype.registerBeanPostProcessors = function() {
	var autoProxyCreator = new AutoProxyCreator();
	autoProxyCreator.setBeanFactory(this.getBeanFactory());
	this.beanFactory.addBeanPostProcessor(autoProxyCreator);
}

/**
 * ApplicationContext invoke bean factory post processors.
 *
 * @api private
 */
ApplicationContext.prototype.invokeBeanFactoryPostProcessors = function() {
	var beanFactory = this.getBeanFactory();
	var postProcessors = this.getBeanFactoryProcessors();
	for (var i = 0; i < postProcessors.length; i++) {
		var postProcessor = postProcessors[i];
		postProcessor.postProcessBeanFactory(beanFactory);
	}
}

/**
 * ApplicationContext finish beanFactory singleton beans intialization.
 *
 * @param  {Function} cb callback function
 * @api private
 */
ApplicationContext.prototype.finishBeanFactoryIntialization = function(cb) {
	this.beanFactory.preInstantiateSingletons(cb);
}

/**
 * ApplicationContext finish refresh event emit.
 *
 * @api private
 */
ApplicationContext.prototype.finishRefresh = function() {
	var self = this;
	this.emit('finishRefresh');

	if (process.browser) {
		return;
	}

	var listeners = process.listeners('SIGINT');
	if (listeners && listeners.length) {
		return;
	}

	var destroyFlag = false;
	var doDestroy = function() {
		if (destroyFlag) {
			return;
		}

		destroyFlag = true;
		logger.info('Bearcat starts destroying...');
		self.destroy();
		process.exit();
	}

	process.on('SIGINT', doDestroy);
	process.on('SIGTERM', doDestroy);
	process.on('SIGHUP', doDestroy);
}

/**
 * ApplicationContext cancel refresh.
 *
 * @api publish
 */
ApplicationContext.prototype.cancelRefresh = function() {
	this.active = false;
}

ApplicationContext.prototype.registerShutdownHook = function() {

}

/**
 * ApplicationContext destroy.
 *
 * @api public
 */
ApplicationContext.prototype.destroy = function() {
	this.close();
}

/**
 * ApplicationContext close.
 *
 * @api private
 */
ApplicationContext.prototype.close = function() {
	this.doClose();
}

/**
 * ApplicationContext do close.
 *
 * destroyBeans, closeBeanFactory, free resourceLoader, etc..
 * @api private
 */
ApplicationContext.prototype.doClose = function() {
	this.configLocations = null;
	this.startUpDate = null;
	this.active = false;
	if (this.hasBeanFactory()) {
		this.destroyBeans();
		this.closeBeanFactory();
	}

	MetaUtil.cleanUp();
	this.beanFactory = null;
	this.resourceLoader = null;
	this.beanFactoryPostProcessors = [];
	this.cpath = DEFAULT_LOAD_PATH;
	this.env = Constant.DEFAULT_ENV;
	this.emit('destroyed');
}

/**
 * ApplicationContext destroyBeans.
 *
 * @api private
 */
ApplicationContext.prototype.destroyBeans = function() {
	this.getBeanFactory().destroySingletons();
}

/**
 * ApplicationContext check whether applicationContext is active or not.
 *
 * @api public
 */
ApplicationContext.prototype.isActive = function() {
	return this.active;
}

/**
 * ApplicationContext getBean through beanName from applicationContext.
 *
 * @param   {String} beanName
 * @return  {Object} beanObject
 * @api public
 */
ApplicationContext.prototype.getBean = function(beanName) {
	var beanFactory = this.getBeanFactory();
	return beanFactory.getBean.apply(beanFactory, arguments);
}

/**
 * ApplicationContext getBean through metaObject from applicationContext.
 *
 * @param   {Object} meta metaObject
 * @return  {Object} beanObject
 * @api public
 */
ApplicationContext.prototype.getBeanByMeta = function(meta) {
	var id = meta['id'];
	if (!id) {
		logger.error('ApplicationContext getBeanByMeta error meta no id.');
		return;
	}

	if (!this.getBeanDefinition(id)) {
		this.registerBeanMeta(meta);

		this.invokeBeanFactoryPostProcessors();
	}

	arguments[0] = id;

	return this.beanFactory.getBeanProxy.apply(this.beanFactory, arguments);
}

/**
 * ApplicationContext getBean through $ annotation function from applicationContext.
 *
 * @param   {Function} func $ annotation function
 * @return  {Object}   beanObject
 * @api public
 */
ApplicationContext.prototype.getBeanByFunc = function(func) {
	var meta = MetaUtil.resolveFuncAnnotation(func);

	var id = meta['id'];
	if (!id) {
		logger.error('ApplicationContext getBeanByFunc error meta no id, add this.$id = "yourId" to your func.');
		return;
	}

	if (!this.getBeanDefinition(id)) {
		meta['lazy'] = true;
		this.registerBeanMeta(meta);

		this.invokeBeanFactoryPostProcessors();
	}

	arguments[0] = id;

	return this.beanFactory.getBeanProxy.apply(this.beanFactory, arguments);
}

/**
 * ApplicationContext getModel through modelId.
 *
 * @param   {String}   modelId
 * @return  {Object}   model
 * @api public
 */
ApplicationContext.prototype.getModel = function(modelId) {
	if (!modelId) {
		logger.error('ApplicationContext getModel error no modelId.');
		return;
	}

	return this.beanFactory.getModelProxy(modelId);
}

/**
 * ApplicationContext getModelDefinition through modelId.
 *
 * @param   {String}   modelId
 * @return  {Object}   modelDefinition
 * @api public
 */
ApplicationContext.prototype.getModelDefinition = function(modelId) {
	if (!modelId) {
		logger.error('ApplicationContext getModelDefinition error no modelId.');
		return;
	}

	return this.beanFactory.getModelDefinition(modelId);
}

/**
 * ApplicationContext get bean contructor function.
 *
 * @param  {String} beanName
 * @return {Function} bean constructor function
 * @api public
 */
ApplicationContext.prototype.getBeanFunction = function(beanName) {
	return this.beanFactory.getBeanFunction(beanName);
}

/**
 * ApplicationContext add module(bean) to IoC container through $ annotation function from applicationContext.
 *
 * @param   {Function} func $ annotation function
 * @api public
 */
ApplicationContext.prototype.module = function(func, context) {
	var meta = MetaUtil.resolveFuncAnnotation(func);
	var id = meta['id'];
	if (!id) {
		logger.error('ApplicationContext module error meta no id, add this.$id = "yourId" to your func.');
		return;
	}

	if (this.getBeanDefinition(id)) {
		return;
	}

	// node.js env
	if (!Utils.checkBrowser() && Utils.isNotNull(context) && context['exports']) {
		return context['exports'] = func;
	}

	// browser async load depended script files
	if (Utils.checkBrowser()) {
		var loader = this.getAsyncScriptLoader();
		loader.module(id, meta);
	}

	// register current bean meta
	return this.registerBeanMeta(meta);
}

/**
 * ApplicationContext service locator pattern define module.
 *
 * @param   {String}   id
 * @param   {Function} factory factory function
 * @api public
 */
ApplicationContext.prototype.define = function(id, factory, context) {
	// loader env
	if (process.env.LOADER_BIN && Utils.isNotNull(context) && context['exports']) {
		return context['exports'] = {
			id: id,
			func: factory
		};
	}

	return this.getModuleFactory().define(id, factory);
}

/**
 * ApplicationContext service locator pattern define module.
 *
 * @param   {String}   id
 * @param   {Function} factory factory function
 * @api public
 */
ApplicationContext.prototype.require = function(id) {
	return this.getModuleFactory().require(id);
}

/**
 * ApplicationContext add startup loaded bean ids.
 *
 * @param   {Array} startup loaded bean ids
 * @api public
 */
ApplicationContext.prototype.use = function(ids) {
	this.loadBeans = this.loadBeans.concat(ids);
}

/**
 * ApplicationContext async load bean with bean ids.
 *
 * @param   {Array}    loaded bean ids
 * @param   {Function} callback function
 * @api public
 */
ApplicationContext.prototype.async = function(ids, cb) {
	var asyncScriptLoader = new AsyncScriptLoader();
	return asyncScriptLoader.load(loadBeans, cb);
}

/**
 * ApplicationContext check ApplicationContext contains bean or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.containsBean = function(beanName) {
	return this.getBeanFactory().containsBean(beanName);
}

/**
 * ApplicationContext check bean is a singleton or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.isSingleton = function(beanName) {
	return this.getBeanFactory().isSingleton(beanName);
}

/**
 * ApplicationContext check bean is a prototype or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.isPrototype = function(beanName) {
	return this.getBeanFactory().isPrototype(beanName);
}

/**
 * ApplicationContext check ApplicationContext contains beanName beanDefinition or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
ApplicationContext.prototype.containsBeanDefinition = function(beanName) {
	return this.getBeanFactory().containsBeanDefinition(beanName);
}

/**
 * ApplicationContext check whether applicationContext is running or not.
 *
 * @return {Boolean} true|false
 * @api public
 */
ApplicationContext.prototype.isRunning = function() {
	return this.active;
}

/**
 * ApplicationContext close beanFactory.
 *
 * @api public
 */
ApplicationContext.prototype.closeBeanFactory = function() {
	this.getBeanFactory().destroyBeanFactory();
	this.beanFactory = null;
}

/**
 * ApplicationContext check whether applicationContext has beanFactory or not.
 *
 * @return {Boolean} true|false
 * @api public
 */
ApplicationContext.prototype.hasBeanFactory = function() {
	return this.beanFactory != null;
}

/**
 * ApplicationContext getBeanFactory.
 *
 * @return {Object} beanFactory
 * @api public
 */
ApplicationContext.prototype.getBeanFactory = function() {
	return this.beanFactory;
}

ApplicationContext.prototype.getModuleFactory = function() {
	if (!this.moduleFactory) {
		this.moduleFactory = new ModuleFactory();
	}

	return this.moduleFactory;
}

/**
 * ApplicationContext createBeanFactory.
 *
 * @api private
 */
ApplicationContext.prototype.createBeanFactory = function() {
	this.beanFactory = new BeanFactory();
}

/**
 * ApplicationContext get beanDefinition.
 *
 * @param  {String} beanName
 * @return {Object} beanDefinition
 * @api public
 */
ApplicationContext.prototype.getBeanDefinition = function(beanName) {
	return this.getBeanFactory().getBeanDefinition(beanName);
}

/**
 * ApplicationContext remove beanDefinition from ApplicationContext.
 *
 * @param  {String} beanName
 * @api public
 */
ApplicationContext.prototype.removeBeanDefinition = function(beanName) {
	return this.getBeanFactory().removeBeanDefinition(beanName);
}

/**
 * ApplicationContext set env.
 *
 * @param {String} env
 * @api public
 */
ApplicationContext.prototype.setEnv = function(env) {
	this.env = env;
}

/**
 * ApplicationContext get env.
 *
 * @return {String} env
 * @api public
 */
ApplicationContext.prototype.getEnv = function() {
	return this.env;
}

/**
 * ApplicationContext set config path.
 *
 * @param {String} cpath config path
 * @api public
 */
ApplicationContext.prototype.setConfigPath = function(cpath) {
	this.cpath = cpath;
}

/**
 * ApplicationContext get config path.
 *
 * @return {String} config path
 * @api public
 */
ApplicationContext.prototype.getConfigPath = function() {
	return this.cpath;
}

/**
 * ApplicationContext set hot reload path.
 *
 * @param {String} hpath hot reload path
 * @api public
 */
ApplicationContext.prototype.setHotPath = function(hpath) {
	this.hpath = hpath;
}

/**
 * ApplicationContext get hot reload path.
 *
 * @return {String} hpath hot reload path
 * @api public
 */
ApplicationContext.prototype.getHotPath = function() {
	return this.hpath;
}

/**
 * ApplicationContext get base path.
 *
 * @return {String} base path
 * @api public
 */
ApplicationContext.prototype.getBase = function() {
	return this.base;
}
}).call(this,require('_process'))
},{"../aop/autoproxy/autoProxyCreator":111,"../beans/beanFactory":118,"../beans/moduleFactory":119,"../beans/support/placeHolderConfigurer":125,"../model/constraints":129,"../model/modelKeyMapResolver":134,"../resource/asyncScriptLoader":136,"../resource/bootStrapLoader":137,"../resource/resourceLoader":141,"../util/constant":144,"../util/fileUtil":145,"../util/metaUtil":146,"../util/requireUtil":149,"../util/utils":151,"_process":163,"chokidar":168,"events":159,"pomelo-logger":169}],129:[function(require,module,exports){
(function (__dirname){
var Utils = require('../../util/utils');

var Constraints = {};
if (!Utils.checkBrowser()) {
	var fs = require('fs');
	var path = require('path');

	fs.readdirSync(__dirname).forEach(function(filename) {
		if (!/\.js$/.test(filename)) {
			return;
		}

		if (filename === 'index.js') {
			return;
		}

		var name = path.basename(filename, '.js');

		function load() {
			return require(__dirname + '/' + name);
		}

		Constraints.__defineGetter__(name, load);
	});
}

module.exports = Constraints;
}).call(this,"/lib/model/constraints")
},{"../../util/utils":151,"fs":154,"path":162}],130:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelAttribute
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Constant = require('../util/constant');
var Utils = require('../util/utils');
var Util = require('util');

/**
 * ModelAttribute constructor function.
 *
 * @api public
 */
var ModelAttribute = function() {
	this.ref = null;
	this.name = null;
	this.type = null;
	this.prefix = null;
	this.default = null;
	this.primary = false;
	this.balance = false;
	this.constraints = [];
	this.expression = null;
}

/**
 * ModelAttribute do filter attribute value.
 *
 * @param   {String} 	attribute value
 * @return  {Error}  	Error
 * @api public
 */
ModelAttribute.prototype.filter = function(value) {
	if (!Utils.isNotNull(value)) {
		return;
	}

	var r = this.filterType(value);
	if (Utils.checkModelFilterError(r)) {
		return r;
	}

	var key = this.name;
	var constraints = this.constraints;
	var constraintMethod = Constant.CONSTRAINT_METHOD;

	for (var i = 0; i < constraints.length; i++) {
		var constraint = constraints[i];
		if (constraint && Utils.checkFunction(constraint[constraintMethod])) {
			r = constraint[constraintMethod](key, value);
			if (Utils.checkModelFilterError(r)) {
				return r;
			}
		}
	}

	return;
}

/**
 * ModelAttribute do filter attribute value type.
 *
 * @param   {String} 	attribute value
 * @return  {Error} 	Error
 * @api private
 */
ModelAttribute.prototype.filterType = function(value) {
	var type = this.type;
	if (!Utils.checkString(type)) {
		return;
	}

	var Type = type;

	var isType = Utils.isType(Type);

	var r = isType(value);

	if (r !== true) {
		var message = 'field: %s with value: %s error, type not matched with %s';
		return new Error(Util.format(message, this.name, value, Type));
	}

	return;
}

/**
 * ModelAttribute do parse attribute expression.
 *
 * @param   {String} attribute expression
 * @param   {Object} bean factory
 * @api private
 */
ModelAttribute.prototype.parse = function(expression, beanFactory) {
	if (!expression) {
		return;
	}

	expression = expression.replace(/\s/g, "");

	var f = expression[0];
	if (f !== Constant.CONSTRAINT_ANNOTATION) {
		return;
	}

	expression = expression.substr(1);

	var list = expression.split(Constant.CONSTRAINT_SPLIT); // split by ;

	for (var i = 0; i < list.length; i++) {
		var name = "";
		var value = "";
		var index = -1;
		var props = [];

		var item = list[i];

		// continue with ""
		if (!item) {
			continue;
		}

		// "$primary;"
		if (item === Constant.MODEL_ATTRIBUTE_PRIMARY) {
			this[item] = true;
			continue;
		}

		// "$balance;"
		if (item === Constant.MODEL_ATTRIBUTE_BALANCE) {
			this[item] = true;
			continue;
		}

		index = item.indexOf(":");
		// "$type:String;default:aaa"
		if (index != -1) {
			var p = item.split(":");
			name = p[0].toLowerCase();

			if (p.length >= 2) {
				value = p[1];
				if (this.checkProps(name)) {
					if (name === "type") {
						value = Utils.normalizeType(value);
					}

					this[name] = value;
					continue;
				}
				// max:10
				else {
					props.push({
						name: name,
						value: value
					});
				}
			}
		}

		index = item.indexOf("(");

		if (index != -1) {
			name = item.substr(0, index);
			// no prefix name
			if (!name) {
				continue;
			}

			var left = item.substr(index);
			var len = left.length;
			// no this case
			// if (len < 1) {
			// 	continue;
			// }
			var last = left[len - 1];
			if (last !== ")") {
				continue;
			}

			left = left.substr(1, len - 2);
			var leftList = left.split(",");

			for (var j = 0; j < leftList.length; j++) {
				var leftProp = leftList[j].split("=");
				var leftPropLen = leftProp.length;

				if (leftPropLen < 2) {
					continue;
				}

				if (!leftProp[0] || !leftProp[1]) {
					continue;
				}

				props.push({
					name: leftProp[0],
					value: leftProp[1]
				});
			}
		}

		if (!name) {
			name = item;
		}

		var constraint = beanFactory.getConstraint(name);
		if (!constraint) {
			continue;
		}

		var constraintDefinition = beanFactory.getConstraintDefinition(name);

		var constraintExpression = constraintDefinition.getConstraint();
		if (constraintExpression) {
			this.parse(constraintExpression, beanFactory)
		}

		var propsLen = props.length;
		if (propsLen) {
			for (var k = 0; k < propsLen; k++) {
				var prop = props[k];
				var propName = prop['name'];
				var propValue = prop['value'];
				constraint[propName] = propValue;
			}
		}

		this.addConstraints(constraint);
	}
}

/**
 * ModelAttribute set expression.
 *
 * @param   {String} expression
 * @api public
 */
ModelAttribute.prototype.setExpression = function(expression) {
	this.expression = expression;
}

/**
 * ModelAttribute get expression.
 *
 * @return   {String} expression
 * @api public
 */
ModelAttribute.prototype.getExpression = function() {
	return this.expression;
}

/**
 * ModelAttribute set ref.
 *
 * @param   {String} ref string.
 * @api public
 */
ModelAttribute.prototype.setRef = function(ref) {
	this.ref = ref;
}

/**
 * ModelAttribute get ref.
 *
 * @return   {String} ref string.
 * @api public
 */
ModelAttribute.prototype.getRef = function() {
	return this.ref;
}

/**
 * ModelAttribute set attribute name.
 *
 * @param   {String} attribute name.
 * @api public
 */
ModelAttribute.prototype.setName = function(name) {
	this.name = name;
}

/**
 * ModelAttribute get attribute name.
 *
 * @return   {String} attribute name.
 * @api public
 */
ModelAttribute.prototype.getName = function() {
	return this.name;
}

/**
 * ModelAttribute set attribute type.
 *
 * @param   {String} attribute type.
 * @api public
 */
ModelAttribute.prototype.setType = function(type) {
	this.type = type;
}

/**
 * ModelAttribute get attribute type.
 *
 * @return   {String} attribute type.
 * @api public
 */
ModelAttribute.prototype.getType = function(type) {
	return this.type;
}

/**
 * ModelAttribute set attribute primary.
 *
 * @param   {Boolean} if it is the attribute primary.
 * @api public
 */
ModelAttribute.prototype.setPrimary = function(primary) {
	this.primary = primary;
}

/**
 * ModelAttribute get attribute primary.
 *
 * @return   {Boolean} attribute primary.
 * @api public
 */
ModelAttribute.prototype.getPrimary = function() {
	return this.primary;
}

/**
 * ModelAttribute set attribute default value.
 *
 * @param   {String} attribute default value.
 * @api public
 */
ModelAttribute.prototype.setDefault = function(defaultValue) {
	this.default = defaultValue;
}

/**
 * ModelAttribute get attribute default value.
 *
 * @return   {String} attribute default value.
 * @api public
 */
ModelAttribute.prototype.getDefault = function() {
	return this.default;
}

/**
 * ModelAttribute set attribute prefix.
 *
 * @param   {String} attribute prefix.
 * @api public
 */
ModelAttribute.prototype.setPrefix = function(prefix) {
	this.prefix = prefix;
}

/**
 * ModelAttribute get attribute prefix.
 *
 * @return   {String} attribute prefix.
 * @api public
 */
ModelAttribute.prototype.getPrefix = function() {
	return this.prefix;
}

/**
 * ModelAttribute check if it is a primary attribute.
 *
 * @param   {Boolean} if it is a primary attribute.
 * @api public
 */
ModelAttribute.prototype.isPrimary = function() {
	return this.primary;
}

/**
 * ModelAttribute check if it is a balance attribute.
 *
 * @param   {Boolean} if it is a balance attribute.
 * @api public
 */
ModelAttribute.prototype.isBalance = function() {
	return this.balance;
}

/**
 * ModelAttribute add constraint.
 *
 * @param   {Object} constraint object.
 * @api public
 */
ModelAttribute.prototype.addConstraints = function(constraint) {
	this.constraints.push(constraint);
}

/**
 * ModelAttribute check attribute properties.
 *
 * @param   {Boolean} check result.
 * @api private
 */
ModelAttribute.prototype.checkProps = function(key) {
	var attributes = Constant.MODEL_ATTRIBUTES;
	for (var i = 0; i < attributes.length; i++) {
		if (key === attributes[i]) {
			return true;
		}
	}

	return false;
}

module.exports = ModelAttribute;
},{"../util/constant":144,"../util/utils":151,"util":165}],131:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelConstraint
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

/**
 * ModelConstraint constructor function.
 *
 * @api public
 */
var ModelConstraint = function() {
	this.id = null;
	this.cid = null;
	this.constraint = null;
}

/**
 * ModelConstraint set bean id.
 *
 * @param   {String} bean id
 * @api public
 */
ModelConstraint.prototype.setId = function(id) {
	this.id = id;
}

/**
 * ModelConstraint get bean id.
 *
 * @return   {String} bean id
 * @api public
 */
ModelConstraint.prototype.getId = function() {
	return this.id;
}

/**
 * ModelConstraint set constraint id.
 *
 * @param   {String} constraint id
 * @api public
 */
ModelConstraint.prototype.setCid = function(cid) {
	this.cid = cid;
}

/**
 * ModelConstraint get bean id.
 *
 * @return   {String} constraint id
 * @api public
 */
ModelConstraint.prototype.getCid = function() {
	return this.cid;
}

/**
 * ModelConstraint set constraint expression.
 *
 * @param   {String} constraint expression
 * @api public
 */
ModelConstraint.prototype.setConstraint = function(constraint) {
	this.constraint = constraint;
}

/**
 * ModelConstraint get constraint expression.
 *
 * @return   {String} constraint expression
 * @api public
 */
ModelConstraint.prototype.getConstraint = function() {
	return this.constraint;
}

module.exports = ModelConstraint;
},{}],132:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelDefinition
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Utils = require('../util/utils');

/**
 * ModelDefinition constructor function.
 *
 * @api public
 */
var ModelDefinition = function() {
	this.id = null;
	this.mid = null;
	this.table = null;
	this.prefix = null;
	this.balance = null;
	this.fields = {};
	this.refFields = [];
	this.modelKeyMap = {};
	this.oneToMany = false;
}

/**
 * ModelDefinition set bean id.
 *
 * @param   {String} bean id
 * @api public
 */
ModelDefinition.prototype.setId = function(id) {
	this.id = id;
}

/**
 * ModelDefinition get bean id.
 *
 * @return   {String} bean id
 * @api public
 */
ModelDefinition.prototype.getId = function() {
	return this.id;
}

/**
 * ModelDefinition set model id.
 *
 * @param   {String} model id
 * @api public
 */
ModelDefinition.prototype.setMid = function(mid) {
	this.mid = mid;
}

/**
 * ModelDefinition get model id.
 *
 * @return   {String} model id
 * @api public
 */
ModelDefinition.prototype.getMid = function() {
	return this.mid;
}

/**
 * ModelDefinition set ORM table.
 *
 * @param   {String} ORM table
 * @api public
 */
ModelDefinition.prototype.setTable = function(table) {
	if (!table) {
		return;
	}

	this.table = table;
}

/**
 * ModelDefinition get ORM table.
 *
 * @return   {String} ORM table
 * @api public
 */
ModelDefinition.prototype.getTable = function() {
	return this.table;
}

/**
 * ModelDefinition set model definition prefix.
 *
 * @param   {String} model definition prefix
 * @api public
 */
ModelDefinition.prototype.setPrefix = function(prefix) {
	if (!prefix) {
		return;
	}

	this.prefix = prefix;
}

/**
 * ModelDefinition get model definition prefix.
 *
 * @return   {String} model definition prefix
 * @api public
 */
ModelDefinition.prototype.getPrefix = function() {
	return this.prefix;
}

/**
 * ModelDefinition set model definition balance field for ddb sharding.
 *
 * @param   {String} model definition balance field
 * @api public
 */
ModelDefinition.prototype.setBalance = function(balance) {
	if (!balance) {
		return;
	}

	this.balance = balance;
}

/**
 * ModelDefinition get model definition balance field for ddb sharding.
 *
 * @return   {String} model definition balance field
 * @api public
 */
ModelDefinition.prototype.getBalance = function() {
	return this.balance;
}

/**
 * ModelDefinition set model fields.
 *
 * @param   {Array} model fields
 * @api public
 */
ModelDefinition.prototype.setFields = function(fields) {
	if (Utils.isNotNull(fields)) {
		this.fields = fields;
	}
}

/**
 * ModelDefinition get model fields.
 *
 * @return   {Array} model fields
 * @api public
 */
ModelDefinition.prototype.getFields = function() {
	return this.fields;
}

/**
 * ModelDefinition get model field by key.
 *
 * @return   {Object} model field
 * @api public
 */
ModelDefinition.prototype.getField = function(key) {
	return this.fields[key];
}

/**
 * ModelDefinition add ref field name.
 *
 * @param   {String} ref field name
 * @api public
 */
ModelDefinition.prototype.addRefField = function(refField) {
	this.refFields.push(refField);
}

/**
 * ModelDefinition set ref fields.
 *
 * @param   {Array} ref fields
 * @api public
 */
ModelDefinition.prototype.setRefFields = function(refFields) {
	if (Utils.isNotNull(refFields)) {
		this.refFields = refFields;
	}
}

/**
 * ModelDefinition get ref fields.
 *
 * @return   {Array} ref fields
 * @api public
 */
ModelDefinition.prototype.getRefFields = function() {
	return this.refFields;
}

/**
 * ModelDefinition set model key map used for resultSet to model object mapping.
 *
 * @param   {Object} model key map
 * @api public
 */
ModelDefinition.prototype.setModelKeyMap = function(modelKeyMap) {
	this.modelKeyMap = modelKeyMap;
}

/**
 * ModelDefinition get model key map used for resultSet to model object mapping.
 *
 * @return   {Object} model key map
 * @api public
 */
ModelDefinition.prototype.getModelKeyMap = function() {
	return this.modelKeyMap;
}

/**
 * ModelDefinition set model oneToMany relation.
 *
 * @param   {Boolean} oneToMany relation
 * @api public
 */
ModelDefinition.prototype.setOneToMany = function(oneToMany) {
	this.oneToMany = oneToMany;
}

/**
 * ModelDefinition check model oneToMany relation.
 *
 * @return   {Boolean} if it is oneToMany relation
 * @api public
 */
ModelDefinition.prototype.isOneToMany = function() {
	return this.oneToMany;
}

module.exports = ModelDefinition;
},{"../util/utils":151}],133:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelFilter
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'ModelFilter');
var Utils = require('../util/utils');

/**
 * ModelFilter constructor function.
 *
 * @api public
 */
var ModelFilter = function() {
	this.modelBean = null;
	this.modelDefinition = null;
}

/**
 * ModelFilter set model object ref.
 *
 * @param   {Object} model object ref
 * @api public
 */
ModelFilter.prototype.setModel = function(modelBean) {
	this.modelBean = modelBean;
}

/**
 * ModelFilter get model object ref.
 *
 * @return   {Object} model object ref
 * @api public
 */
ModelFilter.prototype.getModel = function() {
	return this.modelBean;
}

/**
 * ModelFilter set model definition.
 *
 * @param   {Object} model definition
 * @api public
 */
ModelFilter.prototype.setModelDefinition = function(modelDefinition) {
	this.modelDefinition = modelDefinition;
}

/**
 * ModelFilter get model definition.
 *
 * @return   {Object} model definition
 * @api public
 */
ModelFilter.prototype.getModelDefinition = function() {
	return this.modelDefinition;
}

/**
 * ModelFilter model filter key/value attribute.
 *
 * @param   {String} model attribute key
 * @param   {String} model attribute value
 * @api public
 */
ModelFilter.prototype.filter = function(key, value) {
	if (Utils.checkString(key)) {
		return this.doFilterKey(key, value);
	}

	return this.doFilterKeys();
}

/**
 * ModelFilter do model filter key/value attribute.
 *
 * @param   {String} 		model attribute key
 * @param   {String} 		model attribute value
 *
 * @return  {Boolean|Error} true|false|Error
 * @api private
 */
ModelFilter.prototype.doFilterKey = function(key, value) {
	var field = this.modelDefinition.getField(key);
	if (field) {
		return field.filter(value);
	}
}

/**
 * ModelFilter do model filter key/value attributes.
 *
 * @param   {String} 	model attribute key
 * @param   {String} 	model attribute value
 *
 * @return  {Error} 	Error
 * @api private
 */
ModelFilter.prototype.doFilterKeys = function() {
	var fields = this.modelDefinition.getFields();

	for (var key in fields) {
		var field = fields[key];
		var value = this.modelBean[key];
		var r = field.filter(value);
		if (Utils.checkModelFilterError(r)) {
			return r;
		}
	}

	return;
}

module.exports = ModelFilter;
},{"../util/utils":151,"pomelo-logger":169}],134:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelKeyMapResolver
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'ModelKeyMapResolver');

/**
 * ModelKeyMapResolver constructor function.
 *
 * @api public
 */
var ModelKeyMapResolver = function() {

}

/**
 * ModelKeyMapResolver post process beanFactory.
 *
 * @param  {Object} beanFactory
 * @api public
 */
ModelKeyMapResolver.prototype.postProcessBeanFactory = function(beanFactory) {
	this.processModelKeyMap(beanFactory);
}

/**
 * ModelKeyMapResolver process model key map.
 *
 * @param  {Object} beanFactory
 * @api public
 */
ModelKeyMapResolver.prototype.processModelKeyMap = function(beanFactory) {
	var models = beanFactory.getModelDefinitions();

	for (var modelId in models) {
		var modelDefinition = models[modelId];
		var modelKeyMap = {};
		this.processModelDefinition(beanFactory, modelDefinition, modelKeyMap, {});
		modelDefinition.setModelKeyMap(modelKeyMap);
	}
}

/**
 * ModelKeyMapResolver post model definition.
 *
 * @param  {Object} beanFactory
 * @param  {Object} modelDefinition
 * @param  {Object} modelKeyMap
 * @param  {Object} option
 * @api public
 */
ModelKeyMapResolver.prototype.processModelDefinition = function(beanFactory, modelDefinition, modelKeyMap, option) {
	var fields = modelDefinition.getFields();

	var modelId = modelDefinition.getMid();
	var prefix = modelDefinition.getPrefix();
	var optionPrefix = option['prefix'] || prefix;
	var parentId = option['pid'];
	var parentType = option['ptype'];
	var parentField = option['pfield'];

	for (var fieldName in fields) {
		var field = fields[fieldName];
		var fieldName = field.getName();
		var modelRefId = field.getRef();
		var fieldPrefix = field.getPrefix();
		var fieldType = field.getType();

		var modelKey = "";
		if (optionPrefix) {
			modelKey += optionPrefix;
		}

		modelKey = modelKey + fieldName;

		if (modelRefId) {
			var modelRefDefinition = beanFactory.getModelDefinition(modelRefId);

			if (!modelRefDefinition) {
				logger.warn('model field ref id %s not exsit', modelRefId);
				continue;
			}

			var option = {
				pid: modelId,
				ptype: fieldType,
				pfield: fieldName
			};

			if (fieldPrefix) {
				option['prefix'] = fieldPrefix;
			}

			this.processModelDefinition(beanFactory, modelRefDefinition, modelKeyMap, option);
			continue;
		}

		modelKeyMap[modelKey] = {
			id: modelId,
			pid: parentId,
			ptype: parentType,
			pfield: parentField,
			fieldName: fieldName,
			type: fieldType
		};
	}
}

module.exports = ModelKeyMapResolver;
},{"pomelo-logger":169}],135:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelProxy
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'ModelProxy');
var Constant = require('../util/constant');
var Utils = require('../util/utils');

/**
 * ModelProxy constructor function.
 *
 * @api public
 */
var ModelProxy = function() {
	this.model = null;
	this.modelFilter = null;
	this.beanFactory = null;
	this.beanDefinition = null;
	this.modelDefinition = null;
	this.beforeNames = [];
	this.afterNames = [];
	this.beforeName = null;
	this.afterName = null;
	this.beforeFlag = false;
	this.afterFlag = false;
}

/**
 * ModelProxy set key/value to model.
 *
 * @param  {String} 	key
 * @param  {Object} 	value
 * @return {Object} 	Error object when set value failed
 * @api public
 */
ModelProxy.prototype.$set = function(key, value) {
	var model = this.model;
	this['beforeFlag'] = true; // setup before flag, enable builtin constaints by default
	var befores = this._getFilters(Constant.MODEL_FILTER_BEFORE);

	// do model before filters
	var r = this._doFilters(befores, key, value);

	if (Utils.checkModelFilterError(r)) {
		return this._result(r);
	}

	//  setup value
	model[key] = value;

	var afters = this._getFilters(Constant.MODEL_FILTER_AFTER);

	// do model after filters
	r = this._doFilters(afters, key, value);

	if (Utils.checkModelFilterError(r)) {
		return this._result(r);
	}

	return this._result(r);
}

/**
 * ModelProxy get data from model.
 *
 * @param  {String} key
 * @return {Object} data value
 * @api public
 */
ModelProxy.prototype.$get = function(key) {
	return this.model[key];
}

/**
 * ModelProxy pack data object to model.
 *
 * @param  {Object} 	data
 * @return {Object} 	Error object when pack data failed
 * @api public
 */
ModelProxy.prototype.$pack = function(data) {
	if (!Utils.checkObject(data)) {
		return new Error('pack data must be Object');
	}

	var model = this.model;

	for (var key in data) {
		var value = data[key];
		model[key] = value;
	}

	this['afterFlag'] = true;

	// $pack only have after filters
	var afters = this._getFilters(Constant.MODEL_FILTER_AFTER);

	// do model after filters
	var r = this._doFilters(afters);

	if (Utils.checkModelFilterError(r)) {
		return this._result(r);
	}

	return this._result(r);
}

/**
 * ModelProxy pack db ResultSet data to model.
 *
 * @param  {Object} resultSet data
 * @return {Object|Boolean} Error|true
 * @api public
 */
ModelProxy.prototype.$packResultSet = function(resultSet) {
	if (!Utils.checkObject(resultSet)) {
		return new Error('resultSet must be Object');
	}

	var beanFactory = this.beanFactory;
	var resultModelId = this.modelDefinition.getMid();
	var resultModel = this;

	if (!resultModel) {
		logger.error('packResultSet error no such result model %s', resultModelId);
		return;
	}

	var modelKeyMap = this.modelDefinition.getModelKeyMap();

	var dataResult = resultSet;

	var modelResultMap = {};
	for (var dataKey in dataResult) {
		var dataValue = dataResult[dataKey];
		if (Utils.checkFunction(dataValue)) {
			continue;
		}

		var modelMap = modelKeyMap[dataKey];
		if (!modelMap) {
			logger.warn('packResultSet resultSet key %s does not match any model attribute', dataKey);
			continue;
		}

		var modelId = modelMap['id'];
		var fieldName = modelMap['fieldName'];
		var fieldType = modelMap['type'];
		var pid = modelMap['pid'] || modelId;
		var pfield = modelMap['pfield'] || fieldName;
		var ptype = modelMap['ptype'];

		var model;
		if (Utils.checkTypeArray(ptype) || Utils.checkTypeObject(ptype)) {
			var modelResultMapKey = pid + "_" + pfield;
			model = modelResultMap[modelResultMapKey];
			if (!model) {
				model = beanFactory.getModelProxy(modelId);
				modelResultMap[modelResultMapKey] = model; // ref model object
			}
		} else {
			model = this;
		}

		var r = model.$before().$set(fieldName, dataValue); // set data, do filter
		if (Utils.checkModelFilterError(r)) {
			return r;
		}
	}

	this._doPackResultSet(resultModel, modelResultMap);
}

/**
 * ModelProxy set before filter to model.
 * filter can be String which is the name of the filter method in the model
 * or can be Array which contains the filter methods in order
 *
 * @param  {String|Array} before filter
 * @api public
 */
ModelProxy.prototype.$before = function(before) {
	return this._filter(Constant.MODEL_FILTER_BEFORE, before);
}

/**
 * ModelProxy set after filter to model.
 * filter can be String which is the name of the filter method in the model
 * or can be Array which contains the filter methods in order
 *
 * @param  {String|Array} after filter
 * @api public
 */
ModelProxy.prototype.$after = function(after) {
	return this._filter(Constant.MODEL_FILTER_AFTER, after);
}

ModelProxy.prototype.$clone = function() {

}

/**
 * ModelProxy  model proxy init.
 *
 * @api private
 */
ModelProxy.prototype._modelInit = function() {
	var beanDefinition = this.beanDefinition;
	if (!beanDefinition) {
		logger.error('init error no beanDefinition.');
		return;
	}

	var self = this;

	var func = beanDefinition.getFunc();

	if (Utils.checkFunction(func)) {
		var proto = func.prototype;
		for (interface in proto) {
			if (Utils.checkFunction(proto[interface])) {
				(function(method) {
					if (checkFuncName(method)) {
						logger.error('init error proxy method interface %j the same as ModelProxy, rename this name to another.', method)
						return;
					};

					self[method] = function() {
						return self._modelInvoke(method, arguments);
					};
				})(interface);
			}
		}
	}
}

/**
 * ModelProxy model proxy invoke methods.
 *
 * @param  {String} invoke method name
 * @param  {Array}  invoke arguments
 * @return {Object} invoke result
 * @api private
 */
ModelProxy.prototype._modelInvoke = function(method, args) {
	var targetModel = this.model;
	if (Utils.checkFunction(targetModel[method])) {
		return targetModel[method].apply(targetModel, args);
	} else {
		logger.error('invoke error with %s %j', method, args);
	}
}

/**
 * ModelProxy do pack db ResultSet data to model.
 *
 * @param  {Object} resultSet data
 * @return {Object|Boolean} Error|true
 * @api private
 */
ModelProxy.prototype._doPackResultSet = function(resultModel, modelResultMap) {
	var resultModelFields = resultModel.modelDefinition.getFields();
	var resultModelId = resultModel.modelDefinition.getMid();
	var beanFactory = this.beanFactory;

	for (var resultFieldKey in resultModelFields) {
		var resultField = resultModelFields[resultFieldKey];
		var resultFieldRef = resultField.getRef();
		var resultFieldType = resultField.getType();
		var key = resultModelId + "_" + resultFieldKey;
		var value = modelResultMap[key];

		if (!Utils.isNotNull(value) && resultFieldRef) {
			var refModel = beanFactory.getModelProxy(resultFieldRef);
			if (refModel) {
				this._doPackResultSet(refModel, modelResultMap);
				value = refModel;
			}
		}

		if (!Utils.isNotNull(value)) {
			continue;
		}

		var oneToMany = false;
		if (Utils.checkTypeArray(resultFieldType)) {
			oneToMany = true;
		}

		if (oneToMany) {
			var resultFieldValue = resultModel.$get(resultFieldKey);
			if (!Utils.checkArray(resultFieldValue)) {
				resultFieldValue = [];
			}

			resultFieldValue.push(value);
			resultModel['model'][resultFieldKey] = resultFieldValue;
			continue;
		}

		resultModel.$set(resultFieldKey, value);
	}
}

/**
 * ModelProxy do set filter to model.
 *
 * @param  {String}       filter type
 * @param  {String|Array} filter
 * @api private
 */
ModelProxy.prototype._filter = function(type, filter) {
	if (type !== Constant.MODEL_FILTER_BEFORE && type !== Constant.MODEL_FILTER_AFTER) {
		logger.warn('unknow model filter type %s', type);
		return this;
	}

	this[type + 'Flag'] = true;

	if (Utils.checkString(filter)) {
		this[type + 'Name'] = filter;
	}

	if (Utils.checkArray(filter)) {
		this[type + 'Names'] = filter;
	}

	return this;
}

/**
 * ModelProxy get filters by type.
 *
 * @param  {String} filter type
 * @param  {Array} 	filters
 * @api private
 */
ModelProxy.prototype._getFilters = function(type) {
	if (type !== Constant.MODEL_FILTER_BEFORE && type !== Constant.MODEL_FILTER_AFTER) {
		return;
	}

	var filters = [];

	// before filter
	// before + after filter only do the builtin filter once
	if (type === Constant.MODEL_FILTER_BEFORE ||
		(type === Constant.MODEL_FILTER_AFTER && !this.beforeFlag)) {
		if (this[type + 'Flag']) {
			filters.push({
				type: Constant.FILTER_BUILTIN,
				method: Constant.FILTER_BUILTIN_METHOD // "filter"
			});
		}
	}

	var filterName = this[type + 'Name'];
	if (filterName) {
		var filterArray = this._modelInvoke(filterName);
		if (Utils.checkArray(filterArray)) {
			for (var i = 0; i < filterArray.length; i++) {
				filters.push({
					type: Constant.FILTER_MODEL,
					method: filterArray[i]
				});
			}
		}
	}

	var filterNames = this[type + 'Names'];
	for (var j = 0; j < filterNames.length; j++) {
		filters.push({
			type: Constant.FILTER_MODEL,
			method: filterNames[j]
		});
	}

	return filters;
}

/**
 * ModelProxy do filters with key value.
 *
 * @param  {Array}  filters
 * @param  {String} key
 * @param  {Object} value
 * @return {Error}  Error object
 * @api private
 */
ModelProxy.prototype._doFilters = function(filters, key, value) {
	if (!filters || !filters.length) {
		return;
	}

	var r;
	for (var i = 0; i < filters.length; i++) {
		var filter = filters[i];
		var type = filter['type'];
		var method = filter['method'];
		if (type === Constant.FILTER_BUILTIN) {
			r = this.modelFilter[method](key, value);
			if (Utils.checkModelFilterError(r)) {
				return r;
			}
		}

		if (type === Constant.FILTER_MODEL) {
			var args = [];
			if (Utils.isNotNull(key)) args.push(key);
			if (Utils.isNotNull(value)) args.push(value);
			r = this._modelInvoke(method, args); // just call the filter method
			if (Utils.checkModelFilterError(r)) {
				return r;
			}
		}
	}

	return;
}

/**
 * ModelProxy reset result.
 *
 * @param  {Object}  result
 * @return {Object}  result
 * @api private
 */
ModelProxy.prototype._result = function(r) {
	this._reset(Constant.MODEL_FILTER_BEFORE);
	this._reset(Constant.MODEL_FILTER_AFTER);

	return r;
}

/**
 * ModelProxy reset filter.
 *
 * @param  {String}  filter type
 * @api private
 */
ModelProxy.prototype._reset = function(type) {
	if (type !== Constant.MODEL_FILTER_BEFORE && type !== Constant.MODEL_FILTER_AFTER) {
		return;
	}

	this[type + 'Flag'] = false;
	this[type + 'Name'] = null;
	this[type + 'Names'] = [];
}

/**
 * ModelProxy toJSON.
 *
 * @api public
 */
ModelProxy.prototype.toJSON = function() {
	return this.model;
}

var names = ["_modelInit", "_modelInvoke", "$set", "$pack", "$packResultSet",
	"_doPackResultSet", "$get", "$before", "$after", "_filter", "$clone",
	"_getFilters", "_doFilters", "_result", "_reset", "toJSON"
];

var checkFuncName = function(name) {
	for (var i = 0; i < names.length; i++) {
		if (name === names[i]) {
			return true;
		}
	}

	return false;
}

module.exports = ModelProxy;
},{"../util/constant":144,"../util/utils":151,"pomelo-logger":169}],136:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat AsyncScriptLoader
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'AsyncScriptLoader');
var BeanModule = require('../beans/support/beanModule');
var Path = require('../util/requireUtil').requirePath();
var ScriptUtil = require('../util/scriptUtil');
var Utils = require('../util/utils');
var cid = 1;

var Root;
(function() {
	Root = this;
}());

/**
 * AsyncScriptLoader constructor function.
 *
 * @api public
 */
var AsyncScriptLoader = function() {
	this.cacheModules = {};
	this.loaderDir = null;
	this.applicationContext = null;
}

/**
 * AsyncScriptLoader get loaded beans list.
 *
 * @return  {Array}  loaded beans
 * @api public
 */
AsyncScriptLoader.prototype.getLoadBeans = function() {
	return this.loadBeans;
}

/**
 * AsyncScriptLoader load beans asynchronously.
 *
 * @param  {Array}     loaded beans ids
 * @param  {Function}  callback function
 * @api public
 */
AsyncScriptLoader.prototype.load = function(ids, cb) {
	this.loaderDir = ScriptUtil.getLoaderDir();

	var uri = this.loaderDir + '_load_' + cid++;
	var mod = this.get(uri, ids);

	mod.addEntry(mod);
	mod.setRemain(1);

	mod.callback = function() {
		if (Utils.checkFunction(cb)) {
			cb();
		}

		delete mod.callback
		delete mod.history
		delete mod.remain
		delete mod.entries;
	}

	mod.load();
}

/**
 * AsyncScriptLoader save load script with uri meta.
 *
 * @param  {String}  uri
 * @param  {Object}  bean meta
 * @api public
 */
AsyncScriptLoader.prototype.save = function(uri, meta) {
	var mod = this.get(uri)

	// Do NOT override already saved modules
	if (mod.status < BeanModule.STATUS.SAVED) {
		mod.id = meta.id || uri
		mod.dependencies = meta.deps || []
		mod.factory = meta.factory
		mod.status = BeanModule.STATUS.SAVED
	}
}

/**
 * AsyncScriptLoader register script with id, meta.
 *
 * @param  {String}  id
 * @param  {Object}  bean meta
 * @api public
 */
AsyncScriptLoader.prototype.module = function(id, beanMeta) {
	var deps = this.resolveDeps(beanMeta);

	var meta = {
		id: id,
		uri: this.resolve(id),
		deps: deps
	};

	meta.uri ? this.save(meta.uri, meta) :
		// Save information for "saving" work in the script onload event
		BeanModule.anonymousMeta = meta;
}

/**
 * AsyncScriptLoader resolve uri path with refUri.
 *
 * @param  {String}  id
 * @param  {String}  refUri
 * @return {String}  resolved path
 * @api public
 */
AsyncScriptLoader.prototype.resolve = function(id, refUri) {
	// id path map
	var path = this.getPathById(id);
	if (!path) {
		path = id;
		logger.warn('id: ' + id + ' can not be resolved, try run bearcat generate or use bearcat.module to register it');
	}

	return path;
}

/**
 * AsyncScriptLoader resolve deps through bean meta.
 *
 * @param  {Object}  bean meta
 * @param  {Array}   resolved deps
 * @api public
 */
AsyncScriptLoader.prototype.resolveDeps = function(beanMeta) {
	var propsOn = beanMeta.props;
	if (!Utils.isNotNull(propsOn) || !propsOn) {
		return;
	}

	var deps = [];

	for (var i = 0; i < propsOn.length; i++) {
		var prop = propsOn[i];
		var ref = prop['ref'];

		if (ref) {
			// do not load already registered beans
			if (this.applicationContext.getBeanDefinition(ref)) {
				continue;
			}
			deps.push(ref);
		}
	}

	return deps;
}

/**
 * AsyncScriptLoader get bean path through bean id.
 *
 * @param  {String}  id
 * @return {String}  bean path
 * @api public
 */
AsyncScriptLoader.prototype.getPathById = function(id) {
	if (Root.__bearcatData__ && Root.__bearcatData__.idPaths) {
		return Root.__bearcatData__.idPaths[id];
	}
}

/**
 * AsyncScriptLoader get script from cache or new.
 *
 * @param  {String}  uri
 * @param  {Array}   deps id
 * @return {Object}  module
 * @api public
 */
AsyncScriptLoader.prototype.get = function(uri, deps) {
	return this.cacheModules[uri] || (this.cacheModules[uri] = new BeanModule(uri, deps, this));
}

/**
 * AsyncScriptLoader set applicationContext reference.
 *
 * @param  {Object}  applicationContext
 * @api public
 */
AsyncScriptLoader.prototype.setApplicationContext = function(applicationContext) {
	this.applicationContext = applicationContext;
}

module.exports = AsyncScriptLoader;
},{"../beans/support/beanModule":123,"../util/requireUtil":149,"../util/scriptUtil":150,"../util/utils":151,"pomelo-logger":169}],137:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BootStrapLoader
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

/**
 * BootStrapLoader constructor function.
 *
 * @api public
 */
var BootStrapLoader = function() {

}

/**
 * BootStrapLoader load script files.
 *
 * @param  {Array}     bootstrap idPaths
 * @api public
 */
BootStrapLoader.prototype.load = function(idPaths) {
	for (var id in idPaths) {
		var idPath = idPaths[id];
		require(idPath);
	}
}

module.exports = BootStrapLoader;
},{}],138:[function(require,module,exports){
(function (process){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ConfigLoader
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'ConfigLoader');
var RequireUtil = require('../util/requireUtil');
var MetaUtil = require('../util/metaUtil');
var Constant = require('../util/constant');
var MetaLoader = require('./metaLoader');
var Utils = require('../util/utils');
var Path = RequireUtil.requirePath();

/**
 * ConfigLoader constructor function.
 *
 * @api public
 */
var ConfigLoader = function() {}

module.exports = ConfigLoader;

/**
 * ConfigLoader get meta loader.
 *
 * @return  {Object} meta loader
 * @api public
 */
ConfigLoader.prototype.getMetaLoader = function() {
	return new MetaLoader();
}

/**
 * ConfigLoader get meta objects from context path.
 *
 * @param   {String} cpath context path
 * @return  {Object} meta objects
 * @api public
 */
ConfigLoader.prototype.getResources = function(cpath) {
	var scanPaths = [];
	var metaObjects = {};
	var metaLoader = this.getMetaLoader();
	this.getRecursiveScanPath(cpath, scanPaths, metaObjects);

	for (var beanName in metaObjects) {
		metaLoader.setMetaObject(beanName, metaObjects[beanName]);
	}

	for (var i = 0; i < scanPaths.length; i++) {
		metaLoader.load(scanPaths[i]);
	}

	return metaLoader.getMetaObjects();
}

/**
 * ConfigLoader get recursive scan paths and metaObjects in context.json.
 *
 * @param   {String} cpath context path
 * @param   {Array}  scanPaths scan paths
 * @param   {Object} metaObjects
 * @api public
 */
ConfigLoader.prototype.getRecursiveScanPath = function(cpath, scanPaths, metaObjects) {
	var context = Utils.myRequire(cpath);
	if (!context) {
		return;
	}

	var scan = context.scan;
	var beans = context.beans;
	// var browser = context.browser;
	var imports = context.imports;
	var namespace = context.namespace;
	var dependencies = context.dependencies;

	var dpath = Path.dirname(cpath);

	// if (Utils.checkString(browser)) {
	// 	return this.getRecursiveScanPath(dpath + '/' + browser, scanPaths, metaObjects);
	// } else if (Utils.checkArray(browser)) {
	// 	for (var i = 0; i < browser.length; i++) {
	// 		this.getRecursiveScanPath(dpath + '/' + browser[i], scanPaths, metaObjects);
	// 	}
	// 	return;
	// }

	for (var dependency in dependencies) {
		this.getRecursiveScanPath(dpath + '/node_modules/' + dependency + '/context.json', scanPaths, metaObjects);
	}

	if (Utils.checkArray(imports)) {
		for (var j = 0; j < imports.length; j++) {
			this.getRecursiveScanPath(dpath + '/' + imports[j], scanPaths, metaObjects);
		}
	}

	// context.json defined bean metadatas
	if (beans) {
		for (var i = 0; i < beans.length; i++) {
			var bean = beans[i];
			var beanName = bean['id'];

			if (namespace) {
				beanName = namespace + Constant.NAMESPACE_SEPERATOR + beanName;
			}

			// var loadpath = this.loadedContextBeans[beanName];
			// if (beanName && loadpath) {
			// 	logger.warn("bean %j defined in %j has already defined in %j, please check your configuration metadata files", beanName, cpath, loadpath);
			// 	continue;
			// }

			var beanObject = null;
			var funcPath = "";
			if (Utils.checkString(bean['func'])) {
				// beans from require, may be cached by require when you do with the same context.json
				funcPath = Utils.getLoadPath(bean['func'], cpath);
				beanObject = Utils.myRequire(funcPath);
			}

			if (beanObject) {
				if (Utils.checkFunction(beanObject)) {
					bean['func'] = beanObject;
				} else if (Utils.checkObject(beanObject)) {
					if (beanObject['id'] && beanObject['id'] === beanName) {
						// meta defined in js file override context.json
						bean = MetaUtil.mergeMeta(beanObject, bean);
						bean['ftype'] = 'object';
					} else {
						logger.error('meta defined in file %j %j mismatch with that defined in context %j', funcPath, beanObject, bean);
						continue;
					}
				}
			}

			if (beanName) {
				var originMeta = metaObjects[beanName];
				metaObjects[beanName] = MetaUtil.mergeMeta(bean, originMeta);
				if (funcPath) {
					bean['fpath'] = Path.resolve(process.cwd(), funcPath);
				}
			}
		}
	}

	if (Utils.checkString(scan)) {
		var scanPath = Utils.getLoadPath2(scan, cpath);
		scanPaths.push(scanPath);
	}

	if (Utils.checkArray(scan)) {
		for (var i = 0; i < scan.length; i++) {
			var scanPath = Utils.getLoadPath2(scan[i], cpath);
			scanPaths.push(scanPath);
		}
	}
}
}).call(this,require('_process'))
},{"../util/constant":144,"../util/metaUtil":146,"../util/requireUtil":149,"../util/utils":151,"./metaLoader":139,"_process":163,"pomelo-logger":169}],139:[function(require,module,exports){
(function (process){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat MetaLoader
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'MetaLoader');
var FileUtil = require('../util/fileUtil');
var MetaUtil = require('../util/metaUtil');
var Constant = require('../util/constant');
var Utils = require('../util/utils');
var path = require('path');

/**
 * MetaLoader constructor function.
 *
 * @api public
 */
var MetaLoader = function() {
	this.metaObjects = {};
}

module.exports = MetaLoader;

/**
 * MetaLoader load metaObjects from meta path.
 *
 * @param   {String} mpath
 * @return  {Object} meta objects
 * @api public
 */
MetaLoader.prototype.load = function(mpath) {
	if (!mpath) {
		logger.error('load path should not be empty.');
		return;
	}

	mpath = FileUtil.realpathSync(mpath);

	if (!Utils.isDir(mpath)) {
		logger.error('path should be directory.');
		return;
	}

	this.loadPath(this.metaObjects, mpath);
	return this.metaObjects;
};

/**
 * MetaLoader set metaObject to beanName.
 *
 * @param   {String} beanName
 * @param   {Object} metaObject
 * @api public
 */
MetaLoader.prototype.setMetaObject = function(beanName, metaObject) {
	var originMeta = this.metaObjects[beanName];
	this.metaObjects[beanName] = MetaUtil.mergeMeta(metaObject, originMeta);
}

/**
 * MetaLoader get metaObjects.
 *
 * @return   {Object} metaObjects
 * @api public
 */
MetaLoader.prototype.getMetaObjects = function() {
	return this.metaObjects;
}

/**
 * MetaLoader load file, require file.
 *
 * @return   {Object} fp file meta
 * @api private
 */
MetaLoader.prototype.loadFile = function(fp) {
	var m = Utils.myRequire(fp);
	if (process.env.BEARCAT_ANNOTATION !== 'off' && Utils.checkFunction(m)) {
		// meta may be $ annotations in function
		return MetaUtil.resolveFuncAnnotation(m, fp);
	}

	if (!Utils.checkObject(m)) {
		// meta must be object	
		return;
	}

	if (!m || !m.id || !m.func) {
		// id, func must have
		return;
	}

	if (fp) {
		m['ftype'] = 'object';
		m['fpath'] = fp;
	}

	return m;
};

/**
 * MetaLoader load meta from path recursively.
 *
 * @param    {Object} meta metaObjects
 * @param    {String} path
 * @return   {Object} metaObjects
 * @api private
 */
MetaLoader.prototype.loadPath = function(meta, path) {
	var files = FileUtil.readdirSync(path);

	if (path.charAt(path.length - 1) !== '/') {
		path += '/';
	}

	var fp, fn, m;
	for (var i = 0, l = files.length; i < l; i++) {
		fn = files[i];
		fp = path + fn;

		if (Utils.isDir(fp)) {
			this.loadPath(meta, fp);
		}

		if (!Utils.isFile(fp) || !Utils.checkFileType(fn, '.js')) {
			// only load js file type
			continue;
		}

		m = this.loadFile(fp);
		if (!m) {
			continue;
		}

		// id by default is the file name
		var id = Utils.getFileName(fn, '.js'.length);
		if (m.id) {
			id = m.id;
		} else if (m.mid) {
			id = m.mid + Constant.BEAN_SPECIAL_MODEL;
		} else if (m.cid) {
			id = m.cid + Constant.BEAN_SPECIAL_CONSTRAINT;
		} else {
			// ignore
			continue;
		}

		var originMeta = meta[id];
		meta[id] = MetaUtil.mergeMeta(m, originMeta);
	}

	return meta;
};
}).call(this,require('_process'))
},{"../util/constant":144,"../util/fileUtil":145,"../util/metaUtil":146,"../util/utils":151,"_process":163,"path":162,"pomelo-logger":169}],140:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat PropertiesLoader
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'PropertiesLoader');
var FileUtil = require('../util/fileUtil');
var Utils = require('../util/utils');

/**
 * PropertiesLoader constructor function.
 *
 * @api public
 */
var PropertiesLoader = function() {

}

module.exports = PropertiesLoader;

/**
 * PropertiesLoader load properties from load path with env.
 *
 * @param    {String} lpath load path
 * @param    {String} env environment
 * @return   {Object} properties
 * @api public
 */
PropertiesLoader.prototype.loadProperties = function(lpath, env) {
	var meta = {};

	this.loadDir(meta, lpath, true);
	this.loadDir(meta, lpath + '/' + env);

	return meta;
}

/**
 * PropertiesLoader load properties from directory.
 *
 * @param    {Object}  meta properties
 * @param    {String}  lpath load path
 * @param    {Boolean} lflag if not load subdirectory or not, true not
 * @api private
 */
PropertiesLoader.prototype.loadDir = function(meta, lpath, lflag) {
	if (!FileUtil.existsSync(lpath)) {
		return;
	}

	if (!Utils.isDir(lpath)) {
		return;
	}

	var files = FileUtil.readdirSync(lpath);

	if (lpath.charAt(lpath.length - 1) !== '/') {
		lpath += '/';
	}

	var fp, fn, m;
	for (var i = 0, l = files.length; i < l; i++) {
		fn = files[i];
		fp = lpath + fn;

		if (!lflag && Utils.isDir(fp)) {
			this.loadDir(meta, fp);
		}

		if (!Utils.isFile(fp) || !Utils.checkFileType(fp, 'json')) {
			// only load json properties files
			continue;
		}

		m = Utils.myRequire(fp);
		if (!Utils.isNotNull(m) || !Utils.checkObject(m)) {
			continue;
		}

		for (var key in m) {
			if (Utils.isNotNull(m[key])) {
				meta[key] = m[key];
			}
		}
	}
}
},{"../util/fileUtil":145,"../util/utils":151,"pomelo-logger":169}],141:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ResourceLoader
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var ConfigLoader = require('./configLoader');

/**
 * ResourceLoader constructor function.
 *
 * @api public
 */
var ResourceLoader = function() {
	this.loadPathMap = {};
	this.loadPaths = [];
}

module.exports = ResourceLoader;

/**
 * ResourceLoader get config loader.
 *
 * @return  {Object} config loader
 * @api public
 */
ResourceLoader.prototype.getConfigLoader = function() {
	var configLoader = new ConfigLoader();
	return configLoader;
}

/**
 * ResourceLoader add context load path.
 *
 * @param  {String} cpath context load path
 * @api public
 */
ResourceLoader.prototype.addLoadPath = function(cpath) {
	this.loadPaths.push(cpath);
}

/**
 * ResourceLoader load metaObjects from context path.
 *
 * @param   {String} cpath context load path
 * @return  {Object} metaObjects
 * @api public
 */
ResourceLoader.prototype.load = function(cpath) {
	if (this.loadPathMap[cpath]) {
		return this.loadPathMap[cpath];
	}

	var metaObjects = this.getConfigLoader().getResources(cpath);
	this.loadPathMap[cpath] = metaObjects;
	this.addLoadPath(cpath);

	return metaObjects;
}
},{"./configLoader":138}],142:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat AopUtil
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Advisor = require('../aop/advisor');
var Aspect = require('../aop/aspect');
var Utils = require('./utils');
var AopUtil = {};

/**
 * AopUtil build aspects from metaList and beanDefinition.
 *
 * @param   {Array}  metaList
 * @param   {Object} beanDefinition
 * @param   {Array}  aspects
 * @api public
 */
AopUtil.buildAspect = function(metaList, beanDefinition) {
	var aspect = new Aspect();
	var beanName = beanDefinition.getBeanName();
	aspect.setBeanDefinition(beanDefinition);
	aspect.setBeanName(beanName);

	for (var i = 0; i < metaList.length; i++) {
		var meta = metaList[i];
		var pointcut = meta['pointcut'];
		var advice = meta['advice'];
		var order = meta['order'];
		var runtime = meta['runtime'] || false;

		if (!pointcut || !advice) {
			continue;
		}

		var advisor = new Advisor();
		advisor.setPointcut(pointcut);
		advisor.setAdvice(advice);
		advisor.setBeanName(beanName);
		advisor.setOrder(order);
		advisor.setRuntime(runtime);
		advisor.parse();

		aspect.addAdvisor(advisor);
	}

	return aspect;
}

/**
 * AopUtil reflect methods from object.
 *
 * @param    {Object} object
 * @return   {Array}  method names
 * @api public
 */
AopUtil.getMethodsFromObject = function(object) {
	var proto = object;
	var methods = [];

	for (var key in proto) {
		var method = proto[key];
		if (Utils.checkFunction(method)) {
			methods.push(key);
		}
	}

	return methods;
}

/**
 * AopUtil sort advisors by order.
 *
 * @param    {Array} advisors
 * @return   {Array} sorted advisors
 * @api public
 */
AopUtil.sortAdvisorsByOrder = function(advisors) {
	advisors.sort(Utils.compareByOrder);

	return advisors;
}

module.exports = AopUtil;
},{"../aop/advisor":109,"../aop/aspect":110,"./utils":151}],143:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat BeanUtils
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var BeanWrapper = require('../beans/support/beanWrapper');
var Utils = require('./utils');

var BeanUtils = {};

/**
 * BeanUtil build beanWrapper from meta settings.
 *
 * @param    {Array}  list meta settings
 * @return   {Array}  beanWrappers
 * @api public
 */
BeanUtils.buildBeanWrapper = function(list) {
	var r = [];

	if (!Utils.checkArray(list)) {
		return r;
	}

	for (var i = 0; i < list.length; i++) {
		var w = list[i];

		var bWrapper = new BeanWrapper();
		if (w.name) {
			bWrapper.setName(w.name);
		}

		if (w.type) {
			bWrapper.setType(w.type);
		}

		if (w.value) {
			bWrapper.setValue(w.value);
		}

		if (w.ref) {
			bWrapper.setRef(w.ref);
		}

		bWrapper.setRole();

		r.push(bWrapper);
	}

	return r;
}

/**
 * BeanUtils getBeanSettingsMap.
 *
 * @param    {Array}   list beanWrappers
 * @return   {Object}  beanWrapper map
 * @api public
 */
BeanUtils.getBeanSettingsMap = function(list) {
	var r = {};
	if (!Utils.checkArray(list)) {
		return r;
	}

	for (var i = 0; i < list.length; i++) {
		var w = list[i];
		var name = w.getName();
		if (!name) {
			continue;
		}
		r[name] = w;
	}

	return r;
}

/**
 * BeanUtils getBeanSettingsArray.
 *
 * @param   {Object}  map beanWrapper map
 * @return  {Array}   beanWrappers
 * @api public
 */
BeanUtils.getBeanSettingsArray = function(map) {
	var r = [];

	if (!Utils.isNotNull(map)) {
		return r;
	}

	for (var name in map) {
		r.push(map[name]);
	}

	return r;
}

/**
 * BeanUtils sortBeanDefinitions.
 *
 * @param    {Array}  beanDefinitions
 * @return   {Array}  beanFactory sorted beanDefinitions
 * @api public
 */
BeanUtils.sortBeanDefinitions = function(beanDefinitions, beanFactory) {
	var r = [];

	for (var beanName in beanDefinitions) {
		var beanDefinition = beanDefinitions[beanName];

		if (beanDefinition.isSingleton() && !beanDefinition.isLazyInit() && !beanDefinition.isAbstract()) {
			if (beanDefinition.hasParentBean()) {
				beanDefinition = beanFactory.setParentBean(beanDefinition.getBeanName());
			}

			r.push(beanDefinition);
		}
	}

	r.sort(Utils.compareBeans);

	return r;
}

module.exports = BeanUtils;
},{"../beans/support/beanWrapper":124,"./utils":151}],144:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat Constant
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

module.exports = {
	SCOPE_DEFAULT: "singleton",
	SCOPE_SINGLETON: "singleton",
	SCOPE_PROTOTYPE: "prototype",

	DEPENDS_ARGS: "args",
	DEPENDS_PROPS: "props",

	SETTINGS_ARGS_ON: "argsOn",
	SETTINGS_PROPS_ON: "propsOn",
	SETTINGS_FACTORY_ARGS_ON: "factoryArgsOn",

	DEPEND_TYPE_BEAN: "d_bean",
	DEPEND_TYPE_VALUE: "d_value",
	DEPEND_TYPE_VAR: "d_var",
	DEPEND_TYPE_ERROR: "d_error",

	PROPS_DEFAULT: [],
	ARGS_DEFAULT: [],

	ASYNC_INIT_DEFAULT: false,
	LAZY_INIT_DEFAULT: false,
	ABSTRACT_DEFAULT: false,

	INIT_CB_DEFAULT: function() {},

	AOP_ADVICE_BEFORE: "before",
	AOP_ADVICE_AFTER: "after",
	AOP_ADVICE_AROUND: "around",

	PROXY_DEFAULT: true,

	DEFAULT_ENV: "dev",

	LOGPATH: "log4js.json",

	NAMESPACE_SEPERATOR: ":",

	FUNC_ARGS_REGEXP: /function.*?\((.*?)\)\s*\{/,

	FUNC_PROPS_REGEXP: /\s*this\.\$\w+\s*=(.|\s)*?;/g,

	FUNC_PROPS_REGEXP_ATTR: /\s*this\.\w+\s*=\s*\"\$(.|\s)*?\";/g,
	 
	FUNC_COMMENT_LINE: /\/\/.*?\n/g,

	FUNC_COMMENT_STAR: /\/\*(.|\s)*?\*\//g,

	FUNC_ANNOTATION: "$",

	PROTO_FUNC_PROPS_REGEXP: /\w+\s*\$\w+\s*=(.|\s)*?;/g,

	META_PROPS: ["id", "order", "init", "destroy", "factoryBean",
		"factoryMethod", "scope", "async", "abstract", "parent",
		"lazy", "factoryArgs", "proxy", "aop", "mid", "table",
		"cid", "constraint", "prefix"
	],

	AOP_META_PROPS: ["pointcut", "advice", "order", "runtime"],

	META_AOP: "aop",

	META_ID: "id",

	META_AOP_ADVICE: "advice",

	FILTER_BUILTIN: "builtin",
	FILTER_MODEL: "model",
	FILTER_BUILTIN_METHOD: "filter",

	CONSTRAINT_ANNOTATION: "$",
	CONSTRAINT_SPLIT: ";",
	CONSTRAINT_METHOD: "validate",

	MODEL_ATTRIBUTES: ["type", "primary", "default", "ref", "prefix"],
	MODEL_ATTRIBUTE_PRIMARY: "primary",
	MODEL_ATTRIBUTE_BALANCE: "balance",
	MODEL_ATTRIBUTE_TYPE_ARRAY: "Array",
	MODEL_ATTRIBUTE_TYPE_OBJECT: "Object",
	MODEL_FILTER_BEFORE: 'before',
	MODEL_FILTER_AFTER: 'after',

	BEAN_SPECIAL_MODEL: "_$model",
	BEAN_SPECIAL_CONSTRAINT: "_$constraint",

	TYPE_NUMBER: "Number",

	DEFINE_GETTER_PREFIX: "__"
}
},{}],145:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat FileUtil
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var fs = require('fs');

var FileUtil = {};

/**
 * FileUtil existsSync.
 *
 * @api public
 */
FileUtil.existsSync = function() {
	return false;
}

/**
 * FileUtil watch shim.
 *
 * @api public
 */
FileUtil.watch = function() {

}

/**
 * FileUtil realpathSync shim.
 *
 * @api public
 */
FileUtil.realpathSync = function() {

}

/**
 * FileUtil readdirSync shim.
 *
 * @api public
 */
FileUtil.readdirSync = function() {

}

if (fs) {
	for (var method in fs) {
		FileUtil[method] = fs[method];
	}
}

module.exports = FileUtil;
},{"fs":154}],146:[function(require,module,exports){
(function (process){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat MetaUtil
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('Bearcat', 'MetaUtil');
var RequireUtil = require('./requireUtil');
var Constant = require('./constant');
var Os = RequireUtil.requireOs();
var Utils = require('./utils');
var EOL = Os.EOL;

var MetaUtil = {
	metaCache: {}
};

/**
 * MetaUtil merge metaObject with originMeta.
 *
 * @param   {Object} meta metaObject
 * @param   {Object} originMeta origin metaObject
 * @param   {Object} merged metaObjects
 * @api public
 */
MetaUtil.mergeMeta = function(meta, originMeta) {
	if (!originMeta) {
		return meta;
	}

	for (var key in meta) {
		originMeta[key] = meta[key];
	}

	return originMeta;
}

/**
 * MetaUtil resolve function annotation like $id, $scope, $car etc.
 *
 * @param  {Function} func function annotation
 * @param  {String}   func function file path
 * @param  {Boolean}  force resolve func annotation
 * @return {Object}   metaObject resolved metaObject
 * @api private
 */
MetaUtil.resolveFuncAnnotation = function(func, fp, force) {
	var funcString = func.toString();

	if (process.env.LOADER_BIN === 'on') {
		force = true;
	}

	if (this.metaCache[funcString] && !force) {
		return this.metaCache[funcString];
	}

	var funcArgsString = funcString.match(Constant.FUNC_ARGS_REGEXP);

	if (funcArgsString) {
		funcArgsString = funcArgsString[1];
	} else {
		funcArgsString = "";
	}

	var funcArgs = [];

	if (funcArgsString) {
		funcArgs = funcArgsString.split(',');
	}

	var meta = {};
	var props = [];
	var args = [];
	var attributes = [];

	var funcProps = null;

	if (funcArgs.length || process.env.BEARCAT_FUNCTION_STRING) {
		// if constructor function have arguments or setup BEARCAT_FUNCTION_STRING flag
		// use funcString to resolve $ props
		funcString = MetaUtil.resolveFuncComment(funcString);
		funcProps = MetaUtil.resolvePropsFromFuncString(funcString, funcArgsString);
	} else {
		// use new to resolve $ props directly to support dynamic $ prefix attributes
		// try catch the error, when dependency is not ready when started
		try {
			funcProps = new func();
		} catch (e) {
			return;
		}
	}

	for (var funcKey in funcProps) {
		// prototype attribute must be prefixed with $, other attributes will be ignored 
		if (!funcProps.hasOwnProperty(funcKey) && !MetaUtil.checkFuncAnnotation(funcKey)) {
			continue;
		}

		var value = funcProps[funcKey];

		// ignore function value
		if (Utils.checkFunction(value)) {
			continue;
		}

		if (MetaUtil.checkFuncAnnotation(funcKey)) {
			var key = funcKey.substr(1);
			if (MetaUtil.checkInMetaProps(funcKey)) {
				if (key === Constant.META_AOP && funcProps[funcKey] === true) {
					meta[key] = this.resolvePrototypeAnnotation(func);
				} else {
					if (key === Constant.META_ID) {
						if (MetaUtil.checkInMetaProps(value, true)) {
							logger.warn('bean id value must not use bearcat special bean attributes: %s', value);
							return;
						}
					}
					meta[key] = value;
				}
			} else {
				if (!MetaUtil.checkInFuncArgs(funcKey, funcArgs)) {
					if (MetaUtil.checkFuncPropsValue(funcKey)) {
						props.push({
							name: funcKey,
							value: value
						});
					} else if (MetaUtil.checkFuncPropsType(funcKey)) {
						props.push({
							name: funcKey,
							type: value
						});
					} else if (MetaUtil.checkFuncPropsNamespace(funcKey)) {
						props.push({
							name: funcKey,
							ref: value
						});
					} else {
						props.push({
							name: funcKey,
							ref: key
						});
					}
				}
			}
			continue;
		} else if (MetaUtil.checkFuncPropsConfigValue(value)) {
			// this.num = "${car.num}"; placeholder
			props.push({
				name: funcKey,
				value: value
			});
		} else if (MetaUtil.checkFuncValueAnnotation(value)) {
			// this.num = "$type:Number"; model attribute
			attributes.push({
				name: funcKey,
				value: value
			});
		}
	}

	delete funcProps;

	if (props.length) {
		meta['props'] = props;
	}

	for (var i = 0; i < funcArgs.length; i++) {
		var funcArg = funcArgs[i].trim();
		if (!funcArg) {
			continue;
		}

		var key = funcArg.substr(1);
		if (MetaUtil.checkFuncAnnotation(funcArg)) {
			args.push({
				name: funcArg,
				ref: key
			});
		} else {
			// not start with $, treat it as a type injection
			args.push({
				name: funcArg,
				type: "Object"
			});
		}
	}

	if (args.length) {
		meta['args'] = args;
	}

	if (attributes.length) {
		meta['attributes'] = attributes;
	}

	meta['func'] = func;
	if (fp) {
		meta['fpath'] = require('path').resolve(process.cwd(), fp);
	}

	var id = meta.id;
	if (meta.id) {
		id = meta.id;
	} else if (meta.mid) {
		id = meta.mid + Constant.BEAN_SPECIAL_MODEL;
	} else if (meta.cid) {
		id = meta.cid + Constant.BEAN_SPECIAL_CONSTRAINT;
	} else {
		// must have id
	}

	if (id) {
		meta['id'] = id;
	}

	this.metaCache[funcString] = meta;
	return meta;
}

/**
 * MetaUtil props from function string.
 *
 * @param  {String}     function string
 * @return {Object}     resolved props object
 * @api private
 */
MetaUtil.resolvePropsFromFuncString = function(funcString, funcArgsString) {
	var funcPropsArray = funcString.match(Constant.FUNC_PROPS_REGEXP);
	var funcPropsAttrArray = funcString.match(Constant.FUNC_PROPS_REGEXP_ATTR);

	var t = "var FuncProps = function(" + funcArgsString + ") {" + EOL;
	if (funcPropsArray && Utils.checkArray(funcPropsArray)) {
		for (var i = 0; i < funcPropsArray.length; i++) {
			t += (funcPropsArray[i] + EOL);
		}
	}

	if (funcPropsAttrArray && Utils.checkArray(funcPropsAttrArray)) {
		for (var i = 0; i < funcPropsAttrArray.length; i++) {
			t += (funcPropsAttrArray[i] + EOL);
		}
	}

	t += "}";

	var funcProps = MetaUtil.getEvalFuncProps(t);

	return funcProps;
}

/**
 * MetaUtil resolve prototype annotation.
 *
 * @param  {Function}   func function
 * @return {Object}     resolved meta object
 * @api private
 */
MetaUtil.resolvePrototypeAnnotation = function(func) {
	var proto = func.prototype;
	var meta = [];

	for (var funcName in proto) {
		var protoFunc = proto[funcName];
		if (Utils.checkFunction(protoFunc)) {
			var funcString = protoFunc.toString();
			funcString = MetaUtil.resolveFuncComment(funcString);

			var funcPropsArray = funcString.match(Constant.PROTO_FUNC_PROPS_REGEXP);
			var t = "";
			if (funcPropsArray && Utils.checkArray(funcPropsArray)) {
				t = "var FuncMetaProps = function() {" + EOL;
				for (var i = 0; i < funcPropsArray.length; i++) {
					t += (funcPropsArray[i].replace(/var\s*/, "this.") + EOL);
				}
				t += "}";
			}

			var funcProps = MetaUtil.getEvalFuncMetaProps(t);
			var aop = {};
			var flag = false;
			aop[Constant.META_AOP_ADVICE] = funcName;
			for (var funcKey in funcProps) {
				if (this.checkInAOPMetaProps(funcKey)) {
					var key = funcKey.substr(1);
					var value = funcProps[funcKey];
					aop[key] = value;
					flag = true;
				}
			}

			if (flag) {
				meta.push(aop);
			}
		}
	}

	return meta;
}

/**
 * MetaUtil resolve function comments.
 *
 * @param  {String}   t function string
 * @return {String}   resolved function string
 * @api private
 */
MetaUtil.resolveFuncComment = function(funcString) {
	funcString = funcString.replace(Constant.FUNC_COMMENT_LINE, "")
	funcString = funcString.replace(Constant.FUNC_COMMENT_STAR, "");
	return funcString;
}

/**
 * MetaUtil get eval function props.
 *
 * @param  {String}   t function string
 * @return {Object}   eval object result
 * @api private
 */
MetaUtil.getEvalFuncProps = function(t) {
	if (!t) {
		return {};
	}

	try {
		eval(t);
		return new FuncProps();
	} catch (err) {
		logger.error("resolveFuncAnnotation error: " + err.stack);
		return {};
	}
}

/**
 * MetaUtil get eval function props.
 *
 * @param  {String}   t function string
 * @return {Object}   eval object result
 * @api private
 */
MetaUtil.getEvalFuncMetaProps = function(t) {
	if (!t) {
		return {};
	}

	try {
		eval(t);
		return new FuncMetaProps();
	} catch (err) {
		logger.error("resolvePrototypeAnnotation error: " + err.stack);
		return {};
	}
}

/**
 * MetaUtil check funcKey in metaProps.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkInMetaProps = function(funcKey, flag) {
	var META_PROPS = Constant.META_PROPS;

	var prefix = "";
	if (!flag) {
		prefix = Constant.FUNC_ANNOTATION;
	}

	for (var i = 0; i < META_PROPS.length; i++) {
		if (prefix + META_PROPS[i] === funcKey) {
			return true;
		}
	}

	return false;
}

/**
 * MetaUtil check funcKey in aopMetaProps.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkInAOPMetaProps = function(funcKey) {
	var META_PROPS = Constant.AOP_META_PROPS;

	for (var i = 0; i < META_PROPS.length; i++) {
		if (Constant.FUNC_ANNOTATION + META_PROPS[i] === funcKey) {
			return true;
		}
	}

	return false;
}

/**
 * MetaUtil check funcKey in function args.
 *
 * @param  {String}   funcKey function key
 * @param  {Array}    function args
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkInFuncArgs = function(funcKey, funcArgs) {
	for (var i = 0; i < funcArgs.length; i++) {
		if (funcKey === funcArgs[i]) {
			return true;
		}
	}

	return false;
}

/**
 * MetaUtil check function annotation.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncAnnotation = function(funcKey) {
	return funcKey.match(/^\$/);
}

/**
 * MetaUtil check funcValue annotation.
 *
 * @param  {String}   funcValue function value
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncValueAnnotation = function(funcValue) {
	if (!Utils.checkString(funcValue)) {
		return false;
	}

	return this.checkFuncAnnotation(funcValue);
}

/**
 * MetaUtil check function props value.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncPropsValue = function(funcKey) {
	return funcKey.match(/^\$V/);
}

/**
 * MetaUtil check function props type.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncPropsType = function(funcKey) {
	return funcKey.match(/^\$T/);
}

/**
 * MetaUtil check function props namespace.
 *
 * @param  {String}   funcKey function key
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncPropsNamespace = function(funcKey) {
	return funcKey.match(/^\$N/);
}

/**
 * MetaUtil check function props config value.
 *
 * @param  {String}   value
 * @return {Boolean}  true|false
 * @api private
 */
MetaUtil.checkFuncPropsConfigValue = function(value) {
	if (!Utils.checkString(value)) {
		return;
	}
	return value.match(/^\$\{.*?\}$/);
}

/**
 * MetaUtil clean up meta cache.
 *
 * @api public
 */
MetaUtil.cleanUp = function() {
	this.metaCache = {};
}

module.exports = MetaUtil;
}).call(this,require('_process'))
},{"./constant":144,"./requireUtil":149,"./utils":151,"_process":163,"path":162,"pomelo-logger":169}],147:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelUtils
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var ModelAttribute = require('../model/modelAttribute');
var Constant = require('./constant');
var Utils = require('./utils');
var ModelUtil = {};

/**
 * ModelUtil build model attribute.
 *
 * @param   {Array}  model meta attributes.
 * @param   {Object} beanFactory.
 * @return  {Object} modelAttributes.
 * @api public
 */
ModelUtil.buildModelAttribute = function(attributes, beanFactory) {
	if (!Utils.checkArray(attributes)) {
		return {};
	}

	var r = {};
	var fields = {};
	var refFields = [];
	var oneToMany = false;
	var balance = "";
	for (var i = 0; i < attributes.length; i++) {
		var attribute = attributes[i];
		var name = attribute['name'];
		var value = attribute['value'];

		var modelAttribute = new ModelAttribute();
		modelAttribute.setName(name);
		modelAttribute.setExpression(value);
		modelAttribute.parse(value, beanFactory);

		fields[name] = modelAttribute;

		if (modelAttribute.getRef()) {
			refFields.push(name);
		}

		var type = modelAttribute.getType();
		if (Utils.checkTypeArray(type)) {
			oneToMany = true;
		}

		if (modelAttribute.isBalance()) {
			balance = name;
		}
	}

	return {
		fields: fields,
		balance: balance,
		refFields: refFields,
		oneToMany: oneToMany
	};
}

module.exports = ModelUtil;
},{"../model/modelAttribute":130,"./constant":144,"./utils":151}],148:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat RequestUtil load async script
 * modified from seajs util-request.js
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>, http://seajs.org
 * MIT Licensed
 */

var Utils = require('./utils');
var RequestUtil = {};
var currentlyAddingScript;

/**
 * RequestUtil request script file from url.
 *
 * @param  {String}   url
 * @param  {Function} callback function
 * @param  {String}   charset code
 * @param  {Boolean}  crossorigin or not
 * @api public
 */
RequestUtil.request = function(url, callback, charset, crossorigin) {
	if (Utils.checkWebWorker()) {
		return this.requestFromWebWorker(url, callback, charset, crossorigin);
	} else {
		return this.requestFromAsyncScript(url, callback, charset, crossorigin);
	}
}

/**
 * RequestUtil request script file from web worker.
 *
 * @param  {String}   url
 * @param  {Function} callback function
 * @param  {String}   charset code
 * @param  {Boolean}  crossorigin or not
 * @api private
 */
RequestUtil.requestFromWebWorker = function(url, callback, charset, crossorigin) {
	// Load with importScripts
	var error;
	try {
		importScripts(url);
	} catch (e) {
		error = e;
	}
	callback(error);
}

/**
 * RequestUtil request script file from async <script> tag.
 *
 * @param  {String}   url
 * @param  {Function} callback function
 * @param  {String}   charset code
 * @param  {Boolean}  crossorigin or not
 * @api private
 */
RequestUtil.requestFromAsyncScript = function(url, callback, charset, crossorigin) {
	var doc = document;
	var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
	var baseElement = head.getElementsByTagName("base")[0];

	var node = doc.createElement("script");

	if (charset) {
		var cs = Utils.checkFunction(charset) ? charset(url) : charset;
		if (cs) {
			node.charset = cs;
		}
	}

	// crossorigin default value is `false`.
	var cors = Utils.checkFunction(crossorigin) ? crossorigin(url) : crossorigin;
	if (cors !== false) {
		node.crossorigin = cors;
	}

	this.addOnload(head, node, callback, url);

	node.async = true;
	node.src = url;

	// For some cache cases in IE 6-8, the script executes IMMEDIATELY after
	// the end of the insert execution, so use `currentlyAddingScript` to
	// hold current node, for deriving url in `define` call
	currentlyAddingScript = node;

	// ref: #185 & http://dev.jquery.com/ticket/2709
	baseElement ?
		head.insertBefore(node, baseElement) :
		head.appendChild(node);

	currentlyAddingScript = null;
}

/**
 * RequestUtil request script file from url.
 *
 * @param  {Object}   head node
 * @param  {Object}   node
 * @param  {Function} callback function
 * @param  {String}   url
 * @api private
 */
RequestUtil.addOnload = function(head, node, callback, url) {
	var supportOnload = "onload" in node;

	if (supportOnload) {
		node.onload = onload
		node.onerror = function() {
			// TODO
			// emit("error", {
			// 	uri: url,
			// 	node: node
			// })
			onload(true)
		}
	} else {
		node.onreadystatechange = function() {
			if (/loaded|complete/.test(node.readyState)) {
				onload()
			}
		}
	}

	function onload(error) {
		// Ensure only run once and handle memory leak in IE
		node.onload = node.onerror = node.onreadystatechange = null

		// Remove the script to reduce memory leak
		// if (!data.debug) {
		if (!false) {
			head.removeChild(node)
		}

		// Dereference the node
		node = null

		callback(error)
	}
}

module.exports = RequestUtil;
},{"./utils":151}],149:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat RequireUtils
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var ShimBuiltins = require('../../shim/builtins');
var RequireUtils = {};

var Root;
(function() {
	Root = this;
}());

if (!Root.process) {
	Root.process = ShimBuiltins.process;
}

/**
 * RequireUtils require os shim.
 *
 * @api public
 */
RequireUtils.requireOs = function() {
	var os = require('os');
	if (os) {
		return os;
	} else {
		return ShimBuiltins.os;
	}
}

/**
 * RequireUtils require path shim.
 *
 * @api public
 */
RequireUtils.requirePath = function() {
	var path = require('path');
	if (path) {
		return path;
	} else {
		return ShimBuiltins.path;
	}
}

/**
 * RequireUtils require util shim.
 *
 * @api public
 */
RequireUtils.requireUtil = function() {
	var util = require('util');
	if (util) {
		return util;
	} else {
		return ShimBuiltins.util;
	}
}

module.exports = RequireUtils;
},{"../../shim/builtins":167,"os":161,"path":162,"util":165}],150:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ScriptUtil
 * modified from seajs util-path.js
 * The utilities for operating path such as id, uri
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>, http://seajs.org
 * MIT Licensed
 */

var ScriptUtil = {};

var DIRNAME_RE = /[^?#]*\//

var DOT_RE = /\/\.\//g
var DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//
var MULTI_SLASH_RE = /([^:/])\/+\//g

/**
 * ScriptUtil get current loader directory.
 *
 * @api public
 */
ScriptUtil.getLoaderDir = function() {
  if (typeof location === 'undefined') {
    location = {};
  }
  // Extract the directory portion of a path
  // dirname("a/b/c.js?t=123#xx/zz") ==> "a/b/"
  // ref: http://jsperf.com/regex-vs-split/2
  function dirname(path) {
    return path.match(DIRNAME_RE)[0]
  }

  // Canonicalize a path
  // realpath("http://test.com/a//./b/../c") ==> "http://test.com/a/c"
  function realpath(path) {
    // /a/b/./c/./d ==> /a/b/c/d
    path = path.replace(DOT_RE, "/")

    /*
      @author wh1100717
      a//b/c ==> a/b/c
      a///b/////c ==> a/b/c
      DOUBLE_DOT_RE matches a/b/c//../d path correctly only if replace // with / first
    */
    path = path.replace(MULTI_SLASH_RE, "$1/")

    // a/b/c/../../d  ==>  a/b/../d  ==>  a/d
    while (path.match(DOUBLE_DOT_RE)) {
      path = path.replace(DOUBLE_DOT_RE, "/")
    }

    return path
  }

  // Normalize an id
  // normalize("path/to/a") ==> "path/to/a.js"
  // NOTICE: substring is faster than negative slice and RegExp
  function normalize(path) {
    var last = path.length - 1
    var lastC = path.charCodeAt(last)

    // If the uri ends with `#`, just return it without '#'
    if (lastC === 35 /* "#" */ ) {
      return path.substring(0, last)
    }

    return (path.substring(last - 2) === ".js" ||
      path.indexOf("?") > 0 ||
      lastC === 47 /* "/" */ ) ? path : path + ".js"
  }


  var PATHS_RE = /^([^/:]+)(\/.+)$/
  var VARS_RE = /{([^{]+)}/g

  function parseAlias(id) {
    var alias = data.alias
    return alias && isString(alias[id]) ? alias[id] : id
  }

  function parsePaths(id) {
    var paths = data.paths
    var m

    if (paths && (m = id.match(PATHS_RE)) && isString(paths[m[1]])) {
      id = paths[m[1]] + m[2]
    }

    return id
  }

  function parseVars(id) {
    var vars = data.vars

    if (vars && id.indexOf("{") > -1) {
      id = id.replace(VARS_RE, function(m, key) {
        return isString(vars[key]) ? vars[key] : m
      })
    }

    return id
  }

  function parseMap(uri) {
    var map = data.map
    var ret = uri

    if (map) {
      for (var i = 0, len = map.length; i < len; i++) {
        var rule = map[i]

        ret = isFunction(rule) ?
          (rule(uri) || uri) :
          uri.replace(rule[0], rule[1])

        // Only apply the first matched rule
        if (ret !== uri) break
      }
    }

    return ret
  }


  var ABSOLUTE_RE = /^\/\/.|:\//
  var ROOT_DIR_RE = /^.*?\/\/.*?\//

  function addBase(id, refUri) {
    var ret
    var first = id.charCodeAt(0)

    // Absolute
    if (ABSOLUTE_RE.test(id)) {
      ret = id
    }
    // Relative
    else if (first === 46 /* "." */ ) {
      ret = (refUri ? dirname(refUri) : data.cwd) + id
    }
    // Root
    else if (first === 47 /* "/" */ ) {
      var m = data.cwd.match(ROOT_DIR_RE)
      ret = m ? m[0] + id.substring(1) : id
    }
    // Top-level
    else {
      ret = data.base + id
    }

    // Add default protocol when uri begins with "//"
    if (ret.indexOf("//") === 0) {
      ret = location.protocol + ret
    }

    return realpath(ret)
  }

  function id2Uri(id, refUri) {
    if (!id) return ""

    id = parseAlias(id)
    id = parsePaths(id)
    id = parseAlias(id)
    id = parseVars(id)
    id = parseAlias(id)
    id = normalize(id)
    id = parseAlias(id)

    var uri = addBase(id, refUri)
    uri = parseAlias(uri)
    uri = parseMap(uri)

    return uri
  }

  // For Developers
  // seajs.resolve = id2Uri;

  // Check environment
  var isWebWorker = typeof window === 'undefined' && typeof importScripts !== 'undefined' && isFunction(importScripts);

  // Ignore about:xxx and blob:xxx
  var IGNORE_LOCATION_RE = /^(about|blob):/;
  var loaderDir;
  // Sea.js's full path
  var loaderPath;
  // Location is read-only from web worker, should be ok though
  var cwd = (!location.href || IGNORE_LOCATION_RE.test(location.href)) ? '' : dirname(location.href);

  if (isWebWorker) {
    // Web worker doesn't create DOM object when loading scripts
    // Get sea.js's path by stack trace.
    var stack;
    try {
      var up = new Error();
      throw up;
    } catch (e) {
      // IE won't set Error.stack until thrown
      stack = e.stack.split('\n');
    }
    // First line is 'Error'
    stack.shift();

    var m;
    // Try match `url:row:col` from stack trace line. Known formats:
    // Chrome:  '    at http://localhost:8000/script/sea-worker-debug.js:294:25'
    // FireFox: '@http://localhost:8000/script/sea-worker-debug.js:1082:1'
    // IE11:    '   at Anonymous function (http://localhost:8000/script/sea-worker-debug.js:295:5)'
    // Don't care about older browsers since web worker is an HTML5 feature
    var TRACE_RE = /.*?((?:http|https|file)(?::\/{2}[\w]+)(?:[\/|\.]?)(?:[^\s"]*)).*?/i
      // Try match `url` (Note: in IE there will be a tailing ')')
    var URL_RE = /(.*?):\d+:\d+\)?$/;
    // Find url of from stack trace.
    // Cannot simply read the first one because sometimes we will get:
    // Error
    //  at Error (native) <- Here's your problem
    //  at http://localhost:8000/_site/dist/sea.js:2:4334 <- What we want
    //  at http://localhost:8000/_site/dist/sea.js:2:8386
    //  at http://localhost:8000/_site/tests/specs/web-worker/worker.js:3:1
    while (stack.length > 0) {
      var top = stack.shift();
      m = TRACE_RE.exec(top);
      if (m != null) {
        break;
      }
    }
    var url;
    if (m != null) {
      // Remove line number and column number
      // No need to check, can't be wrong at this point
      var url = URL_RE.exec(m[1])[1];
    }
    // Set
    loaderPath = url
      // Set loaderDir
    loaderDir = dirname(url || cwd);
    // This happens with inline worker.
    // When entrance script's location.href is a blob url,
    // cwd will not be available.
    // Fall back to loaderDir.
    if (cwd === '') {
      cwd = loaderDir;
    }
  } else {
    var doc = document
    var scripts = doc.scripts

    // Recommend to add `seajsnode` id for the `sea.js` script element
    var loaderScript = doc.getElementById("seajsnode") ||
      scripts[scripts.length - 1]

    function getScriptAbsoluteSrc(node) {
      return node.hasAttribute ? // non-IE6/7
        node.src :
        // see http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
        node.getAttribute("src", 4)
    }
    loaderPath = getScriptAbsoluteSrc(loaderScript)
      // When `sea.js` is inline, set loaderDir to current working directory
    loaderDir = dirname(loaderPath || cwd)
  }

  return loaderDir;
}

module.exports = ScriptUtil;
},{}],151:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat Utils
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcat', 'Utils');
var RequireUtil = require('./requireUtil');
var Constant = require('./constant');
var FileUtil = require('./fileUtil');
var Path = RequireUtil.requirePath();

var Utils = {};

/**
 * Utils normalize type
 *
 * @param  {String}   type
 * @return {String}   normalized type
 * @api public
 */
Utils.normalizeType = function(type) {
	if (!Utils.checkString(type)) {
		return;
	}

	type = type.toLowerCase();
	var Type = type[0].toUpperCase() + type.substr(1);
	return Type;
}

/**
 * Utils check type array
 *
 * @param  {String}    type
 * @return {Boolean}   true|false
 * @api public
 */
Utils.checkTypeArray = function(type) {
	var type = this.normalizeType(type);
	return type === Constant.MODEL_ATTRIBUTE_TYPE_ARRAY;
}

/**
 * Utils check type object
 *
 * @param  {String}    type
 * @return {Boolean}   true|false
 * @api public
 */
Utils.checkTypeObject = function(type) {
	var type = this.normalizeType(type);
	return type === Constant.MODEL_ATTRIBUTE_TYPE_OBJECT;
}

/**
 * Utils check type
 *
 * @param  {String}   type
 * @return {Function} high order function
 * @api public
 */
Utils.isType = function(type) {
	return function(obj) {
		return {}.toString.call(obj) == "[object " + type + "]";
	}
}

/**
 * Utils check array
 *
 * @param  {Array}   array
 * @return {Boolean} true|false
 * @api public
 */
Utils.checkArray = Array.isArray || Utils.isType("Array");

/**
 * Utils check number
 *
 * @param  {Number}  number
 * @return {Boolean} true|false
 * @api public
 */
Utils.checkNumber = Utils.isType("Number");

/**
 * Utils check function
 *
 * @param  {Function}   func function
 * @return {Boolean}    true|false
 * @api public
 */
Utils.checkFunction = Utils.isType("Function");
/**
 * Utils check object
 *
 * @param  {Object}   obj object
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkObject = Utils.isType("Object");

/**
 * Utils check string
 *
 * @param  {String}   string
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkString = Utils.isType("String");

/**
 * Utils check boolean
 *
 * @param  {Object}   obj object
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkBoolean = Utils.isType("Boolean");

/**
 * Utils check object not empty
 *
 * @param  {Object}   obj object
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkObjectEmpty = function(obj) {
	var flag = true;

	for (var key in obj) {
		flag = false;
	}

	return flag;
}

/**
 * Utils check type
 *
 * @param  {String}   type
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkType = function(type) {
	if (type === 'Object')
		return true;
	if (type === 'Number')
		return true;
	if (type === 'Array')
		return true;
	if (type === 'Boolean')
		return true;
	if (type === 'Function')
		return true;
	if (type === 'String')
		return true;
	return false;
}

/**
 * Utils check is not null
 *
 * @param  {Object}   value
 * @return {Boolean}  true|false
 * @api public
 */
Utils.isNotNull = function(value) {
	if (typeof value !== 'undefined' && value !== null)
		return true;
	return false;
}

/**
 * Utils myRequire require handle error
 *
 * @param  {String}   cpath require path
 * @return {Object}   require result
 * @api public
 */
Utils.myRequire = function(cpath) {
	if (!Utils.checkString(cpath)) {
		return;
	}

	var context = null;
	try {
		context = require(cpath);
		return context;
	} catch (err) {
		logger.error('myRequire error %s', err.stack);
		// logger.debug('myRequire error file pid %d %s %s', process.pid, cpath, FileUtil.readFileSync(cpath).toString());
		return context;
	}
}

/**
 * Utils myRequireHot require handle error
 *
 * @param  {String}   cpath require path
 * @return {Object}   require result
 * @api public
 */
Utils.myRequireHot = function(cpath) {
	var context = null;
	try {
		context = Utils.requireUncached(cpath);
		return context;
	} catch (err) {
		logger.error('myRequireHot error %s', err.stack);
		// logger.debug('myRequireHot error file pid %d %s %s', process.pid, cpath, FileUtil.readFileSync(cpath).toString());
		return context;
	}
}

/**
 * Utils get load path
 *
 * @param  {String}   spath scan path
 * @param  {String}   cpath context path
 * @return {String}   load path
 * @api public
 */
Utils.getLoadPath = function(spath, cpath) {
	if (!Utils.checkString(spath)) {
		return null;
	}
	spath = spath.replace(/\./g, "/");

	cpath = require.resolve(cpath);

	var dpath = Path.dirname(cpath);

	return dpath + "/" + spath;
}

/**
 * Utils get load path
 *
 * @param  {String}   spath scan path
 * @param  {String}   cpath context path
 * @return {String}   load path
 * @api public
 */
Utils.getLoadPath2 = function(spath, cpath) {
	if (!Utils.checkString(spath)) {
		return null;
	}

	cpath = require.resolve(cpath);

	var dpath = Path.dirname(cpath);

	var rpath = Path.resolve(dpath, spath);
	return rpath;
}

/**
 * Utils require new
 *
 * @param  {String}   module require module
 * @return {object}   require result
 * @api public
 */
Utils.requireUncached = function(module) {
	if (!Utils.checkString(module)) {
		return;
	}

	var modulePath = require.resolve(module);
	if (require.cache[modulePath]) {
		delete require.cache[modulePath];
	}

	return require(modulePath)
}

/**
 * Utils Check file suffix
 
 * @param {String} fn file name
 * @param {String} suffix suffix string, such as .js, etc.
 */
Utils.checkFileType = function(fn, suffix) {
	if (suffix.charAt(0) !== '.') {
		suffix = '.' + suffix;
	}

	if (fn.length <= suffix.length) {
		return false;
	}

	var str = fn.substring(fn.length - suffix.length).toLowerCase();
	suffix = suffix.toLowerCase();
	return str === suffix;
};

/**
 * Utils Check isFile
 
 * @param  {String}  path 
 * @return {Boolean} true|false.
 */
Utils.isFile = function(path) {
	if (FileUtil.existsSync(path)) {
		return FileUtil.statSync(path).isFile();
	}
};

/**
 * Utils Check isDir
 
 * @param  {String}  path 
 * @return {Boolean} true|false.
 */
Utils.isDir = function(path) {
	if (FileUtil.existsSync(path)) {
		return FileUtil.statSync(path).isDirectory();
	}
};

/**
 * Utils get file name
 
 * @param  {String}  fp 
 * @param  {Number}  suffixLength
 * @return {String}  file name
 */
Utils.getFileName = function(fp, suffixLength) {
	var fn = Path.basename(fp);
	if (fn.length > suffixLength) {
		return fn.substring(0, fn.length - suffixLength);
	}

	return fn;
};

/**
 * Utils compare by order
 
 * @param  {Object}  a
 * @param  {Object}  b
 * @return {Number}  
 */
Utils.compareByOrder = function(a, b) {
	if (!a.getOrder())
		return 1;
	if (!b.getOrder())
		return -1;
	return a.getOrder() - b.getOrder();
}

/**
 * Utils compare beans, aspect first, order low first
 
 * @param  {Object}  a
 * @param  {Object}  b
 * @return {Number}  
 */
Utils.compareBeans = function(a, b) {
	if (a.isAspect()) {
		return -1;
	}

	if (b.isAspect()) {
		return 1;
	}

	if (!a.getOrder())
		return 1;
	if (!b.getOrder())
		return -1;
	return a.getOrder() - b.getOrder();
}

/**
 * Utils parseArgs
 
 * @param  {Array}  args
 * @return {Object} argsMap 
 */
Utils.parseArgs = function(args) {
	var argsMap = {};
	var mainPos = 1;

	argsMap.main = args[mainPos];

	for (var i = (mainPos + 1); i < args.length; i++) {
		var arg = args[i];
		var sep = arg.indexOf('=');
		var key = arg.slice(0, sep);
		var value = arg.slice(sep + 1);
		argsMap[key] = value;
	}

	return argsMap;
}

/**
 * Utils check browser
 *
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkBrowser = function() {
	return typeof window !== 'undefined';
}

/**
 * Utils check web worker
 *
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkWebWorker = function() {
	return this.checkBrowser() && typeof importScripts !== 'undefined' && this.checkFunction(importScripts);
}

/**
 * Utils check model filter error
 *
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkModelFilterError = function(r) {
	return r !== true && this.isNotNull(r);
}

/**
 * Utils check cocos2d-js jsb env
 *
 * @return {Boolean}  true|false
 * @api public
 */
Utils.checkCocos2dJsb = function() {
	if (typeof cc !== 'undefined' && cc && cc.sys && cc.sys.isNative) {
		return true;
	}

	return false;
}

module.exports = Utils;
},{"./constant":144,"./fileUtil":145,"./requireUtil":149,"pomelo-logger":169}],152:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ValidatorUtil
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Constant = require('./constant');
var Utils = require('./utils');
var ValidatorUtil = {};

/**
 * ValidatorUtil validate metaObject.
 *
 * @param    {Object}   	   metaObject
 * @return   {Boolean|Error}  true|error object
 * @api public
 */
ValidatorUtil.metaValidator = function(metaObject) {
	var id = metaObject.id;
	var mid = metaObject.mid;
	var cid = metaObject.cid;

	if (!id && !mid && !cid)
		return new Error('one of id, mid, cid must be exist');

	if (Utils.isNotNull(id) && !Utils.checkString(id))
		return new Error('id must be String');

	if (Utils.isNotNull(mid) && !Utils.checkString(mid))
		return new Error('mid must be String');

	if (Utils.isNotNull(cid) && !Utils.checkString(cid))
		return new Error('cid must be String');

	var func = metaObject.func;
	if (!Utils.isNotNull(func) || !Utils.checkFunction(func))
		return new Error('func must be Function');

	var table = metaObject.table;
	if (Utils.isNotNull(table) && !Utils.checkString(table)) {
		return new Error('table must be String');
	}

	var message = metaObject.message;
	if (Utils.isNotNull(message) && !Utils.checkString(message)) {
		return new Error('message must be String');
	}

	var constraint = metaObject.constraint;
	if (Utils.isNotNull(constraint) && !Utils.checkString(constraint)) {
		return new Error('constraint must be String');
	}

	var order = metaObject.order;
	if (Utils.isNotNull(order) && !Utils.checkNumber(order))
		return new Error('order must be Number');

	var parentName = metaObject.parent;
	if (Utils.isNotNull(parentName) && !Utils.checkString(parentName))
		return new Error('parent must be String');

	var initMethodName = metaObject.init;
	if (Utils.isNotNull(initMethodName) && !Utils.checkString(initMethodName))
		return new Error('init must be String');

	var destroyMethodName = metaObject.destroy;
	if (Utils.isNotNull(destroyMethodName) && !Utils.checkString(destroyMethodName))
		return new Error('destroy must be String');

	var factoryBeanName = metaObject.factoryBean;
	if (Utils.isNotNull(factoryBeanName) && !Utils.checkString(factoryBeanName))
		return new Error('factoryBean must be String');

	var factoryMethodName = metaObject.factoryMethod;
	if (Utils.isNotNull(factoryMethodName) && !Utils.checkString(factoryMethodName))
		return new Error('factoryMethodName must be String');

	var scope = metaObject.scope || Constant.SCOPE_DEFAULT;
	if (scope && scope !== Constant.SCOPE_SINGLETON && scope !== Constant.SCOPE_PROTOTYPE)
		return new Error('scope must be singleton or prototype');

	var asyncInit = metaObject.async || Constant.ASYNC_INIT_DEFAULT;
	if (Utils.isNotNull(asyncInit) && !Utils.checkBoolean(asyncInit))
		return new Error('async must be Boolean');

	var lazyInit = metaObject.lazy || Constant.LAZY_INIT_DEFAULT;
	if (Utils.isNotNull(lazyInit) && !Utils.checkBoolean(lazyInit))
		return new Error('lazy must be Boolean');

	return true;
}

module.exports = ValidatorUtil;
},{"./constant":144,"./utils":151}],153:[function(require,module,exports){
(function (Buffer){
(function (global, module) {

  var exports = module.exports;

  /**
   * Exports.
   */

  module.exports = expect;
  expect.Assertion = Assertion;

  /**
   * Exports version.
   */

  expect.version = '0.3.1';

  /**
   * Possible assertion flags.
   */

  var flags = {
      not: ['to', 'be', 'have', 'include', 'only']
    , to: ['be', 'have', 'include', 'only', 'not']
    , only: ['have']
    , have: ['own']
    , be: ['an']
  };

  function expect (obj) {
    return new Assertion(obj);
  }

  /**
   * Constructor
   *
   * @api private
   */

  function Assertion (obj, flag, parent) {
    this.obj = obj;
    this.flags = {};

    if (undefined != parent) {
      this.flags[flag] = true;

      for (var i in parent.flags) {
        if (parent.flags.hasOwnProperty(i)) {
          this.flags[i] = true;
        }
      }
    }

    var $flags = flag ? flags[flag] : keys(flags)
      , self = this;

    if ($flags) {
      for (var i = 0, l = $flags.length; i < l; i++) {
        // avoid recursion
        if (this.flags[$flags[i]]) continue;

        var name = $flags[i]
          , assertion = new Assertion(this.obj, name, this)

        if ('function' == typeof Assertion.prototype[name]) {
          // clone the function, make sure we dont touch the prot reference
          var old = this[name];
          this[name] = function () {
            return old.apply(self, arguments);
          };

          for (var fn in Assertion.prototype) {
            if (Assertion.prototype.hasOwnProperty(fn) && fn != name) {
              this[name][fn] = bind(assertion[fn], assertion);
            }
          }
        } else {
          this[name] = assertion;
        }
      }
    }
  }

  /**
   * Performs an assertion
   *
   * @api private
   */

  Assertion.prototype.assert = function (truth, msg, error, expected) {
    var msg = this.flags.not ? error : msg
      , ok = this.flags.not ? !truth : truth
      , err;

    if (!ok) {
      err = new Error(msg.call(this));
      if (arguments.length > 3) {
        err.actual = this.obj;
        err.expected = expected;
        err.showDiff = true;
      }
      throw err;
    }

    this.and = new Assertion(this.obj);
  };

  /**
   * Check if the value is truthy
   *
   * @api public
   */

  Assertion.prototype.ok = function () {
    this.assert(
        !!this.obj
      , function(){ return 'expected ' + i(this.obj) + ' to be truthy' }
      , function(){ return 'expected ' + i(this.obj) + ' to be falsy' });
  };

  /**
   * Creates an anonymous function which calls fn with arguments.
   *
   * @api public
   */

  Assertion.prototype.withArgs = function() {
    expect(this.obj).to.be.a('function');
    var fn = this.obj;
    var args = Array.prototype.slice.call(arguments);
    return expect(function() { fn.apply(null, args); });
  };

  /**
   * Assert that the function throws.
   *
   * @param {Function|RegExp} callback, or regexp to match error string against
   * @api public
   */

  Assertion.prototype.throwError =
  Assertion.prototype.throwException = function (fn) {
    expect(this.obj).to.be.a('function');

    var thrown = false
      , not = this.flags.not;

    try {
      this.obj();
    } catch (e) {
      if (isRegExp(fn)) {
        var subject = 'string' == typeof e ? e : e.message;
        if (not) {
          expect(subject).to.not.match(fn);
        } else {
          expect(subject).to.match(fn);
        }
      } else if ('function' == typeof fn) {
        fn(e);
      }
      thrown = true;
    }

    if (isRegExp(fn) && not) {
      // in the presence of a matcher, ensure the `not` only applies to
      // the matching.
      this.flags.not = false;
    }

    var name = this.obj.name || 'fn';
    this.assert(
        thrown
      , function(){ return 'expected ' + name + ' to throw an exception' }
      , function(){ return 'expected ' + name + ' not to throw an exception' });
  };

  /**
   * Checks if the array is empty.
   *
   * @api public
   */

  Assertion.prototype.empty = function () {
    var expectation;

    if ('object' == typeof this.obj && null !== this.obj && !isArray(this.obj)) {
      if ('number' == typeof this.obj.length) {
        expectation = !this.obj.length;
      } else {
        expectation = !keys(this.obj).length;
      }
    } else {
      if ('string' != typeof this.obj) {
        expect(this.obj).to.be.an('object');
      }

      expect(this.obj).to.have.property('length');
      expectation = !this.obj.length;
    }

    this.assert(
        expectation
      , function(){ return 'expected ' + i(this.obj) + ' to be empty' }
      , function(){ return 'expected ' + i(this.obj) + ' to not be empty' });
    return this;
  };

  /**
   * Checks if the obj exactly equals another.
   *
   * @api public
   */

  Assertion.prototype.be =
  Assertion.prototype.equal = function (obj) {
    this.assert(
        obj === this.obj
      , function(){ return 'expected ' + i(this.obj) + ' to equal ' + i(obj) }
      , function(){ return 'expected ' + i(this.obj) + ' to not equal ' + i(obj) });
    return this;
  };

  /**
   * Checks if the obj sortof equals another.
   *
   * @api public
   */

  Assertion.prototype.eql = function (obj) {
    this.assert(
        expect.eql(this.obj, obj)
      , function(){ return 'expected ' + i(this.obj) + ' to sort of equal ' + i(obj) }
      , function(){ return 'expected ' + i(this.obj) + ' to sort of not equal ' + i(obj) }
      , obj);
    return this;
  };

  /**
   * Assert within start to finish (inclusive).
   *
   * @param {Number} start
   * @param {Number} finish
   * @api public
   */

  Assertion.prototype.within = function (start, finish) {
    var range = start + '..' + finish;
    this.assert(
        this.obj >= start && this.obj <= finish
      , function(){ return 'expected ' + i(this.obj) + ' to be within ' + range }
      , function(){ return 'expected ' + i(this.obj) + ' to not be within ' + range });
    return this;
  };

  /**
   * Assert typeof / instance of
   *
   * @api public
   */

  Assertion.prototype.a =
  Assertion.prototype.an = function (type) {
    if ('string' == typeof type) {
      // proper english in error msg
      var n = /^[aeiou]/.test(type) ? 'n' : '';

      // typeof with support for 'array'
      this.assert(
          'array' == type ? isArray(this.obj) :
            'regexp' == type ? isRegExp(this.obj) :
              'object' == type
                ? 'object' == typeof this.obj && null !== this.obj
                : type == typeof this.obj
        , function(){ return 'expected ' + i(this.obj) + ' to be a' + n + ' ' + type }
        , function(){ return 'expected ' + i(this.obj) + ' not to be a' + n + ' ' + type });
    } else {
      // instanceof
      var name = type.name || 'supplied constructor';
      this.assert(
          this.obj instanceof type
        , function(){ return 'expected ' + i(this.obj) + ' to be an instance of ' + name }
        , function(){ return 'expected ' + i(this.obj) + ' not to be an instance of ' + name });
    }

    return this;
  };

  /**
   * Assert numeric value above _n_.
   *
   * @param {Number} n
   * @api public
   */

  Assertion.prototype.greaterThan =
  Assertion.prototype.above = function (n) {
    this.assert(
        this.obj > n
      , function(){ return 'expected ' + i(this.obj) + ' to be above ' + n }
      , function(){ return 'expected ' + i(this.obj) + ' to be below ' + n });
    return this;
  };

  /**
   * Assert numeric value below _n_.
   *
   * @param {Number} n
   * @api public
   */

  Assertion.prototype.lessThan =
  Assertion.prototype.below = function (n) {
    this.assert(
        this.obj < n
      , function(){ return 'expected ' + i(this.obj) + ' to be below ' + n }
      , function(){ return 'expected ' + i(this.obj) + ' to be above ' + n });
    return this;
  };

  /**
   * Assert string value matches _regexp_.
   *
   * @param {RegExp} regexp
   * @api public
   */

  Assertion.prototype.match = function (regexp) {
    this.assert(
        regexp.exec(this.obj)
      , function(){ return 'expected ' + i(this.obj) + ' to match ' + regexp }
      , function(){ return 'expected ' + i(this.obj) + ' not to match ' + regexp });
    return this;
  };

  /**
   * Assert property "length" exists and has value of _n_.
   *
   * @param {Number} n
   * @api public
   */

  Assertion.prototype.length = function (n) {
    expect(this.obj).to.have.property('length');
    var len = this.obj.length;
    this.assert(
        n == len
      , function(){ return 'expected ' + i(this.obj) + ' to have a length of ' + n + ' but got ' + len }
      , function(){ return 'expected ' + i(this.obj) + ' to not have a length of ' + len });
    return this;
  };

  /**
   * Assert property _name_ exists, with optional _val_.
   *
   * @param {String} name
   * @param {Mixed} val
   * @api public
   */

  Assertion.prototype.property = function (name, val) {
    if (this.flags.own) {
      this.assert(
          Object.prototype.hasOwnProperty.call(this.obj, name)
        , function(){ return 'expected ' + i(this.obj) + ' to have own property ' + i(name) }
        , function(){ return 'expected ' + i(this.obj) + ' to not have own property ' + i(name) });
      return this;
    }

    if (this.flags.not && undefined !== val) {
      if (undefined === this.obj[name]) {
        throw new Error(i(this.obj) + ' has no property ' + i(name));
      }
    } else {
      var hasProp;
      try {
        hasProp = name in this.obj
      } catch (e) {
        hasProp = undefined !== this.obj[name]
      }

      this.assert(
          hasProp
        , function(){ return 'expected ' + i(this.obj) + ' to have a property ' + i(name) }
        , function(){ return 'expected ' + i(this.obj) + ' to not have a property ' + i(name) });
    }

    if (undefined !== val) {
      this.assert(
          val === this.obj[name]
        , function(){ return 'expected ' + i(this.obj) + ' to have a property ' + i(name)
          + ' of ' + i(val) + ', but got ' + i(this.obj[name]) }
        , function(){ return 'expected ' + i(this.obj) + ' to not have a property ' + i(name)
          + ' of ' + i(val) });
    }

    this.obj = this.obj[name];
    return this;
  };

  /**
   * Assert that the array contains _obj_ or string contains _obj_.
   *
   * @param {Mixed} obj|string
   * @api public
   */

  Assertion.prototype.string =
  Assertion.prototype.contain = function (obj) {
    if ('string' == typeof this.obj) {
      this.assert(
          ~this.obj.indexOf(obj)
        , function(){ return 'expected ' + i(this.obj) + ' to contain ' + i(obj) }
        , function(){ return 'expected ' + i(this.obj) + ' to not contain ' + i(obj) });
    } else {
      this.assert(
          ~indexOf(this.obj, obj)
        , function(){ return 'expected ' + i(this.obj) + ' to contain ' + i(obj) }
        , function(){ return 'expected ' + i(this.obj) + ' to not contain ' + i(obj) });
    }
    return this;
  };

  /**
   * Assert exact keys or inclusion of keys by using
   * the `.own` modifier.
   *
   * @param {Array|String ...} keys
   * @api public
   */

  Assertion.prototype.key =
  Assertion.prototype.keys = function ($keys) {
    var str
      , ok = true;

    $keys = isArray($keys)
      ? $keys
      : Array.prototype.slice.call(arguments);

    if (!$keys.length) throw new Error('keys required');

    var actual = keys(this.obj)
      , len = $keys.length;

    // Inclusion
    ok = every($keys, function (key) {
      return ~indexOf(actual, key);
    });

    // Strict
    if (!this.flags.not && this.flags.only) {
      ok = ok && $keys.length == actual.length;
    }

    // Key string
    if (len > 1) {
      $keys = map($keys, function (key) {
        return i(key);
      });
      var last = $keys.pop();
      str = $keys.join(', ') + ', and ' + last;
    } else {
      str = i($keys[0]);
    }

    // Form
    str = (len > 1 ? 'keys ' : 'key ') + str;

    // Have / include
    str = (!this.flags.only ? 'include ' : 'only have ') + str;

    // Assertion
    this.assert(
        ok
      , function(){ return 'expected ' + i(this.obj) + ' to ' + str }
      , function(){ return 'expected ' + i(this.obj) + ' to not ' + str });

    return this;
  };

  /**
   * Assert a failure.
   *
   * @param {String ...} custom message
   * @api public
   */
  Assertion.prototype.fail = function (msg) {
    var error = function() { return msg || "explicit failure"; }
    this.assert(false, error, error);
    return this;
  };

  /**
   * Function bind implementation.
   */

  function bind (fn, scope) {
    return function () {
      return fn.apply(scope, arguments);
    }
  }

  /**
   * Array every compatibility
   *
   * @see bit.ly/5Fq1N2
   * @api public
   */

  function every (arr, fn, thisObj) {
    var scope = thisObj || global;
    for (var i = 0, j = arr.length; i < j; ++i) {
      if (!fn.call(scope, arr[i], i, arr)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Array indexOf compatibility.
   *
   * @see bit.ly/a5Dxa2
   * @api public
   */

  function indexOf (arr, o, i) {
    if (Array.prototype.indexOf) {
      return Array.prototype.indexOf.call(arr, o, i);
    }

    if (arr.length === undefined) {
      return -1;
    }

    for (var j = arr.length, i = i < 0 ? i + j < 0 ? 0 : i + j : i || 0
        ; i < j && arr[i] !== o; i++);

    return j <= i ? -1 : i;
  }

  // https://gist.github.com/1044128/
  var getOuterHTML = function(element) {
    if ('outerHTML' in element) return element.outerHTML;
    var ns = "http://www.w3.org/1999/xhtml";
    var container = document.createElementNS(ns, '_');
    var xmlSerializer = new XMLSerializer();
    var html;
    if (document.xmlVersion) {
      return xmlSerializer.serializeToString(element);
    } else {
      container.appendChild(element.cloneNode(false));
      html = container.innerHTML.replace('><', '>' + element.innerHTML + '<');
      container.innerHTML = '';
      return html;
    }
  };

  // Returns true if object is a DOM element.
  var isDOMElement = function (object) {
    if (typeof HTMLElement === 'object') {
      return object instanceof HTMLElement;
    } else {
      return object &&
        typeof object === 'object' &&
        object.nodeType === 1 &&
        typeof object.nodeName === 'string';
    }
  };

  /**
   * Inspects an object.
   *
   * @see taken from node.js `util` module (copyright Joyent, MIT license)
   * @api private
   */

  function i (obj, showHidden, depth) {
    var seen = [];

    function stylize (str) {
      return str;
    }

    function format (value, recurseTimes) {
      // Provide a hook for user-specified inspect functions.
      // Check that value is an object with an inspect function on it
      if (value && typeof value.inspect === 'function' &&
          // Filter out the util module, it's inspect function is special
          value !== exports &&
          // Also filter out any prototype objects using the circular check.
          !(value.constructor && value.constructor.prototype === value)) {
        return value.inspect(recurseTimes);
      }

      // Primitive types cannot have properties
      switch (typeof value) {
        case 'undefined':
          return stylize('undefined', 'undefined');

        case 'string':
          var simple = '\'' + json.stringify(value).replace(/^"|"$/g, '')
                                                   .replace(/'/g, "\\'")
                                                   .replace(/\\"/g, '"') + '\'';
          return stylize(simple, 'string');

        case 'number':
          return stylize('' + value, 'number');

        case 'boolean':
          return stylize('' + value, 'boolean');
      }
      // For some reason typeof null is "object", so special case here.
      if (value === null) {
        return stylize('null', 'null');
      }

      if (isDOMElement(value)) {
        return getOuterHTML(value);
      }

      // Look up the keys of the object.
      var visible_keys = keys(value);
      var $keys = showHidden ? Object.getOwnPropertyNames(value) : visible_keys;

      // Functions without properties can be shortcutted.
      if (typeof value === 'function' && $keys.length === 0) {
        if (isRegExp(value)) {
          return stylize('' + value, 'regexp');
        } else {
          var name = value.name ? ': ' + value.name : '';
          return stylize('[Function' + name + ']', 'special');
        }
      }

      // Dates without properties can be shortcutted
      if (isDate(value) && $keys.length === 0) {
        return stylize(value.toUTCString(), 'date');
      }
      
      // Error objects can be shortcutted
      if (value instanceof Error) {
        return stylize("["+value.toString()+"]", 'Error');
      }

      var base, type, braces;
      // Determine the object type
      if (isArray(value)) {
        type = 'Array';
        braces = ['[', ']'];
      } else {
        type = 'Object';
        braces = ['{', '}'];
      }

      // Make functions say that they are functions
      if (typeof value === 'function') {
        var n = value.name ? ': ' + value.name : '';
        base = (isRegExp(value)) ? ' ' + value : ' [Function' + n + ']';
      } else {
        base = '';
      }

      // Make dates with properties first say the date
      if (isDate(value)) {
        base = ' ' + value.toUTCString();
      }

      if ($keys.length === 0) {
        return braces[0] + base + braces[1];
      }

      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return stylize('' + value, 'regexp');
        } else {
          return stylize('[Object]', 'special');
        }
      }

      seen.push(value);

      var output = map($keys, function (key) {
        var name, str;
        if (value.__lookupGetter__) {
          if (value.__lookupGetter__(key)) {
            if (value.__lookupSetter__(key)) {
              str = stylize('[Getter/Setter]', 'special');
            } else {
              str = stylize('[Getter]', 'special');
            }
          } else {
            if (value.__lookupSetter__(key)) {
              str = stylize('[Setter]', 'special');
            }
          }
        }
        if (indexOf(visible_keys, key) < 0) {
          name = '[' + key + ']';
        }
        if (!str) {
          if (indexOf(seen, value[key]) < 0) {
            if (recurseTimes === null) {
              str = format(value[key]);
            } else {
              str = format(value[key], recurseTimes - 1);
            }
            if (str.indexOf('\n') > -1) {
              if (isArray(value)) {
                str = map(str.split('\n'), function (line) {
                  return '  ' + line;
                }).join('\n').substr(2);
              } else {
                str = '\n' + map(str.split('\n'), function (line) {
                  return '   ' + line;
                }).join('\n');
              }
            }
          } else {
            str = stylize('[Circular]', 'special');
          }
        }
        if (typeof name === 'undefined') {
          if (type === 'Array' && key.match(/^\d+$/)) {
            return str;
          }
          name = json.stringify('' + key);
          if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name = name.substr(1, name.length - 2);
            name = stylize(name, 'name');
          } else {
            name = name.replace(/'/g, "\\'")
                       .replace(/\\"/g, '"')
                       .replace(/(^"|"$)/g, "'");
            name = stylize(name, 'string');
          }
        }

        return name + ': ' + str;
      });

      seen.pop();

      var numLinesEst = 0;
      var length = reduce(output, function (prev, cur) {
        numLinesEst++;
        if (indexOf(cur, '\n') >= 0) numLinesEst++;
        return prev + cur.length + 1;
      }, 0);

      if (length > 50) {
        output = braces[0] +
                 (base === '' ? '' : base + '\n ') +
                 ' ' +
                 output.join(',\n  ') +
                 ' ' +
                 braces[1];

      } else {
        output = braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
      }

      return output;
    }
    return format(obj, (typeof depth === 'undefined' ? 2 : depth));
  }

  expect.stringify = i;

  function isArray (ar) {
    return Object.prototype.toString.call(ar) === '[object Array]';
  }

  function isRegExp(re) {
    var s;
    try {
      s = '' + re;
    } catch (e) {
      return false;
    }

    return re instanceof RegExp || // easy case
           // duck-type for context-switching evalcx case
           typeof(re) === 'function' &&
           re.constructor.name === 'RegExp' &&
           re.compile &&
           re.test &&
           re.exec &&
           s.match(/^\/.*\/[gim]{0,3}$/);
  }

  function isDate(d) {
    return d instanceof Date;
  }

  function keys (obj) {
    if (Object.keys) {
      return Object.keys(obj);
    }

    var keys = [];

    for (var i in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, i)) {
        keys.push(i);
      }
    }

    return keys;
  }

  function map (arr, mapper, that) {
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, mapper, that);
    }

    var other= new Array(arr.length);

    for (var i= 0, n = arr.length; i<n; i++)
      if (i in arr)
        other[i] = mapper.call(that, arr[i], i, arr);

    return other;
  }

  function reduce (arr, fun) {
    if (Array.prototype.reduce) {
      return Array.prototype.reduce.apply(
          arr
        , Array.prototype.slice.call(arguments, 1)
      );
    }

    var len = +this.length;

    if (typeof fun !== "function")
      throw new TypeError();

    // no value to return if no initial value and an empty array
    if (len === 0 && arguments.length === 1)
      throw new TypeError();

    var i = 0;
    if (arguments.length >= 2) {
      var rv = arguments[1];
    } else {
      do {
        if (i in this) {
          rv = this[i++];
          break;
        }

        // if array contains no values, no initial value to return
        if (++i >= len)
          throw new TypeError();
      } while (true);
    }

    for (; i < len; i++) {
      if (i in this)
        rv = fun.call(null, rv, this[i], i, this);
    }

    return rv;
  }

  /**
   * Asserts deep equality
   *
   * @see taken from node.js `assert` module (copyright Joyent, MIT license)
   * @api private
   */

  expect.eql = function eql(actual, expected) {
    // 7.1. All identical values are equivalent, as determined by ===.
    if (actual === expected) {
      return true;
    } else if ('undefined' != typeof Buffer
      && Buffer.isBuffer(actual) && Buffer.isBuffer(expected)) {
      if (actual.length != expected.length) return false;

      for (var i = 0; i < actual.length; i++) {
        if (actual[i] !== expected[i]) return false;
      }

      return true;

      // 7.2. If the expected value is a Date object, the actual value is
      // equivalent if it is also a Date object that refers to the same time.
    } else if (actual instanceof Date && expected instanceof Date) {
      return actual.getTime() === expected.getTime();

      // 7.3. Other pairs that do not both pass typeof value == "object",
      // equivalence is determined by ==.
    } else if (typeof actual != 'object' && typeof expected != 'object') {
      return actual == expected;
    // If both are regular expression use the special `regExpEquiv` method
    // to determine equivalence.
    } else if (isRegExp(actual) && isRegExp(expected)) {
      return regExpEquiv(actual, expected);
    // 7.4. For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical "prototype" property. Note: this
    // accounts for both named and indexed properties on Arrays.
    } else {
      return objEquiv(actual, expected);
    }
  };

  function isUndefinedOrNull (value) {
    return value === null || value === undefined;
  }

  function isArguments (object) {
    return Object.prototype.toString.call(object) == '[object Arguments]';
  }

  function regExpEquiv (a, b) {
    return a.source === b.source && a.global === b.global &&
           a.ignoreCase === b.ignoreCase && a.multiline === b.multiline;
  }

  function objEquiv (a, b) {
    if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
      return false;
    // an identical "prototype" property.
    if (a.prototype !== b.prototype) return false;
    //~~~I've managed to break Object.keys through screwy arguments passing.
    //   Converting to array solves the problem.
    if (isArguments(a)) {
      if (!isArguments(b)) {
        return false;
      }
      a = pSlice.call(a);
      b = pSlice.call(b);
      return expect.eql(a, b);
    }
    try{
      var ka = keys(a),
        kb = keys(b),
        key, i;
    } catch (e) {//happens when one is a string literal and the other isn't
      return false;
    }
    // having the same number of owned properties (keys incorporates hasOwnProperty)
    if (ka.length != kb.length)
      return false;
    //the same set of keys (although not necessarily the same order),
    ka.sort();
    kb.sort();
    //~~~cheap key test
    for (i = ka.length - 1; i >= 0; i--) {
      if (ka[i] != kb[i])
        return false;
    }
    //equivalent values for every corresponding key, and
    //~~~possibly expensive deep test
    for (i = ka.length - 1; i >= 0; i--) {
      key = ka[i];
      if (!expect.eql(a[key], b[key]))
         return false;
    }
    return true;
  }

  var json = (function () {
    "use strict";

    if ('object' == typeof JSON && JSON.parse && JSON.stringify) {
      return {
          parse: nativeJSON.parse
        , stringify: nativeJSON.stringify
      }
    }

    var JSON = {};

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    function date(d, key) {
      return isFinite(d.valueOf()) ?
          d.getUTCFullYear()     + '-' +
          f(d.getUTCMonth() + 1) + '-' +
          f(d.getUTCDate())      + 'T' +
          f(d.getUTCHours())     + ':' +
          f(d.getUTCMinutes())   + ':' +
          f(d.getUTCSeconds())   + 'Z' : null;
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

  // If the string contains no control characters, no quote characters, and no
  // backslash characters, then we can safely slap some quotes around it.
  // Otherwise we must also replace the offending characters with safe escape
  // sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

  // Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

  // If the value has a toJSON method, call it to obtain a replacement value.

        if (value instanceof Date) {
            value = date(key);
        }

  // If we were called with a replacer function, then call the replacer to
  // obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

  // What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

  // JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

  // If the value is a boolean or null, convert it to a string. Note:
  // typeof null does not produce 'null'. The case is included here in
  // the remote chance that this gets fixed someday.

            return String(value);

  // If the type is 'object', we might be dealing with an object or an array or
  // null.

        case 'object':

  // Due to a specification blunder in ECMAScript, typeof null is 'object',
  // so watch out for that case.

            if (!value) {
                return 'null';
            }

  // Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

  // Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

  // The value is an array. Stringify every element. Use null as a placeholder
  // for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

  // Join all of the elements together, separated with commas, and wrap them in
  // brackets.

                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

  // If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

  // Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

  // Join all of the member texts together, separated with commas,
  // and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

  // If the JSON object does not yet have a stringify method, give it one.

    JSON.stringify = function (value, replacer, space) {

  // The stringify method takes a value and an optional replacer, and an optional
  // space parameter, and returns a JSON text. The replacer can be a function
  // that can replace values, or an array of strings that will select the keys.
  // A default replacer method can be provided. Use of the space parameter can
  // produce text that is more easily readable.

        var i;
        gap = '';
        indent = '';

  // If the space parameter is a number, make an indent string containing that
  // many spaces.

        if (typeof space === 'number') {
            for (i = 0; i < space; i += 1) {
                indent += ' ';
            }

  // If the space parameter is a string, it will be used as the indent string.

        } else if (typeof space === 'string') {
            indent = space;
        }

  // If there is a replacer, it must be a function or an array.
  // Otherwise, throw an error.

        rep = replacer;
        if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                typeof replacer.length !== 'number')) {
            throw new Error('JSON.stringify');
        }

  // Make a fake root object containing our value under the key of ''.
  // Return the result of stringifying the value.

        return str('', {'': value});
    };

  // If the JSON object does not yet have a parse method, give it one.

    JSON.parse = function (text, reviver) {
    // The parse method takes a text and an optional reviver function, and returns
    // a JavaScript value if the text is a valid JSON text.

        var j;

        function walk(holder, key) {

    // The walk method is used to recursively walk the resulting structure so
    // that modifications can be made.

            var k, v, value = holder[key];
            if (value && typeof value === 'object') {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = walk(value, k);
                        if (v !== undefined) {
                            value[k] = v;
                        } else {
                            delete value[k];
                        }
                    }
                }
            }
            return reviver.call(holder, key, value);
        }


    // Parsing happens in four stages. In the first stage, we replace certain
    // Unicode characters with escape sequences. JavaScript handles many characters
    // incorrectly, either silently deleting them, or treating them as line endings.

        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
            text = text.replace(cx, function (a) {
                return '\\u' +
                    ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            });
        }

    // In the second stage, we run the text against regular expressions that look
    // for non-JSON patterns. We are especially concerned with '()' and 'new'
    // because they can cause invocation, and '=' because it can cause mutation.
    // But just to be safe, we want to reject all unexpected forms.

    // We split the second stage into 4 regexp operations in order to work around
    // crippling inefficiencies in IE's and Safari's regexp engines. First we
    // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
    // replace all simple value tokens with ']' characters. Third, we delete all
    // open brackets that follow a colon or comma or that begin the text. Finally,
    // we look to see that the remaining characters are only whitespace or ']' or
    // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

        if (/^[\],:{}\s]*$/
                .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                    .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

    // In the third stage we use the eval function to compile the text into a
    // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
    // in JavaScript: it can begin a block or an object literal. We wrap the text
    // in parens to eliminate the ambiguity.

            j = eval('(' + text + ')');

    // In the optional fourth stage, we recursively walk the new structure, passing
    // each name/value pair to a reviver function for possible transformation.

            return typeof reviver === 'function' ?
                walk({'': j}, '') : j;
        }

    // If the text is not JSON parseable, then a SyntaxError is thrown.

        throw new SyntaxError('JSON.parse');
    };

    return JSON;
  })();

  if ('undefined' != typeof window) {
    window.expect = module.exports;
  }

})(
    this
  , 'undefined' != typeof module ? module : {exports: {}}
);

}).call(this,require("buffer").Buffer)
},{"buffer":155}],154:[function(require,module,exports){

},{}],155:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var kMaxLength = 0x3fffffff

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Note:
 *
 * - Implementation must support adding new properties to `Uint8Array` instances.
 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *    incorrect length in some situations.
 *
 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
 * get the Object implementation, which is slower but will work correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Find the length
  var length
  if (type === 'number')
    length = subject > 0 ? subject >>> 0 : 0
  else if (type === 'string') {
    if (encoding === 'base64')
      subject = base64clean(subject)
    length = Buffer.byteLength(subject, encoding)
  } else if (type === 'object' && subject !== null) { // assume object is array-like
    if (subject.type === 'Buffer' && isArray(subject.data))
      subject = subject.data
    length = +subject.length > 0 ? Math.floor(+subject.length) : 0
  } else
    throw new TypeError('must start with number, buffer, array or string')

  if (this.length > kMaxLength)
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
      'size: 0x' + kMaxLength.toString(16) + ' bytes')

  var buf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    if (Buffer.isBuffer(subject)) {
      for (i = 0; i < length; i++)
        buf[i] = subject.readUInt8(i)
    } else {
      for (i = 0; i < length; i++)
        buf[i] = ((subject[i] % 256) + 256) % 256
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

Buffer.isBuffer = function (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
    throw new TypeError('Arguments must be Buffers')

  var x = a.length
  var y = b.length
  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
  if (i !== len) {
    x = a[i]
    y = b[i]
  }
  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function (list, totalLength) {
  if (!isArray(list)) throw new TypeError('Usage: Buffer.concat(list[, length])')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (totalLength === undefined) {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    case 'hex':
      ret = str.length >>> 1
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    default:
      ret = str.length
  }
  return ret
}

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function (encoding, start, end) {
  var loweredCase = false

  start = start >>> 0
  end = end === undefined || end === Infinity ? this.length : end >>> 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase)
          throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.equals = function (b) {
  if(!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max)
      str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b)
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(byte)) throw new Error('Invalid hex string')
    buf[offset + i] = byte
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function asciiWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function utf16leWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length, 2)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leWrite(this, string, offset, length)
      break
    default:
      throw new TypeError('Unknown encoding: ' + encoding)
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function binarySlice (buf, start, end) {
  return asciiSlice(buf, start, end)
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len;
    if (start < 0)
      start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0)
      end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start)
    end = start

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0)
    throw new RangeError('offset is not uint')
  if (offset + ext > length)
    throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80))
    return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  if (end < start) throw new TypeError('sourceEnd < sourceStart')
  if (target_start < 0 || target_start >= target.length)
    throw new TypeError('targetStart out of bounds')
  if (start < 0 || start >= source.length) throw new TypeError('sourceStart out of bounds')
  if (end < 0 || end > source.length) throw new TypeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < len; i++) {
      target[i + target_start] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new TypeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new TypeError('start out of bounds')
  if (end < 0 || end > this.length) throw new TypeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F) {
      byteArray.push(b)
    } else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++) {
        byteArray.push(parseInt(h[j], 16))
      }
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length, unitSize) {
  if (unitSize) length -= length % unitSize;
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

},{"base64-js":156,"ieee754":157,"is-array":158}],156:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],157:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],158:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],159:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],160:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],161:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

},{}],162:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":163}],163:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],164:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],165:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":164,"_process":163,"inherits":160}],166:[function(require,module,exports){
module.exports={
  "name": "bearcat",
  "version": "0.4.23",
  "description": "Magic, self-described javaScript objects build up elastic, maintainable front-backend javaScript applications",
  "main": "index.js",
  "bin": "./bin/bearcat-bin.js",
  "scripts": {
    "test": "grunt"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/bearcatjs/bearcat.git"
  },
  "keywords": [
    "di",
    "IoC",
    "AOP",
    "dependency",
    "injection",
    "consistent",
    "configuration",
    "hot reload",
    "front-backend",
    "sharable codes",
    "dependency injection",
    "asynchronous script loading",
    "magic, self-described javaScript objects"
  ],
  "dependencies": {
    "pomelo-logger": "0.1.x",
    "commander": "2.x",
    "chokidar": "~1.0.1"
  },
  "browser": {
    "pomelo-logger": "./shim/logger.js",
    "chokidar": "./shim/chokidar.js"
  },
  "author": "fantasyni",
  "license": "MIT",
  "devDependencies": {
    "expect.js": "~0.3.1",
    "mocha": ">=0.0.1",
    "grunt": "~0.4.2",
    "blanket": "1.1.x",
    "grunt-browserify": "3.x",
    "grunt-mocha-test": "0.8.x",
    "grunt-contrib-clean": "0.5.x",
    "grunt-contrib-uglify": "~0.3.2"
  }
}
},{}],167:[function(require,module,exports){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat builtins.js
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

exports.process = require('./modules/process');
exports.path = require('./modules/path');
exports.util = require('./modules/util');
exports.os = require('./modules/os');
require('./object');
},{"./modules/os":170,"./modules/path":171,"./modules/process":172,"./modules/util":175,"./object":176}],168:[function(require,module,exports){
var Chokidar = {};

Chokidar.watch = function() {

}

module.exports = Chokidar;
},{}],169:[function(require,module,exports){
(function (process){
/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat shim logger.js
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

function getLogger(categoryName) {
	if (typeof console.log !== 'function') {
		return console;
	}

	var args = arguments;
	var prefix = "";
	for (var i = 1; i < args.length; i++) {
		if (i !== args.length - 1)
			prefix = prefix + args[i] + "] [";
		else
			prefix = prefix + args[i];
	}
	if (typeof categoryName === 'string') {
		// category name is __filename then cut the prefix path
		categoryName = categoryName.replace(process.cwd(), '');
	}
	var levels = ['log', 'debug', 'info', 'warn', 'error', 'trace'];

	var logger = {};
	if (checkCocos2dJsb()) {
		for (var i = 0; i < levels.length; i++) {
			var level = levels[i];
			if (cc[level]) {
				logger[level] = cc[level];
			} else {
				logger[level] = cc.log;
			}
		}
	} else {
		logger = console;
	}

	var pLogger = {};
	for (var key in logger) {
		pLogger[key] = logger[key];
	}

	for (var i = 0; i < levels.length; i++) {
		(function(item) {
			pLogger[item] = function() {
				var p = "";
				if (!process.env.RAW_MESSAGE) {
					if (args.length > 1) {
						p = "[" + prefix + "] ";
					}
					if (args.length && process.env.LOGGER_LINE) {
						p = getLine() + ": " + p;
					}
				}

				if (args.length) {
					arguments[0] = p + arguments[0];
				}

				logger[item].apply(logger, arguments);
			}
		})(levels[i]);
	}

	return pLogger;
};

function checkCocos2dJsb() {
	if (typeof cc !== 'undefined' && cc && cc.sys && cc.sys.isNative) {
		return true;
	}

	return false;
}

module.exports = {
	getLogger: getLogger
}
}).call(this,require('_process'))
},{"_process":163}],170:[function(require,module,exports){
exports.endianness = function() {
    return 'LE'
};

exports.hostname = function() {
    if (typeof location !== 'undefined') {
        return location.hostname
    } else return '';
};

exports.loadavg = function() {
    return []
};

exports.uptime = function() {
    return 0
};

exports.freemem = function() {
    return Number.MAX_VALUE;
};

exports.totalmem = function() {
    return Number.MAX_VALUE;
};

exports.cpus = function() {
    return []
};

exports.type = function() {
    return 'Browser'
};

exports.release = function() {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces = exports.getNetworkInterfaces = function() {
    return {}
};

exports.arch = function() {
    return 'javascript'
};

exports.platform = function() {
    return 'browser'
};

exports.tmpdir = exports.tmpDir = function() {
    return '/tmp';
};

exports.EOL = '\n';
},{}],171:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
  /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
    resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
    trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
    root = result[0],
    dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ? function(str, start, len) {
  return str.substr(start, len)
} : function(str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};
}).call(this,require('_process'))
},{"_process":163}],172:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function() {
    var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined' && window.MutationObserver;
    var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;

    if (canSetImmediate) {
        return function(f) {
            return window.setImmediate(f)
        };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function() {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function(fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, {
            attributes: true
        });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function(ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function(name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function() {
    return '/'
};
process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
};
},{}],173:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function() {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}
},{}],174:[function(require,module,exports){
module.exports = function isBuffer(arg) {
	return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
}
},{}],175:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s':
        return String(args[i++]);
      case '%d':
        return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;

  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
      '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
    value &&
    isFunction(value.inspect) &&
    // Filter out the util module, it's inspect function is special
    value.inspect !== exports.inspect &&
    // Also filter out any prototype objects using the circular check.
    !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
    array = false,
    braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
      .replace(/'/g, "\\'")
      .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
        String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
        key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || {
    value: value[key]
  };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
        .replace(/\\"/g, '"')
        .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
      (base === '' ? '' : base + '\n ') +
      ' ' +
      output.join(',\n  ') +
      ' ' +
      braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
    (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
    typeof arg === 'boolean' ||
    typeof arg === 'number' ||
    typeof arg === 'string' ||
    typeof arg === 'symbol' || // ES6 symbol
    typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec'
];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
    pad(d.getMinutes()),
    pad(d.getSeconds())
  ].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('./support/inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/inherits":173,"./support/isBuffer":174,"_process":163}],176:[function(require,module,exports){
if (typeof Object.create != 'function') {
  Object.create = (function() {
    var Object = function() {};
    return function(prototype) {
      if (arguments.length > 1) {
        // throw Error('Second argument not supported');
      }
      if (typeof prototype != 'object') {
        throw TypeError('Argument must be an object');
      }
      Object.prototype = prototype;
      var result = new Object();
      Object.prototype = null;
      return result;
    };
  })();
}

if (typeof String.prototype.trim != 'function') {
  if (!String.prototype.trim) {
    (function() {
      // Make sure we trim BOM and NBSP
      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      String.prototype.trim = function() {
        return this.replace(rtrim, '');
      };
    })();
  }
}
},{}],177:[function(require,module,exports){
var Advisor = require('../../lib/aop/advisor');

var expect = require('expect.js');

describe('Advisor', function() {
	describe('advisor', function() {
		it('should advice right', function(done) {
			var advisor = new Advisor();
			advisor.setPointcut(null);

			advisor.setBeanName('car');
			var r = advisor.getBeanName();
			expect(r).to.eql('car');

			done();
		});
	});
});
},{"../../lib/aop/advisor":109,"expect.js":153}],178:[function(require,module,exports){
var ApplicationContext = require('../../lib/context/applicationContext');

var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}

describe('aop', function() {
	describe('before advice', function() {
		it('should do before advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runBefore(function(err, r) {
				expect(r).to.eql('car');

				done();
			});
		});

		it('should do before runtime advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runTimeBefore(100, function(err, r) {
				expect(r).to.eql('car' + 100);

				done();
			});
		});

		it('should do before error advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runBeforeError(function(err, r) {
				// expect(err).to.not.be.empty();

				done();
			});
		});
	});

	describe('after advice', function() {
		it('should do after advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runAfter(100, function(err, r) {
				expect(r).to.eql('car' + 100);

				done();
			});
		});
	});

	describe('around advice', function() {
		it('should do around advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runAround(function(err, r) {
				expect(r).to.eql('car' + 100);

				done();
			});
		});

		it('should do around runtime advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runTimeAround(100, function(err, r) {
				expect(r).to.eql('car100' + 100);

				done();
			});
		});
	});

	describe('no advice', function() {
		it('should do no advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.doRun(100);

			done();
		});
	});

	describe('no advice', function() {
		it('should do no advice object right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var obj = {
				test: 1
			};

			var r = car.doRunObj(obj);
			console.log(obj);
			done();
		});
	});

	describe('sync target method after advice', function() {
		it('should do sync target method after advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');

			var r = car.doRunAfterSync();
			done();
		});
	});

	describe('sync target method', function() {
		it('should do sync target method right', function(done) {
			var simplepath = require.resolve('../../examples/aop/context.json');
			if (isBrowser()) {
				require('../../examples/aop/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.runBeforeSync();

			done();
		});
	});
});
},{"../../examples/aop/bearcat-bootstrap.js":3,"../../lib/context/applicationContext":128,"expect.js":153}],179:[function(require,module,exports){
var ApplicationContext = require('../../lib/context/applicationContext');

var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}

describe('aop', function() {
	describe('before advice', function() {
		it('should do before advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop_annotation/context.json');
			if (isBrowser()) {
				require('../../examples/aop_annotation/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runBefore(function(err, r) {
				expect(r).to.eql('car');

				done();
			});
		});

		it('should do before runtime advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop_annotation/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runTimeBefore(100, function(err, r) {
				expect(r).to.eql('car' + 100);

				done();
			});
		});

		it('should do before error advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop_annotation/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runBeforeError(function(err, r) {
				// expect(err).to.not.be.empty();

				done();
			});
		});
	});

	describe('after advice', function() {
		it('should do after advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop_annotation/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runAfter(100, function(err, r) {
				expect(r).to.eql('car' + 100);

				done();
			});
		});
	});

	describe('around advice', function() {
		it('should do around advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop_annotation/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runAround(function(err, r) {
				expect(r).to.eql('car' + 100);

				done();
			});
		});

		it('should do around runtime advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop_annotation/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			car.runTimeAround(100, function(err, r) {
				expect(r).to.eql('car100' + 100);

				done();
			});
		});
	});

	describe('no advice', function() {
		it('should do no advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop_annotation/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.doRun(100);

			done();
		});
	});

	describe('no advice', function() {
		it('should do no advice object right', function(done) {
			var simplepath = require.resolve('../../examples/aop_annotation/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var obj = {
				test: 1
			};

			var r = car.doRunObj(obj);
			console.log(obj);
			done();
		});
	});

	describe('sync target method after advice', function() {
		it('should do sync target method after advice right', function(done) {
			var simplepath = require.resolve('../../examples/aop_annotation/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');

			var r = car.doRunAfterSync();
			done();
		});
	});

	describe('sync target method', function() {
		it('should do sync target method right', function(done) {
			var simplepath = require.resolve('../../examples/aop_annotation/context.json');
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.runBeforeSync();
			// r.should.eql('runBeforeSync');

			done();
		});
	});
});
},{"../../examples/aop_annotation/bearcat-bootstrap.js":10,"../../lib/context/applicationContext":128,"expect.js":153}],180:[function(require,module,exports){
var Aspect = require('../../lib/aop/aspect');
var BeanDefinition = require('../../lib/beans/support/beanDefinition');

describe('Aspect', function() {
	describe('aspect', function() {
		it('should aspect right', function(done) {
			var aspect = new Aspect();
			aspect.setBeanDefinition(new BeanDefinition());
			aspect.getBeanDefinition();

			var Car = function() {}
			aspect.setBean(new Car());
			aspect.getBean();

			done();
		});
	});
});
},{"../../lib/aop/aspect":110,"../../lib/beans/support/beanDefinition":121}],181:[function(require,module,exports){
var DynamicAopProxy = require('../../../lib/aop/framework/dynamicAopProxy');

describe('DynamicAopProxy', function() {
	describe('DynamicAopProxy', function() {
		it('should do DynamicAopProxy right', function(done) {
			var dynamicAopProxy = new DynamicAopProxy();

			done();
		});
	});
});
},{"../../../lib/aop/framework/dynamicAopProxy":113}],182:[function(require,module,exports){
var DynamicMetaProxy = require('../../../lib/aop/framework/dynamicMetaProxy');

describe('DynamicMetaProxy', function() {
	describe('DynamicMetaProxy', function() {
		it('should do DynamicMetaProxy right', function(done) {
			var dynamicMetaProxy = new DynamicMetaProxy();
			dynamicMetaProxy['target'] = {

			}

			dynamicMetaProxy._dyInit();
			dynamicMetaProxy._dyInvoke('run', []);

			done();
		});
	});
});
},{"../../../lib/aop/framework/dynamicMetaProxy":114}],183:[function(require,module,exports){
var ProxyFactory = require('../../../lib/aop/framework/proxyFactory');

describe('ProxyFactory', function() {
	describe('ProxyFactory', function() {
		it('should do ProxyFactory right', function(done) {
			var Car = function() {}

			var proxyFactory = new ProxyFactory(new Car(), ['run', 'runxx']);

			done();
		});
	});
});
},{"../../../lib/aop/framework/proxyFactory":115}],184:[function(require,module,exports){
var Pointcut = require('../../lib/aop/pointcut');

describe('Pointcut', function() {
	describe('Pointcut', function() {
		it('should do Pointcut right', function(done) {
			var pointcut = new Pointcut();
			pointcut.parse();

			done();
		});
	});
});
},{"../../lib/aop/pointcut":116}],185:[function(require,module,exports){
var TargetSource = require('../../lib/aop/targetSource');

describe('TargetSource', function() {
	describe('TargetSource', function() {
		it('should do TargetSource right', function(done) {
			var targetSource = new TargetSource();
			var Car = function() {}
			targetSource.setBeanName('car');
			targetSource.setTarget(new Car());

			done();
		});
	});
});
},{"../../lib/aop/targetSource":117}],186:[function(require,module,exports){
var BeanDefinition = require('../../lib/beans/support/beanDefinition');
var BeanWrapper = require('../../lib/beans/support/beanWrapper');
var BeanFactory = require('../../lib/beans/beanFactory');

describe('BeanFactory', function() {
	describe('simple', function() {
		it('should get bean right', function(done) {
			var beanFactory = new BeanFactory();

			beanFactory.doCreateBean('car');
			beanFactory.initBean('car');
			beanFactory.invokeInitMethods('car');
			beanFactory.getDependsApplyArgs('');
			beanFactory.setParentBean('car');
			// beanFactory.getDependsBeans('car');
			beanFactory.isSingleton('car');
			beanFactory.isPrototype('car');
			beanFactory.destroySingleton();
			beanFactory.destroyBean();

			var beanDefinition = new BeanDefinition();
			beanDefinition.setBeanName('car');
			beanFactory.beanDefinitions['car'] = beanDefinition;

			beanFactory.doCreateBean('car');

			var beanWrapper = new BeanWrapper();

			beanFactory.getDependsApplyArgs([beanWrapper]);

			beanFactory['models'] = {
				xxx: {
					getId: function() {}
				}
			}
			beanFactory.getModelProxy('xxx');

			done();
		});
	});
});
},{"../../lib/beans/beanFactory":118,"../../lib/beans/support/beanDefinition":121,"../../lib/beans/support/beanWrapper":124}],187:[function(require,module,exports){
var SingletonBeanFactory = require('../../lib/beans/singletonBeanFactory');

describe('SingletonBeanFactory', function() {
	describe('simple', function() {
		it('should get bean right', function(done) {
			var singletonBeanFactory = new SingletonBeanFactory();
			singletonBeanFactory.containsSingleton('car');

			done();
		});
	});
});
},{"../../lib/beans/singletonBeanFactory":120}],188:[function(require,module,exports){
var BeanDefinition = require('../../../lib/beans/support/beanDefinition');
var BeanWrapper = require('../../../lib/beans/support/beanWrapper');
var Constant = require('../../../lib/util/constant');

describe('beanDefinition', function() {
	describe('beanDefinition', function() {
		it('should advice right', function(done) {
			var beanDefinition = new BeanDefinition();
			var parentBeanDefinition = new BeanDefinition();
			parentBeanDefinition.setFactoryBeanName('factoryCar');
			parentBeanDefinition.setFactoryMethodName('createCar');
			parentBeanDefinition.setScope('prototype');
			parentBeanDefinition.setLazyInit(true);
			parentBeanDefinition.setProxy(true);
			parentBeanDefinition.setInitMethodName('init');
			parentBeanDefinition.setDestroyMethodName('destroy');

			beanDefinition.setParentBean(parentBeanDefinition);
			beanDefinition.setParentBean();
			beanDefinition.setBeanName();
			beanDefinition.setScope();
			var beanWrapper = new BeanWrapper();
			beanWrapper.setName('car');
			beanDefinition.setFactoryArgsOn([beanWrapper]);
			beanDefinition.hasParent();

			beanDefinition.isSingleton();
			beanDefinition.isPrototype();
			beanDefinition.getFactoryBeanName();
			beanDefinition.getFactoryMethodName();
			beanDefinition.getScope();
			beanDefinition.isLazyInit();
			beanDefinition.needProxy();
			beanDefinition.getInitMethodName();
			beanDefinition.getDestroyMethodName();

			done();
		});
	});
});
},{"../../../lib/beans/support/beanDefinition":121,"../../../lib/beans/support/beanWrapper":124,"../../../lib/util/constant":144}],189:[function(require,module,exports){
var BeanDefinitionVisitor = require('../../../lib/beans/support/beanDefinitionVisitor');

describe('BeanDefinitionVisitor', function() {
	describe('beanDefinitionVisitor', function() {
		it('should advice right', function(done) {
			var beanDefinitionVisitor = new BeanDefinitionVisitor();
			beanDefinitionVisitor.setValueResolver();
			beanDefinitionVisitor.resolveStringValue("aaa");

			done();
		});
	});
});
},{"../../../lib/beans/support/beanDefinitionVisitor":122}],190:[function(require,module,exports){
var BeanWrapper = require('../../../lib/beans/support/beanWrapper');
var Constant = require('../../../lib/util/constant');
var expect = require('expect.js');

describe('beanWrapper', function() {
	describe('create get beanWrapper', function() {
		it('should get t1 beanWrapper right', function(done) {
			var t1Bean = new BeanWrapper();
			t1Bean.setName('t1Bean');
			t1Bean.setType('Number');
			t1Bean.setRole();
			var t1Role = t1Bean.getDependType();
			expect(t1Role).to.eql(Constant.DEPEND_TYPE_VAR);

			done();
		});

		it('should get t2 beanWrapper right', function(done) {
			var t2Bean = new BeanWrapper();
			t2Bean.setName('t2Bean');
			t2Bean.setValue(100);
			t2Bean.setRole();

			var t2Role = t2Bean.getDependType();
			expect(t2Role).to.eql(Constant.DEPEND_TYPE_VALUE);

			done();
		});

		it('should get t3 beanWrapper right', function(done) {
			var t3Bean = new BeanWrapper();
			t3Bean.setName('t3Bean');
			t3Bean.setRef('t1Bean');
			t3Bean.setRole();

			var t3Role = t3Bean.getDependType();
			expect(t3Role).to.eql(Constant.DEPEND_TYPE_BEAN);

			done();
		});

		it('should get t4 beanWrapper right', function(done) {
			var t4Bean = new BeanWrapper();
			t4Bean.setRole();

			var t4Role = t4Bean.getDependType();
			expect(t4Role).to.eql(Constant.DEPEND_TYPE_ERROR);

			done();
		});

		it('should get t5 beanWrapper right', function(done) {
			var t5Bean = new BeanWrapper();
			t5Bean.setName('t5Bean');
			t5Bean.setType('aaa');
			t5Bean.setRole();

			var t5Role = t5Bean.getDependType();
			expect(t5Role).to.eql(Constant.DEPEND_TYPE_ERROR);

			done();
		});
	});
});
},{"../../../lib/beans/support/beanWrapper":124,"../../../lib/util/constant":144,"expect.js":153}],191:[function(require,module,exports){
var PlaceHolderConfigurer = require('../../../lib/beans/support/placeHolderConfigurer');

describe('PlaceHolderConfigurer', function() {
	describe('placeHolderConfigurer', function() {
		it('should advice right', function(done) {
			var placeHolderConfigurer = new PlaceHolderConfigurer();
			placeHolderConfigurer.setBeanName('car');
			placeHolderConfigurer.getBeanName('car');

			placeHolderConfigurer.setProperties();

			done();
		});
	});
});
},{"../../../lib/beans/support/placeHolderConfigurer":125}],192:[function(require,module,exports){
var PlaceHolderResolver = require('../../../lib/beans/support/placeHolderResolver');

describe('PlaceHolderResolver', function() {
	describe('simple', function() {
		it('should get bean right', function(done) {
			var placeHolderResolver = new PlaceHolderResolver();
			placeHolderResolver.setProperties();
			placeHolderResolver.doReplace();

			placeHolderResolver.doReplace("${host}");

			placeHolderResolver.resolveStringValue(1);

			placeHolderResolver.resolveStringValue("aaa");

			placeHolderResolver.doReplace("aaa");

			placeHolderResolver.setProperties({
				host: "aaa"
			});

			placeHolderResolver.resolveStringValue("${aaa}aaa")
			placeHolderResolver.resolveStringValue("aaaaaa")
			done();
		});
	});
});
},{"../../../lib/beans/support/placeHolderResolver":126}],193:[function(require,module,exports){
var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}

describe('bearcat', function() {
	describe('#getBeanFactory', function() {
		it('should get BeanFactory from bearcat', function(done) {
			var bearcat = require('../lib/bearcat');
			if (isBrowser()) {
				require('../examples/simple/bearcat-bootstrap.js');
			}
			var simplepath = require.resolve('../examples/simple/context.json');
			var paths = [simplepath];

			bearcat.createApp({});
			bearcat.stop();
			bearcat.createApp({
				BEARCAT_GLOBAL: true
			});
			bearcat.stop();
			bearcat.createApp([], 2);
			bearcat.stop();
			bearcat.createApp(paths);
			bearcat.stop();

			bearcat.createApp(paths);
			bearcat.createApp(paths);
			bearcat.start(function() {
				var car = bearcat.getBean('car');
				var r = car.run();

				expect(r).to.eql('car');

				bearcat.stop();
				done();
			});
		})
	});

	describe('#bearcat handle error', function() {
		it('should handle error right', function(done) {
			var bearcat = require('../lib/bearcat');
			if (isBrowser()) {
				require('../examples/simple/bearcat-bootstrap.js');
			}
			var simplepath = require.resolve('../examples/simple/context.json');
			var paths = [simplepath];

			bearcat.getBeanFactory();
			bearcat.getApplicationContext();
			bearcat.getBeanByMeta();
			bearcat.getBean();
			bearcat.getFunction();

			bearcat.start();
			bearcat.stop();

			var Bus = function() {}

			bearcat.createApp(paths);
			bearcat.start(function() {
				bearcat.getBeanFactory();
				bearcat.getApplicationContext();
				bearcat.getBeanByMeta({
					id: "bus",
					func: Bus
				});

				bearcat.getBean({
					id: "bus",
					func: Bus
				});

				bearcat.getBean();

				bearcat.getFunction('car');
				bearcat.start(function() {
					bearcat.getRoute("car", "run");
					bearcat.stop();
					bearcat.stop();
					done();
				});
			});
		})
	});

	describe('#bearcat handle error', function() {
		it('should handle error right', function(done) {
			var bearcat = require('../lib/bearcat');
			if (isBrowser()) {
				require('../examples/simple/bearcat-bootstrap.js');
			}
			var simplepath = require.resolve('../examples/simple/context.json');
			var paths = [simplepath];
			bearcat.getBeanByFunc();

			bearcat.createApp(paths);
			bearcat.start(function() {
				var Bus = function() {
					this.$id = "bus";
				}

				Bus.prototype.run = function() {
					return 'bus';
				}

				var bus = bearcat.getBeanByFunc(Bus);
				var r = bus.run();
				expect(r).to.eql('bus');

				var bus1 = bearcat.getBean(Bus);
				r = bus1.run();
				expect(r).to.eql('bus');

				bearcat.getBean(function() {});
				bearcat.stop();
				done();
			});
		})
	});

	describe('#bearcat handle getBean meta func arguments', function() {
		it('should handle getBean meta func arguments right', function(done) {
			var bearcat = require('../lib/bearcat');
			if (isBrowser()) {
				require('../examples/simple/bearcat-bootstrap.js');
			}
			var simplepath = require.resolve('../examples/simple/context.json');
			var paths = [simplepath];

			var Bus = function(num) {
				this.$id = "bus";
				this.num = num;
			}

			Bus.prototype.run = function() {
				return 'bus' + this.num;
			}

			bearcat.createApp(paths);
			bearcat.start(function() {
				var bus = bearcat.getBean(Bus, 100);
				var r = bus.run();
				expect(r).to.eql('bus100');

				bearcat.stop();
				done();
			});
		});
	});
});
},{"../examples/simple/bearcat-bootstrap.js":50,"../lib/bearcat":127,"expect.js":153}],194:[function(require,module,exports){
var ApplicationContext = require('../../lib/context/applicationContext');
var expect = require('expect.js');
var path = require('path');
// var fs = require('fs');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}

describe('applicationContext', function() {
	describe('simple', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple/context.json');
			if (isBrowser()) {
				require('../../examples/simple/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths, {
				BEARCAT_LOGGER: 'off'
			});
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car');

			done();
		});
	});

	describe('simple_inject', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_inject/context.json');
			if (isBrowser()) {
				require('../../examples/simple_inject/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car wheel');

			done();
		});
	});

	describe('simple_meta', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_meta/context.json');
			if (isBrowser()) {
				require('../../examples/simple_meta/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car');

			done();
		});
	});

	describe('simple_meta_error', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_meta_error/context.json');
			if (isBrowser()) {
				require('../../examples/simple_meta_error/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			done();
		});
	});

	describe('simple_meta_merge', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_meta_merge/context.json');
			if (isBrowser()) {
				require('../../examples/simple_meta_merge/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car' + 100);

			done();
		});
	});

	describe('simple_meta_mismatch', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_meta_mismatch/context.json');
			if (isBrowser()) {
				require('../../examples/simple_meta_merge/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');

			done();
		});
	});

	describe('simple_inject_meta', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_inject_meta/context.json');
			if (isBrowser()) {
				require('../../examples/simple_inject_meta/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car wheel');

			done();
		});
	});

	describe('simple_args_value', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_args_value/context.json');
			if (isBrowser()) {
				require('../../examples/simple_args_value/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car 100');

			done();
		});
	});

	describe('simple_args_type', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_args_type/context.json');
			if (isBrowser()) {
				require('../../examples/simple_args_type/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car', 200);
			var r = car.run();
			expect(r).to.eql('car 200');

			done();
		});
	});

	describe('simple_prototype', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_prototype/context.json');
			if (isBrowser()) {
				require('../../examples/simple_prototype/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car 1');

			var another_car = applicationContext.getBean('car');
			r = car.run();
			expect(r).to.eql('car 2');

			done();
		});
	});

	describe('simple_init_method', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_init_method/context.json');
			if (isBrowser()) {
				require('../../examples/simple_init_method/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();

			expect(r).to.eql('car 1');

			done();
		});
	});

	describe('simple_destroy_method', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_destroy_method/context.json');
			if (isBrowser()) {
				require('../../examples/simple_destroy_method/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car');

			applicationContext.on('destroyed', function() {
				done();
			});

			applicationContext.destroy();

			var isActive = applicationContext.isActive();
			expect(isActive).to.eql(false);
		});
	});

	describe('simple_async_init', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_async_init/context.json');
			if (isBrowser()) {
				require('../../examples/simple_async_init/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				var r = car.run();
				expect(r).to.eql('car 1');

				setTimeout(function() {
					done();
				}, 1000);
			})
			applicationContext.refresh();
		});
	});

	describe('simple_factory_bean', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_factory_bean/context.json');
			if (isBrowser()) {
				require('../../examples/simple_factory_bean/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				var r = car.run();
				expect(r).to.eql('car 0');

				done();
			})
			applicationContext.refresh();
		});
	});


	describe('simple_factory_bean_error', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_factory_bean_error/context.json');
			if (isBrowser()) {
				require('../../examples/simple_factory_bean_error/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				// var r = car.run();
				// r.should.exist;
				// r.should.eql('car 0');

				done();
			})
			applicationContext.refresh();
		});
	});

	describe('simple_module_inject', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_module_inject/context.json');
			if (isBrowser()) {
				require('../../examples/simple_module_inject/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				var r = car.run();
				expect(r).to.eql('car wheel');

				done();
			})
			applicationContext.refresh();
		});
	});

	describe('simple_parent_bean', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_parent_bean/context.json');
			if (isBrowser()) {
				require('../../examples/simple_parent_bean/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var bus = applicationContext.getBean('bus');
				var r = bus.run();
				expect(r).to.eql('bus 100');

				var tank = applicationContext.getBean('tank');
				r = tank.run();
				expect(r).to.eql('tank 100');

				done();
			})
			applicationContext.refresh();
		});
	});

	describe('getBeanByMeta', function() {
		it('should getBeanByMeta right', function(done) {
			var simplepath = require.resolve('../../examples/simple/context.json');
			if (isBrowser()) {
				require('../../examples/simple/bearcat-bootstrap');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);

			applicationContext.refresh();

			var CarM = function() {

			}

			CarM.prototype.run = function(num) {
				console.log('mcar' + num);
				return 'mcar' + num;
			}

			CarM.prototype.dyInit = function() {

			}

			CarM.prototype.a = 1;
			var mcar = applicationContext.getBeanByMeta({
				id: "mcar",
				func: CarM
			});

			var r = mcar.run(100);
			expect(r).to.eql('mcar' + 100);

			// mcar.dyInit();

			var acar = applicationContext.getBeanByMeta({
				id: "acar"
			});

			var abcar = applicationContext.getBeanByMeta({});

			applicationContext.registerBeanMeta({});

			done();
		});
	});

	describe('startUpDate', function() {
		it('should startUpDate right', function(done) {
			var simplepath = require.resolve('../../examples/simple/context.json');
			if (isBrowser()) {
				require('../../examples/simple/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);

			applicationContext.refresh();

			applicationContext.setStartupDate(Date.now());
			applicationContext.getStartupDate();

			done();
		});
	});

	describe('refreshBeanFactory', function() {
		it('should refreshBeanFactory right', function(done) {
			var simplepath = require.resolve('../../examples/simple_inject/context.json');
			if (isBrowser()) {
				require('../../examples/simple_inject/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);

			applicationContext.refresh();

			applicationContext.refresh();

			applicationContext.cancelRefresh();

			done();
		});
	});

	describe('get set', function() {
		it('should get set right', function(done) {
			var simplepath = require.resolve('../../examples/simple/context.json');
			if (isBrowser()) {
				require('../../examples/simple/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);

			applicationContext.refresh();

			var r = applicationContext.getEnv();
			expect(r).to.eql('dev');

			r = applicationContext.isRunning();
			expect(r).to.eql(true);

			r = applicationContext.containsBean('car');
			expect(r).to.eql(true);

			r = applicationContext.isSingleton('car');
			expect(r).to.eql(true);

			r = applicationContext.isPrototype('car');
			expect(r).to.eql(false);

			r = applicationContext.containsBeanDefinition('car');
			expect(r).to.eql(true);

			r = applicationContext.getBeanDefinition('car');

			applicationContext.removeBeanDefinition('car');
			r = applicationContext.containsBeanDefinition('car');
			expect(r).to.eql(false);

			done();
		});
	});

	describe('placeholder', function() {
		it('should placeholder right', function(done) {
			var simplepath = require.resolve('../../examples/placeholder/context.json');
			if (isBrowser()) {
				require('../../examples/placeholder/bearcat-bootstrap.js');
			}
			var paths = [simplepath];
			var path = require('path');

			var configPath = path.dirname(simplepath) + '/config';

			var applicationContext = new ApplicationContext(paths);
			applicationContext.setConfigPath(configPath);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car100');

			applicationContext.setEnv('prod');
			applicationContext.refresh();

			car = applicationContext.getBean('car');
			r = car.run();
			// expect(r).to.eql('car1000');

			done();
		});
	});

	describe('circle reference', function() {
		it('should circle reference right', function(done) {
			var simplepath = require.resolve('../../examples/circle_reference/context.json');
			if (isBrowser()) {
				require('../../examples/circle_reference/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);

			applicationContext.refresh();

			applicationContext.getBean('car');

			done();
		});
	});

	describe('context path null', function() {
		it('should context path right', function(done) {
			var simplepath = require.resolve('../../examples/circle_reference/context.json') + 1;
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);

			applicationContext.refresh();

			done();
		});
	});

	describe('simple_imports_context', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_imports_context/context.json');
			if (isBrowser()) {
				require('../../examples/simple_imports_context/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car');

			done();
		});
	});

	describe('simple_lazy_init', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_lazy_init/context.json');
			if (isBrowser()) {
				require('../../examples/simple_lazy_init/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var car = applicationContext.getBean('car');
			var r = car.run();
			expect(r).to.eql('car');

			done();
		});
	});

	describe('simple_abstract_parent', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_abstract_parent/context.json');
			if (isBrowser()) {
				require('../../examples/simple_abstract_parent/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh();

			var bus = applicationContext.getBean('bus');
			var Car = applicationContext.getBean('car');
			var tank = applicationContext.getBean('tank');
			tank.run();
			Car.call(bus);
			bus.run();
			bus.fly();

			done();
		});
	});

	describe('hot_reload', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/hot_reload/context.json');
			if (isBrowser()) {
				require('../../examples/hot_reload/bearcat-bootstrap.js');
				return done();
			}
			var hotPath = path.dirname(simplepath) + '/hot';
			var paths = [simplepath];
			var applicationContext = new ApplicationContext(paths, {
				BEARCAT_HOT: 'on'
			});
			applicationContext.setHotPath(hotPath);
			applicationContext.refresh(function() {
				var car = applicationContext.getBean('car');
				var bus = applicationContext.getBean('bus');
				var r = car.run();

				expect(r).to.eql('car');

				r = bus.run();
				expect(r).to.eql('bus');

				var hotCarPath = require.resolve('../../examples/hot_reload/hot/car.js');
				var hotBusPath = require.resolve('../../examples/hot_reload/hot/bus.js');
				var fs = require('fs');
				require(hotCarPath);
				require(hotBusPath);
				setTimeout(function() {
					fs.appendFileSync(hotCarPath, "\n");
					fs.appendFileSync(hotBusPath, "\n");
					// done();
					setTimeout(function() {
						r = car.run();
						expect(r).to.eql('car hot');

						r = bus.run();
						expect(r).to.eql('bus hot');

						done();
					}, 11000);
				}, 2000);
			});
		});
	});

	describe('context_namespace', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/context_namespace/context.json');
			if (isBrowser()) {
				require('../../examples/context_namespace/bearcat-bootstrap.js');
			}
			var paths = [simplepath];
			var applicationContext = new ApplicationContext(paths);
			applicationContext.refresh(function() {
				var car = applicationContext.getBean('app:car');
				var r = car.run();

				expect(r).to.eql('car');

				var car1 = applicationContext.getBean('app1:car');
				r = car1.run();
				expect(r).to.eql('car');

				var car2 = applicationContext.getBean('car2');
				r = car2.run();
				expect(r).to.eql('car car');

				done();
			});
		});
	});

	describe('simple_function_annotation', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/simple_function_annotation/context.json');
			if (isBrowser()) {
				require('../../examples/simple_function_annotation/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				var r = car.run();

				expect(r).to.eql('car wheel');

				done();
			})
			applicationContext.refresh();
		});
	});

	describe('relative_scan', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/relative_scan/context.json');
			if (isBrowser()) {
				require('../../examples/relative_scan/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				var r = car.run();

				expect(r).to.eql('car wheel');

				done();
			})
			applicationContext.refresh();
		});
	});

	describe('multiple_scan', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/multiple_scan/context.json');
			if (isBrowser()) {
				require('../../examples/multiple_scan/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var bus = applicationContext.getBean('bus');
				var r = bus.run();

				expect(r).to.eql('bus wheel');

				done();
			})
			applicationContext.refresh();
		});
	});

	describe('complex_function_annotation', function() {
		it('should get bean right', function(done) {
			var simplepath = require.resolve('../../examples/complex_function_annotation/context.json');
			if (isBrowser()) {
				require('../../examples/complex_function_annotation/bearcat-bootstrap.js');
			}
			var paths = [simplepath];

			var applicationContext = new ApplicationContext(paths);
			applicationContext.on('finishRefresh', function() {
				var car = applicationContext.getBean('car');
				var r = car.run();

				done();
			})
			applicationContext.refresh();
		});
	});
});
},{"../../examples/circle_reference/bearcat-bootstrap.js":13,"../../examples/complex_function_annotation/bearcat-bootstrap.js":18,"../../examples/context_namespace/bearcat-bootstrap.js":22,"../../examples/hot_reload/bearcat-bootstrap.js":23,"../../examples/multiple_scan/bearcat-bootstrap.js":41,"../../examples/placeholder/bearcat-bootstrap.js":44,"../../examples/relative_scan/bearcat-bootstrap.js":48,"../../examples/simple/bearcat-bootstrap":50,"../../examples/simple/bearcat-bootstrap.js":50,"../../examples/simple_abstract_parent/bearcat-bootstrap.js":56,"../../examples/simple_args_type/bearcat-bootstrap.js":58,"../../examples/simple_args_value/bearcat-bootstrap.js":59,"../../examples/simple_async_init/bearcat-bootstrap.js":65,"../../examples/simple_destroy_method/bearcat-bootstrap.js":67,"../../examples/simple_factory_bean/bearcat-bootstrap.js":71,"../../examples/simple_factory_bean_error/bearcat-bootstrap.js":74,"../../examples/simple_function_annotation/bearcat-bootstrap.js":78,"../../examples/simple_imports_context/bearcat-bootstrap.js":80,"../../examples/simple_init_method/bearcat-bootstrap.js":82,"../../examples/simple_inject/bearcat-bootstrap.js":86,"../../examples/simple_inject_meta/bearcat-bootstrap.js":89,"../../examples/simple_lazy_init/bearcat-bootstrap.js":91,"../../examples/simple_meta/bearcat-bootstrap.js":93,"../../examples/simple_meta_error/bearcat-bootstrap.js":95,"../../examples/simple_meta_merge/bearcat-bootstrap.js":96,"../../examples/simple_module_inject/bearcat-bootstrap.js":99,"../../examples/simple_parent_bean/bearcat-bootstrap.js":106,"../../examples/simple_prototype/bearcat-bootstrap.js":108,"../../lib/context/applicationContext":128,"expect.js":153,"fs":154,"path":162}],195:[function(require,module,exports){
var mock = {};

module.exports = mock;

mock.t1 = function() {

}

mock.t2 = function(name) {

}

mock.t3 = function() {
	this.id = 1;
}

mock.t4 = function($engine) {
	this.$engine = $engine;
}

mock.t5 = function() {
	this.$engine = null;
}

mock.t6 = function($engine, num) {
	this.$engine = $engine;
	this.$wheel = null;
	this.num = num;
}

mock.t7 = function() {
	this.$Vnum = "${car.num}";
}

mock.t8 = function() {
	this.$Tnum = "Number";
}

mock.t9 = function() {
	this.$id = "t9";
	this.$scope = "prototype";
	this.$order = 1;
	this.$init = "init";
	this.$destroy = "destroy";
	this.$factoryBean = "car";
	this.$factoryMethod = "run";
	this.$async = true;
	this.$abstract = true;
	this.$parent = "bus";
	this.$lazy = true;
	this.$factoryArgs = [{
		name: "name",
		value: "name"
	}];
	this.$proxy = true;
	this.$aop = [{
		"pointcut": "before:.*?runBefore",
		"advice": "doBefore",
		"order": 10
	}];
	this.$car = null;
	this.$bus = null;
}

var t10 = function() {
	this.$id = "t10";
	this.$aop = true;
}

t10.prototype.run = function() {
	var $pointcut = "before:.*?runBefore";
}

t10.prototype.fly = function() {
	var $other = "test";
}

mock.t10 = t10;

var t11 = function() {
	this.$id = "t11";
	this.$aop = true;
}

t11.prototype.run = function() {
	var $pointcut = "before:.*?runBefore";

	var $advice = "fly";
	var $order = 1;
	var $runtime = true;
}

t11.prototype.fly = function() {
	console.log('fly');
}

t11.prototype.boot = function() {
	var $pointcut = "after:.*?runBoot";
}

mock.t11 = t11;

var t12 = function() {
	this.$id = "t12";
	this.$scope = "prototype";
	//this.$wheel = null;
	/*this.$engine = null;
		this.$car = null;
	 */
}

mock.t12 = t12;

var t13 = function() {
	this.$id = "t13";
	this.$aop = true;
}

t13.prototype.run = function() {
	var $pointcut = "before:.*?run";
	// var $runtime = true;
}

mock.t13 = t13;

var t14 = function() {
	this.$id = "t14";
	this.$init = "start";
	// this.$lazy = true;  
	this.num = null;
	this.$configService = null;
	// this.$lazy = true;
}

t14.prototype.start = function() {

}

mock.t14 = t14;

function t15($engine, num) {
	this.$engine = $engine;
	this.$wheel = null;
	this.num = num;
}

mock.t15 = t15;

// var t16 = function() {
// 	this.$id = "t16";
// 	this.$aop = true;
// }

// t16.prototype.run = function() {
// 	let $pointcut = "before:.*?run";
// }

// mock.t16 = t16;
},{}],196:[function(require,module,exports){
var args = {};

module.exports = args;

args.t1 = [{
	name: "car",
	ref: "engine"
}];

args.t2 = [{
	name: "car",
	value: "engine"
}];

args.t3 = [{
	name: "car",
	type: "Object"
}];

args.t4 = [];

args.t5 = {};

args.t6 = [{
	name: "car",
	ref: "engine"
}, {
	name: "bus",
	value: "engine"
}, {
	name: "tank",
	type: "Object"
}];

args.t7 = [{
	name: "car",
	type: "aaa"
}];

args.t8 = "aaa";

args.t9 = [{}];

args.t10 = [{
	name: "car",
	value: 100
}, {}];
},{}],197:[function(require,module,exports){
var car = function() {
	this.order = null;
	this.aspect = 0;
}

module.exports = car;

car.prototype.getOrder = function() {
	return this.order;
}

car.prototype.setOrder = function(order) {
	this.order = order;
}

car.prototype.isAspect = function() {
	return this.aspect;
}
},{}],198:[function(require,module,exports){
var meta = {};

module.exports = meta;

var Engine = function() {};

meta.t1 = {

};

meta.t2 = {
	id: "car"
};

meta.t3 = {
	id: "car",
	func: Engine,
	order: "aaa"
};

meta.t4 = {
	id: "car",
	func: Engine,
	async: 1
};

meta.t5 = {
	id: "car",
	func: Engine,
	init: 12
};

meta.t6 = {
	id: "car",
	func: Engine,
	destroy: 123
};

meta.t7 = {
	id: "car",
	func: Engine,
	scope: "aaa"
};

meta.t8 = {
	id: "car",
	func: Engine,
	factoryBean: 123
};

meta.t9 = {
	id: "car",
	func: Engine,
	factoryMethod: 123
};

meta.t10 = {
	id: "engine",
	order: 2,
	func: Engine,
	async: true,
	init: "init",
	destroy: "destroy",
	props: [{
		name: "car",
		ref: "car"
	}]
};

meta.t11 = {
	id: "car",
	func: Engine,
	parent: 12
}

meta.t12 = {
	id: "car",
	func: Engine,
	lazy: "aaa"
}

meta.t13 = {
	id: 111
}

meta.t14 = {
	mid: 111
}

meta.t15 = {
	cid: 111
}

meta.t16 = {
	id: "car",
	func: Engine,
	table: 1
}

meta.t17 = {
	id: "car",
	func: Engine,
	message: 1
}

meta.t18 = {
	id: "car",
	func: Engine,
	constraint: 1
}
},{}],199:[function(require,module,exports){
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
},{"../../lib/bearcat":127}],200:[function(require,module,exports){
var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}

describe('bearcat', function() {
	describe('#model', function() {
		it('should do model right|error', function(done) {
			var bearcat = require('../../lib/bearcat');
			if (isBrowser()) {
				require('../../examples/model_test/bearcat-bootstrap.js');
			}
			var simplepath = require.resolve('../../examples/model_test/context.json');
			var paths = [simplepath];

			bearcat.getModel('xxx');
			bearcat.getRoute();
			bearcat.createApp(paths);
			bearcat.start(function() {
				var car = bearcat.getModel('car'); // get bean
				var r = car.$before('before')
					.$set('num', 100);

				expect(r).to.eql(undefined);

				var num = car.$get('num');
				expect(num).to.eql(100);

				r = car.$before('before')
					.$after(['transform'])
					.$set('num', 100);

				expect(r).to.eql(undefined);

				num = car.$get('num');
				expect(num).to.eql(10000);

				r = car.$before(['checkNum'])
					.$set('num', 'aaa');

				expect(r).to.be.an('object');

				num = car.$get('num');

				expect(num).to.eql(10000);

				r = car.$before()
					.$set('len', 'aaaaa6');

				expect(r).to.be.an('object');

				r = car.$after()
					.$pack({
						id: 100,
						num: 100,
						len: 100
					});

				num = car.$get('num');
				expect(num).to.eql(100);

				console.log(r);
				expect(r).to.be.an('object');

				r = car.$after()
					.$pack({
						id: 100,
						num: 100,
						len: "aaa"
					});

				car.run();

				expect(r).to.eql(undefined);

				r = car.$after(['transformError'])
					.$set('num', 100);

				expect(r).to.be.an('object');

				var carError = bearcat.getModel("carError");
				console.log(carError);

				bearcat.getModel('xxx');
				bearcat.stop();
				done();
			});
		});
	});
});
},{"../../examples/model_test/bearcat-bootstrap.js":36,"../../lib/bearcat":127,"expect.js":153}],201:[function(require,module,exports){
var ModelAttribute = require('../../lib/model/modelAttribute');
var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}

describe('bearcat', function() {
	describe('#modelAttribute', function() {
		it('should do modelAttribute right', function(done) {
			var modelAttribute = new ModelAttribute();
			var r = modelAttribute.filterType();
			expect(r).to.eql(undefined);

			modelAttribute.parse();
			modelAttribute.parse("aaa");
			modelAttribute.getExpression();
			modelAttribute.getName();
			modelAttribute.setType('aa');
			modelAttribute.getType();
			modelAttribute.setPrimary('aa');
			modelAttribute.getPrimary();
			modelAttribute.isPrimary();
			modelAttribute.setDefault('aaa');

			done();
		})
	})
});
},{"../../lib/model/modelAttribute":130,"expect.js":153}],202:[function(require,module,exports){
var ModelConstraint = require('../../lib/model/modelConstraint');
var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}

describe('bearcat', function() {
	describe('#modelConstraint', function() {
		it('should do modelConstraint right', function(done) {
			var modelConstraint = new ModelConstraint();
			modelConstraint.getCid();

			done();
		})
	})
});
},{"../../lib/model/modelConstraint":131,"expect.js":153}],203:[function(require,module,exports){
var ModelDefinition = require('../../lib/model/modelDefinition');
var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}

describe('bearcat', function() {
	describe('#modelDefinition', function() {
		it('should do modelDefinition right', function(done) {
			var modelDefinition = new ModelDefinition();
			modelDefinition.getMid();
			modelDefinition.getTable();

			done();
		})
	})
});
},{"../../lib/model/modelDefinition":132,"expect.js":153}],204:[function(require,module,exports){
var ModelFilter = require('../../lib/model/modelFilter');
var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}

describe('bearcat', function() {
	describe('#modelFilter', function() {
		it('should do modelFilter right', function(done) {
			var modelFilter = new ModelFilter();
			modelFilter.getModel();
			modelFilter.getModelDefinition();

			done();
		})
	})
});
},{"../../lib/model/modelFilter":133,"expect.js":153}],205:[function(require,module,exports){
var ModelProxy = require('../../lib/model/modelProxy');
var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}

describe('bearcat', function() {
	describe('#modelProxy', function() {
		it('should do modelProxy right', function(done) {
			var modelProxy = new ModelProxy();
			modelProxy._modelInit();
			modelProxy._filter();
			modelProxy.$pack();
			modelProxy._getFilters();
			modelProxy._reset();
			modelProxy['model'] = {}
			modelProxy._modelInvoke('xxx');
			modelProxy.toJSON();

			done();
		})
	})
});
},{"../../lib/model/modelProxy":135,"expect.js":153}],206:[function(require,module,exports){
var ConfigLoader = require('../../lib/resource/configLoader');
var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}

describe('configLoader', function() {
	describe('#getResources', function() {
		it('should getResources right', function(done) {
			if (isBrowser()) {
				return done();
			}

			var p = require.resolve('../moduleA/context.json');
			var configLoader = new ConfigLoader();
			var metaObjects = configLoader.getResources(p);
			expect(metaObjects).to.have.property('wheel');
			expect(metaObjects).to.have.property('bus');
			var wheelMeta = metaObjects['wheel'];
			var busMeta = metaObjects['bus'];

			expect(wheelMeta).to.have.property('func');
			expect(wheelMeta).to.have.property('id', 'wheel');
			expect(wheelMeta).to.have.property('initMethod', 'init');
			expect(wheelMeta).to.have.property('destroyMethod', 'destroy');
			expect(wheelMeta).to.have.property('order', 3);

			expect(busMeta).to.have.property('func');
			expect(busMeta).to.have.property('id', 'bus');
			expect(busMeta).to.have.property('parent', 'car');

			done();
		});
	});
});
},{"../../lib/resource/configLoader":138,"expect.js":153}],207:[function(require,module,exports){
var MetaLoader = require('../../lib/resource/metaLoader');

function isBrowser() {
	return typeof window !== 'undefined';
}

describe('metaLoader', function() {
	describe('#getResources', function() {
		it('should getResources right', function(done) {
			if (isBrowser()) {
				return done();
			}

			var metaLoader = new MetaLoader();
			metaLoader.load();
			metaLoader.load(require.resolve('./configLoader'));
			var path = require('path');
			var emptypath = require.resolve('../mock-base/mock-meta.js');
			// metaLoader.loadPath({}, path.dirname(emptypath) + '/empty');
			done();
		});
	});
});
},{"../../lib/resource/metaLoader":139,"path":162}],208:[function(require,module,exports){
var PropertiesLoader = require('../../lib/resource/propertiesLoader');

function isBrowser() {
	return typeof window !== 'undefined';
}

describe('propertiesLoader', function() {
	describe('#getResources', function() {
		it('should getResources right', function(done) {
			if (isBrowser()) {
				return done();
			}

			var propertiesLoader = new PropertiesLoader();
			var a = require.resolve('./metaLoader');
			propertiesLoader.loadDir({}, a);

			var path = require('path');
			var emptypath = require.resolve('../mock-base/mock-meta.js');

			propertiesLoader.loadDir({}, path.dirname(emptypath) + '/empty');

			done();
		});
	});
});
},{"../../lib/resource/propertiesLoader":140,"path":162}],209:[function(require,module,exports){
var ResourceLoader = require('../../lib/resource/resourceLoader');
var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

describe('resourceLoader', function() {
	describe('#getResources', function() {
		it('should getResources right', function(done) {
			if (isBrowser()) {
				return done();
			}

			var simplepath = require.resolve('../../examples/simple/context.json');
			var resourceLoader = new ResourceLoader();
			var r = resourceLoader.load(simplepath);
			var p = resourceLoader.load(simplepath);
			expect(r).to.eql(p);

			done();
		});
	});
});
},{"../../lib/resource/resourceLoader":141,"expect.js":153}],210:[function(require,module,exports){
var AopUtil = require('../../lib/util/aopUtil');
var BeanDefinition = require('../../lib/beans/support/beanDefinition');

describe('AopUtil', function() {
	describe('AopUtil', function() {
		it('should AopUtil right', function(done) {
			var beanDefinition = new BeanDefinition();
			beanDefinition.setBeanName('car');

			AopUtil.buildAspect([{}], beanDefinition);

			done();
		});
	});
});
},{"../../lib/beans/support/beanDefinition":121,"../../lib/util/aopUtil":142}],211:[function(require,module,exports){
var beanWrapper = require('../../lib/beans/support/beanWrapper');
var mock_args = require('../mock-base/mock-arg-props');
var beanUtil = require('../../lib/util/beanUtil');
var constant = require('../../lib/util/constant');
var expect = require('expect.js');

describe('beanUtil', function() {
	describe('#buildBeanWrapper', function() {
		it('should buildBeanWrapper t1 ok', function(done) {
			var t1 = mock_args.t1;
			var name = t1[0]['name'];
			var ref = t1[0]['ref'];
			var r = beanUtil.buildBeanWrapper(t1);
			expect(r).to.be.an('object');
			var wbean = r[0];
			expect(wbean).to.be.a(beanWrapper);
			expect(wbean.getName()).to.eql(name);
			expect(wbean.getRef()).to.eql(ref);
			expect(wbean.getRole()).to.eql(constant.DEPEND_TYPE_BEAN);
			done();
		});

		it('should buildBeanWrapper t2 ok', function(done) {
			var t2 = mock_args.t2;
			var name = t2[0]['name'];
			var value = t2[0]['value'];
			var r = beanUtil.buildBeanWrapper(t2);
			expect(r).to.be.an('object');
			var wbean = r[0];
			expect(wbean).to.be.a(beanWrapper);
			expect(wbean.getName()).to.eql(name);
			expect(wbean.getValue()).to.eql(value);
			expect(wbean.getRole()).be.eql(constant.DEPEND_TYPE_VALUE);
			done();
		});

		it('should buildBeanWrapper t3 ok', function(done) {
			var t3 = mock_args.t3;
			var name = t3[0]['name'];
			var type = t3[0]['type'];
			var r = beanUtil.buildBeanWrapper(t3);
			expect(r).to.be.an('object');
			var wbean = r[0];
			expect(wbean).to.be.a(beanWrapper);
			expect(wbean.getName()).to.eql(name);
			expect(wbean.getType()).to.eql(type);
			expect(wbean.getRole()).to.eql(constant.DEPEND_TYPE_VAR);
			done();
		});

		it('should buildBeanWrapper t4 ok', function(done) {
			var t4 = mock_args.t4;
			var r = beanUtil.buildBeanWrapper(t4);
			expect(r).to.be.an('object');
			expect(r).to.eql([]);
			done();
		});

		it('should buildBeanWrapper t5 ok', function(done) {
			var t5 = mock_args.t5;
			var r = beanUtil.buildBeanWrapper(t5);
			expect(r).to.be.an('object');
			expect(r).to.eql([]);
			done();
		});

		it('should buildBeanWrapper t6 ok', function(done) {
			var t6 = mock_args.t6;
			var name = t6[0]['name'];
			var ref = t6[0]['ref'];
			var r = beanUtil.buildBeanWrapper(t6);
			expect(r).to.be.an('object');
			var wbean = r[0];
			expect(wbean).to.be.a(beanWrapper);
			expect(wbean.getName()).to.eql(name);
			expect(wbean.getRef()).to.eql(ref);
			expect(wbean.getRole()).to.eql(constant.DEPEND_TYPE_BEAN);

			name = t6[1]['name'];
			var value = t6[1]['value'];
			var r = beanUtil.buildBeanWrapper(t6);
			expect(r).to.be.an('object');
			wbean = r[1];
			expect(wbean).to.be.a(beanWrapper);
			expect(wbean.getName()).to.eql(name);
			expect(wbean.getValue()).to.eql(value);
			expect(wbean.getRole()).to.eql(constant.DEPEND_TYPE_VALUE);

			name = t6[2]['name'];
			var type = t6[2]['type'];
			var r = beanUtil.buildBeanWrapper(t6);
			expect(r).to.be.an('object');
			wbean = r[2];
			expect(wbean).to.be.a(beanWrapper);
			expect(wbean.getName()).to.eql(name);
			expect(wbean.getType()).to.eql(type);
			expect(wbean.getRole()).to.eql(constant.DEPEND_TYPE_VAR);
			done();
		});

		it('should buildBeanWrapper t7 ok', function(done) {
			var t7 = mock_args.t7;
			var name = t7[0]['name'];
			var type = t7[0]['type'];
			var r = beanUtil.buildBeanWrapper(t7);
			expect(r).to.be.an('object');
			var wbean = r[0];
			expect(wbean).to.be.a(beanWrapper);
			expect(wbean.getName()).to.eql(name);
			expect(wbean.getType()).to.eql(type);
			expect(wbean.getRole()).to.eql(constant.DEPEND_TYPE_ERROR);
			done();
		});

		it('should buildBeanWrapper t8 ok', function(done) {
			var t8 = mock_args.t8;
			var r = beanUtil.buildBeanWrapper(t8);
			expect(r).to.be.an('object');
			expect(r).to.eql([]);
			done();
		});

		it('should buildBeanWrapper t9 ok', function(done) {
			var t9 = mock_args.t9;
			var r = beanUtil.buildBeanWrapper(t9);
			expect(r).to.be.an('object');
			var wbean = r[0];
			expect(wbean).to.be.a(beanWrapper);
			expect(wbean.getRole()).to.eql(constant.DEPEND_TYPE_ERROR);
			done();
		});

		it('should buildBeanWrapper t10 ok', function(done) {
			var t10 = mock_args.t10;
			var name = t10[0]['name'];
			var value = t10[0]['value'];
			var r = beanUtil.buildBeanWrapper(t10);
			expect(r).to.be.an('object');
			var wbean = r[0];
			expect(wbean).to.be.a(beanWrapper);
			expect(wbean.getName()).to.eql(name);
			expect(wbean.getValue()).to.eql(value);
			expect(wbean.getRole()).to.eql(constant.DEPEND_TYPE_VALUE);

			wbean = r[1];
			expect(wbean).to.be.a(beanWrapper);
			expect(wbean.getRole()).to.eql(constant.DEPEND_TYPE_ERROR);
			done();
		});
	});

	describe('#getBeanSettingsMap', function() {
		it('should getBeanSettingsMap t1 ok', function(done) {

			var r = beanUtil.getBeanSettingsMap(1);
			expect(r).to.eql({});

			var mock = function() {

			}

			mock.prototype.getName = function() {
				return '';
			}

			r = beanUtil.getBeanSettingsMap([new mock()]);
			expect(r).to.eql({});
			done();
		});
	});

	describe('#getBeanSettingsArray', function() {
		it('should getBeanSettingsArray t1 ok', function(done) {

			var r = beanUtil.getBeanSettingsArray(null);
			console.log(r);
			expect(r).to.eql([]);

			done();
		});
	});
});
},{"../../lib/beans/support/beanWrapper":124,"../../lib/util/beanUtil":143,"../../lib/util/constant":144,"../mock-base/mock-arg-props":196,"expect.js":153}],212:[function(require,module,exports){
var MockAnnotationFunction = require('../mock-base/mock-annotation-function');
var MetaUtil = require('../../lib/util/metaUtil');

var func = MockAnnotationFunction.t14;
var meta = MetaUtil.resolveFuncAnnotation(func);

console.log(meta);
},{"../../lib/util/metaUtil":146,"../mock-base/mock-annotation-function":195}],213:[function(require,module,exports){
var FileUtil = require('../../lib/util/fileUtil');

describe('FileUtil', function() {
	describe('FileUtil', function() {
		it('should FileUtil right', function(done) {
			FileUtil.existsSync();

			done();
		});
	});
});
},{"../../lib/util/fileUtil":145}],214:[function(require,module,exports){
var MockAnnotationFunction = require('../mock-base/mock-annotation-function');
var MetaUtil = require('../../lib/util/metaUtil');
MetaUtil.cleanUp();

var expect = require('expect.js');

describe('MetaUtil', function() {
	describe('MetaUtil', function() {
		it('should MetaUtil t1 right', function(done) {
			var func = MockAnnotationFunction.t1;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t2 right', function(done) {
			var func = MockAnnotationFunction.t2;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func,
				args: [{
					name: "name",
					type: "Object"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t3 right', function(done) {
			var func = MockAnnotationFunction.t3;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t4 right', function(done) {
			var func = MockAnnotationFunction.t4;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func,
				args: [{
					name: "$engine",
					ref: "engine"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t5 right', function(done) {
			var func = MockAnnotationFunction.t5;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func,
				props: [{
					name: "$engine",
					ref: "engine"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t6 right', function(done) {
			var func = MockAnnotationFunction.t6;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func,
				args: [{
					name: "$engine",
					ref: "engine"
				}, {
					name: "num",
					type: "Object"
				}],
				props: [{
					name: "$wheel",
					ref: "wheel"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t7 right', function(done) {
			var func = MockAnnotationFunction.t7;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func,
				props: [{
					name: "$Vnum",
					value: "${car.num}"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t8 right', function(done) {
			var func = MockAnnotationFunction.t8;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func,
				props: [{
					name: "$Tnum",
					type: "Number"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t9 right', function(done) {
			var func = MockAnnotationFunction.t9;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				id: "t9",
				scope: "prototype",
				order: 1,
				init: "init",
				destroy: "destroy",
				factoryBean: "car",
				factoryMethod: "run",
				async: true,
				abstract: true,
				parent: "bus",
				lazy: true,
				factoryArgs: [{
					name: "name",
					value: "name"
				}],
				proxy: true,
				aop: [{
					"pointcut": "before:.*?runBefore",
					"advice": "doBefore",
					"order": 10
				}],
				func: func,
				props: [{
					name: "$car",
					ref: "car"
				}, {
					name: "$bus",
					ref: "bus"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t10 right', function(done) {
			var func = MockAnnotationFunction.t10;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				id: "t10",
				aop: [{
					"advice": "run",
					"pointcut": "before:.*?runBefore"
				}],
				func: func
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t11 right', function(done) {
			var func = MockAnnotationFunction.t11;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				id: "t11",
				aop: [{
					"advice": "fly",
					"pointcut": "before:.*?runBefore",
					"order": 1,
					"runtime": true
				}, {
					"advice": "boot",
					"pointcut": "after:.*?runBoot"
				}],
				func: func
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t12 right', function(done) {
			var func = MockAnnotationFunction.t12;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				id: "t12",
				scope: "prototype",
				func: func
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t13 right', function(done) {
			var func = MockAnnotationFunction.t13;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				id: "t13",
				aop: [{
					"advice": "run",
					"pointcut": "before:.*?run"
				}],
				func: func
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t14 right', function(done) {
			var func = MockAnnotationFunction.t14;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				id: "t14",
				init: "start",
				props: [{
					name: "$configService",
					ref: "configService"
				}],
				func: func
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t15 right', function(done) {
			var func = MockAnnotationFunction.t15;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func,
				args: [{
					name: "$engine",
					ref: "engine"
				}, {
					name: "num",
					type: "Object"
				}],
				props: [{
					name: "$wheel",
					ref: "wheel"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t16 right', function(done) {
			// var func = MockAnnotationFunction.t16;
			// var meta = MetaUtil.resolveFuncAnnotation(func);

			// meta.should.exist;
			// meta.should.eql({
			// 	id: "t16",
			// 	aop: [{
			// 		"advice": "run",
			// 		"pointcut": "before:.*?run"
			// 	}],
			// 	func: func
			// });

			done();
		});
	});
});
},{"../../lib/util/metaUtil":146,"../mock-base/mock-annotation-function":195,"expect.js":153}],215:[function(require,module,exports){
var ModelUtil = require('../../lib/util/modelUtil');

describe('ModelUtil', function() {
	describe('ModelUtil', function() {
		it('should ModelUtil right', function(done) {
			ModelUtil.buildModelAttribute();

			done();
		});
	});
});
},{"../../lib/util/modelUtil":147}],216:[function(require,module,exports){
(function (__dirname){
var mock_args = require('../mock-base/mock-arg-props');
var utils = require('../../lib/util/utils');
var constant = require('../../lib/util/constant');
var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}


describe('utils', function() {
	describe('#check', function() {
		it('should checkArray right', function(done) {
			var ret = utils.checkArray([]);
			expect(ret).to.eql(true);

			ret = utils.checkArray('aaa');
			expect(ret).to.eql(false);

			ret = utils.checkArray(1);
			expect(ret).to.eql(false);

			done();
		});

		it('should checkFunction right', function(done) {
			var ret = utils.checkFunction(function() {});
			expect(ret).to.eql(true);

			ret = utils.checkFunction('aaa');
			expect(ret).to.eql(false);

			ret = utils.checkFunction(1);
			expect(ret).to.eql(false);

			ret = utils.checkFunction({});
			expect(ret).to.eql(false);

			done();
		});

		it('should checkObject right', function(done) {
			var ret = utils.checkObject({});
			expect(ret).to.eql(true);

			var a = function() {}
			ret = utils.checkObject(new a());
			expect(ret).to.eql(true);

			ret = utils.checkObject('aaa');
			expect(ret).to.eql(false);

			ret = utils.checkObject(1);
			expect(ret).to.eql(false);

			done();
		});

		it('should checkType right', function(done) {
			var ret = utils.checkType('Object');
			expect(ret).to.eql(true);

			ret = utils.checkType('Number');
			expect(ret).to.eql(true);

			ret = utils.checkType('Array');
			expect(ret).to.eql(true);

			ret = utils.checkType('Boolean');
			expect(ret).to.eql(true);

			ret = utils.checkType('Function');
			expect(ret).to.eql(true);

			ret = utils.checkType('String');
			expect(ret).to.eql(true);

			ret = utils.checkType('aaa');
			expect(ret).to.eql(false);

			done();
		});

		it('should checkIsNotNull right', function(done) {
			var ret = utils.isNotNull('aaa');
			expect(ret).to.eql(true);

			ret = utils.isNotNull(1);
			expect(ret).to.eql(true);

			ret = utils.isNotNull(0);
			expect(ret).to.eql(true);

			ret = utils.isNotNull({});
			expect(ret).to.eql(true);

			ret = utils.isNotNull();
			expect(ret).to.eql(false);

			ret = utils.isNotNull(null);
			expect(ret).to.eql(false);

			ret = utils.isNotNull(false);
			expect(ret).to.eql(true);

			done();
		});
	});

	describe('#file', function() {
		it('should get myRequire right', function(done) {
			var beanUtil = require('../../lib/util/beanUtil');
			utils.myRequire(1);
			var myBeanUtil = utils.myRequire('../../lib/util/beanUtil');

			var a = utils.myRequire('a');

			utils.myRequireHot('xxx');

			utils.requireUncached(1);

			done();
		});

		it('should getLoadPath right', function(done) {
			var p = require.resolve('../moduleA/context.json');
			if (isBrowser()) {
				return done();
			}

			var loadPath = utils.getLoadPath('beans.wheel', p);

			var bean = require(loadPath);
			// bean.should.be.exist;

			var r = utils.getLoadPath(null, p);

			done();
		});

		it('should requireUncached right', function(done) {
			var p = require.resolve('../moduleA/context.json');
			// var obj = utils.requireUncached(p);

			// obj.should.be.exist;
			done();
		});

		it('should checkFileType right', function(done) {
			var ret = utils.checkFileType('js', 'js');

			expect(ret).to.eql(false);

			ret = utils.checkFileType('a.js', 'js');
			expect(ret).to.eql(true);

			ret = utils.checkFileType('a.jsbb', 'js');
			expect(ret).to.eql(false);

			done();
		});

		it('should check isFile right', function(done) {
			if (isBrowser()) {
				return done();
			}

			var p = require.resolve('./beanUtil');
			var ret = utils.isFile(p);
			expect(ret).to.eql(true);

			ret = utils.isFile(__dirname);
			expect(ret).to.eql(false);

			done();
		});

		it('should check isDir right', function(done) {
			if (isBrowser()) {
				return done();
			}

			var ret = utils.isDir(__dirname);
			expect(ret).to.eql(true);

			var p = require.resolve('./beanUtil');
			ret = utils.isDir(p);
			expect(ret).to.eql(false);

			done();
		});

		it('should getFileName right', function(done) {
			var fn = utils.getFileName('a.js', 3);
			expect(fn).to.equal('a');

			fn = utils.getFileName('a', 2);
			expect(fn).to.equal('a');

			done();
		});

		it('should compareByOrder right', function(done) {
			var Car = require('../mock-base/mock-compare');
			var car1 = new Car();
			car1.setOrder(2);

			var car2 = new Car();
			car2.setOrder(0);

			var r = utils.compareByOrder(car1, car2);

			expect(r).to.eql(-1);

			r = utils.compareBeans(car1, car2);

			expect(r).to.eql(-1);

			var car3 = new Car();
			car3.aspect = 1;
			r = utils.compareBeans(car3, car1);

			expect(r).to.eql(-1);

			done();
		});

		it('should parseArgs right', function(done) {
			var argv = ['node', 'app', 'env=test'];
			var args = utils.parseArgs(argv);
			expect(args).to.eql({
				main: 'app',
				env: 'test'
			});

			argv = ['node', 'app', '--env=test'];
			var args = utils.parseArgs(argv);
			expect(args).to.eql({
				main: 'app',
				'--env': 'test'
			});

			done();
		});

		it('should loadPath checkWebWorker right', function(done) {
			utils.getLoadPath2();
			utils.checkWebWorker();

			done();
		});
	});
});
}).call(this,"/test/util")
},{"../../lib/util/beanUtil":143,"../../lib/util/constant":144,"../../lib/util/utils":151,"../mock-base/mock-arg-props":196,"../mock-base/mock-compare":197,"expect.js":153}],217:[function(require,module,exports){
var validatorUtil = require('../../lib/util/validatorUtil');
var mock_meta = require('../mock-base/mock-meta');
var expect = require('expect.js');

describe('validatorUtil', function() {
	describe('#metaValidator', function() {
		it('should metaValidator t1 right', function(done) {
			var t1 = mock_meta.t1;
			var ret = validatorUtil.metaValidator(t1);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t2 right', function(done) {
			var t2 = mock_meta.t2;
			var ret = validatorUtil.metaValidator(t2);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t3 right', function(done) {
			var t3 = mock_meta.t3;
			var ret = validatorUtil.metaValidator(t3);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t4 right', function(done) {
			var t4 = mock_meta.t4;
			var ret = validatorUtil.metaValidator(t4);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t5 right', function(done) {
			var t5 = mock_meta.t5;
			var ret = validatorUtil.metaValidator(t5);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t6 right', function(done) {
			var t6 = mock_meta.t6;
			var ret = validatorUtil.metaValidator(t6);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t7 right', function(done) {
			var t7 = mock_meta.t7;
			var ret = validatorUtil.metaValidator(t7);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t8 right', function(done) {
			var t8 = mock_meta.t8;
			var ret = validatorUtil.metaValidator(t8);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t9 right', function(done) {
			var t9 = mock_meta.t9;
			var ret = validatorUtil.metaValidator(t9);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t10 right', function(done) {
			var t10 = mock_meta.t10;
			var ret = validatorUtil.metaValidator(t10);
			expect(ret).to.equal(true);

			done();
		});

		it('should metaValidator t11 right', function(done) {
			var t11 = mock_meta.t11;
			var ret = validatorUtil.metaValidator(t11);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t12 right', function(done) {
			var t12 = mock_meta.t12;
			var ret = validatorUtil.metaValidator(t12);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t13 right', function(done) {
			var t13 = mock_meta.t13;
			var ret = validatorUtil.metaValidator(t13);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t14 right', function(done) {
			var t14 = mock_meta.t14;
			var ret = validatorUtil.metaValidator(t14);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t15 right', function(done) {
			var t15 = mock_meta.t15;
			var ret = validatorUtil.metaValidator(t15);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t16 right', function(done) {
			var t16 = mock_meta.t16;
			var ret = validatorUtil.metaValidator(t16);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t17 right', function(done) {
			var t17 = mock_meta.t17;
			var ret = validatorUtil.metaValidator(t17);
			expect(ret).not.to.equal(true);

			done();
		});

		it('should metaValidator t18 right', function(done) {
			var t18 = mock_meta.t18;
			var ret = validatorUtil.metaValidator(t18);
			expect(ret).not.to.equal(true);

			done();
		});
	});
});
},{"../../lib/util/validatorUtil":152,"../mock-base/mock-meta":198,"expect.js":153}]},{},[193,188,189,190,191,192,194,210,211,212,213,214,215,216,217,206,207,208,209,178,179,177,180,181,182,183,184,185,186,187,199,200,201,202,203,204,205]);
