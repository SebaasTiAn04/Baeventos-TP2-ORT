const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

const Usuario = require('../models/usuario')


const pass = passport.use(new jwtStrategy({
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
    },(jwt_payload,done)=>{

    Usuario.findOne({_id:jwt_payload._doc._id})
    .then(usuario =>{
        
        if(usuario){
            console.log('Pase la autenticacion del token');
            return done(null,usuario)
        }else{
            console.log('No pase la autenticacion del token');
            return done(null, false)
        }
    })
    .catch(err =>{
        return done(err, false)
    })
}))

module.exports = pass