<template>
  <section>
    <wish-list-card v-for="(puppyImg, index) in filteredList" :key="index" :puppy-img="puppyImg"></wish-list-card>
  </section>
</template>

<script>
import WishListCard from './WishListCard.vue'
export default {
  components: { WishListCard },
  props: {
    puppiesImages: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      trigger: 350,
      display: 15,
      offset: 15
    }
  },
  computed: {
    filteredList() {
      return this.puppiesImages.slice(0, this.display)
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
  },
  methods: {
    scroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.getElementById("masonry-puppies").clientHeight - this.trigger
      ) {
        if (this.display < this.puppiesImages.length) {
          this.display += this.offset
        }
      }
    }
  }
}
</script>

<style>

</style>