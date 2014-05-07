/*!
 * bespoke-keys v0.1.0
 * https://github.com/markdalgleish/bespoke-keys
 *
 * Copyright 2013, Mark Dalgleish
 * This content is released under the MIT license
 */

bespoke.plugins.keys = function(deck, options) {
  var isHorizontal = options === true || options == 'horizontal';

  document.addEventListener('keydown', function(e) {
    (
      e.which == 34 || // PAGE DOWN
      e.which == 32 || // SPACE
      isHorizontal && e.which == 39 || // RIGHT
      !isHorizontal && e.which == 40 // DOWN
    ) && deck.next();
    (
      e.which == 33 || // PAGE UP
      isHorizontal && e.which == 37 || // LEFT
      !isHorizontal && e.which == 38 // UP
    ) && deck.prev();
  });
};
