module.exports = process.env.POMELO_COV ?
  require('./lib-cov/pomelo-web') :
  require('./lib/pomelo-web');