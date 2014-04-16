var lib = process.env.BEARCAT_COV ? 'lib-cov' : 'lib';

var beanWrapper = require('../../' + lib + '/beans/support/beanWrapper');
var mock_args = require('../mock-base/mock-arg-props');
var beanUtil = require('../../' + lib + '/util/beanUtil');
var constant = require('../../' + lib + '/util/constant');
var should = require('should');

describe('beanUtil', function() {
	describe('#buildBeanWrapper', function() {
		it('should buildBeanWrapper t1 ok', function(done) {
			var t1 = mock_args.t1;
			var name = t1[0]['name'];
			var ref = t1[0]['ref'];
			var r = beanUtil.buildBeanWrapper(t1);
			should.exist(r);
			r.should.be.an.Object;
			var wbean = r[0];
			wbean.should.be.an.instanceof(beanWrapper);
			wbean.getName().should.be.equal(name);
			wbean.getRef().should.be.equal(ref);
			wbean.getRole().should.be.equal(constant.DEPEND_TYPE_BEAN);
			done();
		});

		it('should buildBeanWrapper t2 ok', function(done) {
			var t2 = mock_args.t2;
			var name = t2[0]['name'];
			var value = t2[0]['value'];
			var r = beanUtil.buildBeanWrapper(t2);
			should.exist(r);
			r.should.be.an.Object;
			var wbean = r[0];
			wbean.should.be.an.instanceof(beanWrapper);
			wbean.getName().should.be.equal(name);
			wbean.getValue().should.be.equal(value);
			wbean.getRole().should.be.equal(constant.DEPEND_TYPE_VALUE);
			done();
		});

		it('should buildBeanWrapper t3 ok', function(done) {
			var t3 = mock_args.t3;
			var name = t3[0]['name'];
			var type = t3[0]['type'];
			var r = beanUtil.buildBeanWrapper(t3);
			should.exist(r);
			r.should.be.an.Object;
			var wbean = r[0];
			wbean.should.be.an.instanceof(beanWrapper);
			wbean.getName().should.be.equal(name);
			wbean.getType().should.be.equal(type);
			wbean.getRole().should.be.equal(constant.DEPEND_TYPE_VAR);
			done();
		});

		it('should buildBeanWrapper t4 ok', function(done) {
			var t4 = mock_args.t4;
			var r = beanUtil.buildBeanWrapper(t4);
			should.exist(r);
			r.should.be.an.Object;
			r.should.eql([]);
			done();
		});

		it('should buildBeanWrapper t5 ok', function(done) {
			var t5 = mock_args.t5;
			var r = beanUtil.buildBeanWrapper(t5);
			should.exist(r);
			r.should.be.an.Object;
			r.should.eql([]);
			done();
		});

		it('should buildBeanWrapper t6 ok', function(done) {
			var t6 = mock_args.t6;
			var name = t6[0]['name'];
			var ref = t6[0]['ref'];
			var r = beanUtil.buildBeanWrapper(t6);
			should.exist(r);
			r.should.be.an.Object;
			var wbean = r[0];
			wbean.should.be.an.instanceof(beanWrapper);
			wbean.getName().should.be.equal(name);
			wbean.getRef().should.be.equal(ref);
			wbean.getRole().should.be.equal(constant.DEPEND_TYPE_BEAN);

			name = t6[1]['name'];
			var value = t6[1]['value'];
			var r = beanUtil.buildBeanWrapper(t6);
			should.exist(r);
			r.should.be.an.Object;
			wbean = r[1];
			wbean.should.be.an.instanceof(beanWrapper);
			wbean.getName().should.be.equal(name);
			wbean.getValue().should.be.equal(value);
			wbean.getRole().should.be.equal(constant.DEPEND_TYPE_VALUE);

			name = t6[2]['name'];
			var type = t6[2]['type'];
			var r = beanUtil.buildBeanWrapper(t6);
			should.exist(r);
			r.should.be.an.Object;
			wbean = r[2];
			wbean.should.be.an.instanceof(beanWrapper);
			wbean.getName().should.be.equal(name);
			wbean.getType().should.be.equal(type);
			wbean.getRole().should.be.equal(constant.DEPEND_TYPE_VAR);
			done();
		});

		it('should buildBeanWrapper t7 ok', function(done) {
			var t7 = mock_args.t7;
			var name = t7[0]['name'];
			var type = t7[0]['type'];
			var r = beanUtil.buildBeanWrapper(t7);
			should.exist(r);
			r.should.be.an.Object;
			var wbean = r[0];
			wbean.should.be.an.instanceof(beanWrapper);
			wbean.getName().should.be.equal(name);
			wbean.getType().should.be.equal(type);
			wbean.getRole().should.be.equal(constant.DEPEND_TYPE_ERROR);
			done();
		});

		it('should buildBeanWrapper t8 ok', function(done) {
			var t8 = mock_args.t8;
			var r = beanUtil.buildBeanWrapper(t8);
			should.exist(r);
			r.should.be.an.Object;
			r.should.eql([]);
			done();
		});

		it('should buildBeanWrapper t9 ok', function(done) {
			var t9 = mock_args.t9;
			var r = beanUtil.buildBeanWrapper(t9);
			should.exist(r);
			r.should.be.an.Object;
			var wbean = r[0];
			wbean.should.be.an.instanceof(beanWrapper);
			wbean.getRole().should.be.equal(constant.DEPEND_TYPE_ERROR);
			done();
		});

		it('should buildBeanWrapper t10 ok', function(done) {
			var t10 = mock_args.t10;
			var name = t10[0]['name'];
			var value = t10[0]['value'];
			var r = beanUtil.buildBeanWrapper(t10);
			should.exist(r);
			r.should.be.an.Object;
			var wbean = r[0];
			wbean.should.be.an.instanceof(beanWrapper);
			wbean.getName().should.be.equal(name);
			wbean.getValue().should.be.equal(value);
			wbean.getRole().should.be.equal(constant.DEPEND_TYPE_VALUE);

			wbean = r[1];
			wbean.should.be.an.instanceof(beanWrapper);
			wbean.getRole().should.be.equal(constant.DEPEND_TYPE_ERROR);
			done();
		});
	});

	describe('#getBeanSettingsMap', function() {
		it('should getBeanSettingsMap t1 ok', function(done) {

			var r = beanUtil.getBeanSettingsMap(1);
			r.should.eql({});

			var mock = function() {

			}

			mock.prototype.getName = function() {
				return '';
			}

			r = beanUtil.getBeanSettingsMap([new mock()]);
			r.should.eql({});
			done();
		});
	});

	describe('#getBeanSettingsArray', function() {
		it('should getBeanSettingsArray t1 ok', function(done) {

			var r = beanUtil.getBeanSettingsArray(null);
			console.log(r);
			r.should.eql([]);

			done();
		});
	});
});