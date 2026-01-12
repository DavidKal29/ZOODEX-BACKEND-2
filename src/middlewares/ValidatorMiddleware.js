const {validationResult} = require('express-validator')

const validator = (req,res,next)=>{
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            console.log('Validadores no completados');
            
            return res.status(400).json({
                error:errors.array()[0].msg
            })
        }else{
            next()
        }
        
    } catch (error) {
        return res.status(500).json({
            error:'Error al validar los campos del formulario'
        })
    }
}

module.exports = validator