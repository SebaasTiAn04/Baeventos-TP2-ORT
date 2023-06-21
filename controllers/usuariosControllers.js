
const usuarioService = require('../services/servicesUsuario');


const usuarioControllers = {
    obtenerTodosLosUsuarios:async (req, res) => {
        try{
           const usuarios = await usuarioService.obtenerTodosLosUsuarios();
            res.json({success: true, response: usuarios});
        }catch(error){
            res.json({success: false, response: null});
        }
    },
    nuevoUsuario: async (req, res) => {
        
        let {nombre,apellido,email, contraseña,fotoPerfil,rol, categoriaInteres, eventosAgendadosPorId, eventosExcluidosPorId } = req.body 
        try{
            const resultado = await usuarioService.nuevoUsuario(nombre, apellido, email, contraseña, fotoPerfil, rol, categoriaInteres, eventosAgendadosPorId, eventosExcluidosPorId);
            res.json({ success: true, response: resultado });
        }catch(error){ 
            res.json({success:false, response: error.message, error:true});
        }        
    },
    agregarCategoria: async (req, res) => {
        let { categorias } = req.body;
        try {
            const resultado = await usuarioService.agregarCategoria(req.query.id, categorias);
            res.status(200).json({ success: true, response: resultado })
        }
        catch (error) {
            res.status(404).json({ success: false, response: error.message });//cambiar, poner uno exacto,
        }
    },

    eventosFuturos: async (req, res) => {
        try {
            const eventos = await usuarioService.eventosFuturos(req.query.id); //esto me devuelve todos los eventos
            res.status(200).json({ success: true, response: eventos });
        }
        catch (error) {
            res.status(404).json({ success: false, response: error.message });//cambiar, poner uno exacto,
        }
    },

    agregarAgenda: async (req, res) => {
        let { eventoAgendar } = req.body;
        try {
            const resultado = await usuarioService.agregarAgenda(req.query.id, eventoAgendar);//Esto me devuelve la agenda a agregar
            res.status(200).json({ success: true, response: resultado });
        }
        catch (error) {
            res.status(404).json({ success: false, response: error.message });//cambiar, poner uno exacto,
        }

    },

    excluirEvento: async (req, res) => {
        let { eventoExcluir } = req.body; 
        try {
            const resultado = await usuarioService.excluirEvento(req.query.id, eventoExcluir);//Esto me devuelve el evento a excluir
            res.status(200).json({ success: true, response: resultado })
        }
        catch (error) {
            res.status(404).json({ success: false, response: error.message });//cambiar, poner uno exacto, 
        }
    },

    detallePerfil: async (req, res) => {
        try {
            const perfil = await usuarioService.detallePerfil(req.query.id);
            res.status(200).json({ success: true, response: perfil })
        }
        catch (error) {
            res.status(404).json({ success: false, response: error.message });//cambiar, poner uno exacto,
        }
    },

    verListaInteres: async (req, res) => {
        try {
            const intereses = await usuarioService.verListaInteres(req.query.id);
            res.status(200).json({ success: true, response: intereses })
        }
        catch (error) {
            res.status(404).json({ success: false, response: error.message });//cambiar, poner uno exacto,
        }
    },

    eliminarInteres: async (req, res) => {
        let { interesEliminar } = req.body;
        try {
            const resultado = await usuarioService.eliminarInteres(req.query.id, interesEliminar);
            res.status(200).json({ success: true, response: resultado })
        }
        catch (error) {
            res.status(404).json({ success: false, response: error.message });//cambiar, poner uno exacto,
        }
    },

    eliminarUsuario: async (req, res) => {
        try {
            const usuarioEliminar = await usuarioService.usuarioEliminar(req.query.id);
            res.status(200).json({ success: true, response: usuarioEliminar })
        }
        catch (error) {
            res.status(404).json({ success: false, response: error.message });//cambiar, poner uno exacto,
        }
    },
}

module.exports = usuarioControllers

/* 
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



module.exports = usuarioControllers */