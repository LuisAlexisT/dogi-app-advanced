<template>
  <div>
    <Nav />
    <b-container class="mt-5">
      <nuxt />
    </b-container>
  </div>
</template>
<script>
import Nav from '~/components/Nav.vue'
export default {
  name: 'LayoutDefault',
  components: {
    Nav
  }
}
</script>
