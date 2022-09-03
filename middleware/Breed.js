import axios from 'axios'

class Breed {
  constructor(breed, subbreed) {
    this.identifier = subbreed ? [breed, subbreed].join('/') : breed
  }

  #_populateImageUrlCache() {
    return Breed.doApiRequest(`${this.identifier}/images`, (err, images) => {
      if (!images || err) {
        images = []
      }
      this._imageUrls = images
      return this._imageUrls
    })
  }

  static doApiRequest(endpoint, callback, plural = false) {
    return new Promise((resolve, reject) => {
      axios.get(
        `dog.ceo/api/breeds/${endpoint}`
      ).then(
        (resp) => resolve(callback(null, resp))
      )
      .catch((err) => {
        return reject(callback(err))
      })
    })
  }

  static allBreedsList() {
    return Breed.doApiRequest('list/all', (err, list) =>
      (err) ? [] : list
      , true)
  }

  static subBreedList(breed) {
    return Breed.doApiRequest(`${breed}/list/all`, (err, list) =>
      (err) ? [] : list
      , true)
  }

  static getRandomImageUrl(callback) {
    return Breed.doApiRequest('image/random', callback, true)
  }

  static getRandomImagesUrls(number = 5) {
    // validacion de acuerdo a la API y para entregar un nimimo resultado
    // Puede ser que aqui retorne un error debido a una cantidad fuera del rango
    if (!(number >= 0 && number <= 50)) {
      number = 5
    }
    return Breed.doApiRequest(`image/random/${number}`, ((err, list) =>
      (err) ? [] : list
    ), true)
  }

  imageUrls() {
    if (!this._imageUrls) {
      return this.#_populateImageUrlCache()
    }
    return this._imageUrls
  }

  randomImageUrl() {
    return Breed.doApiRequest(`${this.identifier}/images/random`, (err, url) =>
      (err) ? '' : url
    )
  }
}

export default Breed