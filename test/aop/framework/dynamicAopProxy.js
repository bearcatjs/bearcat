var lib = process.env.BEARCAT_COV ? 'lib-cov' : 'lib';

var DynamicAopProxy = require('../../../' + lib + '/aop/framework/dynamicAopProxy');

var should = require('should');

describe('DynamicAopProxy', function() {
	describe('DynamicAopProxy', function() {
		it('should do DynamicAopProxy right', function(done) {
			var dynamicAopProxy = new DynamicAopProxy();

			done();
		});
	});
});