const express = require("express");
const router = express.Router();

const { Address, AddressSchema } = require("../models/Address");

router.get("/", async (req, res) => {
  try {
    const users = await Address.find();
    res.send(users);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/GetUserAddress", async (req, res) => {
  try {
    const results = await Address.find(req.body);
    res.send(results);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/NewAddress", async (req, res) => {
  try {
    const { error } = AddressSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(500).send(error.details[0].message);
    }
    const newAddress = await Address(req.body);
    await newAddress.save();
    res.send(newAddress);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

router.post("/DeleteAddress", async (req, res) => {
  try {
    const newAddress = await Address.findOne(req.body);
    if (!newAddress) return res.status(500).send("Error in Deleting");
    const OwnerID = newAddress.OwnerID;
    await newAddress.remove();
    const result = await Address.find({ OwnerID: OwnerID });
    res.send(result);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/EditAddress", async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.body.ID,
    });
    if (!address) return res.status(500).send("Invalid ID");

    Address.findOneAndUpdate(
      { _id: req.body.ID },
      { $set: req.body.Edit },
      { useFindAndModify: false },
      async function (err, doc) {
        if (err) {
          res.status(500).send("Error in Updating Address");
        } else {
          const newAddress = await Address.findOne({
            _id: req.body.ID,
          });
          res.send(newAddress);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

router.post("/MakeDefault", async (req, res) => {
  try {
    const address = await Address.findOne(req.body);
    if (!address) return res.status(500).send("Invalid ID");

    Address.updateMany(
      { OwnerID: address.OwnerID, _id: { $ne: req.body._id } },
      { $set: { Default: false } },
      async function (err, doc) {
        if (err) {
          res.status(500).send({ Result: "Error in Updating Address" });
        } else {
          address.Default = true;
          await address.save();
          const results = await Address.find({ OwnerID: address.OwnerID });
          res.send(results);
        }
      }
    );
  } catch (error) {
    res.status(500).send("Error");
  }
});

module.exports = router;
