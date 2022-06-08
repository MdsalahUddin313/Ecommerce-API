const Orders = require("../models/Order_model.js");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndAdminAuthorization,
} = require("../middleware/verifyToken.js");

//Create Products only verified person
router.post("/addOrder", verifyToken, async (req, res) => {
  const newOrder = new Orders({
    userId: req.body.userId,
    products: req.body.products,
    amount: req.body.amount,
    address: req.body.address,
    status: req.body.status,
    payment_method: req.body.payment_method,
  });
  try {
    //const users = await User.findById(req.params.id);
    //const {password, ...others} = users._doc;
    const savedOrder = await newOrder.save();
    console.log("Adding new product Order successful !!!");
    //console.log(savedOrder);
    //console.log(req.headers.token);
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedOrder = await Orders.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET DATA
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const single_Order = await Orders.findById(req.params.id);
    res.status(200).json(single_Order);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE DATA
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const delete_single_Order = await Orders.findByIdAndDelete(req.params.id);
    res.status(200).json("Product Order Deleted Successfully......");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS FROM DATABASE
router.get("/", verifyToken, async (req, res) => {
  try {
    const Order = await Orders.find();
    //  const { ...all_product } = Order;
    console.log("All products Order values are delivered!!!!!!");
    res.status(200).json(Order);
  } catch (err) {
    res.status(500).json(err);
    //console.log(err);
  }
});

module.exports = router;
