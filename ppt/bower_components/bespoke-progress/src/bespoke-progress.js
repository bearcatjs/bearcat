(function(bespoke) {

  bespoke.plugins.progress = function (deck, options) {
    var progressParent = document.createElement('div'),
      progressBar = document.createElement('div'),
      prop = options === 'vertical' ?
        'height' :
        ['horizontal', true].indexOf(options) + 1 ?
          'width' :
          undefined;

    if (!prop) {
      return;
    }

    progressParent.className = 'bespoke-progress-parent';
    progressBar.className = 'bespoke-progress-bar';
    progressParent.appendChild(progressBar);
    deck.parent.appendChild(progressParent);

    deck.on('activate', function(e) {
      progressBar.style[prop] = (e.index * 100 / (deck.slides.length - 1)) + '%';
    });
  };

}(bespoke));
