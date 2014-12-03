#!/usr/bin/env node

var PropertiesLoader = require('../lib/resource/propertiesLoader');
var ResourceLoader = require('../lib/resource/resourceLoader');
var fs = require('fs');

var resourceLoader = new ResourceLoader();

var cpath = process.cwd() + '/context.json';

var metas = resourceLoader.load(cpath);

console.log(metas);

// for (var beanId in metas) {
// 	var meta = metas[beanId];
// 	var fpath = meta['fpath'];
// }

var outputFile = 'bb.js';
fs.writeFileSync(outputFile, 'var metas = ' + JSON.stringify(metas) + ';\n');
fs.appendFileSync(outputFile, 'window.requireCache = {};\n');
fs.appendFileSync(outputFile, 'window.metas = {};\n');

for (var id in metas) {
	var meta = metas[id];
	var fpath = meta['fpath'];
	fs.appendFileSync(outputFile, 'var id = \"' + id + '\";\n');
	fs.appendFileSync(outputFile, 'var meta = metas\[id\];\n');
	fs.appendFileSync(outputFile, 'var fpath = meta\[\"fpath\"\];\n');
	fs.appendFileSync(outputFile, 'meta[\"func\"] = require\(\"./' + fpath + '\"\);\n')
	fs.appendFileSync(outputFile, 'window.requireCache\[fpath\] = meta;\n')
	fs.appendFileSync(outputFile, 'window.metas\[id\] = meta;\n');
}