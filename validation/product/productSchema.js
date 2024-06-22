const joi = require('@hapi/joi')
joi.objectId = require('joi-objectid')(joi)


const productSchema = {

    creatProduct : joi.object ({
        productName : joi.string().required(),
        description : joi.string().required(),
        price : joi.number().integer().required(),
        offer_price : joi.number().integer().required(),
        rating : joi.number().integer().required(),
        feature : joi.string().required(),
        specs : joi.string().required(),
        userID : joi.objectId().required(),
    }).unknown(true)
}

module.exports = productSchema 