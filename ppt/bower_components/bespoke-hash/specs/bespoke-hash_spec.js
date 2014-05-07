(function() {
	"use strict";

	describe("bespoke-hash", function() {

		var PARENT_TAG = 'article',
			SLIDE_TAG = 'section',
			NO_OF_SLIDES = 10,
			NAMED_SLIDE_NAME = 'named-slide',
			NAMED_SLIDE_INDEX = 8,
			article,
			slides,
			deck;

		var createDeck = function() {
				slides = [];

				article = document.createElement(PARENT_TAG);
				for (var i = 0; i < NO_OF_SLIDES; i++) {
					slides.push(document.createElement(SLIDE_TAG));
					if (i === NAMED_SLIDE_INDEX) {
						slides[i].setAttribute('data-bespoke-hash', NAMED_SLIDE_NAME);
					}
					article.appendChild(slides[i]);
				}

				document.body.appendChild(article);

				deck = bespoke.from(PARENT_TAG, {
					hash: true
				});

				// Wait for next tick
				waits(0);
			},
			destroyDeck = function() {
				document.body.removeChild(article);
			};

		describe("given valid number hash is present on page load", function() {

			beforeEach(function() {
				this.activeSlideN = 2;
				window.location.hash = this.activeSlideN;
			});

			describe("when the deck is created", function() {
			
				beforeEach(createDeck);
				afterEach(destroyDeck);

				it("should activate the slide referenced in the hash", function() {
					expect(deck.slides[this.activeSlideN - 1].classList.contains('bespoke-active')).toBe(true);
				});

			});

		});

		describe("given valid name hash is present on page load", function() {

			beforeEach(function() {
				window.location.hash = NAMED_SLIDE_NAME;
			});

			describe("when the deck is created", function() {
			
				beforeEach(createDeck);
				afterEach(destroyDeck);

				it("should activate the slide referenced in the hash", function() {
					expect(deck.slides[NAMED_SLIDE_INDEX].classList.contains('bespoke-active')).toBe(true);
				});

			});

		});

		describe("given a deck has been created", function() {

			beforeEach(createDeck);
			afterEach(destroyDeck);

			describe("when an unnamed slide is activated", function() {

				beforeEach(function() {
					this.activeSlideIndex = 3;
					deck.slide(this.activeSlideIndex);
				});

				it("should set the hash to match the nth active slide", function() {
					expect(window.location.hash).toBe('#' + (this.activeSlideIndex + 1));
				});

			});

			describe("when a named slide is activated", function() {

				beforeEach(function() {
					deck.slide(NAMED_SLIDE_INDEX);
				});

				it("should set the hash to match the slide name", function() {
					expect(window.location.hash).toBe('#' + NAMED_SLIDE_NAME);
				});

			});

			describe("when the hash changes to a slide number", function() {

				var activeSlideN;

				beforeEach(function() {
					runs(function() {
						activeSlideN = 5;
						window.location.hash = activeSlideN;
					});

					// Wait for next tick
					waits(0);
				});
				
				it("should activate the slide referenced in the hash", function() {
					expect(deck.slides[activeSlideN - 1].classList.contains('bespoke-active')).toBe(true);
				});

			});

			describe("when the hash changes to a slide name", function() {

				beforeEach(function() {
					runs(function() {
						window.location.hash = NAMED_SLIDE_NAME;
					});

					// Wait for next tick
					waits(0);
				});
				
				it("should activate the slide referenced in the hash", function() {
					expect(deck.slides[NAMED_SLIDE_INDEX].classList.contains('bespoke-active')).toBe(true);
				});

			});

		});

	});

}());