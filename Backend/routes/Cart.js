const express = require("express");
const router = express.Router();

const { Users } = require("../models/Users");
const { Products } = require("../models/Products");

router.post("/GetCart", async (req, res) => {
  try {
    const user = await Users.findById(req.body._id);
    if (!user) return res.status(500).send("Invalid ID");

    res.send(user.Cart);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/AddToCart", async (req, res) => {
  try {
    const user = await Users.findById(req.body.Owner);
    if (!user) return res.status(500).send("Invalid User ID");

    const product = await Products.findById(req.body._id);
    if (!product) return res.status(500).send("Invalid Product ID");

    const found = user.Cart.some(
      (el) => el._id.toString() === req.body._id.toString()
    );

    if (!found) {
      user.Cart.push(product);
      await user.save();
      res.send(user.Cart);
    } else {
      res.send(user.Cart);
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/RemoveFromCart", async (req, res) => {
  try {
    const user = await Users.findById(req.body.Owner);
    if (!user) return res.status(500).send("Invalid User ID");

    const product = await Products.findById(req.body._id);
    if (!product) return res.status(500).send("Invalid Product ID");

    const found = user.Cart.some(
      (el) => el._id.toString() === req.body._id.toString()
    );

    if (found) {
      const filter = user.Cart.filter(
        (c) => c._id.toString() !== req.body._id.toString()
      );
      user.Cart = filter;
      await user.save();
      res.send(user.Cart);
    } else {
      res.send(user.Cart);
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/GetCartLength", async (req, res) => {
  try {
    const user = await Users.findById(req.body._id);
    if (!user) return res.status(500).send("Invalid ID");

    res.send({ Length: user.Cart.length });
  } catch (error) {
    res.status(500).send("Error");
  }
});

module.exports = router;
