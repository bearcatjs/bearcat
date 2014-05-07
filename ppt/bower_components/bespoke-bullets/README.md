[![Build Status](https://secure.travis-ci.org/markdalgleish/bespoke-bullets.png)](http://travis-ci.org/markdalgleish/bespoke-bullets)

# bespoke-bullets

### Bullet Lists for [Bespoke.js](https://github.com/markdalgleish/bespoke.js)

Style and animate bullet lists and their transitions with some simple CSS rules.

## Download

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/markdalgleish/bespoke-bullets/master/dist/bespoke-bullets.min.js
[max]: https://raw.github.com/markdalgleish/bespoke-bullets/master/dist/bespoke-bullets.js

### Bower

Bespoke-bullets can be installed from [Bower](http://twitter.github.com/bower/) using the following command:

```bash
$ bower install bespoke-bullets
```

## Basic Usage

First, include both `bespoke.js` and `bespoke-bullets.js` in your page.

Then, simply include the plugin and specify a selector when using the `from(selector[, plugins])` method.

For example, let's assume we have the following slide markup:

```html
<article>
  <section>
    <ul>
      <li>Bullet 1</li>
      <li>Bullet 2</li>
      <li>Bullet 3</li>
    </ul>
  </section>
</article>
```

These bullets would be initialised like so:

```js
bespoke.horizontal.from('article', {
  bullets: 'li'
});
```

You can now style your bullets and their animations by using the provided classes.

### CSS

The following classes are available on your bullet elements.

<table>
   <tr>
    <td><b>bespoke-bullet</b></td>
    <td>Every bullet element</td>
   </tr>
   <tr>
    <td><b>bespoke-bullet-active</b></td>
    <td>All active bullets</td>
   </tr>
   <tr>
    <td><b>bespoke-bullet-inactive</b></td>
    <td>All inactive bullets</td>
   </tr>
</table>

### Data Atrributes

The default behaviour, when the option value is `true`, is to look for elements with `data-bespoke-bullet` attributes:

For example:

```js
bespoke.horizontal.from('article', {
  bullets: true
});
```

```html
<article>
  <section>
    <h1 data-bespoke-bullet>Slide Title</h1>
    <ul>
      <li data-bespoke-bullet>Bullet 1</li>
      <li data-bespoke-bullet>Bullet 2</li>
      <li data-bespoke-bullet>Bullet 3</li>
    </ul>
  </section>
</article>
```

## Questions?

Contact me on GitHub or Twitter: [@markdalgleish](http://twitter.com/markdalgleish)

## License

Copyright 2013, Mark Dalgleish  
This content is released under the MIT license  
http://markdalgleish.mit-license.org