const {body} = require('express-validator')


const EditProfileValidator = [
    body('email')
    .trim()
    .notEmpty().withMessage('Ningun campo puede estar vacío')
    .isEmail().withMessage('El campo email debe ser un email válido')
    .normalizeEmail()
    .isLength({min:5,max:35}).withMessage('Email debe tener entre 5 y 35 carácteres')
    .customSanitizer((val)=>(val || '').replace(/\s+/g, ''))
    .escape(),

    body('username')
    .trim()
    .notEmpty().withMessage('Ningún campo puede estar vacío')
    .isLength({min:3, max:25}).withMessage('El campo username debe tener entre 3 y 25 carácteres')
    .matches(/[a-zA-z\d ]/).withMessage('Solo letras y dígitos en el nombre de usuario')
    .customSanitizer(val=>(val || '').replace(/\s+/g, ''))
    .escape(),

    body('password')
    .optional({checkFalsy:true})
    .trim()
    .matches(/\d/).withMessage('Mínimo un dígito en la contraseña')
    .matches(/[A-Z]/).withMessage('Mínimo una mayúscula en la contraseña')
    .matches(/[a-z]/).withMessage('Mínimo una minúscula en la contraseña')
    .matches(/[#$%&*]/).withMessage('Mínimo un carácter especial en la contraseña')
    .isLength({min:8,max:30}).withMessage('La contraseña debe tener entre 8 y 30 carácteres')
    .customSanitizer((val)=>(val || '').replace(/\s+/g, ''))
]


module.exports = EditProfileValidator