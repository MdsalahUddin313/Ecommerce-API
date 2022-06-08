const router = require("express").Router();
const users = require("../models/Users_model.js");
const CryptoJS = require("crypto-js");
//const bcrypt = require("bcrypt");
const { AES } = require("crypto-js");
const jwt = require("jsonwebtoken");

//register users
//create user data in mongoDB

router.post("/register", async (req, res) => {
  const newUser = new users({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    role: req.body.role,
  });

  try {
    //  const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt(newUser.password, salt);
    //  console.log(hashedPassword.toString);
    const savedUser = await newUser.save();
    console.log("Register Completed!!!!!");
    console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const user = await users.findOne({ username: req.body.username });
    !user && res.status(401).json("wrong credentials");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    Originalpassword !== req.body.password &&
      res.status(401).json("Wrongly Credentials!!!");

    //play with JWT
    const accessToken = jwt.sign(
      {
        id: user._id,
        //role : user.role,
      },
      process.env.JWT_SEC,
      //set session expires time to 3 days
      { expiresIn: "3d" }
    );

    //send client other data except password(output)
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(502).json(err);
  }
});

module.exports = router;
