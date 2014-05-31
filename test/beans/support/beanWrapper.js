var BeanWrapper = require('../../../lib/beans/support/beanWrapper');
var Constant = require('../../../lib/util/constant');
var should = require('should');

describe('beanWrapper', function() {
	describe('create get beanWrapper', function() {
		it('should get t1 beanWrapper right', function(done) {
			var t1Bean = new BeanWrapper();
			t1Bean.setName('t1Bean');
			t1Bean.setType('Number');
			t1Bean.setRole();
			var t1Role = t1Bean.getDependType();
			t1Role.should.exist;
			t1Role.should.eql(Constant.DEPEND_TYPE_VAR);

			done();
		});

		it('should get t2 beanWrapper right', function(done) {
			var t2Bean = new BeanWrapper();
			t2Bean.setName('t2Bean');
			t2Bean.setValue(100);
			t2Bean.setRole();

			var t2Role = t2Bean.getDependType();
			t2Role.should.exist;
			t2Role.should.eql(Constant.DEPEND_TYPE_VALUE);

			done();
		});

		it('should get t3 beanWrapper right', function(done) {
			var t3Bean = new BeanWrapper();
			t3Bean.setName('t3Bean');
			t3Bean.setRef('t1Bean');
			t3Bean.setRole();

			var t3Role = t3Bean.getDependType();
			t3Role.should.exist;
			t3Role.should.eql(Constant.DEPEND_TYPE_BEAN);

			done();
		});

		it('should get t4 beanWrapper right', function(done) {
			var t4Bean = new BeanWrapper();
			t4Bean.setRole();

			var t4Role = t4Bean.getDependType();
			t4Role.should.exist;
			t4Role.should.eql(Constant.DEPEND_TYPE_ERROR);

			done();
		});

		it('should get t5 beanWrapper right', function(done) {
			var t5Bean = new BeanWrapper();
			t5Bean.setName('t5Bean');
			t5Bean.setType('aaa');
			t5Bean.setRole();

			var t5Role = t5Bean.getDependType();
			t5Role.should.exist;
			t5Role.should.eql(Constant.DEPEND_TYPE_ERROR);

			done();
		});
	});
});