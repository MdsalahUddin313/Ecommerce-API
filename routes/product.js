const Products = require("../models/Product_model.js");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndAdminAuthorization,
} = require("../middleware/verifyToken.js");

//Create Products only verified person
router.post("/addproduct", verifyToken, async (req, res) => {
  const newProduct = new Products({
    title: req.body.title,
    description: req.body.description,
    img: req.body.img,
    categories: req.body.categories,
    size: req.body.size,
    color: req.body.color,
    price: req.body.price,
  });
  try {
    //const users = await User.findById(req.params.id);
    //const {password, ...others} = users._doc;
    const savedProduct = await newProduct.save();
    console.log("Adding new product successful !!!");
    console.log(savedProduct);
    //console.log(req.headers.token);
    res.status(201).json(savedProduct);
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
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET DATA
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const single_product = await Products.findById(req.params.id);
    res.status(200).json(single_product);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE DATA
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const delete_single_product = await Products.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json("Product Deleted Successfully......");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS FROM DATABASE
router.get("/", verifyToken, async (req, res) => {
  try {
    const products = await Products.find();
    const { ...all_product } = products;
    console.log("All products values are delivered!!!!!!");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
    //console.log(err);
  }
});

module.exports = router;
