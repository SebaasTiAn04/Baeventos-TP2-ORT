const eventoService = require('../services/servicesEvento');

const eventoController = {
  crearEvento: async (req, res) => {
    let { nombre, tipo, direccion, fecha, img } = req.body;

    try {
      const nuevoEvento = await eventoService.crearEvento(nombre,tipo,direccion,fecha,img);
      res.json({ success: true, response: nuevoEvento });
    } catch (error) {
      res.json({ success: false, response: error.message });
    }
  },

  obtenerTodosLosEventos: async (req, res) => {
    try {
      const eventos = await eventoService.obtenerTodosLosEventos();
      res.json({ success: true, response: eventos });
    } catch (error) {
      res.json({ success: false, response: null });
    }
  },
  buscarEvento: async (req, res) => {
    try{
      const evento = await eventoService.buscarEvento(req.params.id);
      res.json({ success: true, response: evento });
    }
    catch (error){
      res.status(404).json({ success: false, response: error.message });//cambiar, poner uno exacto,
    }
  }
};

module.exports = eventoController;



/* const Evento = require('../models/evento')

const eventoController = {
    crearEvento : async(req, res) => {
        let { nombre, tipo, direccion, fecha, img} = req.body
        let nuevoEvento = await Evento ({nombre, tipo, direccion,fecha,img })
        try{
          await nuevoEvento.save()
          res.json({succes: true, response: nuevoEvento})
        }catch (error) {
          res.json ({success: false, response: error.message})
        }
      },

      obtenerTodosLosEventos : async(req, res) => {
        let respuesta = []
        try{
          
            const eventos = await Evento.find()
            eventos.map( evento =>{
                return respuesta.push({id: evento._id , nombre: evento.nombre, tipo: evento.tipo, direccion: evento.direccion, fecha: evento.fecha, img: evento.img})
            })
            res.json({succes: true, response: respuesta})
        }catch(error){
            res.json({success: false, response: null})
        }
      }
}

module.exports = eventoController; */