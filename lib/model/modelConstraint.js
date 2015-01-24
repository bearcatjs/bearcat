/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ModelConstraint
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var ModelConstraint = function() {
	this.id = null;
	this.cid = null;
	this.constraint = null;
}

ModelConstraint.prototype.setId = function(id) {
	this.id = id;
}

ModelConstraint.prototype.getId = function() {
	return this.id;
}

ModelConstraint.prototype.setCid = function(cid) {
	this.cid = cid;
}

ModelConstraint.prototype.getCid = function() {
	return this.cid;
}

ModelConstraint.prototype.setConstraint = function(constraint) {
	this.constraint = constraint;
}

ModelConstraint.prototype.getConstraint = function() {
	return this.constraint;
}

module.exports = ModelConstraint;