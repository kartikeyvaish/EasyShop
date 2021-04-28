import Configuration from "./Configuration";
import ColorPickerSchema from "../schema/ColorPickerSchema";
import moment from "moment";

const Default = Configuration.DefaultProduct;
const ColorArray = ColorPickerSchema;

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

const GiveDayDifference = (str: any) => {
  const data = new Date(str);
  const OrderDate = moment(data);
  const TodayDate = moment().utcOffset(330);
  const DeliveryDate = OrderDate.add(4, "days");

  let Deliver_Today = DeliveryDate.diff(TodayDate, "days");
  let Deliery_Order = DeliveryDate.diff(OrderDate, "days");

  if (Deliver_Today < 0) {
    return 4;
  } else {
    return Deliery_Order;
  }
};

const GetOtherUser = (obj: any, _id: any) => {
  if (obj[0]._id === _id) {
    return obj[1];
  } else {
    return obj[0];
  }
};

function TimeAgo(date: any) {
  const temp: any = new Date(date);
  const currentDate: any = new Date();
  let seconds = Math.floor((currentDate - temp) / 1000);

  let interval = seconds / 31536000;

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

const GetCurrentTime = () => {
  return moment().utcOffset(330).format("h:mm A");
};

const GetTodayDate = () => {
  return moment().utcOffset(330).format("Do MMMM, YYYY");
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

const DefaultExport = {
  GiveImage,
  GivePrice,
  CheckColor,
  GenerateUniqueID,
  GiveAddressFormat,
  GiveOrderDate,
  GiveDeliveryDate,
  NumberOfDays,
  GiveDayDifference,
  GetOtherUser,
  TimeAgo,
  GetCurrentTime,
  GetTodayDate,
  GiveMimeType,
};

export default DefaultExport;
