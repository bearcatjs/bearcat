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