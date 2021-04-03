const _ = require("lodash");
const express = require("express");
const fs = require("fs");
const moment = require("moment");
const router = express.Router();
const InvoiceCreator = require("../config/InvoiceCreator");

const { Orders } = require("../models/Orders");
const { Users } = require("../models/Users");
const { Invoices } = require("../models/Invoices");

router.get("/", async (req, res) => {
  try {
    const allOrders = await Orders.find();
    res.send(allOrders);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/PlaceOrder", async (req, res) => {
  let InvoicesArray = [];
  try {
    const user = await Users.findById(req.body.PlacedBy);
    if (!user) return res.status(500).send("Invalid User ID");

    if (req.body.Products?.length) {
      const proArray = req.body.Products;
      for (let i = 0; i < proArray.length; i++) {
        let newOrder = new Orders();
        newOrder.Product = _.pick(proArray[i], [
          "Files",
          "_id",
          "Title",
          "Category",
          "Owner",
          "Price",
        ]);
        const seller = await Users.findById(proArray[i].Owner);
        if (!seller) return res.status(500).send("Invalid User ID");

        let Seller = _.pick(seller.toObject(), [
          "Name",
          "Email",
          "Phone",
          "ProfilePicture",
          "_id",
        ]);
        newOrder.Seller = Seller;
        newOrder.PlacedBy = req.body.PlacedBy;
        newOrder.Quantity = proArray[i].Quantity;
        newOrder.Color = proArray[i].SelectedColor;
        newOrder.Price = parseInt(proArray[i].Price) * proArray[i].Quantity;
        newOrder.DeliveryAddress = _.pick(req.body.DeliveryAddress, [
          "Name",
          "Address",
          "Locality",
          "City",
          "State",
          "Pincode",
          "Phone",
          "AddressType",
          "Phone",
        ]);
        newOrder.PaymentMode = req.body.PaymentMode;
        newOrder.OrderID = `ESOD${newOrder._id.toString().toUpperCase()}`;
        newOrder.DateTime = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        });
        newOrder.save();
        InvoicesArray.push({
          Name: req.body.DeliveryAddress.Name,
          Address: req.body.DeliveryAddress.Address,
          Pincode: req.body.DeliveryAddress.Pincode,
          City:
            req.body.DeliveryAddress.City +
            ", " +
            req.body.DeliveryAddress.State,
          Country: "India",
          OrderID: `ESOD${newOrder._id.toString().toUpperCase()}`,
          Date: moment(
            new Date(
              new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
              })
            )
          ).format("Do MMMM, YYYY"),
          Quantity: proArray[i].Quantity,
          Description: proArray[i].Title,
          Price: parseInt(proArray[i].Price),
          Tax: 0,
          PlacedBy: req.body.PlacedBy,
        });
      }
      user.Cart = [];
      await user.save();
      res.send("Order Placed Successfully");
      for (let i = 0; i < InvoicesArray.length; i++) {
        CreateInvoices(InvoicesArray[i]);
        const DirName = `/uploads/Users/${InvoicesArray[i].PlacedBy}/Invoices/${InvoicesArray[i].OrderID}`;
        const writeName = `${InvoicesArray[i].OrderID}.pdf`;
        const newInvoice = new Invoices({
          OrderID: InvoicesArray[i].OrderID,
          URL: `${DirName}/${writeName}`,
        });
        await newInvoice.save();
      }
    } else {
      res.status(500).send("At Least one Product is required");
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/GetOrders", async (req, res) => {
  try {
    const user = await Users.findById(req.body._id);
    if (!user) return res.status(500).send("Invalid User ID");

    const orders = await Orders.find({
      PlacedBy: req.body._id,
    });

    res.send(orders);
  } catch (error) {
    res.status(500).send("Error");
  }
});

function CreateInvoices(data) {
  const DirName = `./uploads/Users/${data.PlacedBy}/Invoices/${data.OrderID}`;
  const writeName = `${data.OrderID}.pdf`;

  fs.mkdir(DirName, { recursive: true }, async (err) => {
    if (err) {
    } else {
      InvoiceCreator.CreateInvoice({
        ...data,
        ...{ FileName: `${DirName}/${writeName}` },
      });
    }
  });
}

module.exports = router;
