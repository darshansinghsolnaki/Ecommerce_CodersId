const Cart = require("../../model/cart_schema");


const AddToCart = async (req, res) => {
  const data = new Cart(req.body);
  try {
    await data.save();
    res.status(200).json({
      status: "sucess",
      message: "Added Successfully",
    });
  } catch(err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const myCart = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await Cart.find({ user_id: id }).count();
    if (count >= 1) {
      let items = await Cart.find({ user_id: id })
        .select({ quantity: 1, paymentStatus: 1, _id: 0 })
        .populate("product_id", {
          p_Name: 1,
          price: 1,
          product_pics: 1,
          offerPrice: 1,
          _id: 0,
        });
      const product = items.map(({ product_id }) => product_id);
      items = items.filter(({ paymentStatus }) => paymentStatus == false);
      const price = product.map(({ price }) => price);
      const totalPrice = price.reduce((a, b) => {
        return a + b;
      });
      const deliveryCost = count * 10;
      const subTotal = totalPrice + deliveryCost;
      res.status(200).json({
        status: "Success",
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
    const product = await Cart.findByIdAndDelete(id);
    res.status(200).json({
      status: "Success",
      message: "Successfully deleted",
    });
  } catch(err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const placeOrder = async (req, res) => {
  const id = req.params.id;
  try {
    await Cart.updateMany({ user_id: { $in: id } }, { paymentStatus: true });
    res.status(200).json({
      status: "Success",
      message: "Payment Success",
    });
  } catch(err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = {
  AddToCart,
  myCart,
  placeOrder,
  removeProduct,
};