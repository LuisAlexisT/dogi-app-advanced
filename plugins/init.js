import API from '~/middleware/API'

export default async function({ store }) {

  if (process.browser) {
    const searchList = JSON.parse(localStorage.getItem('searchList') || '[]') 
    let puppiesList = JSON.parse(localStorage.getItem('puppiesList') || '[]')

    if (Array.isArray(puppiesList) && !puppiesList.length) {
      puppiesList = await API.getList()
      localStorage.setItem('puppiesList', JSON.stringify(puppiesList || []))
    }

    store.dispatch('setBreedList', puppiesList)
    store.dispatch('setSearchList', searchList)
    store.dispatch('setTextList', puppiesList.map((puppy) => ({
      text: puppy.text,
      value: puppy.value
    })))
  }
}