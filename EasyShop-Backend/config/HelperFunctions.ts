const DateTimeOBJ = () => {
  const dates = new Date();
  return dates.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
};

module.exports = DateTimeOBJ;
