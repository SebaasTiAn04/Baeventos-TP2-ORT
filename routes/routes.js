const Router = require('express').Router()
const passport = require('../config/passport')
const validator = require('../config/validator')

const usuarioControllers = require('../controllers/usuariosControllers')
const eventoControllers = require('../controllers/eventoControllers')

const { crearEvento, obtenerTodosLosEventos, buscarEvento } = eventoControllers
const { obtenerTodosLosUsuarios, nuevoUsuario, agregarCategoria, eventosDeInteres, agregarAgenda, excluirEvento, detallePerfil, verListaInteres, eliminarInteres, eliminarUsuario } = usuarioControllers;


//Controller evento
Router.route('/eventos') //Funciona
    .get(obtenerTodosLosEventos)

Router.route('/eventos') //Funciona
    .post(crearEvento)

Router.route('/evento') //Funciona
    .get(buscarEvento)

//Controller usuario
Router.route('/usuarios') 
    .get(obtenerTodosLosUsuarios) //Funciona
    .post(validator, nuevoUsuario) //Funciona
    .delete(eliminarUsuario) //Funciona     

Router.route('/usuario/eventos')
    .post(agregarAgenda)   //Funciona
    .get(eventosDeInteres)  //Funciona

Router.route('/usuario/eventos/excluir') //Funciona
    .post(excluirEvento)

Router.route('/usuario') // Funciona
    .get(detallePerfil)

Router.route('/usuarios/interes') 
    .get(verListaInteres)    //Funciona
    .delete(eliminarInteres)   //Funciona 
    .post(agregarCategoria)   // funciona


/* Router.route('/usuario/iniciarSesion/token')
.post(passport.authenticate('jwt',{session:false}),iniciarConToken) */

module.exports = Router