const joi = require('@hapi/joi')
joi.objectId = require('joi-objectid')(joi)

const cartSchema = {

    creatCart : joi.object ({
        quantity : joi.number().required(),
        deliverStatus : joi.boolean().required(),
        paymentStatus : joi.boolean().required(),
        userID : joi.objectId().required(),
        productID : joi.objectId().required(),

    }).unknown(true)
}

module.exports = cartSchema