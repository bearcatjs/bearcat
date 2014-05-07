[![Build Status](https://secure.travis-ci.org/markdalgleish/bespoke-touch.png?branch=master)](https://travis-ci.org/markdalgleish/bespoke-touch)

# bespoke-touch

Touch Support for [Bespoke.js](http://markdalgleish.com/projects/bespoke.js)

## Download

Download the [production version][min] or the [development version][max], or use a [package manager](#package-managers).

[min]: https://raw.github.com/markdalgleish/bespoke-touch/master/dist/bespoke-touch.min.js
[max]: https://raw.github.com/markdalgleish/bespoke-touch/master/dist/bespoke-touch.js

## Usage

First, include both `bespoke.js` and `bespoke-touch.js` in your page.

Then, simply include the plugin when instantiating your presentation.

```js
bespoke.from('article', {
  touch: true
});
```

By default, bespoke-touch uses horizontal swipes to navigate the slides.

If your presentation is laid out vertically, you can allow navigation with vertical swipes using the `vertical` option:

```js
bespoke.from('article', {
  touch: 'vertical'
});
```

## Package managers

### Bower

```bash
$ bower install bespoke-touch
```

### npm

```bash
$ npm install bespoke-touch
```

The bespoke-touch npm package is designed for use with [browserify](http://browserify.org/), e.g.

```js
require('bespoke');
require('bespoke-touch');
```

## Credits

This plugin was built with [generator-bespokeplugin](https://github.com/markdalgleish/generator-bespokeplugin).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
