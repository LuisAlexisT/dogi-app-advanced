<template>
  <div id="masonry-puppies">
    <loading v-if="$fetchState.pending"></loading>
    <template v-else>
      <b-row>
        <b-col cols="12" class="text-center">
          <h1 class="mb-5">
            Bienvenid@<br /><span class="ml-2 text-gray-800 text-2xl">a la página donde los perritos harán que tu <font-awesome-icon class="text-red-600" icon="heart"/> se estremezca de ternura.</span></h1>
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
  name: 'IndexPage',
  components: { MasonryWishList },
  data() {
    return {
      puppiesImages: []
    }
  },
  async fetch() {
    const data = await API.getRandomImages(15)
    this.puppiesImages = data
  },
}
</script>
