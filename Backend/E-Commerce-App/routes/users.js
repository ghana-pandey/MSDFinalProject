const {User}=require('../models/user')
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const config=require('../config.json')
router.get("/users", async (req, res) =>{
    console.log("ji")
    const users = await User.find().select('-password');

    if(!users) {
        res.status(500).json({success: false})
    } 
    res.send(users);
})
router.get('/users/:id', async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
})


router.post('/register',async(req,res)=>{
    const exist = await User.findOne({ email: req.body.email }).exec();
  if (exist) {
    return res.status(400).json({ errors: "Email already exist" });
  } else {
    let user=new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isOwner: req.body.isOwner,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
  }
})
router.post('/login',async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send("user not exist")
    }
    if(user && bcrypt.compareSync(req.body.password,user.password)){
        const token=jwt.sign({
            userId:user.id,
            isOwner:user.isOwner
        },
        config.secret
        )
        res.status(200).send({user:user.email,token:token})
    }
    else{
        res.status(400).send("password is wrong")
    }
})
router.delete("/users/:id", async (req, res) => {
    let delUser = await User.findByIdAndRemove(req.params.id);
    if (delUser) {
      res.status(200).json({ sucess: true, message: "succesfullly deleted" });
    } else {
      res.status(404).json({ sucess: false, message: "not such category" });
    }
  });

module.exports=router