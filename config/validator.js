const joi = require('joi')

const validator = (req, res, next) => {

    const schema = joi.object({
        nombre: joi.string().max(12).min(3).trim().pattern(new RegExp('[a-zA-Z]')).required().messages({
            'string.min': 'El nombre debe tener más de tres letras.',
            'string.max': 'El nombre debe tener menos de doce letras.',
            'string.empty':'El nombre es requerido',
            'string.pattern.base':'El nombre solo puede tener letras.'
        }),
       apellido: joi.string().max(16).min(3).trim().pattern(new RegExp('[a-zA-Z]')).required().messages({
           'string.empty' : 'El apellido es obligatorio',
            'string.min': 'El apellido debe tener más de tres letras.',
            'string.max': 'El apellido debe tener menos de dieciséis letras.',
            'string.pattern.base':'El apellido solo puede contener letras'
        }),
        contraseña: joi.string().min(8).trim().pattern(new RegExp('^[a-zA-Z0-9]')).required().messages({
            'string.empty' : 'La contraseña es requerida',
            'string.min': 'La contraseña debe tener más de tres caracteres',
            'string.pattern.base':'La contraseña solo puede tener letras o números.' 
        }),
        email: joi.string().email().trim().required().messages({
            'string.empty': 'El correo electrónico es requerido',
            'string.email':'El correo requiere un formato válido',
        }),
        fotoPerfil: joi.required(),
        rol: joi.string()
    })

    const validate = schema.validate(req.body, { abortEarly: false })

    if(validate.error) {
        return res.status(422).json( { success: false, response: validate.error.details ,error:true} )
    }

    next()
}

module.exports = validator 