const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const productController = require("../controllers/product.controller");
router.post(
  "/create",
  upload.array("files", 10),
  productController.uploadFiles
);
router.put(
  "/update/:id",
  upload.array("files", 10),
  productController.updateFile
);
module.exports = router;
