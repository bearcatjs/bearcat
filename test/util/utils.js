var lib = process.env.BEARCAT_COV ? 'lib-cov' : 'lib';

var mock_args = require('../mock-base/mock-arg-props');
var utils = require('../../' + lib + '/util/utils');
var constant = require('../../' + lib + '/util/constant');
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

			ret = utils.isNotNull(0);
			ret.should.be.true;

			ret = utils.isNotNull({});
			ret.should.be.true;

			ret = utils.isNotNull();
			ret.should.be.false;

			ret = utils.isNotNull(null);
			ret.should.be.false;

			ret = utils.isNotNull(false);
			ret.should.be.true;

			done();
		});
	});

	describe('#file', function() {
		it('should get myRequire right', function(done) {
			var beanUtil = require('../../lib/util/beanUtil');
			var myBeanUtil = utils.myRequire('../../lib/util/beanUtil');
			myBeanUtil.should.be.exist;

			var a = utils.myRequire('a');

			done();
		});

		it('should getLoadPath right', function(done) {
			var p = require.resolve('../moduleA/context.json');
			var loadPath = utils.getLoadPath('beans.wheel', p);

			var bean = require(loadPath);
			bean.should.be.exist;

			var r = utils.getLoadPath(null, p);

			done();
		});

		it('should requireUncached right', function(done) {
			var p = require.resolve('../moduleA/context.json');
			var obj = utils.requireUncached(p);

			obj.should.be.exist;
			done();
		});

		it('should checkFileType right', function(done) {
			var ret = utils.checkFileType('js', 'js');

			ret.should.be.false;

			ret = utils.checkFileType('a.js', 'js');
			ret.should.be.true;

			done();
		});

		it('should check isFile right', function(done) {
			var p = require.resolve('./beanUtil');
			var ret = utils.isFile(p);
			ret.should.be.true;

			ret = utils.isFile(__dirname);
			ret.should.be.false;

			done();
		});

		it('should check isDir right', function(done) {
			var ret = utils.isDir(__dirname);
			ret.should.be.true;

			var p = require.resolve('./beanUtil');
			ret = utils.isDir(p);
			ret.should.be.false;

			done();
		});

		it('should getFileName right', function(done) {
			var fn = utils.getFileName('a.js', 3);
			fn.should.equal('a');

			fn = utils.getFileName('a', 2);
			fn.should.equal('a');

			done();
		});

		it('should compareByOrder right', function(done) {
			var Car = require('../mock-base/mock-compare');
			var car1 = new Car();
			car1.setOrder(2);

			var car2 = new Car();
			car2.setOrder(0);

			var r = utils.compareByOrder(car1, car2);
			r.should.equal(-1);

			done();
		});

		it('should parseArgs right', function(done) {

			done();
		});
	});
});