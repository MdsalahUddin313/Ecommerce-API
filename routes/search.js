const SearchItems = require("../models/Search_model");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndAdminAuthorization,
} = require("../middleware/verifyToken.js");

//Create Products only verified person
router.post("/addSearchItems", verifyToken, async (req, res) => {
  const newsearchitems = new SearchItems({
    userId: req.body.userId,
    searchItems: req.body.searchItems,
  });
  try {
    newsearchitems.save();
    console.log("Adding new product SearchItems successful !!!");
    //res.status(201).json(savedSearchItems);
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
    const updatedSearchItems = await SearchItems.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedSearchItems);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET DATA
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const single_SearchItems = await SearchItems.findById(req.params.id);
    res.status(200).json(single_SearchItems);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE DATA
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const delete_single_SearchItems = await SearchItems.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json("Product SearchItems Deleted Successfully......");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS FROM DATABASE
router.get("/", verifyToken, async (req, res) => {
  try {
    const SearchItems = await SearchItems.find();
    //  const { ...all_product } = SearchItems;
    //console.log("All products SearchItems values are delivered!!!!!!");
    //res.status(200).json(SearchItems);
    console.log(SearchItems);
  } catch (err) {
    res.status(500).json(err);
    //console.log(err);
  }
});

module.exports = router;
