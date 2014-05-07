bespoke.plugins.touch = function(deck, options) {
  var axis = options === true || options == 'horizontal' ? 'X' : 'Y',
    startPosition,
    delta;

  deck.parent.addEventListener('touchstart', function(e) {
    if (e.touches.length == 1) {
      startPosition = e.touches[0]['page' + axis];
      delta = 0;
    }
  });

  deck.parent.addEventListener('touchmove', function(e) {
    if (e.touches.length == 1) {
      e.preventDefault();
      delta = e.touches[0]['page' + axis] - startPosition;
    }
  });

  deck.parent.addEventListener('touchend', function() {
    Math.abs(delta) > 50 && (delta > 0 ? deck.prev() : deck.next());
  });
};
