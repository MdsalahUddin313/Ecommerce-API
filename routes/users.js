const User = require("../models/Users_model");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndAdminAuthorization,
} = require("../middleware/verifyToken.js");

const router = require("express").Router();
const CryptoJS = require("crypto-js");

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    if (others.role === "admin") {
      res.status(200).json(others);
    } else {
      res.status(401).json("You are not allowed to do that");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE USER

//Delete
router.delete("/dl/:id", verifyTokenAndAuthorization, async (req, res) => {
  // console.log(others.role);

  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    if (req.params.id) {
      if (others.role === "admin") {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User Deleted Successfully");
      } else {
        res.status(400).json("You are not allowed to do that.");
      }
    } else {
      res.status(401).json("User not found!!!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All USER
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    //  console.log(users);
    const { password, ...others } = users;
    console.log("All datas are delivered........");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
