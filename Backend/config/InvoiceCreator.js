const easyinvoice = require("easyinvoice");
const fs = require("fs");

const CreateInvoice = async ({
  Name,
  Address,
  Pincode,
  City,
  Country,
  OrderID,
  Date,
  Quantity,
  Description,
  Price,
  Tax,
  FileName,
}) => {
  const data = {
    currency: "INR",
    taxNotation: "gst",
    marginTop: 25,
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 25,
    logo: "Logo URL",
    sender: {
      company: "company Name",
      address: "Address....",
      zip: "Pincode",
      city: "city",
      country: "country",
    },
    client: {
      company: Name,
      address: Address,
      zip: Pincode,
      city: City,
      country: Country,
    },
    invoiceNumber: OrderID,
    invoiceDate: Date,
    products: [
      {
        quantity: Quantity,
        description: Description,
        price: Price,
        tax: Tax,
      },
    ],
    bottomNotice: "Thankyou for Shopping with EasyShop",
  };

  const result = await easyinvoice.createInvoice(data);
  try {
    fs.writeFile(FileName, result.pdf, "base64", function (err) {
      if (err) {
      }
    });
  } catch (error) {}
};

exports.CreateInvoice = CreateInvoice;
