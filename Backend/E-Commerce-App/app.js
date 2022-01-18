const express = require("express");
const cors=require('cors')
const mongoose = require("mongoose");
const categoryRoute=require('./routes/categories')
const productRoute=require('./routes/products')
 const userRoute=require('./routes/users')
 const orderRoute=require('./routes/orders')
const app = express();
const authJwt=require('./middleware/auth')

mongoose
  .connect(
    "mongodb+srv://test-user:GHane352202@cluster0.ni3ei.mongodb.net/finalprojectdatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database sucessfuly connected");
  })
  .catch((err) => {
    console.log(err);
  });
  app.use(cors());
  app.use(express.json());
  app.use(authJwt())
  app.use('/image/user',express.static(__dirname+'/image/user'))
  
  app.use((err,req,res,next)=>{
    if(err){
      res.status(500).json({message:"OOPs Sorry,try again later"})
    }
  })
  app.use(categoryRoute)
  app.use(productRoute)
   app.use(userRoute)
   app.use(orderRoute)

app.listen(3000, () => console.log(" 🌍 listening port 3000"));
