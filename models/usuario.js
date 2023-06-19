const mongoose = require("mongoose");
/* const eventos = require("./evento"); */

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  contraseña: { type: String, required: true },
  fotoPerfil: { type: String, required: true },
  rol: { type: String, default:'usuario' },
  categoriaInteres: { type: [String], require: true },
  eventosAgendadosPorId: {type: [String]} 
});

const Usuario = mongoose.model("usuario", usuarioSchema);

module.exports = Usuario;