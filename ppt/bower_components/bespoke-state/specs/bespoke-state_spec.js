(function() {
	"use strict";

	describe("bespoke-state", function() {

		var PARENT_TAG = 'article',
			SLIDE_TAG = 'section',
			NO_OF_SLIDES = 10,
			article,
			slides,
			deck;

		var createDeck = function(createState) {
				slides = [];

				article = document.createElement(PARENT_TAG);
				for (var i = 0; i < NO_OF_SLIDES; i++) {
					slides.push(document.createElement(SLIDE_TAG));
					if (createState) {
						slides[i].setAttribute('data-bespoke-state', createState(i));
					}
					article.appendChild(slides[i]);
				}

				document.body.appendChild(article);

				deck = bespoke.from(PARENT_TAG, {
					state: true
				});
			},
			destroyDeck = function() {
				document.body.removeChild(article);
			};

		afterEach(destroyDeck);

		describe("when a slide with a 'data-bespoke-state' attribute is activated", function() {

			describe("when it has a blank state", function() {
				beforeEach(function() {
					createDeck(function() { return ''; });
					deck.slide(1);
				});

				it("should leave the parent class untouched", function() {
					expect(deck.parent.className).toBe('bespoke-parent');
				});
			});

			describe("when it has a single state", function() {
				beforeEach(function() {
					createDeck(function(i) { return 'state'+i; });
					deck.slide(1);
				});

				it("should add the state to the parent", function() {
					expect(deck.parent.classList.contains('state1')).toBe(true);
				});

				describe("when another slide is activated", function() {

					beforeEach(function() {
						deck.slide(0);
					});

					it("should remove the prior state from the parent", function() {
						expect(deck.parent.classList.contains('state1')).toBe(false);
					});

					it("should add the new state to the parent", function() {
						expect(deck.parent.classList.contains('state0')).toBe(true);
					});

				});
			});

			describe("when it has multiple states", function() {
				beforeEach(function() {
					createDeck(function(i) { return 'stateA'+i +' stateB'+i; });
					deck.slide(1);
				});

				it("should add all states to the parent", function() {
					expect(deck.parent.classList.contains('stateA1')).toBe(true);
					expect(deck.parent.classList.contains('stateB1')).toBe(true);
				});

				describe("when another slide is activated", function() {

					beforeEach(function() {
						deck.slide(0);
					});

					it("should remove all prior states from the parent", function() {
						expect(deck.parent.classList.contains('stateA1')).toBe(false);
						expect(deck.parent.classList.contains('stateB1')).toBe(false);
					});

					it("should add all new states to the parent", function() {
						expect(deck.parent.classList.contains('stateA0')).toBe(true);
						expect(deck.parent.classList.contains('stateB0')).toBe(true);
					});

				});
			});

		});

		describe("when a slide without a 'data-bespoke-state' attribute is activated", function() {

			beforeEach(function() {
				createDeck();
				deck.slide(1);
			});

			it("should leave the parent class untouched", function() {
				expect(deck.parent.className).toBe('bespoke-parent');
			});

		});

	});

}());
