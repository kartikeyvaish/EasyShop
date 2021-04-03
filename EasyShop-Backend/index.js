const express = require("express");
const mongoose = require("mongoose");

const Address = require("./routes/Address");
const Cart = require("./routes/Cart");
const Chats = require("./routes/Chats");
const Invoices = require("./routes/Invoices");
const config = require("./config/AppConfig.ts");
const Orders = require("./routes/Orders");
const Profile = require("./routes/Profile");
const Products = require("./routes/Products");
const User = require("./routes/Users");
const Wishlist = require("./routes/Wishlist");

mongoose
  .connect(config.db_url, config.db_config)
  .then(() => console.log("Connected to EasyShop Mongo DB..."))
  .catch((error) => console.error("Error", error));

const app = express();
require("./config/Production")(app);

app.use(express.static("./"));
app.use("/api/address/", Address);
app.use("/api/cart/", Cart);
app.use("/api/chats/", Chats);
app.use("/api/invoices/", Invoices);
app.use("/api/orders/", Orders);
app.use("/api/profile/", Profile);
app.use("/api/products/", Products);
app.use("/api/user/auth/", User);
app.use("/api/wishlist/", Wishlist);

app.listen(config.Port, () => console.log(`Listening on ${config.Port}..`));
