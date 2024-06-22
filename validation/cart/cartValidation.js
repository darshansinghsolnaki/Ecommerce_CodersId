const cartSchema = require('./cartSchema')

module.exports = {
    cartValSchema : async (req, res, next) => {
        const value = await cartSchema.creatCart.validate(req.body, { abortEarly: false })
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
