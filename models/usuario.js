const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  contraseña: { type: String, required: true },
  fotoPerfil: { type: String, required: true },
  rol: { type: String, default:'usuario' },
});

const Usuario = mongoose.model("usuario", usuarioSchema);

module.exports = Usuario;