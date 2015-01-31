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