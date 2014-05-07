(function() {
  'use strict';

  describe("bespoke-progress", function() {

    var deck, bar,

      createDeck = function(value) {
        var parent = document.createElement('article');
        for (var i = 0; i < 11; i++) {
          parent.appendChild(document.createElement('section'));
        }

        deck = bespoke.from(parent, {
          progress: value
        });

        bar = deck.parent.querySelector('.bespoke-progress-bar');
      };

    describe("invalid value", function() {

      beforeEach(function() {
        createDeck('afldas');
      });

      it("should not add an element with the class 'bespoke-progress-parent'", function() {
        expect(deck.parent.querySelectorAll('.bespoke-progress-parent').length).toBe(0);
      });

    });

    [
      { value: true, dimension: 'width' },
      { value: 'horizontal', dimension: 'width' },
      { value: 'vertical', dimension: 'height' },
    ]
    .forEach(function(options) {

      var value = options.value,
        dimension = options.dimension;

      describe("value of '" + value + "'", function() {

        beforeEach(function() {
          createDeck(value);
        });

        describe("elements", function() {

          it("should add an element with the class 'bespoke-progress-parent'", function() {
            expect(deck.parent.querySelectorAll('.bespoke-progress-parent').length).toBe(1);
          });

          it("should add an element with the class 'bespoke-progress-bar' inside the progress parent", function() {
            expect(deck.parent.querySelectorAll('.bespoke-progress-parent .bespoke-progress-bar').length).toBe(1);
          });

        });

        describe("deck.slide", function() {

          describe("1 of 11 slides", function() {

            beforeEach(function() {
              deck.slide(0);
            });

            it("should set the progress bar " + dimension + " to be 0%", function() {
              expect(bar.style[dimension]).toBe('0%');
            });

          });

        });

        describe("deck.slide", function() {

          describe("5 of 11 slides", function() {

            beforeEach(function() {
              deck.slide(5);
            });

            it("should set the progress bar " + dimension + " to be 50%", function() {
              expect(bar.style[dimension]).toBe('50%');
            });

          });

        });

        describe("deck.slide", function() {

          describe("11 of 11 slides", function() {

            beforeEach(function() {
              deck.slide(10);
            });

            it("should set the progress bar " + dimension + " to be 100%", function() {
              expect(bar.style[dimension]).toBe('100%');
            });

          });

        });

      });

    });

  });

}());
