const express = require('express')
const productRouter = express.Router()
const product = require('../controller/productController')
const productValidation = require('../validation/product/productValidation')
const  upload = require('../middleware/imageConfig')


productRouter.post("/creat",upload.array("product_pic",2), productValidation.proCreatValSchema, product.creatProduct)
productRouter.get("/list", product.productlist)
productRouter.delete("/delete/:id", product.productdelete)
productRouter.get("/read/:id",product.retrieveProduct)
productRouter.patch("/update/:id",product.productUpdate)

module.exports = productRouter;
