const _ = require("lodash");
const { random } = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const router = express.Router();

const config = require("../config/AppConfig.ts");
const CurrentTime = require("../config/HelperFunctions.ts");
const { Users, RegisterSchema, LoginSchema } = require("../models/Users");

const transporter = nodemailer.createTransport(config.TransportPayload);

async function SendMail(body) {
  let mailOptions = {
    from: config.Portal_Email,
    ...body,
    priority: "high",
  };
  return new Promise((resolve) =>
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        resolve({
          ok: false,
          data: error,
        });
      } else {
        resolve({
          ok: true,
          data: info.response,
        });
      }
    })
  );
}

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.send(users);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/SendMail", async (req, res) => {
  try {
    const response = await SendMail(req.body);
    if (!response.ok) return res.status(500).send("Error");
    res.send(response);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/GetUserData", async (req, res) => {
  try {
    const user = await Users.findOne({
      _id: req.body._id,
    });
    if (!user) return res.status(500).send("Error");
    const result = _.omit(user.toObject(), ["Password"]);
    const token = jwt.sign(result, config.JWT_Key);
    res.send({ User: result, token: token });
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/Login", async (req, res) => {
  try {
    const { error } = LoginSchema.validate(req.body);
    if (error) return res.status(500).send(error.details[0].message);

    const user = await Users.findOne().or([
      {
        Email: req.body.Email,
      },
      {
        Phone: req.body.Email,
      },
    ]);
    if (!user) return res.status(400).send("Account Does not exists!");

    const CheckPassword = await bcrypt.compare(
      req.body.Password,
      user.Password
    );
    if (!CheckPassword)
      return res
        .status(400)
        .send({ Result: "Invalid Email or Password", isSuccessfull: false });

    const result = _.omit(user.toObject(), ["Password", "Wishlist", "Cart"]);
    result.RememberMe = req.body.RememberMe;
    result.Mode = req.body.Mode;
    result.Status = "Online";

    user.updateOne(
      {
        $set: {
          RememberMe: req.body.RememberMe,
          Mode: req.body.Mode,
          Status: "Online",
        },
      },
      {},
      async function (err, doc) {}
    );

    const token = jwt.sign(result, config.JWT_Key);

    res.send({ User: result, token: token, isSuccessfull: true });
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/LoginWithGoogle", async (req, res) => {
  try {
    const user = await Users.findOne({
      Email: req.body.Email,
    });
    if (!user) return res.status(400).send("Account Does not exists!");

    const result = _.omit(user.toObject(), ["Password", "Wishlist", "Cart"]);
    result.RememberMe = req.body.RememberMe;
    result.Mode = req.body.Mode;
    result.Status = "Online";

    user.updateOne(
      {
        $set: {
          RememberMe: req.body.RememberMe,
          Mode: req.body.Mode,
          Status: "Online",
        },
      },
      {},
      async function (err, doc) {}
    );

    const token = jwt.sign(result, config.JWT_Key);

    res.send({ User: result, token: token, isSuccessfull: true });
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/Register", async (req, res) => {
  try {
    const { error } = RegisterSchema.validate(req.body);
    if (error) return res.status(500).send(error.details[0].message);

    const checkEmail = await Users.findOne({ Email: req.body.Email });
    if (checkEmail) return res.status(500).send("Email already exists");

    const checkPhone = await Users.findOne({ Phone: req.body.Phone });
    if (checkPhone) return res.status(500).send("Phone already exists");

    const user = new Users({
      Name: req.body.Name,
      Email: req.body.Email,
      Phone: req.body.Phone,
      Password: req.body.Password,
      Mode: req.body.Mode,
    });

    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(user.Password, salt);
    await user.save();

    const result = _.omit(user.toObject(), ["Password"]);

    const token = jwt.sign(result, config.JWT_Key);

    res.send({ User: result, token: token, isSuccessfull: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

router.post("/ChangePassword", async (req, res) => {
  try {
    const user = await Users.findById(req.body._id);
    if (!user) return res.status(400).send("Invalid ID");

    const CheckPassword = await bcrypt.compare(
      req.body.CurrentPassword,
      user.Password
    );
    if (!CheckPassword) return res.status(400).send("Invalid Current Password");

    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(req.body.NewPassword, salt);
    await user.save();
    res.send("Password Changed Successfully");
    const response = await SendMail({
      to: user.Email,
      subject: "Password Changed!",
      text: "Your Password has been changed successfully",
    });
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/SendOTP", async (req, res) => {
  try {
    const user = await Users.findOne().or([
      {
        Email: req.body.Email,
      },
      {
        Phone: req.body.Email,
      },
    ]);
    if (!user)
      return res.status(500).send("Account with this Email/Phone not found!");

    const OTP = random(100000, 999999).toString();
    user.OTP = OTP;
    await user.save();

    let Data = {
      to: user.Email,
      subject: "OTP for Reset Password",
      text: `${OTP} is your OTP for password reset request\n ~ Regards, EasyShop`,
    };

    const response = await SendMail(Data);
    if (!response.ok) return res.status(500).send("Server Error");
    res.send("OTP Sent Successfully");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/VerifyOTP", async (req, res) => {
  try {
    const user = await Users.findOne().or([
      {
        Email: req.body.Email,
      },
      {
        Phone: req.body.Email,
      },
    ]);
    if (!user)
      return res.status(500).send("Account with this Email/Phone not found!");

    if (user.OTP === req.body.OTP) {
      res.send("Success");
    } else {
      res.status(500).send("Invalid OTP");
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/ResetPassword", async (req, res) => {
  try {
    const user = await Users.findOne().or([
      {
        Email: req.body.Email,
      },
      {
        Phone: req.body.Email,
      },
    ]);
    if (!user)
      return res.status(500).send("Account with this Email/Phone not found!");

    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(req.body.Password, salt);
    await user.save();

    let Data = {
      to: user.Email,
      subject: "Password Changed Successfully",
      text:
        "Your Password has been changed successfully. Please login to continue.\n ~ Regards, EasyShop",
    };

    const response = await SendMail(Data);

    res.send("Success");
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/SendEmailCode", async (req, res) => {
  try {
    const user = await Users.findOne({
      Email: req.body.Email,
    });
    if (!user)
      return res.status(500).send("Account with this Email/Phone not found!");

    const OTP = random(100000, 999999).toString();
    user.OTP = OTP;
    await user.save();

    let Data = {
      to: user.Email,
      subject: "OTP for Email Verification",
      text: `${OTP} is your OTP for Email Verification\n ~ Regards, EasyShop`,
    };

    const response = await SendMail(Data);
    if (!response.ok) return res.status(500).send("Server Error");
    res.send("OTP Sent Successfully");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/VerifyEmail", async (req, res) => {
  try {
    const user = await Users.findOne({
      Email: req.body.Email,
    });
    if (!user)
      return res.status(500).send("Account with this Email/Phone not found!");

    if (user.OTP === req.body.OTP) {
      Users.findOneAndUpdate(
        { Email: req.body.Email },
        { $set: { Email_Verified: true } },
        { useFindAndModify: false },
        async function (err) {
          if (err) {
            res.status(500).send("Server Error.");
          } else {
            res.send("Email Verified");
            let Data = {
              to: req.body.Email,
              subject: "Email Verified Successfully",
              text:
                "Your Email has been verified successfully. \n ~ Regards, EasyShop",
            };

            const response = await SendMail(Data);
          }
        }
      );
    } else {
      res.status(500).send("Invalid OTP");
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/Logout", async (req, res) => {
  try {
    const time = CurrentTime();
    Users.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          Status: "Offline",
          LastSeen: time,
        },
      },
      { useFindAndModify: false },
      async function (err, doc) {
        if (err) {
          res.status(500).send({ Result: "Error in Logging Out" });
        } else {
          res.send("Logout Successful");
        }
      }
    );
  } catch (error) {
    res.status(500).send("Error");
  }
});

module.exports = router;
