const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const pool = require('../database/db')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


const AdminMiddleware = async (req,res,next)=>{
    let conn
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                error:'No puedes acceder sin iniciar sesión'
            })
        }

        const decoded = jwt.verify(token, JWT_SECRET_KEY)

        const id = decoded.id

        conn = await pool.getConnection()

        const consulta = 'SELECT id, email, username FROM users WHERE id = ?'

        const [user_exists] = await conn.query(consulta, [id])

        if (user_exists.length === 0) {
            return res.status(404).json({
                error:'No se ha encontrado al usuario de la sesión'
            })
        }

        req.user = user_exists[0]

        next()
            
            
    } catch (error) {
        console.log(error);
        
        return res.status(401).json({
            error:'No puedes acceder sin iniciar sesión'
        })
    } finally{
        if (conn) {
            conn.release()
        }
    }
}


module.exports = AdminMiddleware