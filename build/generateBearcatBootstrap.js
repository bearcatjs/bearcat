#!/usr/bin/env node

/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat generateBearcatBootstrap
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var bearcatBin = require('../bin/bearcat-bin');
var path = require('path');
var fs = require('fs');
var examplesDir = path.dirname(require.resolve('../examples/app'));
var dirs = fs.readdirSync(examplesDir);

for (var i = 0; i < dirs.length; i++) {
	var dirName = dirs[i];

	if (dirName == 'browser') {
		continue;
	}

	if (fs.statSync(examplesDir + '/' + dirName).isFile()) {
		continue;
	}

	var dirPath = 'examples/' + dirName;
	var configPath = dirPath + '/config';

	var opts = {
		context: dirPath + '/context.json',
		output: dirPath + '/bearcat-bootstrap.js'
	}

	if (fs.existsSync(examplesDir + '/' + dirName + '/config')) {
		opts['config'] = configPath;
	}

	generateBootstrap(opts);
}

function generateBootstrap(opts) {
	bearcatBin.doGenerate(opts);
}