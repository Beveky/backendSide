const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "products", // Specify the folder where you want to store your images
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
});

const parser = multer({ storage: storage });

// Create a product
router.post(
  "/",
  verifyTokenAndAdmin,
  parser.single("image"),
  async (req, res) => {
    const { title, desc, categories, size, color, price } = req.body;
    const img = req.file.path;

    const newProduct = new Product({
      title,
      desc,
      img,
      categories,
      size,
      color,
      price,
    });

    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      console.error("Error saving product:", err); // Log the error
      res.status(500).json({ error: "Internal server error" }); // Respond with a generic error message
    }
  }
);

// Update a product
router.put(
  "/:id",
  verifyTokenAndAdmin,
  parser.single("image"),
  async (req, res) => {
    try {
      let updatedProduct;
      if (req.file) {
        // If there is a new image, update the image URL
        const img = req.file.path;
        updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          { ...req.body, img },
          { new: true }
        );
      } else {
        // If there is no new image, update other fields
        updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          { ...req.body },
          { new: true }
        );
      }
      res.status(200).json(updatedProduct);
    } catch (err) {
      console.error("Error updating product:", err); // Log the error
      res.status(500).json({ error: "Internal server error" }); // Respond with a generic error message
    }
  }
);

// Delete a product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    console.error("Error deleting product:", err); // Log the error
    res.status(500).json({ error: "Internal server error" }); // Respond with a generic error message
  }
});

module.exports = router;
