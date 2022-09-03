<template>
  <div id="masonry-puppies">
    <b-row>
      <b-col cols="12" class="text-center">
        <h1 class="mb-5">
          <font-awesome-icon icon="bone" /> Lista de razas <font-awesome-icon icon="bone" />
        </h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <doggie-card
          v-for="puppy in breed_list"
          :key="puppy.value"
          :puppy="puppy"
        >
        </doggie-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DoggieCard from '~/components/DoggieCard.vue'

export default {
  name: 'IndexBreeds',
  components: {
    DoggieCard
  },
  data() {
    return {
      trigger: 350
    }
  },
  head() {
    return {
      title: `Lista de perritos`
    }
  },
  computed: {
    ...mapGetters({
      filteredBreedList: 'filteredBreedList',
      display: 'display',
      breedListLength: 'breedListLength'
    }),
    breed_list() {
      return this.filteredBreedList.map((breed) => ({
        imgUrl: breed.thumbnail,
        name: breed.text,
        route: breed.value
      }))
    }
  },
  watch: {
    '$route.query.search_text'(val) {
      this.handleSearch(val)
    }
  },
  mounted() {
    const searchText = this.$route.query.search_text || ''
    this.handleSearch(searchText)
    
    window.addEventListener("scroll", this.scroll);
  },
  methods: {
    ...mapActions([
      'handleSearch',
      'incrementDisplay'
    ]),
    scroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.getElementById("masonry-puppies").clientHeight - this.trigger
      ) {
        if (this.display < this.breedListLength) {
          this.incrementDisplay();
        }
      }
    }
  },
}
</script>
