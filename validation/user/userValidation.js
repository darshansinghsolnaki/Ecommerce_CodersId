const userSchema = require('./userSchema')

module.exports = {
    signupValSchema : async (req, res, next) => {
        const value = await userSchema.signUp.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.status(500).json({
                status : "Validation Failed",
                message : value.error.details[0].message
            })
        } else {
            next()
        }
    },

    loginValSchema : async (req, res, next) => {
        const value = await userSchema.login.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.status(500).json({
                status : "Validation Failed",
                message : value.error.details[0].message
            })
        } else {
            next()
        }
    }
    
}

