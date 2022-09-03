import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _e1d25746 = () => interopDefault(import('..\\pages\\breeds\\index.vue' /* webpackChunkName: "pages/breeds/index" */))
const _14a57ac8 = () => interopDefault(import('..\\pages\\randoms\\index.vue' /* webpackChunkName: "pages/randoms/index" */))
const _567e5fd7 = () => interopDefault(import('..\\pages\\wishlist\\index.vue' /* webpackChunkName: "pages/wishlist/index" */))
const _148c6e48 = () => interopDefault(import('..\\pages\\breeds\\_breed\\index.vue' /* webpackChunkName: "pages/breeds/_breed/index" */))
const _17a91289 = () => interopDefault(import('..\\pages\\breeds\\_breed\\_subbreed.vue' /* webpackChunkName: "pages/breeds/_breed/_subbreed" */))
const _30574cbc = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/breeds",
    component: _e1d25746,
    name: "breeds"
  }, {
    path: "/randoms",
    component: _14a57ac8,
    name: "randoms"
  }, {
    path: "/wishlist",
    component: _567e5fd7,
    name: "wishlist"
  }, {
    path: "/breeds/:breed",
    component: _148c6e48,
    name: "breeds-breed"
  }, {
    path: "/breeds/:breed/:subbreed",
    component: _17a91289,
    name: "breeds-breed-subbreed"
  }, {
    path: "/",
    component: _30574cbc,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
