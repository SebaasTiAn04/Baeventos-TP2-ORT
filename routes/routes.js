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
    .delete(eliminarUsuario)
    .post(validator, nuevoUsuario)
    
/* Router.route('/usuarios') //Funciona */
/* Router.route('/usuarios')   */   

Router.route('/agregarinteres') //Funciona
    .post(agregarCategoria)

Router.route('/eventos/usuarios') //revisar ------------------------------------------------------------
    .get(eventosFuturos)

Router.route('/usuario/eventos')
    .post(agregarAgenda)   //Funciona

Router.route('/usuario/eventos/excluir') //Funciona
    .post(excluirEvento)

Router.route('/usuario') // Funciona
    .get(detallePerfil)

Router.route('/usuarios/interes') 
    .get(verListaInteres)    //Funciona
    .post(eliminarInteres)   //Funciona   (Hay que probar si cambiamos post() por delete())
/* Router.route('/usaurios/interes/interesEliminar') */
    

    


/* Router.route('/usuario/iniciarSesion/token')
.post(passport.authenticate('jwt',{session:false}),iniciarConToken) */

module.exports = Router