const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then(restaurants => restaurants.filter(res => res.name.includes(keyword) || res.category.includes(keyword)))
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})


module.exports = router