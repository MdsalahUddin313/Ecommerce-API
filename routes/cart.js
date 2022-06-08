const Cart = require("../models/Cart_model.js");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndAdminAuthorization,
} = require("../middleware/verifyToken.js");

//Create Products only verified person
router.post("/addCart", verifyToken, async (req, res) => {
  const newCart = new Cart({
    userId: req.body.userId,
    products: req.body.product,
  });
  try {
    //const users = await User.findById(req.params.id);
    //const {password, ...others} = users._doc;
    const savedCart = await newCart.save();
    console.log("Adding new product Cart successful !!!");
    //console.log(savedCart);
    //console.log(req.headers.token);
    res.status(201).json(savedCart);
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
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET DATA
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const single_Cart = await Cart.findById(req.params.id);
    res.status(200).json(single_Cart);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE DATA
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const delete_single_Cart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Product Cart Deleted Successfully......");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS FROM DATABASE
router.get("/", verifyToken, async (req, res) => {
  try {
    const Cart = await Cart.find();
    //  const { ...all_product } = Cart;
    console.log("All products Cart values are delivered!!!!!!");
    res.status(200).json(Cart);
  } catch (err) {
    res.status(500).json(err);
    //console.log(err);
  }
});

module.exports = router;
