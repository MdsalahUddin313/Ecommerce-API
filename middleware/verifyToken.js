const jwt = require("jsonwebtoken");
const Users = require("../models/Users_model");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, users) => {
      if (err) {
        res.status(403).json("Token is not valid !!");
      }
      req.users = users;
      //console.log(req.users);
      //console.log(Users.findOne(req.users.id));
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    //console.log(req.user);
    if (req.users.id === req.params.id || req.users.role === "admin") {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

// req.user.id === req.params.id|| req.user.role === "admin"
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.users.id === req.params.id || req.users.role === "admin") {
      //res.status(201).json(req.params.id);
      next();
    } else {
      res.status(401).json("You are not allowed to do that..");
    }
  });
};

const verifyTokenAndAdminAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.users.role === "admin") {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndAdminAuthorization,
};

/*
const verifyTokenAndvendor = (req, res, next) => {
  const roles = async () => {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    console.log(others.role);
  };
  verifyToken(req, res, () => {
    user_id = req.users.id;
    //console.log(user_id);
    // const { user_role } = findRoleFrom(user_id);
    console.log(roles());
  });
};
*/
