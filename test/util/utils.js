var mock_args = require('../mock-base/mock-arg-props');
var utils = require('../../lib/util/utils');
var constant = require('../../lib/util/constant');
var should = require('should');

describe('utils', function() {
	describe('#check', function() {
		it('should checkArray right', function(done) {
			var ret = utils.checkArray([]);
			ret.should.be.true;

			ret = utils.checkArray('aaa');
			ret.should.be.false;

			ret = utils.checkArray(1);
			ret.should.be.false;

			done();
		});

		it('should checkFunction right', function(done) {
			var ret = utils.checkFunction(function() {});
			ret.should.be.true;

			ret = utils.checkFunction('aaa');
			ret.should.be.false;

			ret = utils.checkFunction(1);
			ret.should.be.false;

			ret = utils.checkFunction({});
			ret.should.be.false;

			done();
		});

		it('should checkObject right', function(done) {
			var ret = utils.checkObject({});
			ret.should.be.true;

			var a = function() {}
			ret = utils.checkObject(new a());
			ret.should.be.true;

			ret = utils.checkObject('aaa');
			ret.should.be.false;

			ret = utils.checkObject(1);
			ret.should.be.false;

			done();
		});

		it('should checkType right', function(done) {
			var ret = utils.checkType('Object');
			ret.should.be.true;

			ret = utils.checkType('Number');
			ret.should.be.true;

			ret = utils.checkType('Array');
			ret.should.be.true;

			ret = utils.checkType('Boolean');
			ret.should.be.true;

			ret = utils.checkType('Function');
			ret.should.be.true;

			ret = utils.checkType('String');
			ret.should.be.true;

			ret = utils.checkType('aaa');
			ret.should.be.false;

			done();
		});

		it('should checkIsNotNull right', function(done) {
			var ret = utils.isNotNull('aaa');
			ret.should.be.true;

			ret = utils.isNotNull(1);
			ret.should.be.true;

			ret = utils.isNotNull({});
			ret.should.be.true;

			ret = utils.isNotNull();
			ret.should.be.false;

			ret = utils.isNotNull(null);
			ret.should.be.false;

			done();
		});
	});

	describe('#file', function() {
		it('should get myRequire right', function(done) {
			var beanUtil = require('../../lib/util/beanUtil');
			var myBeanUtil = utils.myRequire('../../lib/util/beanUtil');
			myBeanUtil.should.be.exist;

			done();
		});
	});
});