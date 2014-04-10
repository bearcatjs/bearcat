/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * |   _  )  |   ____)   /   \     |   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * |______)  |_______/__/     \__\ | _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat TargetSource
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var TargetSource = function(beanName, target) {
	this.beanName = beanName;
	this.target = target;
}

module.exports = TargetSource;

TargetSource.prototype.isStatic = function() {

}

TargetSource.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

TargetSource.prototype.getBeanName = function() {
	return this.beanName;
}

TargetSource.prototype.getTarget = function() {
	return this.target;
}

TargetSource.prototype.setTarget = function(target) {
	this.target = target;
}

TargetSource.prototype.releaseTarget = function() {

}