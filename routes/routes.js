const Router = require('express').Router()
const passport = require('../config/passport')
const validator = require('../config/validator')

const usuarioControllers = require('../controllers/usuariosControllers')
const eventoControllers = require('../controllers/eventoControllers')

const { crearEvento, obtenerTodosLosEventos, buscarEvento } = eventoControllers
const { obtenerTodosLosUsuarios, nuevoUsuario, agregarCategoria, eventosFuturos, agregarAgenda, excluirEvento, detallePerfil, verListaInteres, eliminarInteres, eliminarUsuario } = usuarioControllers;


//Controller evento
Router.route('/eventos') //Funciona
    .get(obtenerTodosLosEventos)

Router.route('/eventos') //Funciona
    .post(crearEvento)

Router.route('/evento') //Funciona
    .get(buscarEvento)

//Controller usuario
Router.route('/usuarios') //Funciona
    .get(obtenerTodosLosUsuarios)

Router.route('/usuarios') //Funciona
    .post(validator, nuevoUsuario)

Router.route('/agregarinteres') //Funciona
    .post(agregarCategoria)

Router.route('/eventos/usuarios')
    .get(eventosFuturos)

Router.route('/agendas/usuarios/:eventoAgendar')
    .post(agregarAgenda)

Router.route('/eventos/usuarios/:eventoExcluir')
    .post(excluirEvento)

Router.route('/usuarios/:id')
    .get(detallePerfil)

Router.route('/interes/usuarios')
    .get(verListaInteres)

Router.route('/interes/usuarios/interesEliminar')
    .post(eliminarInteres)

Router.route('/usuarios')
    .post(eliminarUsuario)


/* Router.route('/usuario/iniciarSesion/token')
.post(passport.authenticate('jwt',{session:false}),iniciarConToken) */

module.exports = Router