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