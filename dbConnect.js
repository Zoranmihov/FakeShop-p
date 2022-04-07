const mongoose = require("mongoose");

let mongoDbUrl =
  "mongodb+srv://FakeUser:FakeUser97@cluster0.cxkvv.mongodb.net/mern";

mongoose.connect(mongoDbUrl, {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useNewUrlParser: true,
});

let dbConnect = mongoose.connection;

dbConnect.on("error", () => {
  console.log("Fail");
});

dbConnect.on("connected", () => {
  console.log("Success");
});

module.exports = mongoose;
