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
var program = require('commander');
var Path = require('path');
var fs = require('fs');

var resourceLoader = new ResourceLoader();
var propertiesLoader = new PropertiesLoader();

var BearcatBin = {};

var rootPath = process.cwd();
var defaultCpath = rootPath + '/context.json';
var defaultConfigPath = rootPath + '/config';
var defaultOutputFile = 'bearcat-bootstrap.js';
var defaultEnv = 'dev';

program
	.version(Version);

program.command('generate')
	.description('generate bearcat-bootstrap.js for frontend')
	.option('-o, --output [value]', 'specify bearcat-bootstrap.js file output file')
	.option('-c, --context [value]', 'specify bearcat context.json file path')
	.option('-C, --config [value]', 'specify config directory path')
	.option('-e, --env [value]', 'specify config env')
	.action(function(opts) {
		doGenerate(opts);
	});

program.parse(process.argv);

function doGenerate(opts) {
	var cpath = defaultCpath;
	if (opts['context']) {
		cpath = Path.join(rootPath, opts['context'])
	}

	var outputFile = defaultOutputFile;
	if (opts['output']) {
		outputFile = Path.join(rootPath, opts['output']);
	}

	var configPath = defaultConfigPath;
	if (opts['config']) {
		configPath = Path.join(rootPath, opts['config']);
	}

	var env = defaultEnv;
	if (opts['env']) {
		env = opts['env'];
	}

	var metas = resourceLoader.load(cpath);

	fs.writeFileSync(outputFile, 'var Root;\n');
	fs.appendFileSync(outputFile, '\(function\(\) \{ Root = this; \}\(this\)\);\n');
	fs.appendFileSync(outputFile, 'var metas = ' + JSON.stringify(metas) + ';\n');
	fs.appendFileSync(outputFile, 'Root.__bearcatData__ = {};\n');
	fs.appendFileSync(outputFile, 'Root.__bearcatData__.metas = {};\n');
	fs.appendFileSync(outputFile, 'Root.__bearcatData__.configData = {};\n');

	for (var id in metas) {
		var meta = metas[id];
		var fpath = meta['fpath'];
		var ftype = meta['ftype'];
		fs.appendFileSync(outputFile, 'var id = \"' + id + '\";\n');
		fs.appendFileSync(outputFile, 'var meta = metas\[id\];\n');
		fs.appendFileSync(outputFile, 'var fpath = meta\[\"fpath\"\];\n');
		fpath = require.resolve(fpath);
		if (ftype === 'object') {
			fs.appendFileSync(outputFile, 'meta[\"func\"] = require\(\"' + fpath + '\"\)\[\"func\"\];\n');
		} else {
			fs.appendFileSync(outputFile, 'meta[\"func\"] = require\(\"' + fpath + '\"\);\n');
		}
		fs.appendFileSync(outputFile, 'Root.__bearcatData__.metas\[id\] = meta;\n');
	}

	var properties = propertiesLoader.loadProperties(configPath, env);

	fs.appendFileSync(outputFile, 'var properties = ' + JSON.stringify(properties) + ';\n');
	fs.appendFileSync(outputFile, 'Root.__bearcatData__.configData = properties;\n');
	console.log(outputFile + ' generated...');
}

BearcatBin.doGenerate = doGenerate;

module.exports = BearcatBin;