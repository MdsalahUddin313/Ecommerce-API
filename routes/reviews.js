const Reviews = require("../models/reviews_model.js");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndAdminAuthorization,
} = require("../middleware/verifyToken.js");

//Create Products only verified person
router.post("/addreviews", verifyToken, async (req, res) => {
  const newReviews = new Reviews({
    user: req.body.user,
    product: req.body.product,
    review_description: req.body.review_description,
    image: req.body.image,
  });
  try {
    //const users = await User.findById(req.params.id);
    //const {password, ...others} = users._doc;
    const savedReviews = await newReviews.save();
    console.log("Adding new product Reviews successful !!!");
    //console.log(savedReviews);
    //console.log(req.headers.token);
    res.status(201).json(savedReviews);
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
    const updatedReviews = await Reviews.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedReviews);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET DATA
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const single_Reviews = await Reviews.findById(req.params.id);
    res.status(200).json(single_Reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE DATA
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const delete_single_Reviews = await Reviews.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json("Product Reviews Deleted Successfully......");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS FROM DATABASE
router.get("/", verifyToken, async (req, res) => {
  try {
    const Reviews = await Reviews.find();
    //  const { ...all_product } = Reviews;
    console.log("All products Reviews values are delivered!!!!!!");
    res.status(200).json(Reviews);
  } catch (err) {
    res.status(500).json(err);
    //console.log(err);
  }
});
module.exports = router;
