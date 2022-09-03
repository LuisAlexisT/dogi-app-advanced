import Breed from './Breed';

const APIBreed = (() => {
  const getPuppyImages = (breed, subbreed = null) => {
    const puppy = new Breed(breed, subbreed)
    return puppy.imageUrls()
  }

  const toCapitalize = (word) => {
    try {
      return word.charAt(0).toUpperCase() + word.slice(1)
    } catch (error) {
      return word
    }
  }

  const getPuppieImage = (breed, subBreed = null) => {
    const puppy = new Breed(breed, subBreed)
    return puppy.randomImageUrl()
  }

  const getRandomImages = (number) => Breed.getRandomImagesUrls(number)

  const getList = () => Breed.allBreedsList()

  const getListWithThumbnail = async () => {
    let list = await getList()
    list = transformTextValueList(list)
    return await Promise.all(
      list.map(async (dog) => {
        const [breed, subBreed] = dog.value.split("-")
        const thumbnail = await getPuppieImage(breed, subBreed)
        return { ...dog, thumbnail }
      })
    )
  }

  const transformTextValueList = (list) => {
    const dogsList = []
    
    const breedGrouping = Object.values(list);
    const breedListNames = Object.keys(list);

    breedGrouping.forEach((subBreed) => {
      const breedIndexNumber = breedGrouping.indexOf(subBreed)
      const breedName = breedListNames[breedIndexNumber]
      if(subBreed.length > 0){
        subBreed.forEach((val) => {
          dogsList.push({
            text: toCapitalize(`${val} ${breedName}`),
            value: `${breedName}-${val}`
          })  
        })
        return;
      }
      dogsList.push({
        text: toCapitalize(breedName),
        value: breedName
      })
    });

    return dogsList
  }

  return {
    getPuppyImages,
    getList: getListWithThumbnail,
    getRandomImages
  }
})()

export default APIBreed
