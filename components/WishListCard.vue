<template>
  <b-card :img-src="puppyImg" img-alt="puppy" img-top @click="addWishlistPuppy">
    <b-card-text class="text-center" v-show="selected">
      <font-awesome-icon class="text-danger" icon="heart" />
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  props: {
    puppyImg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selected: false
    }
  },
  mounted() {
    const wishList = JSON.parse(localStorage.getItem('wishList') || '[]')
    if (wishList.includes(this.puppyImg)) {
      this.selected = true
    }
  },
  methods: {
    addWishlistPuppy() {
      // get the wishlist and check if the image is in there
      const wishList = JSON.parse(localStorage.getItem('wishList') || '[]')
      if (!wishList.includes(this.puppyImg)) {
        this.selected = true
      }
    }
  }
}
</script>
