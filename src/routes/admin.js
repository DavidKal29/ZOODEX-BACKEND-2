const express = require('express')
const router = express.Router()
const {dashboard} = require('../controllers/AdminController')
const AdminMiddleware = require('../middlewares/AdminMiddleware')


router.get('/dashboard',AdminMiddleware,dashboard)



module.exports = router