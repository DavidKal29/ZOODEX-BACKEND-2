const {body} = require('express-validator')

const sanitize = val => (val != null ? String(val) : '').replace(/\s+/g,' ').trim()

const EditAnimalValidator = [
    body('name')
    .isLength({min:2,max:30}).withMessage('El campo nombre debe tener entre 2 y 30 carácteres')
    .notEmpty().withMessage('Ningún campo puede estar vacío')
    .matches(/[A-Za-z ]/).withMessage('El campo nombre solo puede contener letras y espacios')
    .customSanitizer(sanitize)
    .escape(),

    body('description')
    .isLength({min:10,max:1000}).withMessage('El campo descripción debe tener entre 2 y 30 carácteres')
    .notEmpty().withMessage('Ningún campo puede estar vacío')
    .matches(/[A-Za-z0-9 ]/).withMessage('El campo descripción solo puede contener letras, números y espacios')
    .customSanitizer(sanitize)
    .escape(),

    body('subcategory')
    .isInt({max:33}).withMessage('El campo subcategoria solo puede tener un valor numérico')
    .notEmpty().withMessage('Ningún campo puede estar vacío')
    .customSanitizer(sanitize)
    .escape(),

    body('type')
    .isInt({max:6}).withMessage('El campo tipo solo puede tener un valor numérico')
    .notEmpty().withMessage('Ningún campo puede estar vacío')
    .customSanitizer(sanitize)
    .escape(),

    body('diet')
    .isInt({max:3}).withMessage('El campo dieta solo puede tener un valor numérico')
    .notEmpty().withMessage('Ningún campo puede estar vacío')
    .customSanitizer(sanitize)
    .escape(),

    body('weight')
    .notEmpty().withMessage('Ningún campo puede estar vacío')
    .isDecimal({decimal_digits:'0,2'}).withMessage('El peso solo puede tener hasta 2 decimales')
    .customSanitizer(sanitize)
    .escape()
    .custom(val=>{
        const digits = val.toString().replace(/[,.]/g,'').length

        if (digits>8) {
            throw new Error('El peso no puede tener más de 8 dígitos')
        }

        const number = Number(val.replace(',', '.'))

        if (number<0.01) {
            throw new Error('El peso no puede ser menor a 0.01kg')
        }

        if (number>200000) {
            throw new Error('El peso no puede ser mayor a 200 mil kg')
        }

        return true
    }),

    body('height')
    .notEmpty().withMessage('Ningún campo puede estar vacío')
    .isDecimal({decimal_digits:'0,2'}).withMessage('La altura solo puede tener hasta 2 decimales')
    .customSanitizer(sanitize)
    .escape()
    .custom(val=>{
        const digits = val.toString().replace(/[,.]/g,'').length

        if (digits>5) {
            throw new Error('La altura no puede tener más de 5 dígitos')
        }

        const number = Number(val.replace(',', '.'))

        if (number<0.01) {
            throw new Error('La altura no puede ser menor a 0.01 metros')
        }

        if (number>30) {
            throw new Error('La altura no puede ser mayor a 30 metros')
        }

        return true
    }),

    body('speed')
    .notEmpty().withMessage('Ningún campo puede estar vacío')
    .isDecimal({decimal_digits:'0,2'}).withMessage('La velocidad solo puede tener hasta 2 decimales')
    .customSanitizer(sanitize)
    .escape()
    .custom(val=>{
        const digits = val.toString().replace(/[,.]/g,'').length

        if (digits>5) {
            throw new Error('La velocidad no puede tener más de 5 dígitos')
        }

        const number = Number(val.replace(',', '.'))

        if (number<0.01) {
            throw new Error('La velocidad no puede ser menor a 0.01 metros')
        }

        if (number>400) {
            throw new Error('La velocidad no puede ser mayor a 30 metros')
        }

        return true
    }),

    body('danger')
    .isInt({min:1,max:100}).withMessage('El peligro debe tener una puntuación entre 1 y 100')
    .notEmpty().withMessage('Ningún campo puede estar vacío')
    .customSanitizer(sanitize)
    .escape(),

    body('inteligence')
    .isInt({min:1,max:100}).withMessage('La inteligencia debe tener una puntuación entre 1 y 100')
    .notEmpty().withMessage('Ningún campo puede estar vacío')
    .customSanitizer(sanitize)
    .escape(),

    body('longevity')
    .isInt({min:1,max:100}).withMessage('La longevidad debe tener entre 1 y 100 años')
    .notEmpty().withMessage('Ningún campo puede estar vacío')
    .customSanitizer(sanitize)
    .escape()

]

module.exports = EditAnimalValidator