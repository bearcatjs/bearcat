var CountDownLatch = require('./countDownLatchBean');

var CountDownLatchFactoryBean = function() {

}

CountDownLatchFactoryBean.prototype.createCountDownLatch = function(count, next, cb) {
  console.log("createCountDownLatch " + count);
  if (!count || count <= 0) {
    throw new Error('count should be positive.');
  }
  if (typeof cb !== 'function') {
    throw new Error('cb should be a function.');
  }

  return new CountDownLatch.func(count, next, cb);
};

module.exports = {
  id: "countDownLatchFactory",
  func: CountDownLatchFactoryBean
}