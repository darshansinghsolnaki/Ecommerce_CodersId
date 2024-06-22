const mongoose = require('mongoose')

const product_Schema = new  mongoose.Schema({
    productName : {
        type : String,
        require : true
    },
    description: {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    offer_price: {
        type : Number,
        default : 0
    },
    rating : {
        type : Number,
        default : 0
    },
    feature : {
        type : String,
        require : true
    },
    specs : {
        type : String,
        require : true
    },
    product_pic : {
        type : [String],
        require : true
    },
    is_Active : {
        type : String,
        require : true
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        require : true, 
        ref : "user"
    }
    
})

product_Schema.set("timestamps", true)

module.exports = mongoose.model("product", product_Schema)