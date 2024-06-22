const mongoose = require('mongoose')

const cart_Schema = new mongoose.Schema ({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        require : true
    },
    productID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "product",
        require : true
    },
    quantity : {
        type : Number,
        default : 1
    },
    deliverStatus : {
        type : Boolean,
        default : false
    },
    paymentStatus : {
        type : Boolean,
        default : false
    },
    isActive : {
        type : Boolean,
        default : true
    }
});

cart_Schema.set("timestamps", true)

module.exports =  mongoose.model("cart", cart_Schema)
