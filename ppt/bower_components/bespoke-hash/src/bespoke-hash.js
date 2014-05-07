(function(bespoke) {

	bespoke.plugins.hash = function(deck) {
		var activeIndex,

			parseHash = function() {
				var hash = window.location.hash.slice(1),
					slideNumberOrName = parseInt(hash, 10);

				if (hash) {
					if (slideNumberOrName) {
						activateSlide(slideNumberOrName - 1);
					} else {
						deck.slides.forEach(function(slide, i) {
							slide.getAttribute('data-bespoke-hash') === hash && activateSlide(i);
						});
					}
				}
			},

			activateSlide = function(index) {
				if (index !== activeIndex) {
					deck.slide(index);
				}
			};

		setTimeout(function() {
			parseHash();

			deck.on('activate', function(e) {
				var slideName = e.slide.getAttribute('data-bespoke-hash');
				window.location.hash = slideName || e.index + 1;
				activeIndex = e.index;
			});

			window.addEventListener('hashchange', parseHash);
		}, 0);
	};

}(bespoke));