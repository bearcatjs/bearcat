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
