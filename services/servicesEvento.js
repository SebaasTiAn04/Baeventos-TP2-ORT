const Evento = require('../models/evento');

const eventoService = {
  crearEvento: async (nombre, tipo, direccion, fecha, img) => {
    try {
      const nuevoEvento = await Evento({ nombre, tipo, direccion, fecha, img });
      await nuevoEvento.save();
      return nuevoEvento;
    } catch (error) {
      throw new Error('Error al crear el evento.');
    }
  },

  obtenerTodosLosEventos: async () => {
    try {
      const eventos = await Evento.find();
      return eventos.map(evento => ({
        id: evento._id,
        nombre: evento.nombre,
        tipo: evento.tipo,
        direccion: evento.direccion,
        fecha: evento.fecha,
        img: evento.img
      }));
    } catch (error) {
      throw new Error('Error al obtener los eventos.');
    }
  },
  buscarEvento: async (id) => {
    try{
      const evento = await Evento.findById({id});
      return evento;
    }
    catch (error){
      throw new Error('Error al buscar el evento.');
    }
   },
};

module.exports = eventoService;
