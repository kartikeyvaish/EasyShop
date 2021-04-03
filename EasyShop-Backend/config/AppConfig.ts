let host = "localhost (or any other IP if Available)";
let DB_PORT = 27017;
let DB_Name = "Database Name as Required";
let Portal_Email = "company <Your Company's Email>";

const Configuration = {
  Port: process.env.PORT || 3000,
  db_url: `mongodb://${host}:${DB_PORT}/${DB_Name}`,
  db_config: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  JWT_Key: "JWT Key for encoding data",
  Portal_Email: Portal_Email,
  TransportPayload: {
    service: "Email Service Provider like Gmail, Hotmail etc.",
    auth: {
      user: "Your Company's Email",
      pass: "Password",
    },
  },
};

module.exports = Configuration;
