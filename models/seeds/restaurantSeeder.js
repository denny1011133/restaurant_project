const Restaurant = require('../restaurant.js')
const restaurantList = require('/restaurant.json')
const db = require('../../config/mongoose')
db.once('open', () => {
  restaurantList.results.forEach(i => {
    Restaurant.create({
      "name": i.name,
      "name_en": i.name_en,
      "category": i.category,
      "image": i.image,
      "location": i.location,
      "phone": i.phone,
      "google_map": i.google_map,
      "rating": i.rating,
      "description": i.description
    })
  })
  console.log('mongodb connected!')
})