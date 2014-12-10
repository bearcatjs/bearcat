var ConfigLoader = require('../../lib/resource/configLoader');
var expect = require('expect.js');

function isBrowser() {
	return typeof window !== 'undefined';
}

if (isBrowser()) {
	require.resolve = noop;

	function noop() {

	}
}

describe('configLoader', function() {
	describe('#getResources', function() {
		it('should getResources right', function(done) {
			if (isBrowser()) {
				return done();
			}

			var p = require.resolve('../moduleA/context.json');
			var configLoader = new ConfigLoader();
			var metaObjects = configLoader.getResources(p);
			expect(metaObjects).to.have.property('wheel');
			expect(metaObjects).to.have.property('bus');
			var wheelMeta = metaObjects['wheel'];
			var busMeta = metaObjects['bus'];

			expect(wheelMeta).to.have.property('func');
			expect(wheelMeta).to.have.property('id', 'wheel');
			expect(wheelMeta).to.have.property('initMethod', 'init');
			expect(wheelMeta).to.have.property('destroyMethod', 'destroy');
			expect(wheelMeta).to.have.property('order', 3);

			expect(busMeta).to.have.property('func');
			expect(busMeta).to.have.property('id', 'bus');
			expect(busMeta).to.have.property('parent', 'car');

			done();
		});
	});
});