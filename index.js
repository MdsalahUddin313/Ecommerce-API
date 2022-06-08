const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const productRoute = require("./routes/product.js");
const userAuth = require("./routes/auth.js");
const orderRoute = require("./routes/order.js");
const categoriesRoute = require("./routes/categories.js");
const reviewsRoute = require("./routes/reviews.js");
const cartRoutes = require("./routes/cart.js");
const searchRoutes = require("./routes/search.js");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBConnection successfull"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth", userAuth);
app.use("/api/product", productRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/order/", orderRoute);
app.use("/api/reviews/", reviewsRoute);
app.use("/api/cartItems/", cartRoutes);
app.use("/api/searchItems/", searchRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("server is running http://localhost:5000/");
});
