/*!
 * bespoke-forms v0.1.0
 * https://github.com/markdalgleish/bespoke-forms
 *
 * Copyright 2013, Mark Dalgleish
 * This content is released under the MIT license
 */

(function(bespoke) {

  bespoke.plugins.forms = function(deck) {
    deck.slides.forEach(function(slide) {
      slide.addEventListener('keydown', function(e) {
        if (/INPUT|TEXTAREA|SELECT/.test(e.target.nodeName) || e.target.contentEditable === 'true') {
          e.stopPropagation();
        }
      });
    });
  };

}(bespoke));
