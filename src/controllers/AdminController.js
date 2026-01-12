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



module.exports = {dashboard}