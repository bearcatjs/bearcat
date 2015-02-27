var mock_args = require('../mock-base/mock-arg-props');
var utils = require('../../lib/util/utils');
var constant = require('../../lib/util/constant');
var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	function noop() {

	}

	require.resolve = noop;
}


describe('utils', function() {
	describe('#check', function() {
		it('should checkArray right', function(done) {
			var ret = utils.checkArray([]);
			expect(ret).to.eql(true);

			ret = utils.checkArray('aaa');
			expect(ret).to.eql(false);

			ret = utils.checkArray(1);
			expect(ret).to.eql(false);

			done();
		});

		it('should checkFunction right', function(done) {
			var ret = utils.checkFunction(function() {});
			expect(ret).to.eql(true);

			ret = utils.checkFunction('aaa');
			expect(ret).to.eql(false);

			ret = utils.checkFunction(1);
			expect(ret).to.eql(false);

			ret = utils.checkFunction({});
			expect(ret).to.eql(false);

			done();
		});

		it('should checkObject right', function(done) {
			var ret = utils.checkObject({});
			expect(ret).to.eql(true);

			var a = function() {}
			ret = utils.checkObject(new a());
			expect(ret).to.eql(true);

			ret = utils.checkObject('aaa');
			expect(ret).to.eql(false);

			ret = utils.checkObject(1);
			expect(ret).to.eql(false);

			done();
		});

		it('should checkType right', function(done) {
			var ret = utils.checkType('Object');
			expect(ret).to.eql(true);

			ret = utils.checkType('Number');
			expect(ret).to.eql(true);

			ret = utils.checkType('Array');
			expect(ret).to.eql(true);

			ret = utils.checkType('Boolean');
			expect(ret).to.eql(true);

			ret = utils.checkType('Function');
			expect(ret).to.eql(true);

			ret = utils.checkType('String');
			expect(ret).to.eql(true);

			ret = utils.checkType('aaa');
			expect(ret).to.eql(false);

			done();
		});

		it('should checkIsNotNull right', function(done) {
			var ret = utils.isNotNull('aaa');
			expect(ret).to.eql(true);

			ret = utils.isNotNull(1);
			expect(ret).to.eql(true);

			ret = utils.isNotNull(0);
			expect(ret).to.eql(true);

			ret = utils.isNotNull({});
			expect(ret).to.eql(true);

			ret = utils.isNotNull();
			expect(ret).to.eql(false);

			ret = utils.isNotNull(null);
			expect(ret).to.eql(false);

			ret = utils.isNotNull(false);
			expect(ret).to.eql(true);

			done();
		});
	});

	describe('#file', function() {
		it('should get myRequire right', function(done) {
			var beanUtil = require('../../lib/util/beanUtil');
			utils.myRequire(1);
			var myBeanUtil = utils.myRequire('../../lib/util/beanUtil');

			var a = utils.myRequire('a');

			utils.myRequireHot('xxx');

			utils.requireUncached(1);

			done();
		});

		it('should getLoadPath right', function(done) {
			var p = require.resolve('../moduleA/context.json');
			if (isBrowser()) {
				return done();
			}

			var loadPath = utils.getLoadPath('beans.wheel', p);

			var bean = require(loadPath);
			// bean.should.be.exist;

			var r = utils.getLoadPath(null, p);

			done();
		});

		it('should requireUncached right', function(done) {
			var p = require.resolve('../moduleA/context.json');
			// var obj = utils.requireUncached(p);

			// obj.should.be.exist;
			done();
		});

		it('should checkFileType right', function(done) {
			var ret = utils.checkFileType('js', 'js');

			expect(ret).to.eql(false);

			ret = utils.checkFileType('a.js', 'js');
			expect(ret).to.eql(true);

			ret = utils.checkFileType('a.jsbb', 'js');
			expect(ret).to.eql(false);

			done();
		});

		it('should check isFile right', function(done) {
			if (isBrowser()) {
				return done();
			}

			var p = require.resolve('./beanUtil');
			var ret = utils.isFile(p);
			expect(ret).to.eql(true);

			ret = utils.isFile(__dirname);
			expect(ret).to.eql(false);

			done();
		});

		it('should check isDir right', function(done) {
			if (isBrowser()) {
				return done();
			}

			var ret = utils.isDir(__dirname);
			expect(ret).to.eql(true);

			var p = require.resolve('./beanUtil');
			ret = utils.isDir(p);
			expect(ret).to.eql(false);

			done();
		});

		it('should getFileName right', function(done) {
			var fn = utils.getFileName('a.js', 3);
			expect(fn).to.equal('a');

			fn = utils.getFileName('a', 2);
			expect(fn).to.equal('a');

			done();
		});

		it('should compareByOrder right', function(done) {
			var Car = require('../mock-base/mock-compare');
			var car1 = new Car();
			car1.setOrder(2);

			var car2 = new Car();
			car2.setOrder(0);

			var r = utils.compareByOrder(car1, car2);

			expect(r).to.eql(-1);

			r = utils.compareBeans(car1, car2);

			expect(r).to.eql(-1);

			var car3 = new Car();
			car3.aspect = 1;
			r = utils.compareBeans(car3, car1);

			expect(r).to.eql(-1);

			done();
		});

		it('should parseArgs right', function(done) {
			var argv = ['node', 'app', 'env=test'];
			var args = utils.parseArgs(argv);
			expect(args).to.eql({
				main: 'app',
				env: 'test'
			});

			argv = ['node', 'app', '--env=test'];
			var args = utils.parseArgs(argv);
			expect(args).to.eql({
				main: 'app',
				'--env': 'test'
			});

			done();
		});

		it('should loadPath checkWebWorker right', function(done) {
			utils.getLoadPath2();
			utils.checkWebWorker();

			done();
		});
	});
});