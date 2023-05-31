const fs = require("fs");
const Product = require("../models/products.model");
const cloudinary = require("../config/coludinary");

module.exports.uploadFiles = async (req, res) => {
  const { name, description, price } = req.body;
  const uploader = async (path) => {
    await cloudinary.uploads(path, "Images");
  };
  try {
    if (req.method === "POST") {
      const urls = [];

      const files = req.files;
      for (let file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }

      const product = new Product({
        name: name,
        description: description,
        price: price,
        files: urls,
      });

      await product.save();

      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: `${req.method} method not allowed`,
      });
    }
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports.updateFile = async (req, res) => {
  const { name, description, price } = req.body;

  const uploader = async (path) => await cloudinary.uploads(path, "Images");

  //Destructing the id from req.params
  const { id } = req.params;

  //assigning the specfic product to variable called product
  let product = await productModel.findOne({ productId: id });

  try {
    if (product) {
      //updating the datas of that product
      if (req.method === "PUT") {
        const urls = [];
        const files = req.files;
        for (const file of files) {
          const { path } = file;
          const newPath = await uploader(path);
          urls.push(newPath);
          fs.unlinkSync(path);
        }

        //Updating the product
        product.updateOne(
          {
            $set: {
              name: name,
              description: description,
              price: price,
              files: urls,
            },
          },
          {},
          { new: true }
        );

        return res.status(200).json({
          success: true,
          message: "product updated sucessfully",
          data: req.body,
        });
      } else {
        return res.status(405).json({
          err: `${req.method} method not allowed`,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "product not found",
      });
    }
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
};
