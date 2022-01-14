const {Product}=require('../models/product')
const {Category}=require('../models/category')
const express=require('express')
const router=express.Router();
router.get('/product',async(req,res)=>{
    let getProductByCategory={};
    if(req.query.categories){
        getProductByCategory={category:req.query.categories.split(' ')}
    }
    const products=await Product.find().populate('category');
    if(!products){
        res.status(500).json({sucess:false})
    }
    res.send(products)
})
router.get('/product/:id',async(req,res)=>{
    
    const product=await Product.findById(req.params.id).populate('category');
    if(!product) {
        res.status(500).json({sucess:false})
    }
    res.send(product)
})
router.post('/product',async (req,res)=>{
    const existCategory=await Category.findById(req.body.category)
    if(!existCategory)
    return res.status(400).send("not such caegory")
    let newProduct=new Product({
        name:req.body.name,
        description:req.body.description,
        image:req.body.image,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        totalStock:req.body.totalStock,
        rating:req.body.rating
    })
  newProduct=await newProduct.save();
  if (!newProduct) {
    res.status(404).send("can not be created");
  }
  res.status(201).send(newProduct);
});

router.put('/product/:id',async (req,res)=>{
    const updateProduct=await Product.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        description:req.body.description,
        image:req.body.image,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        totalStock:req.body.totalStock,
        rating:req.body.rating

    },{new:true}
    )
    if(!updateProduct){
       res.status(400).send("not updated") 
    }
    res.send(updateProduct)

})
router.delete("/product/:id", async (req, res) => {
    let delProduct = await Product.findByIdAndRemove(req.params.id);
    if (delProduct) {
      res.status(200).json({ sucess: true, message: "succesfullly deleted" });
    } else {
      res.status(404).json({ sucess: false, message: "not such category" });
    }
  });

module.exports=router;