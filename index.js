const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const DB = require("./config/connection");
const mainRoute = require("./routes/product.route");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use("/api/product", mainRoute);
app.listen(PORT, () => {
  console.log(" listening on port ", PORT);
});
