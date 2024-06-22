const productSchema = require('./productSchema')

module.exports = {
    proCreatValSchema : async (req, res, next) => {
        const value = await productSchema.creatProduct.validate(req.body, { abortEarly: false })
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
