
const Usuario =  require('../models/usuario')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const usuarioControllers = {
    obtenerTodosLosUsuarios:async (req, res) => {
        let respuesta = []
        try{
           const usuarios = await Usuario.find()
           usuarios.map( usuario =>{
              return respuesta.push({ id : usuario._id ,
                nombre: usuario.nombre,
                 apellido: usuario.apellido ,
                 email: usuario.email,
                fotoPerfil: usuario.fotoPerfil})
            })
            res.json({success: true, response: respuesta})
        }catch(error){
            res.json({success: false, response: null})
        }
    },
    nuevoUsuario: async (req, res) => {
        let {nombre,apellido,email, contraseña,fotoPerfil,rol } = req.body
        
        try{
            const emailExiste = await Usuario.findOne({email})
            if(emailExiste){
                res.json({success: false, response:[{message: "This email is already in use."}],error:true})
            }else{
                const contraseñaEncriptada = bcryptjs.hashSync(contraseña, 10)
                const nuevoUsuario = new Usuario({ 
                    nombre,
                    apellido,
                    email,
                    contraseña: contraseñaEncriptada,
                    fotoPerfil,
                    rol
                })
                const token = jwt.sign({...nuevoUsuario},process.env.SECRET_KEY)
                await nuevoUsuario.save()
                res.json({success: true, response: {token,nuevoUsuario}, error:null})
            }
        }catch(error){ 
            res.json({success:false, response: null,error:true})
        }        
    },
}



module.exports = usuarioControllers