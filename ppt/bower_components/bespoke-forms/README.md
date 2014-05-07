[![Build Status](https://secure.travis-ci.org/markdalgleish/bespoke-forms.png?branch=master)](https://travis-ci.org/markdalgleish/bespoke-forms)

# bespoke-forms

Form element support for [Bespoke.js](http://markdalgleish.com/projects/bespoke.js)

Prevent keyboard events inside form elements from interacting with the presentation.

## Download

Download the [production version][min] or the [development version][max], or use a [package manager](#package-managers).

[min]: https://raw.github.com/markdalgleish/bespoke-forms/master/dist/bespoke-forms.min.js
[max]: https://raw.github.com/markdalgleish/bespoke-forms/master/dist/bespoke-forms.js

## Usage

First, include both `bespoke.js` and `bespoke-forms.js` in your page.

Then, simply include the plugin when instantiating your presentation.

```js
bespoke.horizontal.from('article', {
  forms: true
});
```

## Package managers

### Bower

```bash
$ bower install bespoke-forms
```

### npm

```bash
$ npm install bespoke-forms
```

The bespoke-forms npm package is designed for use with [browserify](http://browserify.org/), e.g.

```js
require('bespoke');
require('bespoke-forms');
```

## Credits

This plugin was built with [generator-bespokeplugin](https://github.com/markdalgleish/generator-bespokeplugin).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
