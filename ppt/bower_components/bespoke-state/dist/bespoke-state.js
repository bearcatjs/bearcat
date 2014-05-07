/*!
 * bespoke-state v0.2.2
 *
 * Copyright 2013, Mark Dalgleish
 * This content is released under the MIT license
 * http://mit-license.org/markdalgleish
 */

(function(bespoke) {

	bespoke.plugins.state = function(deck) {
		var modifyState = function(method, event) {
			var attr = event.slide.getAttribute('data-bespoke-state');

			if (attr) {
				attr.split(' ').forEach(function(state) {
					state && deck.parent.classList[method](state);
				});
			}
		};

		deck.on('activate', modifyState.bind(null, 'add'));
		deck.on('deactivate', modifyState.bind(null, 'remove'));
	};

}(bespoke));
