const Usuario = require('../models/usuario');
const Evento = require('../models/evento');
const eventoServices = require('../services/servicesEvento');
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
        eventosAgendadosPorId: usuario.eventosAgendadosPorId,
        eventosExcluidosPorId: usuario.eventosExcluidosPorId
      }));
    } catch (error) {
      throw new Error('Error al obtener los usuarios.');
    }
  },
  nuevoUsuario: async (nombre, apellido, email, contraseña, fotoPerfil, rol, categoriaInteres,) => {
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
  },
  agregarCategoria: async (id, categorias) => {
    try {
      const usuario = await Usuario.findById(id);
      console.log(usuario)
      if (usuario) {
        categorias.forEach(categoria => {
          usuario.categoriaInteres.push(categoria);
        });
        return usuario.save();
      }
    }
    catch (error) {
      throw new Error('Error al agregar categoria.');
    }
  },

  eventosInteres: async (id) => {
    try {
      const usuario = await Usuario.findById(id);
      let eventosTodos = await eventoServices.obtenerTodosLosEventos();
      
      let eventosDeInteres = [...eventosTodos.filter(evento => usuario.categoriaInteres.includes(evento.tipo))] ;

      if(eventosDeInteres){
        return eventosDeInteres;
      } 
    }
    catch (error) {
      throw new Error('Error al listar los eventos.');
    }
  },

  agregarAgenda: async (id, eventoAgendar) => {//Nos va a llegar un array con los nombres de eventos a agendar
    try {
      const usuario = await Usuario.findById(id);
      if (usuario) {
        for (const nombre of eventoAgendar) {
          const eventoBuscado = await Evento.findOne({ nombre });
    
          if (eventoBuscado) {
            usuario.eventosAgendadosPorId.push(eventoBuscado.id);
          }
        }
        return usuario.save();
      }
    }
    catch (error) {
      throw new Error('Error al agregar la agenda.');
    }
  },

  excluirEvento: async (id, eventoExcluir) => {//Nos va a llegar un array con los nombres de eventos a excluir
    try {
      const usuario = await Usuario.findById(id);
      if (usuario) {
        for (const nombre of eventoExcluir) {
          const eventoBuscado = await Evento.findOne({ nombre });
    
          if (eventoBuscado) {
            usuario.eventosExcluidosPorId.push(eventoBuscado.id);
          }
        }
    
        return usuario.save();
      }
    }
    catch (error) {
      throw new Error('Error al agregar el evento como "No me interesa".');
    }
  },

  detallePerfil: async (id) => {
    try {
      const usuario = Usuario.findById(id);
      if (usuario) {
        return usuario;
      }
    }
    catch (error) {
      throw new Error('Error al ver el detalle del perfil del id enviado.');
    }
  },

  verListaInteres: async (id) => {
    try {
      const usuario = await Usuario.findById(id);
      if (usuario) {
        return usuario.categoriaInteres;
      }
    }
    catch (error) {
      throw new Error('Error al ver la lista de intereses del id enviado.');
    }
  },

  eliminarInteres: async (id, interesEliminar) => {
    try {
      const usuario = await Usuario.findById(id);
      if (usuario) {
        interesEliminar.forEach(interes => {
          const posicionInteres = usuario.categoriaInteres.indexOf(interes);
          if (posicionInteres >= 0) {//si existe el interes en su array de intereses
            usuario.categoriaInteres.splice(posicionInteres, 1);
          }
        })
        return usuario.save()
      }

    }
    catch (error) {
      throw new Error('Error al eliminar el o los  intereses del id enviado.');
    }
  },

  eliminarUsuario: async (id) => {
    try {
      const usuario = await Usuario.findByIdAndRemove(id);
      return usuario;
    } catch (error) {
      throw new Error('Error al eliminar el usuario con el ID proporcionado: ' + error.message);
    }
  },
};

module.exports = usuarioService;
