const {body}= require('express-validator')

const ChangePasswordValidator = [
    body('new_password')
    .trim()
    .notEmpty().withMessage('Ningún campo puede estar vacío')
    .matches(/[a-z]/).withMessage('Al menos una minúscula en la contraseña')
    .matches(/[A-Z]/).withMessage('Al menos una mayúscula en la contraseña')
    .matches(/\d/).withMessage('Al menos un dígito en la contraseña')
    .matches(/[·$%&*]/).withMessage('Al menos un carácter especial en la contraseña')
    .isLength({min:8, max:30}).withMessage('La contraseña debe tener entre 8 y 30 carácteres')
    .customSanitizer(val=>(val || '').replace(/\s+/g, ''))
]


module.exports = ChangePasswordValidator