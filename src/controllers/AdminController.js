const pool = require('../database/db.js')
const bcryt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const cookieOptions = require('../cookies/cookieOptions.js')

const dashboard = async (req,res)=>{
    try {
        const user = req.user

        if (!user) {
            return res.status(404).json({
                error:'No se ha encontrado al usuario de la sesión'
            })
        }

        return res.status(200).json({
            success:'Perfil obtenido con éxito',
            user:user
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({error:'Error al obtener el perfil'})
        
    }
}

const logout = async (req,res)=>{
    try {
        res.clearCookie('token',cookieOptions)

        res.status(200).json({
            success:'Sesión cerrada con éxito'
        })
        

    } catch (error) {
        console.log(error);

        return res.status(500).json({error:'Error al obtener al cerrar sesión'})
        
    }
}

const editProfile = async (req,res)=>{
    let conn
    try {

        const {email,username, password} = req.body

        const user = req.user

        conn = await pool.getConnection()
        
        if (password != '') {
            const [usersPassword] = await conn.query('SELECT password FROM users WHERE id = ?',[user.id])

            if (usersPassword.length === 0) {
                return res.status(404).json({
                    error:'No se ha podido obtener la contraseña del usuario'
                })
            }

            const passwordIsEqual = await bcryt.compare(password, usersPassword[0].password)

            if (email === user.email && username === user.username && passwordIsEqual) {
                return res.status(400).json({
                    error:'Asegurate de que al menos un campo sea distinto'
                })
            }

            const newEncriptedPassword = await bcryt.hash(password,10)

            await conn.query('UPDATE users SET email = ?, username = ?, password = ?',[email,username,newEncriptedPassword])

            return res.status(200).json({
                success:'Datos cambiado con éxito'
            })
        
        }

        if (email === user.email && username === user.username) {
            return res.status(400).json({
                error:'Asegurate de que al menos un campo sea distinto'
            })
        }else{
            await conn.query('UPDATE users SET email = ?, username = ?',[email,username])

            return res.status(200).json({
                success:'Datos cambiado con éxito'
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



module.exports = {dashboard, logout ,editProfile}