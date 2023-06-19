const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usuarioService = {
  obtenerTodosLosUsuarios: async () => {
    try {
      const usuarios = await Usuario.find();
      return usuarios.map(usuario => ({
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        fotoPerfil: usuario.fotoPerfil,
        categoriaInteres: usuario.categoriaInteres,
        eventosAgendadosPorId: usuario.eventosAgendadosPorId
      }));
    } catch (error) {
      throw new Error('Error al obtener los usuarios.');
    }
  },

  nuevoUsuario: async (nombre, apellido, email, contraseña, fotoPerfil, rol, categoriaInteres) => {
    try {
      const emailExiste = await Usuario.findOne({ email });
        if (emailExiste) {
            throw new Error('Este correo electrónico ya está en uso.');
        }else{
            const contraseñaEncriptada = bcryptjs.hashSync(contraseña, 10);
            const nuevoUsuario = new Usuario({ nombre, apellido, email, contraseña: contraseñaEncriptada, fotoPerfil, rol, categoriaInteres});
            const token = jwt.sign({ ...nuevoUsuario }, process.env.SECRET_KEY);
            await nuevoUsuario.save();
            return { token, nuevoUsuario };
        }
        
    } catch (error) {
      throw new Error('Error al crear un nuevo usuario.');
    }
  }
};

module.exports = usuarioService;
