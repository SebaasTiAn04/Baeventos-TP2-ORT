const Router = require('express').Router()
const passport = require('../config/passport')
const validator = require('../config/validator')

const usuarioControllers = require('../controllers/usuariosControllers')
const eventoControllers = require('../controllers/eventoControllers')

const { crearEvento, obtenerTodosLosEventos, buscarEvento } = eventoControllers
const { obtenerTodosLosUsuarios, nuevoUsuario, agregarCategoria, eventosFuturos, agregarAgenda, excluirEvento, detallePerfil, verListaInteres, eliminarInteres, eliminarUsuario } = usuarioControllers;


//Controller evento
Router.route('/eventos')
    .get(obtenerTodosLosEventos)

Router.route('/eventos')
    .post(crearEvento)

Router.route('/eventos/:id')
    .get(buscarEvento)

//Controller usuario
Router.route('/usuarios')
    .get(obtenerTodosLosUsuarios)

Router.route('/usuarios')
    .post(validator, nuevoUsuario)

Router.route('/agregarinteres')
    .post(agregarCategoria)

Router.route('/eventos/usuarios/:id')
    .get(eventosFuturos)

Router.route('/agendas/usuarios/:id/:eventoAgendar')
    .post(agregarAgenda)

Router.route('/eventos/usuarios/:id/:eventoExcluir')
    .post(excluirEvento)

Router.route('/usuarios/:id')
    .get(detallePerfil)

Router.route('/interes/usuarios/:id')
    .get(verListaInteres)

Router.route('/interes/usuarios/:id/interesEliminar')
    .post(eliminarInteres)

Router.route('/usuarios/:id')
    .post(eliminarUsuario)


/* Router.route('/usuario/iniciarSesion/token')
.post(passport.authenticate('jwt',{session:false}),iniciarConToken) */

module.exports = Router