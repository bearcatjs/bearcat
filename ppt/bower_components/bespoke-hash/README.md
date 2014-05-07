[![Build Status](https://secure.travis-ci.org/markdalgleish/bespoke-hash.png)](http://travis-ci.org/markdalgleish/bespoke-hash)

# bespoke-hash

### Hash Routing for [Bespoke.js](https://github.com/markdalgleish/bespoke.js)

Automatically generate hash routes for your Bespoke.js presentation slides.

## Download

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/markdalgleish/bespoke-hash/master/dist/bespoke-hash.min.js
[max]: https://raw.github.com/markdalgleish/bespoke-hash/master/dist/bespoke-hash.js

### Bower

Bespoke-hash can be installed from [Bower](http://twitter.github.com/bower/) using the following command:

```bash
$ bower install bespoke-hash
```

## Usage

First, include both `bespoke.js` and `bespoke-hash.js` in your page.

Then, simply include the plugin when using the `from(selector[, plugins])` method.

```js
bespoke.horizontal.from(selector, {
  hash: true
});
```
Starting from `#1`, all routes are numbered by default.

### Named Routes

If you'd like to use named hash routes instead, add `data-bespoke-hash` attributes to your slide markup.

```html
<article>
  <section data-bespoke-hash="catchy-title"></section>
  <section data-bespoke-hash="shameless-plug"></section>
  <section data-bespoke-hash="controversial-statement"></section>
  <section data-bespoke-hash="explanation-of-controversial-statement"></section>
  <section data-bespoke-hash="shameless-self-promotion"></section>
</article>
```

*Note: Named and unnamed routes can be used simultaneously.*

## Questions?

Contact me on GitHub or Twitter: [@markdalgleish](http://twitter.com/markdalgleish)

## License

Copyright 2013, Mark Dalgleish  
This content is released under the MIT license  
http://markdalgleish.mit-license.org