/**
 * Count down to zero and invoke cb finally.
 */
var CountDownLatch = function(count, next, cb) {
  this.count = count;
  this._next = next;
  this._cb = cb;
};

/**
 * Call when a task finish to count down.
 *
 * @api public
 */
CountDownLatch.prototype.next = function(err) {
  if (this.count < 0) {
    throw new Error('illegal state.');
  }

  if (err) {
    this.count = 0;
    this._cb(err);
    return;
  }

  this.count--;
  this._next();
  console.log('next');
  if (this.count === 0) {
    this._cb();
  }
};

module.exports = {
  id: "countDownLatch",
  // scope: "prototype",
  func: CountDownLatch,
  factoryBean: "countDownLatchFactory",
  factoryMethod: "createCountDownLatch",
  factoryArgs: [{
    name: "count",
    type: "Integer"
  }, {
    name: "next",
    type: "Function"
  }, {
    name: "cb",
    type: "Function"
  }]
}