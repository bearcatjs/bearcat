var PropertiesLoader = require('../../lib/resource/propertiesLoader');
var should = require('should');

describe('propertiesLoader', function() {
	describe('#getResources', function() {
		it('should getResources right', function(done) {
			var propertiesLoader = new PropertiesLoader();
			var a = require.resolve('./metaLoader');
			propertiesLoader.loadDir({}, a);

			var path = require('path');
			var emptypath = require.resolve('../mock-base/mock-meta.js');

			propertiesLoader.loadDir({}, path.dirname(emptypath) + '/empty');

			done();
		});
	});
});