[![Build Status](https://secure.travis-ci.org/markdalgleish/bespoke-state.png)](http://travis-ci.org/markdalgleish/bespoke-state)

# bespoke-state

### Slide-Specific Deck Styles for [Bespoke.js](https://github.com/markdalgleish/bespoke.js)

Style your entire deck differently based on the active slide.

Classes specified in `data-bespoke-state` attributes will be added to the deck's parent element when the slide is activated.

## Download

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/markdalgleish/bespoke-state/master/dist/bespoke-state.min.js
[max]: https://raw.github.com/markdalgleish/bespoke-state/master/dist/bespoke-state.js

### Bower

Bespoke-state can be installed from [Bower](http://twitter.github.com/bower/) using the following command:

```bash
$ bower install bespoke-state
```

## Usage

First, include both `bespoke.js` and `bespoke-state.js` in your page.

Then, simply include the plugin when creating your deck with the `from()` function.

```js
bespoke.horizontal.from(selector, {
  state: true
});
```

Finally, add `data-bespoke-state` attributes to your slides.

```html
<article>
  <section>
    Regular deck style
  </section>
  <section data-bespoke-state="special">
    Special deck style
  </section>
  <section data-bespoke-state="super special">
    Super special deck style
  </section>
  <section>
    Regular deck style
  </section>
</article>
```

## Questions?

Contact me on GitHub or Twitter: [@markdalgleish](http://twitter.com/markdalgleish)

## License

Copyright 2013, Mark Dalgleish  
This content is released under the MIT license  
http://markdalgleish.mit-license.org