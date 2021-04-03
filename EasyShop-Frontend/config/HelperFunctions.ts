import moment from "moment";

import ColorPickerSchema from "../schema/ColorPickerSchema";
import AppConfiguration from "./AppConfiguration";

const Default = AppConfiguration.DefaultProduct;

const ColorArray = ColorPickerSchema.NamedColors;

const GivePrice = (price: any) => {
  price = price.replace(/,/g, "");
  const sign = "₹ ";
  let commaIndex = price.split(".")[0].length - 3;
  let Formatted =
    price.split(".")[0].length > 3
      ? price.substring(0, commaIndex).replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
        "," +
        price.substring(commaIndex)
      : price;
  return sign + Formatted;
};

const GiveImage = (arr: any) => {
  let ImageExts = ["jpg", "png", "jpeg"];
  let Exts = "";
  for (let i = 0; i < arr.length; i++) {
    Exts = arr[i].split(".").pop();
    if (ImageExts.indexOf(Exts) > -1) {
      return arr[i];
    }
  }
  return Default;
};

const abbreviateNumber = (value: any) => {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ["", "k", "m", "b", "t"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = 0;
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 != 0) shortValue = parseInt(shortValue.toFixed(1));
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
};

const GiveMimeType = (File: any) => {
  let URL = File.toLowerCase();
  let ImageExts = ["jpg", "png", "jpeg"];
  let VideoExts = ["mp4", "mkv", "3gp"];
  let Exts = URL.split(".").pop();
  if (ImageExts.indexOf(Exts) > -1) {
    return "image";
  } else if (VideoExts.indexOf(Exts) > -1) {
    return "video";
  } else {
    return "none";
  }
};

const GiveMimeTypeMessage = (File: any) => {
  let URL = File.toLowerCase();
  let ImageExts = ["jpg", "png", "jpeg"];
  let VideoExts = ["mp4", "3gp"];
  let AudioExts = ["m4a", "mp3", "wav"];
  let Exts = URL.split(".").pop();
  if (ImageExts.indexOf(Exts) > -1) {
    return "image";
  } else if (VideoExts.indexOf(Exts) > -1) {
    return "video";
  } else if (AudioExts.indexOf(Exts) > -1) {
    return "audio";
  } else {
    return "none";
  }
};

const ColorVariant = (Color: any, Variant: any) => {
  return Variant ? Variant : Color.charAt(0).toUpperCase() + Color.slice(1);
};

const CheckColor = (color: any) => {
  let Hex = /^#[0-9A-F]{6}$/i.test(color);

  let Named = ColorArray.findIndex(
    (item) => color.toLowerCase() === item.toLowerCase()
  );

  if (Named > -1) {
    return color.toLowerCase();
  } else if (Hex === true) {
    return color;
  } else {
    return "None";
  }
};

const GenerateUniqueID = () => {
  return Math.floor(Math.random() * Date.now()).toString();
};

const GetOtherUser = (obj: any, _id: any) => {
  if (obj[0]._id === _id) {
    return obj[1];
  } else {
    return obj[0];
  }
};

const GetCurrentTime = () => {
  return moment().utcOffset(330).format("h:mm A");
};

const GetTodayDate = () => {
  return moment().utcOffset(330).format("Do MMMM, YYYY");
};

const TodayDateFormat = () => {
  return (
    moment().utcOffset(330).format("DDMMYYYY_HHmmss_") +
    Math.floor(Math.random() * (9999 - 1 + 1)) +
    1 +
    "_ES"
  );
};

function TimeAgo(date: any) {
  const temp = new Date(date);
  var seconds = Math.floor((new Date() - temp) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + "y";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }
  return Math.floor(seconds) + "s";
}

function getDisplayDate(date: any) {
  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  const temp = new Date(date);
  let diff = today.getTime() - temp.getTime();

  if (temp.getTime() == today.getTime()) {
    return "Today";
  } else if (diff <= 24 * 60 * 60 * 1000) {
    return "Yesterday";
  } else {
    let year = temp.getFullYear();
    let month = (1 + temp.getMonth()).toString().padStart(2, "0");
    let day = temp.getDate().toString().padStart(2, "0");
    return day + "/" + month + "/" + year;
  }
}

const GetDurationFormat = (duration: any) => {
  let time = duration / 1000;
  let minutes = Math.floor(time / 60);
  let timeForSeconds = time - minutes * 60;
  let seconds = Math.floor(timeForSeconds);
  let secondsReadable = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${secondsReadable}`;
};

const GiveAddressFormat = (data: any) => {
  return (
    data.Address +
    ", " +
    data.Locality +
    ", " +
    data.City +
    ", " +
    data.State +
    " - " +
    data.Pincode
  ).replace(/,,/g, ",");
};

const GiveOrderDate = (str: any) => {
  const data = new Date(str);
  return moment(data).format("Do MMMM, YYYY");
};

const GiveDeliveryDate = (str: any) => {
  const data = new Date(str);
  return moment(data).add(4, "days").format("Do MMMM, YYYY");
};

const NumberOfDays = (str: any) => {
  const data = new Date(str);
  const One = moment(data);
  const Two = moment().utcOffset(330);
  return Two.diff(One, "days");
};

export default {
  GivePrice,
  GiveImage,
  abbreviateNumber,
  GiveMimeType,
  ColorVariant,
  CheckColor,
  GenerateUniqueID,
  GetCurrentTime,
  GetTodayDate,
  GetOtherUser,
  GiveMimeTypeMessage,
  TodayDateFormat,
  TimeAgo,
  getDisplayDate,
  GetDurationFormat,
  GiveOrderDate,
  GiveAddressFormat,
  GiveDeliveryDate,
  NumberOfDays,
};
