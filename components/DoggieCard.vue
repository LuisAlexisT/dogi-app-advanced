<template>
  <b-card :img-src="puppy.imgUrl" :img-alt="puppy.name" img-top @click="getPuppies(puppy.route)">
    <b-card-text class="text-center">
      <div class="bone">
        <div class="c1"></div>
        <div class="c2"></div>
        <div class="c3"></div>
        <div class="c4"></div>
        <div class="b1">
          <div class="b2">
            <h1 class="text-lg text-black" v-html="highlight(puppy.name)"></h1>
          </div>
        </div>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
import _isEmpty from 'lodash/isEmpty'

export default {
  props: {
    puppy: {
      type: Object,
      default: () => ({
        imgUrl: '',
        name: '',
        route: ''
      })
    }
  },
  computed: {
    ...mapGetters(['highlight']),
  },
  methods: {
    getPuppies(route) {
      const [breed, puppySubBreed] = route.split("-")
      let params = breed

      if (!_isEmpty(puppySubBreed)) {
        params = params + `/${puppySubBreed}`
      }
      this.$router.push({ path: `breeds/${params}` })
    }
  }
}
</script>