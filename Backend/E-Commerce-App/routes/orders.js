const { Order } = require("../models/order");
const { OrderItem } = require("../models/order-item");
const express = require("express");

const router = express.Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          Order:
 *              type: object
 *              proporties:
 *                  streetName:
 *                      type: string
 *                  city:
 *                       type: string
 *                  zip:
 *                       type: string
 *                  country:  
 *                       type: string
 *                  status:
 *                        type: string
 *                  totalPrice:
 *                        type: string
 *                  user:
 *                        type: object
 *                        proporties:
 *                            name:
 *                              type: string 
 * 
 *                   
 */



/**
 * @swagger
 * /orders:
 *  get:
 *      summary: This api is used to check if get Orders method is working or not
 *      description: Should return all the orders from the database
 *      responses:
 *          200:
 *              description: sucess
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Order'
 */

router.get("/orders", async (req, res) => {
  const orders = await Order.find().populate("user", "name");
  if (!orders) {
    res.json({ sucess: false });
  } else {
    res.send(orders);
  }
});
/**
 * @swagger
 * /orders/{id}:
 *  get:
 *      summary: To get the partiular order of particular user 
 *      description: this api is used to fetch single order from DB using particular id
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: String ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: this api is used to fetch indivudual order from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#components/schemas/Order'
 */
router.get("/orders/:id", async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    });
  if (!order) {
    res.json({ sucess: false });
  } else {
    res.send(order);
  }
});

router.post("/orders", async (req, res) => {
  const orderItemArray = Promise.all(
    req.body.orderItems.map(async (item) => {
      let newOrder = new OrderItem({
        quantity: item.quantity,
        product: item.product,
      });

      newOrder = await newOrder.save();
      return newOrder._id;
    })
  );
  const orderids = await orderItemArray;
  const prices=await Promise.all(orderids.map(async(items)=>{
      const orderItem=await OrderItem.findById(items).populate('product','price')
     const totalPrice=orderItem.product.price*orderItem.quantity;
     console.log(totalPrice)
     return totalPrice;
  }))

  totalPrice=prices.reduce((first,second)=>first+second,0)
  console.log(totalPrice)
  let newOrders = new Order({
    orderItems: orderids,
    streetName: req.body.streetName,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice:totalPrice,
    user: req.body.user,
  });
  newOrders = await newOrders.save();
  if (!newOrders) {
    res.send("no order created");
  } else {
    res.send(newOrders);
  }
});
router.put("/orders/:id", async (req, res) => {
  const updateOrderStatus = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );
  if(!updateOrderStatus){
      res.send("not created error")
  }
  else
{
  res.send(updateOrderStatus) 
}});
router.get('/userorders/:id',async(req,res)=>{
const orderHistoryid=await Order.find({user:req.parmas.id}).populate({
    path:'product',popualate:'category'
})
if(!orderHistoryid){
    res.send({sucess:false})
}
else {
    res.send(orderHistoryid)
}
})
module.exports = router;
