const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  files: {
    type: Array,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
