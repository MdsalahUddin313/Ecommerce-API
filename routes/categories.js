const Categories = require("../models/Categories_model.js");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndAdminAuthorization,
} = require("../middleware/verifyToken.js");

//Create Products only verified person
router.post("/addcategories", verifyToken, async (req, res) => {
  const newCategories = new Categories({
    title: req.body.title,
    sub_categories: req.body.sub_categories,
    logos: req.body.logos,
  });
  try {
    //const users = await User.findById(req.params.id);
    //const {password, ...others} = users._doc;
    const savedCategories = await newCategories.save();
    console.log("Adding new product categories successful !!!");
    //console.log(savedCategories);
    //console.log(req.headers.token);
    res.status(201).json(savedCategories);
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
    const updatedCategories = await Categories.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET DATA
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const single_Categories = await Categories.findById(req.params.id);
    res.status(200).json(single_Categories);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE DATA
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const delete_single_Categories = await Categories.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json("Product categories Deleted Successfully......");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS FROM DATABASE
router.get("/", verifyToken, async (req, res) => {
  try {
    const categories = await Categories.find();
    //  const { ...all_product } = categories;
    console.log("All products categories values are delivered!!!!!!");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
    //console.log(err);
  }
});

module.exports = router;
