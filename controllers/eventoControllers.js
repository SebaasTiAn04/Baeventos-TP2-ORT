const Evento = require('../models/evento')

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

module.exports = eventoController;