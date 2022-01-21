const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  icon:
 *                       type: string
 */

/**
 * @swagger
 * /category:
 *  get:
 *      summary: This api is used to check if get Category method is working or not
 *      description: Should return all the categories from the database
 *      responses:
 *          200:
 *              description: sucess
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Category'
 */

router.get("/category", async (req, res) => {
  const getCategory = await Category.find();
  if (!getCategory) {
    res.status(500).json({ sucess: false });
  }
  res.status(200).send(getCategory);
});
/**
 * @swagger
 * /category/{id}:
 *  get:
 *      summary: To get 
 *      description: this api is used to fetch single data from DB using particular id
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: String ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#components/schemas/Category'
 */
router.get("/category/:id", async(req,res)=>{
    const category=await Category.findById(req.params.id)
    if(!category) {
        res.status(500).json({message:"not such category"})
    }
    res.status(200).send(category)
})
/**
 * @swagger
 * /category:
 *  post:
 *      summary: used to insert category into database
 *      description: this api is used to save new category
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Category'
 *      responses:
 *          200:
 *              description: sucess
 */

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
/**
 * @swagger
 * /category/{id}:
 *  put:
 *      summary: used to update data the category
 *      description: this api is used to update the category
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: string ID required
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Category'
 *      responses:
 *          201:
 *              description: Updated Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Category'
 */
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
/**
 * @swagger
 * /category/{id}:
 *  delete:
 *      summary: this api is use to delete the category
 *      description: this api is used to delete
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: String ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: sucesfully deleted
 */
router.delete("/category/:id", async (req, res) => {
  let delCategory = await Category.findByIdAndRemove(req.params.id);
  if (delCategory) {
    res.status(200).json({ sucess: true, message: "succesfullly deleted" });
  } else {
    res.status(404).json({ sucess: false, message: "not such category" });
  }
});
module.exports = router;
