const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  direccion: { type: String, required: true },
  fecha: { type: String, required: true },
  img: {type: String, required: true },

});

const Evento = mongoose.model("evento", eventoSchema);

module.exports = Evento;