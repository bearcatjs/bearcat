/*!
 * Bearcat
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path');
var application = require('./application');


/**
 * Expose `createApplication()`.
 *
 * @module
 */

var Bearcat = module.exports = {};

/**
 * Framework version.
 */

Bearcat.version = '0.8';

var self = this;

/**
 * Create an pomelo application.
 *
 * @return {Application}
 * @memberOf Bearcat
 * @api public
 */
Bearcat.createApp = function (opts) {
  var app = application;
  app.init(opts);
  self.app = app;
  return app;
};

/**
 * Get application
 */
Object.defineProperty(Bearcat, 'app', {
  get:function () {
    return self.app;
  }
});

// /**
//  * Auto-load bundled components with getters.
//  */
// fs.readdirSync(__dirname + '/components').forEach(function (filename) {
//   if (!/\.js$/.test(filename)) {
//     return;
//   }
//   var name = path.basename(filename, '.js');

//   function load() {
//     return require('./components/' + name);
//   }
//   Bearcat.components.__defineGetter__(name, load);
//   Bearcat.__defineGetter__(name, load);
// });

// fs.readdirSync(__dirname + '/filters/handler').forEach(function (filename) {
//   if (!/\.js$/.test(filename)) {
//     return;
//   }
//   var name = path.basename(filename, '.js');

//   function load() {
//     return require('./filters/handler/' + name);
//   }
//   Bearcat.filters.__defineGetter__(name, load);
//   Bearcat.__defineGetter__(name, load);
// });

// fs.readdirSync(__dirname + '/filters/rpc').forEach(function (filename) {
//   if (!/\.js$/.test(filename)) {
//     return;
//   }
//   var name = path.basename(filename, '.js');

//   function load() {
//     return require('./filters/rpc/' + name);
//   }
//   Bearcat.rpcFilters.__defineGetter__(name, load);
// });