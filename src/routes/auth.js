const express = require('express')
const router = express.Router()
const {login,forgotPassword} = require('../controllers/AuthController')
const validator = require('../middlewares/validator')

const {LoginValidator} = require('../Validators/LoginValidator')
const ForgotPasswordValidator = require('../Validators/ForgotPasswordValidator')


router.post('/login',LoginValidator,validator,login)
router.post('/forgotPassword',ForgotPasswordValidator,validator,forgotPassword)



module.exports = router