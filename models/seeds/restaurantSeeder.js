const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const restaurantList = require('../../restaurant.json')

db.on('error', () => {
  console.log('mongodb error!')
})
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