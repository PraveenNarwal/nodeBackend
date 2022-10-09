const { Category } = require("../models/category");
const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
    const products = await Product.find().populate('category');

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

module.exports = router;
