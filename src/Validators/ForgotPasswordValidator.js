const {body} = require('express-validator')

const ForgotPasswordValidator = [
    body('email')
    .trim()
    .isEmail().withMessage('Asegurate de introducir un email válido')
    .normalizeEmail()
    .notEmpty().withMessage('Ningun campo puede estar vacío')
    .isLength({min:5, max:35}).withMessage('Email debe tener entre 5 y 35 carácteres')
    .customSanitizer(val=>(val || '').replace(/\s+/g, ''))
    .escape()
]


module.exports = ForgotPasswordValidator