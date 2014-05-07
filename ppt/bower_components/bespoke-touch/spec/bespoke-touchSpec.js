(function() {
  'use strict';

  describe("bespoke-touch", function() {

    var deck,

      INITIAL_SLIDE,

      createDeck = function(optionValue) {
        var parent = document.createElement('article');
        for (var i = 0; i < 10; i++) {
          parent.appendChild(document.createElement('section'));
        }

        deck = bespoke.from(parent, {
          touch: optionValue
        });

        INITIAL_SLIDE = 1;
        deck.slide(INITIAL_SLIDE);
      },

      touchEvent = function(type, x, y) {
        var e = document.createEvent('CustomEvent');
        e.initEvent('touch' + type, true, true);
        e.touches = [{ pageX: x, pageY: y }];
        deck.parent.dispatchEvent(e);
      },

      swipe = function(axis, amount) {
        touchEvent('start', axis == 'x' ? amount : 0, axis == 'x' ? 0 : amount);
        touchEvent('move', 0, 0);
        touchEvent('end', 0, 0);
      };

    describe("horizontal deck", function() {

      [true, 'horizontal'].forEach(function (optionValue) {

        describe("with an option value of '" + optionValue + "'", function() {

          beforeEach(createDeck.bind(null, optionValue));

          it("should go to the next slide when swiping left", function() {
            swipe('x', 51);
            expect(deck.slides[INITIAL_SLIDE + 1].classList.contains('bespoke-active')).toBe(true);
          });

          it("shouldn't go to the next slide when swiping left less than the threshold", function() {
            swipe('x', 50);
            expect(deck.slides[INITIAL_SLIDE].classList.contains('bespoke-active')).toBe(true);
          });

          it("should go to the previous slide when swiping right", function() {
            swipe('x', -51);
            expect(deck.slides[INITIAL_SLIDE - 1].classList.contains('bespoke-active')).toBe(true);
          });

          it("shouldn't go to the next slide when swiping right less than the threshold", function() {
            swipe('x', -50);
            expect(deck.slides[INITIAL_SLIDE].classList.contains('bespoke-active')).toBe(true);
          });

        });

      });

    });

    describe("vertical deck", function() {

      beforeEach(createDeck.bind(null, 'vertical'));

      it("should go to the next slide when swiping up", function() {
        swipe('y', 51);
        expect(deck.slides[INITIAL_SLIDE + 1].classList.contains('bespoke-active')).toBe(true);
      });

      it("shouldn't go to the next slide when swiping up less than the threshold", function() {
        swipe('y', 50);
        expect(deck.slides[INITIAL_SLIDE].classList.contains('bespoke-active')).toBe(true);
      });

      it("should go to the previous slide when swiping down", function() {
        swipe('y', -51);
        expect(deck.slides[INITIAL_SLIDE - 1].classList.contains('bespoke-active')).toBe(true);
      });

      it("shouldn't go to the next slide when swiping down less than the threshold", function() {
        swipe('y', -50);
        expect(deck.slides[INITIAL_SLIDE].classList.contains('bespoke-active')).toBe(true);
      });

    });

  });

}());
