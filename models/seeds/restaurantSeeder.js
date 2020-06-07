const Restaurant = require('../restaurant.js')
const User = require('../user')
const restaurantList = require('../restaurant.json')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]
db.once('open', () => {
  SEED_USER.forEach(seed => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seed.password, salt))
      .then(hash => User.create({
        name: seed.name,
        email: seed.email,
        password: hash
      }))
      .then((user) => {
        const userId = user._id
        Promise.all(Array.from(
          { length: 3 },
          (_, i) => {
            Restaurant.create({
              "name": restaurantList.results[i].name,
              "name_en": restaurantList.results[i].name_en,
              "category": restaurantList.results[i].category,
              "image": restaurantList.results[i].image,
              "location": restaurantList.results[i].location,
              "phone": restaurantList.results[i].phone,
              "google_map": restaurantList.results[i].google_map,
              "rating": restaurantList.results[i].rating,
              "description": restaurantList.results[i].description,
              "userId": userId,
            })
          }
        ))
      })
      .then(() => {
        console.log('done.')
        process.exit()
      })
  })
  console.log('mongodb connected!')
})