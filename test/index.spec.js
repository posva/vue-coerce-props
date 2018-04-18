import { mount } from '@vue/test-utils'
import mixin from '../src'

const CoercedProps = {
  mixins: [mixin],
  props: {
    value: {
      type: String,
      coerce: v => v.trim(),
    },
  },

  render (h) {
    return h('span', `${this.value} -> ${this.$coerced.value}`)
  },
}

describe('VueCoerceProps', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(CoercedProps, {
      propsData: {
        value: '  foo bar  ',
      },
    })
  })

  test('adds values to $coerced', () => {
    expect(wrapper.props().value).toBe('  foo bar  ')
    expect(wrapper.vm.$coerced).toBeDefined()
    expect(wrapper.vm.$coerced.value).toBe('foo bar')
  })

  test('changes when prop changes', () => {
    wrapper.setProps({
      value: ' bar  ',
    })
    expect(wrapper.props().value).toBe(' bar  ')
    expect(wrapper.vm.$coerced.value).toBe('bar')
  })

  test('works on components without props', () => {
    expect(() => {
      mount({
        render: h => h(),
        mixins: [mixin],
      })
    }).not.toThrow()
  })

  test('can use this inside  of coerce', () => {
    let wrapper
    expect(() => {
      wrapper = mount(
        {
          render: h => h(),
          props: {
            value: String,
            other: {
              type: String,
              coerce (v) {
                return `${this.value} ${v}!`
              },
            },
          },
          mixins: [mixin],
        },
        {
          propsData: {
            value: 'Hello',
            other: 'Ed',
          },
        }
      )
    }).not.toThrow()
    expect(wrapper.vm.$coerced.other).toBe('Hello Ed!')
  })
})
