const express = require("express")
const cartRouter = express.Router()
const cartController = require('../controller/cartController')
const cartValidation = require('../validation/cart/cartValidation')

cartRouter.post("/add", cartValidation.cartValSchema, cartController.addToCart)

cartRouter.get("/mycart/:id", cartController.myCart)
cartRouter.delete("/delete/:id", cartController.removeProduct)
cartRouter.patch("/payment/:id", cartController.placeOrder)

module.exports = cartRouter; 