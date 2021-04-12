const _ = require("lodash");
const express = require("express");
const fs = require("fs");
const multer = require("multer");
const router = express.Router();

const { Chats } = require("../models/Chats");
const DateTime = require("../config/TimeFunctions.ts");
const { Users } = require("../models/Users");
const e = require("express");

fs.mkdir("./uploads/Chats/", { recursive: true }, (err) => {});

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", async (req, res) => {
  try {
    const chats = await Chats.find();
    res.send(chats);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/CreateChat", async (req, res) => {
  try {
    const userOne = await Users.findById(req.body.UserOneID);
    if (!userOne) return res.status(500).send("Invalid ID");
    const userTwo = await Users.findById(req.body.UserTwoID);
    if (!userTwo) return res.status(500).send("Invalid ID");

    const CheckUser_One = [
      _.pick(userOne, ["Name", "_id", "ProfilePicture"]),
      _.pick(userTwo, ["Name", "_id", "ProfilePicture"]),
    ];

    const chatOne = await Chats.findOne({
      Users: CheckUser_One,
    });
    if (chatOne) return res.status(200).send(chatOne);

    const CheckUser_Two = [
      _.pick(userTwo, ["Name", "_id", "ProfilePicture"]),
      _.pick(userOne, ["Name", "_id", "ProfilePicture"]),
    ];

    const chatTwo = await Chats.findOne({
      Users: CheckUser_Two,
    });
    if (chatTwo) return res.status(200).send(chatTwo);

    const newChat = new Chats({
      Users: CheckUser_One,
      Participants: CheckUser_One,
    });

    const DirName = `./uploads/Chats/${newChat._id}`;

    fs.mkdir(DirName, { recursive: true }, async (err) => {
      if (err) {
        return res.status(500).send("Some Error");
      } else {
        await newChat.save();
        res.send(newChat);
      }
    });
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/DeleteChat", async (req, res) => {
  try {
    const chat = await Chats.findById(req.body._id);
    if (!chat) return res.status(500).send("Invalid ID");

    const user = chat.Users.filter(
      (c) => c._id.toString() === req.body.OwnerID
    );
    if (user.length === 0) return res.status(500).send("Invalid User ID");

    const DirName = `./uploads/Chats/${chat._id}`;

    chat.Participants = chat.Participants.filter(
      (c) => c._id.toString() !== req.body.OwnerID
    );

    if (chat.Participants.length === 0) {
      fs.rmdir(DirName, { recursive: true }, async (err) => {
        if (err) {
        } else {
          await chat.remove();
          res.send("Deleted Chat");
        }
      });
    } else {
      await chat.save();
      res.send("Deleted Chat");
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/GetUserChats", async (req, res) => {
  try {
    const user = await Users.findById(req.body._id);
    if (!user) return res.status(500).send("Invalid User ID");

    const chats = await Chats.find({
      Participants: { $elemMatch: { _id: user._id } },
      $nor: [{ Messages: { $size: 0 } }],
    });

    res.send(chats);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/SendMessage", async (req, res) => {
  try {
    const chat = await Chats.findById(req.body._id);
    if (!chat) return res.status(500).send("Invalid Chat ID");

    const CurrentDate = DateTime.GetTodayDate();

    let newMessage = {
      From: req.body.From,
      Message: req.body.Message,
      Time: DateTime.GetCurrentTime(),
      LastMessage: req.body.Message,
      DateOBJ: DateTime.GetDateOBJ(),
      Type: req.body.Type,
      Read: req.body.Read,
    };

    chat.LastMessage = req.body.Message;
    chat.LastMessageType = "Text";

    if (chat.Messages.length === 0) {
      newMessage.Date = CurrentDate;
      chat.LastMessageDate = CurrentDate;
    } else {
      if (chat.LastMessageDate === CurrentDate) {
        newMessage.Date = "";
      } else {
        newMessage.Date = CurrentDate;
        chat.LastMessageDate = CurrentDate;
      }
    }

    chat.Messages.push(newMessage);
    await chat.save();

    res.send(newMessage);
  } catch (error) {
    res.status(500).send("Error");
  }
});

router.post("/SendFile", upload.any(), async (req, res) => {
  let File = "";
  let Preview = "";
  let FileName = "";
  let PreviewName = "";
  let mimetype = "";
  try {
    if (req.files.length) {
      const chat = await Chats.findById(req.body._id);
      if (!chat) return res.status(500).send("Invalid Chat ID");

      mimetype = req.files[0].mimetype.slice(0, 5);
      if (mimetype === "image") {
        FileName += "IMG_";
      } else if (mimetype === "video") {
        FileName += "VID_";
      } else if (mimetype === "audio") {
        FileName += "AUD_";
      } else {
        return res.status(400).send("Only Image/Videos/Audio Allowed");
      }

      FileName += `${
        DateTime.TodayDateFormat() +
        "." +
        req.files[0].originalname.split(".").pop()
      }`;

      if (req.files.length === 2) {
        PreviewName += `Preview_${
          DateTime.TodayDateFormat() +
          "." +
          req.files[1].originalname.split(".").pop()
        }`;
      }

      const DirName = `./uploads/Chats/${chat._id}/${req.body.From}`;
      const FileDirName = `${DirName}/Files`;
      const PreviewDirName = `${DirName}/Previews`;

      File = `${DirName}/Files/${FileName}`;
      Preview = `${DirName}/Previews/${PreviewName}`;

      if (mimetype === "audio") {
        fs.mkdir(FileDirName, { recursive: true }, async (err) => {
          if (err) {
            return res.status(400).send("Some Error");
          } else {
            fs.writeFile(
              File,
              req.files[0].buffer,
              "ascii",
              async function (err) {
                if (err) {
                  return res.status(400).send("Error in Creating Main File");
                } else {
                  const CurrentDate = DateTime.GetTodayDate();
                  let newMessage = {
                    From: req.body.From,
                    Time: DateTime.GetCurrentTime(),
                    DateOBJ: DateTime.GetDateOBJ(),
                    Message: "",
                    Type: req.body.Type,
                    Read: req.body.Read,
                    Mime: req.body.Mime,
                    File: File.slice(1),
                    PreviewFile: Preview.slice(1),
                  };
                  chat.LastMessage = mimetype;
                  chat.LastMessageType = "File";
                  if (chat.Messages.length === 0) {
                    newMessage.Date = CurrentDate;
                    chat.LastMessageDate = CurrentDate;
                  } else {
                    if (chat.LastMessageDate === CurrentDate) {
                      newMessage.Date = "";
                    } else {
                      newMessage.Date = CurrentDate;
                      chat.LastMessageDate = CurrentDate;
                    }
                  }
                  chat.Messages.push(newMessage);
                  await chat.save();
                  res.send(newMessage);
                }
              }
            );
          }
        });
      } else {
        fs.mkdir(FileDirName, { recursive: true }, async (err) => {
          if (err) {
            return res.status(400).send("Some Error");
          } else {
            fs.mkdir(PreviewDirName, { recursive: true }, async (err) => {
              if (err) {
                return res.status(400).send("Some Error");
              } else {
                fs.writeFile(
                  Preview,
                  req.files[1].buffer,
                  "ascii",
                  async function (err) {
                    if (err) {
                      return res.status(400).send("Error in Creating Preview");
                    } else {
                      fs.writeFile(
                        File,
                        req.files[0].buffer,
                        "ascii",
                        async function (err) {
                          if (err) {
                            fs.unlink(`${Preview}`, function (err) {});
                            return res
                              .status(400)
                              .send("Error in Creating Main File");
                          } else {
                            const CurrentDate = DateTime.GetTodayDate();
                            let newMessage = {
                              From: req.body.From,
                              Time: DateTime.GetCurrentTime(),
                              DateOBJ: DateTime.GetDateOBJ(),
                              Message: "",
                              Type: req.body.Type,
                              Read: req.body.Read,
                              Mime: req.body.Mime,
                              File: File.slice(1),
                              PreviewFile: Preview.slice(1),
                            };
                            chat.LastMessage = mimetype;
                            chat.LastMessageType = "File";
                            if (chat.Messages.length === 0) {
                              newMessage.Date = CurrentDate;
                              chat.LastMessageDate = CurrentDate;
                            } else {
                              if (chat.LastMessageDate === CurrentDate) {
                                newMessage.Date = "";
                              } else {
                                newMessage.Date = CurrentDate;
                                chat.LastMessageDate = CurrentDate;
                              }
                            }
                            chat.Messages.push(newMessage);
                            await chat.save();
                            res.send(newMessage);
                          }
                        }
                      );
                    }
                  }
                );
              }
            });
          }
        });
      }
    } else {
      return res.status(400).send("File is required");
    }
  } catch (error) {
    fs.unlink(`${File}`, function (err) {});
    fs.unlink(`${Preview}`, function (err) {});
    res.status(500).send("Cathc Error");
  }
});

router.post("/ReadAllMessages", async (req, res) => {
  try {
    let count = 0;
    const chat = await Chats.findById(req.body._id);
    if (!chat) return res.status(500).send("Invalid Chat ID");

    for (let i = chat.Messages.length - 1; i >= 0; i--) {
      if (chat.Messages[i].From.toString() !== req.body.SeenBy.toString()) {
        if (chat.Messages[i].Read === true) {
          break;
        } else {
          chat.Messages[i].Read = true;
          count++;
        }
      }
    }
    if (count === 0) {
      res.status(200).send("Done");
    } else {
      await chat.save();
      res.status(200).send("Done");
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});

module.exports = router;
