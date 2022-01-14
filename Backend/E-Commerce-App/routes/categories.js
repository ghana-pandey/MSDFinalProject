const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
router.get("/category", async (req, res) => {
  const getCategory = await Category.find();
  if (!getCategory) {
    res.status(500).json({ sucess: false });
  }
  res.status(200).send(getCategory);
});
router.get("/category/:id", async(req,res)=>{
    const category=await Category.findById(req.params.id)
    if(!category) {
        res.status(500).json({message:"not such category"})
    }
    res.status(200).send(category)
})

router.post("/category", async (req, res) => {
  console.log(req.body);
  let newCategory = new Category({
    name: req.body.name,
    icon: req.body.icon,
  });
  newCategory = await newCategory.save();
  if (!newCategory) {
    res.status(404).send("can not be created");
  }
  res.status(201).send(newCategory);
});
router.put("/category/:id",async(req,res)=>{
    const updateCategory=await Category.findByIdAndUpdate(req.params.id,{
       name:req.body.name,
       icon:req.body.icon 
    },{new:true})
    if (!updateCategory) {
        res.status(404).send("can not be created");
      }
      res.status(201).send(updateCategory);
})

router.delete("/category/:id", async (req, res) => {
  let delCategory = await Category.findByIdAndRemove(req.params.id);
  if (delCategory) {
    res.status(200).json({ sucess: true, message: "succesfullly deleted" });
  } else {
    res.status(404).json({ sucess: false, message: "not such category" });
  }
});
module.exports = router;
