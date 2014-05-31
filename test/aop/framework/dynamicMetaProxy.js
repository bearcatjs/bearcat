var DynamicMetaProxy = require('../../../lib/aop/framework/dynamicMetaProxy');

var should = require('should');

describe('DynamicMetaProxy', function() {
	describe('DynamicMetaProxy', function() {
		it('should do DynamicMetaProxy right', function(done) {
			var dynamicMetaProxy = new DynamicMetaProxy();

			dynamicMetaProxy.dyInit();

			done();
		});
	});
});