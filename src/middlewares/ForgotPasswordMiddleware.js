const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const pool = require('../database/db')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


const ForgotPasswordMiddleware = async (req,res,next)=>{
    try {

        try {
            const token = req.params.token

            const decoded = jwt.decode(token,JWT_SECRET_KEY)

            const email = decoded.email

            const conn = await pool.getConnection()

            const consulta = 'SELECT * FROM users WHERE email = ? and token = ?'

            const [user_exists] = await conn.query(consulta,[email,token])

            if (user_exists.length === 0) {
                return res.status(404).json({
                    error:'Enlace inválido o expirado'
                })
            }

            req.recuperationUser = user_exists[0]

            next()

        } catch (error) {
            return res.status(500).json({
                error:'Enlace inválido o expirado'
            })
        }
    
            
            
    } catch (error) {
        return res.status(500).json({
            error:'Error al validar el token de recuperación de contraseña'
        })
    }
}

module.exports = ForgotPasswordMiddleware