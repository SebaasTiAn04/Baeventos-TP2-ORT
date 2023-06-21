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
  buscarUsuario: async (id) => {
    try {
      console.log("Hola desde buscar usuario")
      const usuario = await Usuario.findById(id);
      return usuario;
    }
    catch (error) {
      throw new Error('Este al buscar el usuario.');
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
      console.log("Hola services")
      console.log(id)
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

  puedoMostrarEventoNoAgendado: (eventoId) => {
    let i = 0;
    let encontrado = true;
    while (i > eventosAgendadosPorId.length() && encontrado) {
      if (eventosAgendadosPorId[i] == eventoId) {
        encontrado = false;
      }
    }

    return encontrado;
  },

  puedoMostrarEventoNoExcluido: (eventoId) => {
    let i = 0;
    let encontrado = true;
    while (i > eventosExcluidosPorId.length() && encontrado) {
      if (eventosAgendadosPorId[i] == eventoId) {
        encontrado = false;
      }
    }

    return encontrado;
  },
/*   tengoInteres: (interes) => {
    let i = 0;
    let encontrado = false;
    while (i > categoriaInteres.length() && !encontrado) {
      if (categoriaInteres[i] == interes) {
        encontrado = true;
      }
    }

    return encontrado;
  }, */

  eventosFuturos: async (id) => {
    try {
      const usuario = await Usuario.findById(id);
      let eventosTodos = await eventoServices.obtenerTodosLosEventos();
      
      let eventosDeInteres = [...eventosTodos.filter(evento => usuario.categoriaInteres.includes(evento.tipo))] ;
      let eventosFuturos = [...eventosDeInteres.filter(evento => {
        console.log(evento.fecha)
        console.log(Date.parse(evento.fecha))
        const fechaHoy = new Date();
        const dia = fechaHoy.getDate();
        const mes = fechaHoy.getMonth() + 1; 
        const anio = fechaHoy.getFullYear();
        console.log(Date.parse(`${dia}-${mes}-${anio}`));
        console.log(evento.fecha.replace(/-/g, "") );
        return Date.parse(evento.fecha) >=  Date.parse(`${dia}${mes}${anio}`)
      })];

      console.log("------------------------------------------------------------------------------------")
      console.log(eventosFuturos)
      console.log("Hola desde eventos futuros")

      let eventosNoAgendados = eventosFuturos.filter(evento => usuario.puedoMostrarEventoNoAgendado(evento.id));
      let eventosDevolver = eventosNoAgendados.filter(evento => usuario.puedoMostrarEventoNoExcluido(evento.id));

      //tengo que clonarme en array con todos los eventos existentes y usar un filter con las categorias de eventos que le gusta y de ahí ir excluyendo o hacer un 
      //filtro mas donde quite del array los que ya estan agendados, los que tienen fecha pasada y los que tienen id que no le interesa

      return eventosDevolver;
    }
    catch (error) {
      throw new Error('Error al listar los eventos.');
    }
  },

  agregarAgenda: async (id, eventoAgendar) => {//Nos va a llegar un array con los nombres de eventos a agendar
    try {
      const usuario = await Usuario.findById(id);
      if (usuario) {
        return eventoAgendar.forEach(nombre => {
          const eventoBuscado = Evento.findOne({ nombre })
          if (eventoBuscado) {
            usuario.eventosAgendadosPorId.push(eventoBuscado.id);
          }
        })

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
        return eventoExcluir.forEach(nombre => {
          const eventoBuscado = Evento.findOne({ nombre });
          if (eventoBuscado) {//valido que exista
            usuario.eventosExcluidosPorId.push(eventoBuscado.id);
          }
        })
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
        return interesEliminar.forEach(interes => {
          const posicionInteres = usuario.categoriaInteres.indexOf(interes);
          if (posicionInteres >= 0) {//si existe el interes en su array de intereses
            usuario.categoriaInteres.splice(posicionInteres, 1);
          }
        })
      }

    }
    catch (error) {
      throw new Error('Error al eliminar el o los  intereses del id enviado.');
    }
  },

  eliminarUsuario: async (id) => {
    try {
      const usuario = {};
      return usuario = await Usuario.findByIdAndDelete(id);
      /*
      if (usuario) {
        Usuario.deleteOne(
          {
            id: usuario.id
          }
        )

        return usuario;
      }
      */
    }
    catch (error) {
      throw new Error('Error al eliminar el usuario con el id enviado.');
    }
  },
};

module.exports = usuarioService;
