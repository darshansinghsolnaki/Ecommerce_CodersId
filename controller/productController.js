const product_Schema = require('../model/product_Schema')


const creatProduct = async(req, res) => {
    const saveData = new product_Schema(req.body)
    try {
        const filepath = req.files.map(({filename}) => `/uploads/${filename}`)
        saveData.product_pic = filepath
        const result = await saveData.save()
        res.status(200).json({
            status : "Success",
            message : " Prodcut Add Succesfully",
            proData : result
        })
    } catch (error) {
        res.status(500).json({
            status : "Failed",
            message : error.message
        })
    }
}


const retrieveProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await product_Schema.find({ userID: id });
    res.status(200).json({
      status: "Success",
      products: data,
    });
  } catch {
    res.status(500).json({
      status: "Failed",
      message: "Something Goes Wrong",
    });
  }
};


const productlist = async (req, res) => {
    try {
        const listData = await product_Schema.find().lean().select({
    productName : 1,
    description : 1,
    price : 1,
    offer_price : 1,
    rating : 1,
    product_pic : 1,
    _id : 1,
        }).sort( { createdAt : -1 });
        const counte = await product_Schema.find().count()
        res.status(200).json({
            counted : counte,
            listData : listData
        })   
    } catch (error) {
       res.status(500).json({
        status : "Failed",
        message : error.message
       }) 
    }
}


const productdelete = async(req, res) => {
    const id = req.params.id
    try {
        const productData = await product_Schema.findByIdAndDelete(id)
        res.status(200).json({
            status : "Deleted",
            message : "Product Deleted Successfully"
           }) 
    } catch (error) {
        res.status(500).json({
            status : "Failed",
            message : error.message
           }) 
    }
}


const productUpdate = async(req, res) => {
    const id = req.params.id
    try {
        const updateData = await product_Schema.findByIdAndUpdate(id, req.body ,{ new : true})
        res.status(200).json({
            status : "Updated",
            message : "Product Updated Succesfully",
            data : updateData
        })
    } catch (error) {
        res.status(500).json({
            status : "Failed",
            message : error.message
        })
    }
}


module.exports = { creatProduct, retrieveProduct, productlist, productdelete, productUpdate }
