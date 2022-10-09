const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const products = await Product.find();

  if (!products) {
    res.status(500).json({ success: false });
  }
  res.send(products);
});

router.post(`/`, (req, res) => {
  const products = new Product(req.body);

  products
    .save()
    .then((createdproduct) => {
      res.status(201).json(createdproduct);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
