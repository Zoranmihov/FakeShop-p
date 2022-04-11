const express = require("express");
const path = require("path");
const app = express();

let dbConnect = require("./dbConnect");

app.use(express.json());
let productsRoute = require("./routes/productsRoute");
let userRoute = require("./routes/userRoute");
let ordersRoute = require("./routes/ordersRoute");

app.use("/api/products/", productsRoute);
app.use("/api/users/", userRoute);
app.use("/api/orders/", ordersRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: { message: error.message } });
});

app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server is running on ${port}`));
