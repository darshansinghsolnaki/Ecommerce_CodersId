const mongoose = require('mongoose')

 mongoose.set("strictQuery", false);
mongoose.connect(process.env.URL, (req ,res) => {
    console.log('MongoDB connection  Established successfuly');
})
