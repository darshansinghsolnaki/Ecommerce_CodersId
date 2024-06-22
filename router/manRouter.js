const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const productRouter = require('../router/productRouter')
const cartRouter = require('./cartRouter')


router.use("/user", userRouter )
router.use("/product", productRouter)
router.use("/cart", cartRouter)

module.exports = router;
