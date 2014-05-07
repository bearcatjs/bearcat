(function() {
	"use strict";

	describe("bespoke-bullet", function() {

		var PARENT_TAG = 'article',
			SLIDE_TAG = 'section',
			NO_OF_SLIDES = 10,
			article,
			slides,
			deck,
			getBullet;

		var createDeck = function(optionVal, hasBulletsOnSecondSlide) {
				slides = [];

				var bulletMarkup = '<li' +
						(optionVal === true ? ' data-bespoke-bullet' : '') +
						'>Bullet</li>',
					selector = (optionVal === true ? '[data-bespoke-bullet]' : optionVal);

				article = document.createElement(PARENT_TAG);
				for (var i = 0; i < NO_OF_SLIDES; i++) {
					slides.push(document.createElement(SLIDE_TAG));
					if (!hasBulletsOnSecondSlide && i === 1) {
						slides[i].innerHTML = '<p>No bullets on this slide</p>';
					} else {
						slides[i].innerHTML = '' +
							'<ul>' +
								bulletMarkup +
								bulletMarkup +
								bulletMarkup +
							'</ul>';
					}
					article.appendChild(slides[i]);
				}

				document.body.appendChild(article);

				deck = bespoke.from(PARENT_TAG, {
					bullets: optionVal
				});

				getBullet = function(deck, slideIndex, bulletIndex) {
					return deck.slides[slideIndex].querySelector(selector + ':nth-child(' + (bulletIndex + 1) + ')');
				};
			},
			destroyDeck = function() {
				document.body.removeChild(article);
			};

		// Run all tests for default value and selector
		[true, 'li'].forEach(function(optionVal) {

			describe("option value of " + optionVal + ": ", function() {

				describe("given a deck with bullets on every slide", function() {

					beforeEach(function() {
						createDeck(optionVal, true);
					});

					afterEach(destroyDeck);

					describe("on initial load", function() {

						it("should add a 'bespoke-bullet-active' class to the first bullet", function() {
							expect(getBullet(deck, 0, 0).classList.contains('bespoke-bullet-active')).toBe(true);
							expect(getBullet(deck, 0, 0).classList.contains('bespoke-bullet-inactive')).toBe(false);
						});

						it("should add a 'bespoke-bullet-inactive' class to the inactive bullets", function() {
							expect(getBullet(deck, 0, 1).classList.contains('bespoke-bullet-inactive')).toBe(true);
							expect(getBullet(deck, 0, 1).classList.contains('bespoke-bullet-active')).toBe(false);

							expect(getBullet(deck, 0, 2).classList.contains('bespoke-bullet-inactive')).toBe(true);
							expect(getBullet(deck, 0, 2).classList.contains('bespoke-bullet-active')).toBe(false);
						});

					});

					describe("when the next slide is requested while bullets are still inactive", function() {

						beforeEach(function() {
							deck.next();
						});

						it("should remain on the current slide", function() {
							expect(deck.slides[0].classList.contains('bespoke-active')).toBe(true);
						});

						it("should add a 'bespoke-bullet-active' class to the second bullet", function() {
							expect(getBullet(deck, 0, 1).classList.contains('bespoke-bullet-active')).toBe(true);
						});

					});

					describe("when the next slide is requested twice while two bullets are still inactive", function() {

						beforeEach(function() {
							deck.next();
							deck.next();
						});

						it("should remain on the current slide", function() {
							expect(deck.slides[0].classList.contains('bespoke-active')).toBe(true);
						});

					});

					describe("when the next slide is requested three times while only two bullets are still inactive", function() {

						beforeEach(function() {
							deck.next();
							deck.next();
							deck.next();
						});

						it("should proceed to the next slide", function() {
							expect(deck.slides[1].classList.contains('bespoke-active')).toBe(true);
						});

						it("activate the first bullet on the next slide", function() {
							expect(getBullet(deck, 1, 0).classList.contains('bespoke-bullet-active')).toBe(true);
							expect(getBullet(deck, 1, 0).classList.contains('bespoke-bullet-inactive')).toBe(false);
						});

					});

					describe("given the first slide and bullet are active", function() {

						beforeEach(function() {
							deck.slide(0);
						});

						describe("when the previous slide is requested", function() {

							beforeEach(function() {
								deck.prev();
							});

							it("should keep the first bullet activated", function() {
								expect(getBullet(deck, 0, 0).classList.contains('bespoke-bullet-active')).toBe(true);
							});

						});

					});

					describe("given the last bullet of the first slide is active", function() {

						beforeEach(function() {
							deck.next();
							deck.next();
						});

						describe("when the previous slide is requested", function() {

							beforeEach(function() {
								deck.prev();
							});

							it("should activate the previous bullet", function() {
								expect(getBullet(deck, 0, 1).classList.contains('bespoke-bullet-active')).toBe(true);
							});

						});

					});

					describe("given the first bullet of the second slide is active", function() {

						beforeEach(function() {
							deck.next();
							deck.next();
							deck.next();
						});

						describe("when the previous slide is requested", function() {

							beforeEach(function() {
								deck.prev();
							});

							it("should activate the previous slide", function() {
								expect(deck.slides[0].classList.contains('bespoke-active')).toBe(true);
							});

							it("should activate the last bullet of the previous slide", function() {
								expect(getBullet(deck, 0, 2).classList.contains('bespoke-bullet-active')).toBe(true);
							});

						});

					});

					describe("given the last slide and bullet are active", function() {

						beforeEach(function() {
							deck.slide(deck.slides.length - 1);
							deck.next();
						});

						describe("when the next slide is requested three times", function() {

							beforeEach(function() {
								deck.next();
								deck.next();
								deck.next();
							});

							it("should keep the last bullet activated", function() {
								expect(getBullet(deck, deck.slides.length - 1, 2).classList.contains('bespoke-bullet-active')).toBe(true);
							});

						});

					});

				});

				describe("given a deck with bullets on every slide except the second slide", function() {

					beforeEach(function() {
						createDeck(optionVal, false);
					});

					afterEach(destroyDeck);

					describe("when the next slide is requested three times, passing a non-bullet slide", function() {

						beforeEach(function() {
							deck.next();
							deck.next();
							deck.next();
							deck.next();
						});

						it("should activate the third slide", function() {
							expect(deck.slides[2].classList.contains('bespoke-active')).toBe(true);
						});

						it("should activate the first bullet of the third slide", function() {
							expect(getBullet(deck, 2, 0).classList.contains('bespoke-bullet-active')).toBe(true);
						});

					});

					describe("given the slide following the non-bullet slide is activated", function() {

						beforeEach(function() {
							deck.slide(2);
						});

						describe("when the previous slide is requested twice, passing a non-bullet slide", function() {

							beforeEach(function() {
								deck.prev();
								deck.prev();
							});

							it("should activate the first slide", function() {
								expect(deck.slides[0].classList.contains('bespoke-active')).toBe(true);
							});

							it("should activate the last bullet of the first slide", function() {
								expect(getBullet(deck, 0, 2).classList.contains('bespoke-bullet-active')).toBe(true);
							});

						});

					});

				});

			});

		});

	});

}());