const express = require("express");
const fs = require("fs");
const multer = require("multer");
const router = express.Router();

const { Users } = require("../models/Users");
const { Products } = require("../models/Products");
const { random } = require("lodash");

const RecentProductNumber = 5;

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("", async (req, res) => {
  try {
    const allPorducts = await Products.find();
    res.send(allPorducts);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.get("/GetRecentProducts", async (req, res) => {
  try {
    const products = await Products.find().limit(RecentProductNumber);
    res.send(products);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/AddProduct", upload.array("Files[]"), async (req, res) => {
  try {
    const user = await Users.findById(req.body.Owner);
    if (!user) return res.status(500).send("User not Found");

    const newProduct = new Products(req.body);
    let Category = req.body.Category.toLowerCase();
    Category = Category.charAt(0).toUpperCase() + Category.slice(1);
    newProduct.Category = Category;
    newProduct.Colors = JSON.parse(req.body.Colors);
    newProduct.Files = [];

    const DirName = `./uploads/Users/${user._id}/Products/P_${newProduct._id}`;

    fs.mkdir(DirName, { recursive: true }, async (err) => {
      if (err) {
        return res.status(500).send("Some Error");
      } else {
        for (let i = 0; i < req.files.length; i++) {
          let name = req.files[i].originalname;
          let writeName = `Product_${i + 1}.` + name.split(".").pop();
          fs.writeFile(
            `${DirName}/${writeName}`,
            req.files[i].buffer,
            "ascii",
            function (err) {
              if (err) {
                return res.status(500).send("Some Error");
              }
            }
          );
          newProduct.Files.push(`${DirName}/${writeName}`.slice(1));
        }
        await newProduct.save();
        res.send(newProduct);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/EditProduct", async (req, res) => {
  try {
    Products.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body.Edit },
      { useFindAndModify: false },
      async function (err, doc) {
        if (err) {
          res.status(500).send("Invalid ID");
        } else {
          res.send({ Result: "Done" });
        }
      }
    );
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/AddFileToProduct", upload.array("Files[]"), async (req, res) => {
  try {
    const product = await Products.findById(req.body._id);
    if (!product) return res.status(400).send("Invalid Product ID");

    const DirName = `./uploads/Users/${product.Owner}/Products/P_${req.body._id}`;

    for (let i = 0; i < req.files.length; i++) {
      let name = req.files[i].originalname;
      let writeName = `Product_${random(999999999)}.` + name.split(".").pop();
      fs.writeFile(
        `${DirName}/${writeName}`,
        req.files[i].buffer,
        "ascii",
        function (err) {
          if (err) {
            return res.status(500).send("Some Error");
          }
        }
      );
      product.Files.push(`${DirName}/${writeName}`.slice(1));
    }

    await product.save();

    res.send({ Result: "Done" });
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/RemoveFileFromProduct", async (req, res) => {
  try {
    const product = await Products.findById(req.body._id);
    if (!product) return res.status(400).send("Invalid Product ID");

    const DirName = `./uploads/Users/${product.Owner}/Products/P_${req.body._id}`;

    const index = product.Files.indexOf(req.body.File);
    if (index > -1) {
      product.Files.splice(index, 1);
      await product.save();
      fs.unlink(`.${req.body.File}`, function (err) {});
    }
    res.send({ Result: "Done" });
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/RemoveProduct", async (req, res) => {
  try {
    const product = await Products.findById(req.body._id);
    if (!product) return res.status(400).send("Invalid Product ID");

    const DirName = `./uploads/Users/${product.Owner}/Products/P_${req.body._id}`;

    fs.rmdir(DirName, { recursive: true }, async (err) => {
      if (err) {
        console.log(err);
      } else {
        await product.remove();
        res.send("Product Removed");
      }
    });
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/GetProducts", async (req, res) => {
  try {
    const result = await Products.find(req.body);
    res.send(result);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/GetProductDetails", async (req, res) => {
  try {
    const ProductDetails = await Products.findById(req.body._id);
    if (!ProductDetails) return res.status(500).send("Error");

    let result = ProductDetails.toObject();
    result.InWishlist = false;
    result.InCart = false;

    if (req.body.OwnerID !== null) {
      const user = await Users.findById(req.body.OwnerID);
      if (user) {
        let index = user.Wishlist.indexOf(req.body._id);
        if (index > -1) {
          result.InWishlist = true;
        }
        const cartIndex = user.Cart.some(
          (el) => el._id.toString() === req.body._id.toString()
        );
        result.InCart = cartIndex;
      }
    }

    res.send(result);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/GetCategoryProducts", async (req, res) => {
  try {
    const pro = await Products.find({
      Category: {
        $regex: `.*${req.body.Category}.*`,
        $options: "i",
      },
    });

    res.send(pro);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/GetSearchResults", async (req, res) => {
  try {
    let TitleFilter = req.body.Search.split(" ").map((s) => {
      return {
        Title: {
          $regex: s,
          $options: "i",
        },
      };
    });

    let CategoryFilter = req.body.Search.split(" ").map((s) => {
      return {
        Category: {
          $regex: s,
          $options: "i",
        },
      };
    });

    const pro = await Products.find({
      $or: [...TitleFilter, ...CategoryFilter],
    });

    res.send(pro);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
