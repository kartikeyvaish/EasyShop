const express = require("express");
const { Products } = require("../models/Products");
const { Users } = require("../models/Users");
const router = express.Router();

router.post("/AddToWishList", async (req, res) => {
  try {
    const user = await Users.findById(req.body.OwnerID);
    if (!user) return res.status(404).send("Invalid User ID");

    const product = await Products.findById(req.body.ProductID);
    if (!product) return res.status(404).send("Invalid Product ID");

    let index = user.Wishlist.indexOf(req.body.ProductID);
    if (index === -1) {
      user.Wishlist.push(req.body.ProductID);
      await user.save();
      res.send("Added to List");
    } else {
      res.send("Already in List");
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/RemoveFromWishList", async (req, res) => {
  try {
    const user = await Users.findById(req.body.OwnerID);
    if (!user) return res.status(404).send("Invalid User ID");

    const product = await Products.findById(req.body.ProductID);
    if (!product) return res.status(404).send("Invalid Product ID");

    let index = user.Wishlist.indexOf(req.body.ProductID);
    if (index > -1) {
      user.Wishlist.splice(index, 1);
      await user.save();
      res.send("Removed from Wishlist");
    } else {
      res.send("Not in List");
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/GetWishlist", async (req, res) => {
  try {
    const user = await Users.findById(req.body._id);
    if (!user) return res.status(404).send("Invalid User ID");

    const all = await Products.find({
      _id: { $in: user.Wishlist },
    });
    res.send(all);
  } catch (error) {
    res.status(500).send("Error");
  }
});

module.exports = router;
