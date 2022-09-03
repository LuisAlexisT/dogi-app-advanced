export { default as DoggieCard } from '../..\\components\\DoggieCard.vue'
export { default as DoggieSearcher } from '../..\\components\\DoggieSearcher.vue'
export { default as Loading } from '../..\\components\\Loading.vue'
export { default as MasonryWishList } from '../..\\components\\MasonryWishList.vue'
export { default as Nav } from '../..\\components\\Nav.vue'
export { default as WishListCard } from '../..\\components\\WishListCard.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
