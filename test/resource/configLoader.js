var ConfigLoader = require('../../lib/resource/configLoader');
var should = require('should');

describe('configLoader', function() {
	describe('#getResources', function() {
		it('should getResources right', function(done) {
			var p = require.resolve('../moduleA/context.json');
			var configLoader = new ConfigLoader();
			var metaObjects = configLoader.getResources(p);
			metaObjects.should.have.property('wheel');
			metaObjects.should.have.property('bus');
			var wheelMeta = metaObjects['wheel'];
			var busMeta = metaObjects['bus'];

			wheelMeta.should.have.property('func');
			wheelMeta.should.have.property('id', 'wheel');
			wheelMeta.should.have.property('initMethod', 'init');
			wheelMeta.should.have.property('destroyMethod', 'destroy');
			wheelMeta.should.have.property('order', 3);

			busMeta.should.have.property('func');
			busMeta.should.have.property('id', 'bus');
			busMeta.should.have.property('parent', 'car');

			done();
		});
	});
});