# PostCSS Logical Size

A fork of [PostCSS-Size](https://github.com/postcss/postcss-size) that swaps out the height and width for block-size and inline-size.

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="https://postcss.org/logo-leftp.svg">

[PostCSS] plugin for `size` shortcut to set `width` and `height` properties.

It also handles `min-size` to set `min-width` and `min-height`, and `max-size` to set `max-width` and `max-height`.

[PostCSS]: https://github.com/postcss/postcss

```css
.two {
  size: 20px 10px;
}
.one {
  size: 10px;
}
.minmax {
  min-size: 10px;
  max-size: 200px auto;
}
```

```css
.two {
  inline-size: 20px;
  block-size: 10px;
}
.one {
  inline-size: 10px;
  block-size: 10px;
}
.minmax {
  min-inline-size: 10px;
  min-block-size: 10px;
  max-inline-size: 200px;
  max-block-size: auto;
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-size
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-size'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
