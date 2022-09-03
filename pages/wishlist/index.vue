<template>
  <div id="masonry-puppies">
    <loading v-if="!dataReady"></loading>
    <template v-else>
      <b-row>
        <b-col cols="12" class="text-center">
          <h1 class="mb-5">
            <font-awesome-icon class="text-danger" icon="heart"/> Los favoritos <font-awesome-icon class="text-danger" icon="heart"/>
          </h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <masonry-wish-list :puppies-images="puppiesImages"></masonry-wish-list>
        </b-col>
      </b-row>
    </template>
  </div>
</template>

<script>
import MasonryWishList from '~/components/MasonryWishList.vue'
export default {
  name: 'IndexWishList',
  components: { MasonryWishList },
  data() {
    return {
      puppiesImages: [],
      dataReady: false
    }
  },
  head() {
    return {
      title: 'Lista de favoritos'
    }
  },
  async mounted() {
    const data = await this.getWishlist()
    this.puppiesImages = data
    this.dataReady = true
  },
  methods: {
    getWishlist() {
      return JSON.parse(localStorage?.getItem('wishList') || '[]')
    }
  },
}
</script>

<style>

</style>