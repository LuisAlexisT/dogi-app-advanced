<template>
  <div id="masonry-puppies">
    <loading v-if="$fetchState.pending"></loading>
    <template v-else>
      <b-row>
        <b-col cols="12" class="text-center">
          <h1 class="mb-5">
            <font-awesome-icon class="text-warning" icon="paw" /> Perritos de raza {{ subBreed }} {{ breed }} <font-awesome-icon class="text-warning" icon="paw" />
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
  name: 'IndexSubBreed',
  components: { MasonryWishList },
  data() {
    return {
      breed: '',
      subBreed: '',
      puppiesImages: []
    }
  },
  async fetch() {
    const data = await API.getPuppyImages(this.$route.params.breed, this.$route.params.subbreed)
    
    this.puppiesImages = data
    this.breed = this.$route.params.breed
    this.subBreed = this.$route.params.subbreed
  },
  head() {
    return {
      title: `Perritos de raza ${this.subBreed} ${this.breed}`
    }
  }
}
</script>

<style>

</style>