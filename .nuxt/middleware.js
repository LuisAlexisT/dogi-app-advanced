const middleware = {}

middleware['API'] = require('..\\middleware\\API.js')
middleware['API'] = middleware['API'].default || middleware['API']

middleware['Breed'] = require('..\\middleware\\Breed.js')
middleware['Breed'] = middleware['Breed'].default || middleware['Breed']

export default middleware
