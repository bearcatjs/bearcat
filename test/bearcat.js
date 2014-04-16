var lib = process.env.POMELO_COV ? 'lib-cov' : 'lib';

var bearcat = require('../lib/bearcat');
var should = require('should');

describe('bearcat', function() {
	describe('#getBeanFactory', function() {
		it('should get BeanFactory from bearcat', function(done) {
			// var BeanFactory = bearcat.getBeanFactory();
			// should.exist(BeanFactory);
			// BeanFactory.should.be.a.Function;
			done();
		})
	});

	describe('#getApplicationContext', function() {
		it('should get ApplicationContext from bearcat', function(done) {
			// var ApplicationContext = bearcat.getApplicationContext();
			// should.exist(ApplicationContext);
			// ApplicationContext.should.be.a.Function;
			done();
		})
	});
});