<template>
  <div id="masonry-puppies">
    <loading v-if="$fetchState.pending"></loading>
    <template v-else>
      <b-row>
        <b-col cols="12" class="text-center">
          <h1 class="mb-5">
            <font-awesome-icon icon="hotdog" /> Distintos perritos <font-awesome-icon icon="hotdog" />
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
import API from '~/middleware/API'
export default {
  name: 'IndexRandoms',
  components: { MasonryWishList },
  data() {
    return {
      puppiesImages: []
    }
  },
  async fetch() {
    const data = await API.getRandomImages(50)
    this.puppiesImages = data
  },
  head() {
    return {
      title: 'Perritos aleatorios'
    }
  }
}
</script>

<style>

</style>