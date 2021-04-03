const moment = require("moment");

const GetCurrentTime = () => {
  return moment().utcOffset(330).format("h:mm A");
};

const GetTodayDate = () => {
  return moment().utcOffset(330).format("Do MMMM, YYYY");
};

const GetDateOBJ = () => {
  return moment().utcOffset(330);
};

const GenerateUniqueID = () => {
  return Math.floor(Math.random() * Date.now()).toString();
};

const TodayDateFormat = () => {
  return (
    moment().utcOffset(330).format("DDMMYYYY_HHmmss_") +
    Math.floor(Math.random() * (9999 - 1 + 1)) +
    1 +
    "_ES"
  );
};

exports.GetCurrentTime = GetCurrentTime;
exports.GetTodayDate = GetTodayDate;
exports.GetDateOBJ = GetDateOBJ;
exports.GenerateUniqueID = GenerateUniqueID;
exports.TodayDateFormat = TodayDateFormat;
