const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const pool = require('../database/db')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


const ForgotPasswordMiddleware = async (req,res,next)=>{
    let conn
    try {

        const token = req.params.token

        const decoded = jwt.verify(token,JWT_SECRET_KEY)

        const email = decoded.email

        conn = await pool.getConnection()

        const consulta = 'SELECT * FROM users WHERE email = ? and token = ?'

        const [user_exists] = await conn.query(consulta,[email,token])

        if (user_exists.length === 0) {
            return res.status(401).json({
                error:'Enlace inválido o expirado'
            })
        }

        req.recuperationUser = user_exists[0]

        next()
            
            
    } catch (error) {
        return res.status(401).json({
            error:'Enlace inválido o expirado'
        })
    } finally{
        if (conn) {
            conn.release()
        }
    }
}

module.exports = ForgotPasswordMiddleware