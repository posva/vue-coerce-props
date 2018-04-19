# VueCoerceProps [![Build Status](https://img.shields.io/circleci/project/posva/vue-coerce-props/master.svg)](https://circleci.com/gh/posva/vue-coerce-props) [![npm package](https://img.shields.io/npm/v/vue-coerce-props.svg)](https://www.npmjs.com/package/vue-coerce-props) [![coverage](https://img.shields.io/codecov/c/github/posva/vue-coerce-props.svg)](https://codecov.io/github/posva/vue-coerce-props) [![thanks](https://img.shields.io/badge/thanks-%E2%99%A5-ff69b4.svg)](https://github.com/posva/thanks) [![Greenkeeper badge](https://badges.greenkeeper.io/posva/vue-coerce-props.svg)](https://greenkeeper.io/)

> Transform/Coerce props values to whatever you want

## Installation

```sh
npm install vue-coerce-props
```

Install the mixin globally or locally:

```js
// main.js
import CoercePropsMixin from 'vue-coerce-props'

Vue.mixin(CoercePropsMixin)
```

```js
// MyComponent.vue
import CoercePropsMixin from 'vue-coerce-props'

export default {
  // other options
  mixins: [CoercePropsMixin],
}
```

## Usage

To coerce a prop, add a `coerce` function to any prop:

```js
const SpaceTrimmer = {
  props: {
    text: {
      type: String,
      // this function is called by VueCoerceProps
      coerce: text => text.trim(),
    },
    style: {
      type: String,
      coerce(style) {
        // you can access the context as in a computed property
        // NEVER use this.$coerced here as it would create an infinite loop
        // if you use things coming from data, you may consider using
        // a computed property instead
        return this.possibleValues.includes(style) ? style : 'default'
      },
    },
  },
}
```

VueCoerceProps will inject a computed property named `$coerced` containing every single coerced prop:

```html
<p>
  <span>Original value: {{ text }}</span>
  <span>Coerced value: {{ $coerced.text }}</span>
</p>
```

## FAQ

* Q: Why not passing component props as second argument?
  A: That would make every coerce value depend on every prop. At the end `$coerced` is just a computed property

## License

[MIT](http://opensource.org/licenses/MIT)
