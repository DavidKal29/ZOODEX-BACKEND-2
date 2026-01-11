const pool = require('../database/db.js')
const bcryt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const cookieOptions = require('../cookies/cookieOptions.js')
const {apiInstance, brevo} = require('../utils/brevo.js')

const login = async (req,res)=>{
    let conn
    try {

        const {email, password} = req.body

        conn = await pool.getConnection()

        const consulta = 'SELECT * FROM users WHERE email = ?'

        const [user_exists] = await conn.query(consulta,[email])

        if (user_exists.length === 0) {
            return res.status(404).json({
                error:'No hay ninguna cuenta asociada a los datos introducidos'
            })
        }

        const passwordIsEqual = await bcryt.compare(password, user_exists[0].password)

        console.log(passwordIsEqual);
        

        if (passwordIsEqual) {
            const id = user_exists[0].id

            const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

            const token = jwt.sign({id}, JWT_SECRET_KEY, {expiresIn:'1h'})

            res.cookie('token',token,cookieOptions)

            return res.status(200).json({
                success:'Sesión iniciada correctamente'
            })
        }else{
            return res.status(404).json({
                error:'No hay ninguna cuenta asociada a los datos introducidos'
            })
        }

    } catch (error) {
        console.log(error);

        return res.status(500).json({error:'Error al iniciar sesión'})
        
    }finally{
        if (conn) {
            conn.release()
        }
    }
}


const forgotPassword = async (req,res)=>{
    let conn
    try {

        const {email} = req.body

        conn = await pool.getConnection()

        const consulta = 'SELECT * FROM users WHERE email = ?'

        const [user_exists] = await conn.query(consulta,[email])

        if (user_exists.length === 0) {
            return res.status(404).json({
                error:'No hay ninguna cuenta asociada a los datos introducidos'
            })
        }

        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

        const token = jwt.sign({email:email}, JWT_SECRET_KEY)

        await conn.query('UPDATE users SET token = ? WHERE email = ?', [token, email])

        const sendSmtpEmail = {
            sender: { name: "ZooDex", email: process.env.CORREO },
            to: [{ email }],
            subject: "Recuperar Contraseña",
            textContent: `Para recuperar la contraseña entra en este enlace -> ${process.env.FRONTEND_URL}/changePassword/${token}`,
            htmlContent: `<p>Para recuperar la contraseña, entra a -> <a href="${process.env.FRONTEND_URL}/changePassword/${token}">Recuperar Contraseña</a></p>`
        };

        await apiInstance.sendTransacEmail(sendSmtpEmail)

        return res.status(200).json(
            {success:'Correo enviado con éxito'}
        )
        

    } catch (error) {
        console.log(error);

        return res.status(500).json({error:'Error al enviar correo de recuperación de contraseña'})
        
    }finally{
        if (conn) {
            conn.release()
        }
    }
}




module.exports = {login, forgotPassword}