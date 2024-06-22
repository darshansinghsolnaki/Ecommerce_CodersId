const joi = require('@hapi/joi')

const userSchema = {
    signUp : joi.object ({
        fullName : joi.string().min(3).max(15).required(),
        email : joi.string().required(),
        contact : joi.number().integer().min(1000000000).max(9999999999).required(),
        password : joi.string().min(6).max(10).required(),
        confirmpassword : joi.string().min(6).max(10).required(),
        role : joi.string().required(),
        gender : joi.string().required()
        }).unknown(true),
    
    login : joi.object({
        email : joi.string().required(),
        password : joi.string().required()
    }).unknown(true)
}

module.exports = userSchema