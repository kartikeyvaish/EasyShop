const express = require("express");
const fs = require("fs");
const moment = require("moment");
const router = express.Router();
const InvoiceCreator = require("../config/InvoiceCreator");

const { Invoices } = require("../models/Invoices");
const { Orders } = require("../models/Orders");
const { Products } = require("../models/Products");

router.get("/", async (req, res) => {
  try {
    const allInvoices = await Invoices.find();
    res.send(allInvoices);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/CheckInvoice", async (req, res) => {
  try {
    const product = await Products.findById(req.body.ProductID);
    if (!product) return res.status(500).send("Invalid Product ID");

    const order = await Orders.findOne({
      OrderID: req.body.OrderID,
    });
    if (!order) return res.status(500).send("Invalid Order ID");

    const invoice = await Invoices.findOne({
      OrderID: req.body.OrderID,
    });

    if (!invoice) {
      let OrderID = `ESOD${order._id.toString().toUpperCase()}`;
      const DirName = `/uploads/Users/${order.PlacedBy}/Invoices/${OrderID}`;
      const writeName = `${OrderID}.pdf`;

      let data = {
        Name: order.DeliveryAddress.Name,
        Address: order.DeliveryAddress.Address,
        Pincode: order.DeliveryAddress.Pincode,
        City: order.DeliveryAddress.City + ", " + order.DeliveryAddress.State,
        Country: "India",
        OrderID: OrderID,
        Date: moment(new Date(order.DateTime)).format("Do MMMM, YYYY"),
        Quantity: order.Quantity,
        Description: order.Product.Title,
        Price: parseInt(order.Product.Price),
        Tax: 0,
        PlacedBy: order.PlacedBy,
        FileName: `.${DirName}/${writeName}`,
      };

      const newInvoice = new Invoices({
        OrderID: OrderID,
        URL: `${DirName}/${writeName}`,
      });

      fs.mkdir(`.${DirName}`, { recursive: true }, async (err) => {
        if (err) {
          res.status(500).send("Error");
        } else {
          await InvoiceCreator.CreateInvoice({
            ...data,
          });
          await newInvoice.save();
          res.send(newInvoice.URL);
        }
      });
    } else {
      res.send(invoice.URL);
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});

module.exports = router;
