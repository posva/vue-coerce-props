# VueCoerceProps [![Build Status](https://img.shields.io/circleci/project/posva/vue-coerce-props/master.svg)](https://circleci.com/gh/posva/vue-coerce-props) [![npm package](https://img.shields.io/npm/v/vue-coerce-props.svg)](https://www.npmjs.com/package/vue-coerce-props) [![coverage](https://img.shields.io/codecov/c/github/posva/vue-coerce-props.svg)](https://codecov.io/github/posva/vue-coerce-props) [![thanks](https://img.shields.io/badge/thanks-%E2%99%A5-ff69b4.svg)](https://github.com/posva/thanks)

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

## License

[MIT](http://opensource.org/licenses/MIT)
