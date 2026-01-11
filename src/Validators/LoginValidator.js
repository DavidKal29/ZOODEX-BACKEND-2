const {body, validationResult} = require('express-validator')


const LoginValidator = [
    body('email')
    .trim()
    .isEmail().withMessage('El campo email no puede estar vacío')
    .isEmail().withMessage('El campo email debe ser un correo')
    .normalizeEmail()
    .isLength({min:5,max:35}).withMessage('Email debe tener entre 5 y 35 carácteres')
    .customSanitizer((val)=>{(val || '').replace(/\s+/g, '')})
    .escape()
]

module.exports = LoginValidator