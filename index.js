const express =  require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
require('./model/config')
const router = require('./router/manRouter')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use('/', router)

const server = app.listen(process.env.PORT, (req, res) => {
    console.log(`Server Runnnig PORT :: ${process.env.PORT}`);
})

module.exports = server
