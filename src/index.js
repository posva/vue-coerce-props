export default {
  beforeCreate () {
    const { props } = this.$options
    if (!props) return

    this._$coertions = []

    Object.keys(props)
      .filter(k => props[k].coerce)
      .forEach(k => {
        const { coerce } = props[k]
        this._$coertions.push({ k, coerce })
      })
  },

  computed: {
    $coerced () {
      return this._$coertions.reduce((c, { k, coerce }) => {
        c[k] = coerce(this.$props[k])
        return c
      }, {})
    },
  },
}
