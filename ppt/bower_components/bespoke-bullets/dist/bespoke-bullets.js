/*!
 * bespoke-bullets v0.2.1
 *
 * Copyright 2013, Mark Dalgleish
 * This content is released under the MIT license
 * http://mit-license.org/markdalgleish
 */

(function(bespoke) {

	bespoke.plugins.bullets = function(deck, options) {
		var activeSlideIndex,
			activeBulletIndex,

			bullets = deck.slides.map(function(slide) {
				return [].slice.call(slide.querySelectorAll((typeof options === 'string' ? options : '[data-bespoke-bullet]')), 0);
			}),

			next = function() {
				var nextSlideIndex = activeSlideIndex + 1;

				if (activeSlideHasBulletByOffset(1)) {
					activateBullet(activeSlideIndex, activeBulletIndex + 1);
					return false;
				} else if (bullets[nextSlideIndex]) {
					activateBullet(nextSlideIndex, 0);
				}
			},

			prev = function() {
				var prevSlideIndex = activeSlideIndex - 1;

				if (activeSlideHasBulletByOffset(-1)) {
					activateBullet(activeSlideIndex, activeBulletIndex - 1);
					return false;
				} else if (bullets[prevSlideIndex]) {
					activateBullet(prevSlideIndex, bullets[prevSlideIndex].length - 1);
				}
			},

			activateBullet = function(slideIndex, bulletIndex) {
				activeSlideIndex = slideIndex;
				activeBulletIndex = bulletIndex;

				bullets.forEach(function(slide, s) {
					slide.forEach(function(bullet, b) {
						bullet.classList.add('bespoke-bullet');

						if (s < slideIndex || s === slideIndex && b <= bulletIndex) {
							bullet.classList.add('bespoke-bullet-active');
							bullet.classList.remove('bespoke-bullet-inactive');
						} else {
							bullet.classList.add('bespoke-bullet-inactive');
							bullet.classList.remove('bespoke-bullet-active');
						}
					});
				});
			},

			activeSlideHasBulletByOffset = function(offset) {
				return bullets[activeSlideIndex][activeBulletIndex + offset] !== undefined;
			};

		deck.on('next', next);
		deck.on('prev', prev);

		deck.on('slide', function(e) {
			activateBullet(e.index, 0);
		});

		activateBullet(0, 0);
	};

}(bespoke));