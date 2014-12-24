var validatorUtil = require('../../lib/util/validatorUtil');
var mock_meta = require('../mock-base/mock-meta');
var expect = require('expect.js');

describe('validatorUtil', function() {
	describe('#metaValidator', function() {
		it('should metaValidator t1 right', function(done) {
			var t1 = mock_meta.t1;
			var ret = validatorUtil.metaValidator(t1);
			expect(ret).to.eql(false);

			done();
		});

		it('should metaValidator t2 right', function(done) {
			var t2 = mock_meta.t2;
			var ret = validatorUtil.metaValidator(t2);
			expect(ret).to.eql(false);

			done();
		});

		it('should metaValidator t3 right', function(done) {
			var t3 = mock_meta.t3;
			var ret = validatorUtil.metaValidator(t3);
			expect(ret).to.eql(false);

			done();
		});

		it('should metaValidator t4 right', function(done) {
			var t4 = mock_meta.t4;
			var ret = validatorUtil.metaValidator(t4);
			expect(ret).to.eql(false);

			done();
		});

		it('should metaValidator t5 right', function(done) {
			var t5 = mock_meta.t5;
			var ret = validatorUtil.metaValidator(t5);
			expect(ret).to.eql(false);

			done();
		});

		it('should metaValidator t6 right', function(done) {
			var t6 = mock_meta.t6;
			var ret = validatorUtil.metaValidator(t6);
			expect(ret).to.eql(false);

			done();
		});

		it('should metaValidator t7 right', function(done) {
			var t7 = mock_meta.t7;
			var ret = validatorUtil.metaValidator(t7);
			expect(ret).to.eql(false);

			done();
		});

		it('should metaValidator t8 right', function(done) {
			var t8 = mock_meta.t8;
			var ret = validatorUtil.metaValidator(t8);
			expect(ret).to.eql(false);

			done();
		});

		it('should metaValidator t9 right', function(done) {
			var t9 = mock_meta.t9;
			var ret = validatorUtil.metaValidator(t9);
			expect(ret).to.eql(false);

			done();
		});

		it('should metaValidator t10 right', function(done) {
			var t10 = mock_meta.t10;
			var ret = validatorUtil.metaValidator(t10);
			expect(ret).to.eql(true);

			done();
		});

		it('should metaValidator t11 right', function(done) {
			var t11 = mock_meta.t11;
			var ret = validatorUtil.metaValidator(t11);
			expect(ret).to.eql(false);

			done();
		});

		it('should metaValidator t12 right', function(done) {
			var t12 = mock_meta.t12;
			var ret = validatorUtil.metaValidator(t12);
			expect(ret).to.eql(false);

			done();
		});
	});
});