module.exports = process.env.BEARCAT_COV ?
	require('./lib-cov/bearcat') :
	require('./lib/bearcat');