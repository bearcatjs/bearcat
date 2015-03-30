var MockAnnotationFunction = require('../mock-base/mock-annotation-function');
var MetaUtil = require('../../lib/util/metaUtil');
MetaUtil.cleanUp();

var expect = require('expect.js');

describe('MetaUtil', function() {
	describe('MetaUtil', function() {
		it('should MetaUtil t1 right', function(done) {
			var func = MockAnnotationFunction.t1;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t2 right', function(done) {
			var func = MockAnnotationFunction.t2;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func,
				args: [{
					name: "name",
					type: "Object"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t3 right', function(done) {
			var func = MockAnnotationFunction.t3;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t4 right', function(done) {
			var func = MockAnnotationFunction.t4;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func,
				args: [{
					name: "$engine",
					ref: "engine"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t5 right', function(done) {
			var func = MockAnnotationFunction.t5;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func,
				props: [{
					name: "$engine",
					ref: "engine"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t6 right', function(done) {
			var func = MockAnnotationFunction.t6;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func,
				args: [{
					name: "$engine",
					ref: "engine"
				}, {
					name: "num",
					type: "Object"
				}],
				props: [{
					name: "$wheel",
					ref: "wheel"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t7 right', function(done) {
			var func = MockAnnotationFunction.t7;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func,
				props: [{
					name: "$Vnum",
					value: "${car.num}"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t8 right', function(done) {
			var func = MockAnnotationFunction.t8;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func,
				props: [{
					name: "$Tnum",
					type: "Number"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t9 right', function(done) {
			var func = MockAnnotationFunction.t9;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				id: "t9",
				scope: "prototype",
				order: 1,
				init: "init",
				destroy: "destroy",
				factoryBean: "car",
				factoryMethod: "run",
				async: true,
				abstract: true,
				parent: "bus",
				lazy: true,
				factoryArgs: [{
					name: "name",
					value: "name"
				}],
				proxy: true,
				aop: [{
					"pointcut": "before:.*?runBefore",
					"advice": "doBefore",
					"order": 10
				}],
				func: func,
				props: [{
					name: "$car",
					ref: "car"
				}, {
					name: "$bus",
					ref: "bus"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t10 right', function(done) {
			var func = MockAnnotationFunction.t10;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				id: "t10",
				aop: [{
					"advice": "run",
					"pointcut": "before:.*?runBefore"
				}],
				func: func
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t11 right', function(done) {
			var func = MockAnnotationFunction.t11;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				id: "t11",
				aop: [{
					"advice": "fly",
					"pointcut": "before:.*?runBefore",
					"order": 1,
					"runtime": true
				}, {
					"advice": "boot",
					"pointcut": "after:.*?runBoot"
				}],
				func: func
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t12 right', function(done) {
			var func = MockAnnotationFunction.t12;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				id: "t12",
				scope: "prototype",
				func: func
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t13 right', function(done) {
			var func = MockAnnotationFunction.t13;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				id: "t13",
				aop: [{
					"advice": "run",
					"pointcut": "before:.*?run"
				}],
				func: func
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t14 right', function(done) {
			var func = MockAnnotationFunction.t14;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				id: "t14",
				init: "start",
				props: [{
					name: "$configService",
					ref: "configService"
				}],
				func: func
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t15 right', function(done) {
			var func = MockAnnotationFunction.t15;
			var meta = MetaUtil.resolveFuncAnnotation(func);

			expect(meta).to.eql({
				func: func,
				args: [{
					name: "$engine",
					ref: "engine"
				}, {
					name: "num",
					type: "Object"
				}],
				props: [{
					name: "$wheel",
					ref: "wheel"
				}]
			});

			done();
		});
	});

	describe('MetaUtil', function() {
		it('should MetaUtil t16 right', function(done) {
			// var func = MockAnnotationFunction.t16;
			// var meta = MetaUtil.resolveFuncAnnotation(func);

			// meta.should.exist;
			// meta.should.eql({
			// 	id: "t16",
			// 	aop: [{
			// 		"advice": "run",
			// 		"pointcut": "before:.*?run"
			// 	}],
			// 	func: func
			// });

			done();
		});
	});
});