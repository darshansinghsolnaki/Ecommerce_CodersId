const mongoose = require('mongoose')

const user_Schema = new mongoose.Schema({
    fullName : {
        type : String,
        require : true
    },
    email : {
        type : String,
        unique : true,
        require : true
    },
    contact : {
        type : Number,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    // profil_pic : {
    //     type : String,
    // },
    // gender : {
    //     type : String,
    // },
    city : {
        type : String,
    },
    address :{
        type : String,
        require : true
    },
    is_Active : {
        type : Boolean,
        default : true
    }
})



user_Schema.set("timestamps", true)

module.exports = mongoose.model("user", user_Schema)
