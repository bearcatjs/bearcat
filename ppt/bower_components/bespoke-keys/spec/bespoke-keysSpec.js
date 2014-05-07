(function() {
  'use strict';

  describe("bespoke-keys", function() {

    var deck,

      createDeck = function(optionValue) {
        var parent = document.createElement('article');
        parent.innerHTML = '<section></section><section></section>';

        deck = bespoke.from(parent, {
          keys: optionValue
        });
      },

      pressKey = function(which) {
        simulant.fire(document, 'keydown', { which: which });
      };

    describe("horizontal deck", function() {

      [true, 'horizontal'].forEach(function (optionValue) {

        describe("with an option value of '" + optionValue + "'", function() {

          beforeEach(createDeck.bind(null, optionValue));

          describe("next slide", function() {

            it("should go to the next slide when pressing the space bar", function() {
              pressKey(32);
              expect(deck.slides[1].classList.contains('bespoke-active')).toBe(true);
            });

            it("should go to the next slide when pressing the right arrow", function() {
              pressKey(39);
              expect(deck.slides[1].classList.contains('bespoke-active')).toBe(true);
            });

            it("should go to the next slide when pressing page down", function() {
              pressKey(34);
              expect(deck.slides[1].classList.contains('bespoke-active')).toBe(true);
            });

          });

          describe("previous slide", function() {

            beforeEach(function() {
              deck.slide(1);
            });

            it("should go to the previous slide when pressing the left arrow", function() {
              pressKey(37);
              expect(deck.slides[0].classList.contains('bespoke-active')).toBe(true);
            });

            it("should go to the previous slide when pressing page up", function() {
              pressKey(33);
              expect(deck.slides[0].classList.contains('bespoke-active')).toBe(true);
            });

          });

        });

      });

    });

    describe("vertical deck", function() {

      beforeEach(createDeck.bind(null, 'vertical'));

      describe("next slide", function() {

        it("should go to the next slide when pressing the space bar", function() {
          pressKey(32);
          expect(deck.slides[1].classList.contains('bespoke-active')).toBe(true);
        });

        it("should go to the next slide when pressing the down arrow", function() {
          pressKey(40);
          expect(deck.slides[1].classList.contains('bespoke-active')).toBe(true);
        });

        it("should go to the next slide when pressing page down", function() {
          pressKey(34);
          expect(deck.slides[1].classList.contains('bespoke-active')).toBe(true);
        });

      });

      describe("previous slide", function() {

        beforeEach(function() {
          deck.slide(1);
        });

        it("should go to the previous slide when pressing the up arrow", function() {
          pressKey(38);
          expect(deck.slides[0].classList.contains('bespoke-active')).toBe(true);
        });

        it("should go to the previous slide when pressing page up", function() {
          pressKey(33);
          expect(deck.slides[0].classList.contains('bespoke-active')).toBe(true);
        });

      });

    });

  });

}());
