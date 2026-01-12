const express = require('express')
const router = express.Router()
const {dashboard,logout,editProfile} = require('../controllers/AdminController')

const AdminMiddleware = require('../middlewares/AdminMiddleware')
const ValidatorMiddleware = require('../middlewares/ValidatorMiddleware')

const EditProfileValidator = require('../Validators/EditProfileValidator')


router.get('/dashboard',AdminMiddleware,dashboard)
router.get('/logout',AdminMiddleware,logout)
router.post('/editProfile',AdminMiddleware,EditProfileValidator,ValidatorMiddleware,editProfile)



module.exports = router