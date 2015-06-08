var bearcat = require('../../lib/bearcat');
// var example_dir = 'simple'; // change this to run your examples
var contextPath = require.resolve('./context.json'); // to run simple example

bearcat.createApp([contextPath], {
	BEARCAT_GLOBAL: true
});
bearcat.start(function() {
	bearcat.require('car');
});