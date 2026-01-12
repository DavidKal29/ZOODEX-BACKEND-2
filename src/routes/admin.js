const express = require('express')
const router = express.Router()
const {dashboard,logout,editProfile,getEditAnimal,editAnimal} = require('../controllers/AdminController')

const AdminMiddleware = require('../middlewares/AdminMiddleware')
const ValidatorMiddleware = require('../middlewares/ValidatorMiddleware')

const EditProfileValidator = require('../Validators/EditProfileValidator')
const EditAnimalValidator = require('../Validators/EditAnimalValidator')


router.get('/dashboard',AdminMiddleware,dashboard)
router.get('/logout',AdminMiddleware,logout)
router.post('/editProfile',AdminMiddleware,EditProfileValidator,ValidatorMiddleware,editProfile)
router.get('/editAnimal/:id',AdminMiddleware,getEditAnimal)
router.post('/editAnimal/:id',AdminMiddleware,EditAnimalValidator,ValidatorMiddleware,editAnimal)



module.exports = router