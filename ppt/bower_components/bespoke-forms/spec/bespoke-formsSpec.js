(function() {
  'use strict';

  describe("bespoke-forms", function() {

    var

      parent, deck,

      createDeck = function(innerHTML) {
        return function() {
          parent = document.createElement('article');
          for (var i = 0; i < 2; i++) {
            parent.appendChild((function() {
              var el = document.createElement('section');
              el.innerHTML = innerHTML;
              return el;
            }()));
          }

          document.body.appendChild(parent);

          return (deck = bespoke.horizontal.from(parent, {
            forms: true
          }));
        };
      },

      removeDeck = function() {
        document.body.removeChild(parent);
      },

      right = function(selector) {
        simulant.fire(deck.slides[0].querySelector(selector), 'keydown', {
          which: 39,
          bubbles: true
        });
      },

      isFirstSlideActive = function() {
        return deck.slides[0].classList.contains('bespoke-active');
      };

    describe("deck.slide", function() {

      describe("'input' element", function() {

        beforeEach(createDeck('<input type="text" />'));

        it("should not go to the next slide when pressing right arrow inside input", function() {
          right('input');
          expect(isFirstSlideActive()).toBe(true);
        });

      });

      describe("'select' element", function() {

        beforeEach(createDeck('<select><option>Hello World</option></select>'));

        it("should not go to the next slide when pressing right arrow inside select", function() {
          right('select');
          expect(isFirstSlideActive()).toBe(true);
        });

      });

      describe("'textarea' element", function() {

        beforeEach(createDeck('<textarea></textarea>'));

        it("should not go to the next slide when pressing right arrow inside textarea", function() {
          right('textarea');
          expect(isFirstSlideActive()).toBe(true);
        });

      });

      describe("'contenteditable' element", function() {

        beforeEach(createDeck('<div contenteditable="true"></div>'));

        it("should not go to the next slide when pressing right arrow inside an editable element", function() {
          right('[contenteditable]');
          expect(isFirstSlideActive()).toBe(true);
        });

      });

    });

  });

}());
