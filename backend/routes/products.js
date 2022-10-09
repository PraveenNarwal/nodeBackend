const { Category } = require("../models/category");
const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res) => {
    const products = await Product.find().populate('category');

    if (!products) {
        res.status(500).json({ success: false });
    }
    res.send(products);
});

router.get(`/:id`, async (req, res) => {
    const products = await Product.findById(req.params.id);

    if (!products) {
        res.status(500).json({ success: false });
    }
    res.send(products);
});

router.post(`/`, async (req, res) => {

    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).send('invalid category');
    }

    const products = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReview: req.body.numReview,
        isFeatured: req.body.isFeatured,

    });
    await products.save();
    if (!products) {
        return res.status(500).send('the product cannot be created');
    }
    res.send(products);

});

router.put("/:id", async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('invalid id of product')
    }
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).send('invalid Product');
    }
    const productUpdate ={
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReview: req.body.numReview,
        isFeatured: req.body.isFeatured,
      };
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productUpdate,
      { new: true,   
         }
    )
    if (!product) {
       return res
        .status(400)
        .json({ success: false, message: "No product found by id" });
    }
    res.send(product)

  });

  router.delete("/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id)
      .then((product) => {
        if (product) {
          return res
            .status(200)
            .json({ success: true, message: "the Product deleted" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "not found the product" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ success: false, error: err });
      });
  });

module.exports = router;
