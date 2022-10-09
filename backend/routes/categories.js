const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false, message: 'not get the category for get request'});
  }
  res.status(200).send(categoryList);
});

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category) {
        res.status(500).json({success: false, message: 'No category found by id'});
    }
    res.status(200).send(category);
})




router.post('/', async (req, res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    }) 

    category = await category.save()

    if(!category){
        return res.status(404).send('the category cannot be created');
    }
    res.send(category);
})


router.put("/:id", async (req, res) => {
    const cateUpdate ={
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon,
      };
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      cateUpdate,
      { new: true,   
         }
    )
    if (!category) {
       return res
        .status(400)
        .json({ success: false, message: "No category found by id" });
    }
    res.send(category)

  });

router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "not found the category" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
