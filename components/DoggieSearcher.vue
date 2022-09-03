<template>
  <div v-bind="$attrs">
    <b-input-group>
      <template #append>
        <b-input-group-text class="bg-white">
          <font-awesome-icon v-if="emptySearch" class="text-info" icon="magnifying-glass" />
          <font-awesome-icon v-else class="text-info" icon="xmark" @click="search_text = ''" />
        </b-input-group-text>
      </template>
      <input
        :id="inputId"
        v-model="search_text"
        type="text"
        name="search"
        maxlength="254"
        class="form-control font-weight-light text-black-50 border-right-0"
        autocomplete="off"
        @keyup.enter="searchBy(search_text)"
        />
    </b-input-group>
    <b-popover
      :target="inputId"
      :container="container"
      placement="bottom"
      triggers="focus"
      :show.sync="show_popover"
    >
      <template v-if="!emptySearch">
        <b-list-group flush class="search-list">
          <b-list-group-item
            v-for="(item, index) in filteredSearchList" 
            :key="index + '-' + index"
            button
            class="cursor-pointer" 
            @click="searchBy(item)">
            <p class="m-0 p-0 text-truncate text-black-50">
              <font-awesome-icon icon="arrow-right" /> {{ item }}
            </p>
          </b-list-group-item>
          <b-list-group-item
            v-for="(item, index) in filteredBreedList" 
            :key="index.text + '-' + index"
            button
            class="cursor-pointer"
            @click="selectOption(item.value)">
            <p class="m-0 p-0 text-truncate text-black-50" v-html="highlight(item.text)"></p>
          </b-list-group-item>
        </b-list-group>
      </template>
      <p v-else class="font-weight-light text-black-50 text-center m-0 px-2">
        Escribe para buscar
      </p>
    </b-popover>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  props: {
    container: {
      type: String,
      default: 'body', 
    },
    inputId: {
      type: String,
      default: `searcher_${(new Array(5)).fill(0).map(() => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1)).join("")}`
    },
  },
  data() {
    return {
      search_text: '',
      show_popover: false,
    }
  },
  computed: {
    ...mapGetters([
      'searchText',
      'text_breed_list',
      'search_list'
    ]),
    filteredBreedList() {
      const searchText = this.search_text.toLowerCase()
      let data = this.text_breed_list
      if (searchText !== '') {
        data = data.filter((dog) =>
          dog.text.toLowerCase().includes(searchText)
        )
      }
      return data.slice(0, 5)
    },
    filteredSearchList() {
      const list = this.search_list
      return list.slice(Math.max(list.length - 5, 0))
    },
    emptySearch() {
      return _.isEmpty(this.search_text)
    }
  },
  beforeDestroy(){
    this.search_txt = ''
  },
  methods: {
    ...mapActions(['setSearchList']),
    searchBy(text = '') {
      this.showList = false
      const searchList = JSON.parse(localStorage.getItem('searchList') || '[]')
      if (!_.isEmpty(text)) {
        searchList.push(text)
        localStorage.setItem('searchList', JSON.stringify(searchList || []))
        this.setSearchList(searchList)
      }
      this.$router.push({ path: "/breeds", query: { search_text: text } })
    },
    selectOption(option) {
      this.showList = false
      const [breed, puppySubBreed] = option.split("-")
      let params = breed

      if (!_.isEmpty(puppySubBreed)) {
        params = params + `/${puppySubBreed}`
      }
      this.$router.push({ path: `/breeds/${params}` })
    },
    highlight(word) {
      const filterText = this.search_text;

      if (
        filterText !== ""
      ) {
        const regex = /[-[]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g
        const iQuery = new RegExp(
          filterText.replace(regex, "\\$&"),
          "ig"
        );
        return word
          .toString()
          .replace(
            iQuery,
            (matchedTxt, a, b) =>
              (`<span class="bg-primary text-white">${matchedTxt}</span>`)
          );
      } else {
        return word;
      }
    },
  },
}
</script>

<style>
 #dskSearchContainer {
   width: 400px;
 }
</style>