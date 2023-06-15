const Router = require('express').Router()
const passport = require('../config/passport')
const validator = require('../config/validator')

const usuarioControllers = require('../controllers/usuariosControllers')
const eventoControllers = require('../controllers/eventoControllers')

const {obtenerTodosLosUsuarios, nuevoUsuario} = usuarioControllers;
const {crearEvento, obtenerTodosLosEventos} = eventoControllers

//Controller evento
Router.route('/eventos')
.get(obtenerTodosLosEventos)

Router.route('/eventos')
.post(crearEvento)

//Controller usuario
Router.route('/usuarios')
.get(obtenerTodosLosUsuarios)

Router.route('/usuarios')
.post(validator, nuevoUsuario)

/* Router.route('/usuario/iniciarSesion/token')
.post(passport.authenticate('jwt',{session:false}),iniciarConToken) */

module.exports = Router