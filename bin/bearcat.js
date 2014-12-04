#!/usr/bin/env node

/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat command
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var PropertiesLoader = require('../lib/resource/propertiesLoader');
var ResourceLoader = require('../lib/resource/resourceLoader');
var Version = require('../package.json').version;
var Commander = require('commander');
var fs = require('fs');

var resourceLoader = new ResourceLoader();
var propertiesLoader = new PropertiesLoader();

var rootPath = process.cwd();
var cpath = rootPath + '/context.json';
var configPath = rootPath + '/config';
var env = 'prod';

var metas = resourceLoader.load(cpath);

var outputFile = 'bearcat-bootstrap.js';
fs.writeFileSync(outputFile, 'var metas = ' + JSON.stringify(metas) + ';\n');
fs.appendFileSync(outputFile, 'window.bearcatjs = {};\n');
fs.appendFileSync(outputFile, 'window.bearcatjs.metas = {};\n');
fs.appendFileSync(outputFile, 'window.bearcatjs.configData = {};\n');

for (var id in metas) {
	var meta = metas[id];
	var fpath = meta['fpath'];
	fs.appendFileSync(outputFile, 'var id = \"' + id + '\";\n');
	fs.appendFileSync(outputFile, 'var meta = metas\[id\];\n');
	fs.appendFileSync(outputFile, 'var fpath = meta\[\"fpath\"\];\n');
	fs.appendFileSync(outputFile, 'meta[\"func\"] = require\(\"./' + fpath + '\"\);\n');
	fs.appendFileSync(outputFile, 'window.bearcatjs.metas\[id\] = meta;\n');
}

var properties = propertiesLoader.loadProperties(configPath, env);

fs.appendFileSync(outputFile, 'var properties = ' + JSON.stringify(properties) + ';\n');
fs.appendFileSync(outputFile, 'window.bearcatjs.configData = properties;\n');