var path = require('path');

var packageJson = require('async/component.json');

var cpath = require.resolve('async/component.json');

var dpath = path.dirname(cpath)
console.log(packageJson);

console.log(cpath);

console.log(dpath);