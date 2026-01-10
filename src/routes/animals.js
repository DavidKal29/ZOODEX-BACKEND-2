const express = require('express')
const router = express.Router()
const {getAllAnimals, getRandomAnimals} = require('../controllers/animals/ListController')

router.get('/getAllAnimals/:page',getAllAnimals)
router.get('/getRandomAnimals',getRandomAnimals)

module.exports = router