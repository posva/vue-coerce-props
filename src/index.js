export default {
  beforeCreate () {
    const { props } = this.$options
    if (!props) return

    this._$coertions = Object.keys(props)
      .filter(k => props[k].coerce)
      .map(k => [k, props[k].coerce])
  },

  computed: {
    $coerced () {
      return this._$coertions.reduce((c, [k, coerce]) => {
        c[k] = coerce.call(this, this.$props[k])
        return c
      }, {})
    },
  },
}
