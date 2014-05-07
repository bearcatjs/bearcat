[![Build Status](https://secure.travis-ci.org/markdalgleish/bespoke-keys.png?branch=master)](https://travis-ci.org/markdalgleish/bespoke-keys)

# bespoke-keys

Keyboard Support for [Bespoke.js](http://markdalgleish.com/projects/bespoke.js)

## Download

Download the [production version][min] or the [development version][max], or use a [package manager](#package-managers).

[min]: https://raw.github.com/markdalgleish/bespoke-keys/master/dist/bespoke-keys.min.js
[max]: https://raw.github.com/markdalgleish/bespoke-keys/master/dist/bespoke-keys.js

## Usage

First, include both `bespoke.js` and `bespoke-keys.js` in your page.

Then, simply include the plugin when instantiating your presentation.

```js
bespoke.from('article', {
  keys: true
});
```

By default, bespoke-keys uses the spacebar, left/right and page up/down keys to navigate the slides.

If your presentation is laid out vertically, you can allow navigation with up/down instead of left/right with the `vertical` option:

```js
bespoke.from('article', {
  keys: 'vertical'
});
```

## Package managers

### Bower

```bash
$ bower install bespoke-keys
```

### npm

```bash
$ npm install bespoke-keys
```

The bespoke-keys npm package is designed for use with [browserify](http://browserify.org/), e.g.

```js
require('bespoke');
require('bespoke-keys');
```

## Credits

This plugin was built with [generator-bespokeplugin](https://github.com/markdalgleish/generator-bespokeplugin).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
