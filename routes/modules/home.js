const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//瀏覽所有餐廳清單
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
})
// 匯出路由模組
module.exports = router