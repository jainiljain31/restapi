require("dotenv").config();
const express = require("express");
const app = express();
const products_routes = require("./routes/product");
const PORT = 8000;
const connectDB = require("./db/connect");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
      .then(() => {
        console.log("MongoDB Connected successfully");
      })
      .catch(() => {
        console.log("Connection failure");
      });
    app.listen(PORT, () => {
      console.log(`Server is listening at port:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

// middleware or to set router
app.use("/api/products", products_routes);

start();
