const SET_BREED_LIST = 'SET_BREED_LIST'
const SET_TEXT_LIST = 'SET_TEXT_LIST'
const SET_SEARCH_LIST = 'SET_SEARCH_LIST'
const HANDLE_SEARCH = 'HANDLE_SEARCH'
const INCREMENT_DISPLAY = "INCREMENT_DISPLAY"
const RESTORE_DISPLAY = "RESTORE_DISPLAY"

const state = () => ({
  search_text: '',
  breed_list: [],
  text_list: [],
  search_list: [],
  display: 15,
  offset: 15,
})

const getters = {
  breedListLength: (state) => state.breed_list.length,
  breed_list: (state) => state.breed_list,
  text_breed_list: (state) => state.text_list,
  searchText: (state) => state.search_text,
  display: (state) => state.display,
  search_list: (state) => state.search_list,
  filteredBreedList: (state) => {
    const searchText = state.search_text
    const data = state.breed_list
    if (searchText !== '') {
      return data.filter((dog) =>
        dog.text.toLowerCase().includes(searchText.toLowerCase())
      )
    }
    return data
  },
  highlight: (state) => (word) => {
    const filterText = state.search_text;

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
}

const actions = {
  incrementDisplay: ({ commit }) => {
    commit(INCREMENT_DISPLAY)
  },
  restoreDisplay: ({ commit }) => {
    commit(RESTORE_DISPLAY)
  },
  setBreedList: ({ commit }, list) => {
    commit(SET_BREED_LIST, list);
  },
  handleSearch: ({ commit }, text) => { 
    commit(HANDLE_SEARCH, text) 
  },
  setTextList: ({ commit }, list) => {
    commit(SET_TEXT_LIST, list);
  },
  setSearchList: ({ commit }, list) => {
    commit(SET_SEARCH_LIST, list);
  },
}

const mutations = {
  [SET_BREED_LIST]: (state, list) => {
    state.breed_list = list
  },
  [SET_TEXT_LIST]: (state, list) => {
    state.text_list = list
  },
  [SET_SEARCH_LIST]: (state, list) => {
    state.search_list = list
  },
  [HANDLE_SEARCH]: (state, text) => {
    state.search_text = text
  },
  [INCREMENT_DISPLAY]: (state) => { state.display += state.offset },
  [RESTORE_DISPLAY]: (state) => { state.display = 15 },
}

export default {
  state,
  getters,
  actions,
  mutations
}