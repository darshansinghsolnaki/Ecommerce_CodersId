const cart_Schema = require("../model/cart_Schema");

const addToCart = async (req, res) => {
  const data = new cart_Schema(req.body);
  try {
    await data.save();
    res.status(200).json({
      status: "sucess",
      message: "Added Successfully",
    });
  } catch(error) {
    res.status(500).json({
      status: "Failed",
      message: error.message
    });
  }
};


const myCart = async (req, res) => {
    const id = req.params.id;
    try {
      const count = await cart_Schema.find({ userID: id }).count();
      if (count >= 1) {
        const items = await cart_Schema.find({ userID: id })
          .select({ quantity: 1, _id: 0 })
          .populate("productID", {
            productNamevv: 1,
            price: 1,
            product_pic: 1,
            offer_price: 1,
            _id: 0,
          });
        const product = items.map(({ productID }) => productID)
        const price = product.map(({ price }) => price);
        const totalPrice = price.reduce((a, b) => {
          return a + b;
        });
        const deliveryCost = count * 10;
        const subTotal = totalPrice + deliveryCost;
  
        res.status(200).json({
          status: "Success",
          product_quantity: count,
          Item_Cost: totalPrice,
          Delivery_Cost: deliveryCost,
          Cart_Subtotal: subTotal,
          Items: items,
        });
      } else {
        res.status(204).json({
          status: "Failed",
          message: "Empty Cart",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Failed",
        message: err.message,
      });
    }
  };
  
  
  const removeProduct = async (req, res) => {
    const id = req.params.id;
    try {
      const product = await cart_Schema.findByIdAndDelete(id);
      res.status(200).json({
        status: "Success",
        message: "Successfully deleted",
      });
    } catch {
      res.status(500).json({
        status: "Failed",
        message: "Something goes wrong",
      });
    }
  };
  
  
  const placeOrder = async (req, res) => {
    const id = req.params.id;
    try {
      const payment = await cart_Schema.updateMany(
        { user_id: { $in: id } },
        { paymentStatus: false }
      );
  
      res.status(200).json({
        status: "Success",
        message: "Payment Success ",
      });
    } catch {
      res.status(500).json({
        status: "Failed",
        message: "Something goes wrong",
      });
    }
  };


module.exports = { addToCart, myCart, removeProduct, placeOrder }