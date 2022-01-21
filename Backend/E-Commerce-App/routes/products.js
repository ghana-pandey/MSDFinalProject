const { Product } = require("../models/product");
const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
const { uploadS3 } = require("../middleware/aws-s3");
/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  brand:
 *                       type: string
 *                  description:
 *                       type: string
 *                  image:
 *                        type: string
 *                  price:
 *                        type: number
 *                  totalStock:
 *                        type: number
 *                  rating:
 *                        type: number
 *                  category:
 *                        type: object
 *                        proporties:
 *                            name:
 *                                type: string
 *                            icon:
 *                                type: string
 *                          
 * 
 *                    
 *                        
 */


/**
 
 * @swagger
 * /product:
 *  get:
 *      summary: To get all products
 *      description: this api is used to fetch all the product
 *      responses:
 *          200:
 *              description: this api is used to fetch product from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Product'
 */

router.get("/product", async (req, res) => {
  let getProductByCategory = {};
  if (req.query.categories) {
    getProductByCategory = { category: req.query.categories.split(" ") };
  }
  const products = await Product.find().populate("category");
  if (!products) {
    res.status(500).json({ sucess: false });
  }
  res.send(products);
});
/**
 * @swagger
 * /product/{id}:
 *  get:
 *      summary: To get particular product with id
 *      description: this api is used to fetch single product from DB using particular id
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: String ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: this api is used to fetch product from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#components/schemas/Product'
 */
router.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    res.status(500).json({ sucess: false });
  }
  res.send(product);

  /**
 * @swagger
 * /product:
 *  post:
 *      summary: used to insert new product 
 *      description: this api is used to insert new product
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Product'
 *      responses:
 *          200:
 *              description: New Product Created
 */
});
router.post("/product", uploadS3.single("image"), async (req, res) => {
  console.log(req.body);
  const existCategory = await Category.findById(req.body.category);
  if (!existCategory) return res.status(400).send("not such caegory");
  const file = req.file;
  if (!file) return res.status(400).send("No image in the request");

  let newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    image: file.location,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    totalStock: req.body.totalStock,
    rating: req.body.rating,
  });
  newProduct = await newProduct.save();
  console.log(newProduct);
  if (!newProduct) {
    res.status(404).send("can not be created");
  }
  res.status(201).send({ newproduct: newProduct, file: file.location });
});
/**
 * @swagger
 * /product/{id}:
 *  put:
 *      summary: used to update the product in category
 *      description: this api is used to update the product
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
 *                      $ref: '#components/schemas/Product'
 *      responses:
 *          201:
 *              description: Updated Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Product'
 */
router.put("/product/:id", uploadS3.single("image"), async (req, res) => {
  const product = await Product.findById(req.params.id);
  const file = req.file;
  let imagePath;
  if (file) {
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/image/user/`;
    imagePath = `${basePath}${fileName}`;
  } else {
    imagePath = product.image;
  }
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      image: imagePath,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      totalStock: req.body.totalStock,
      rating: req.body.rating,
    },
    { new: true }
  );
  if (!updateProduct) {
    res.status(400).send("not updated");
  }
  res.send(updateProduct);
});
/**
 * @swagger
 * /product/{id}:
 *  delete:
 *      summary: this api is use to delete individual product from mongodb database
 *      description: this api is used to delete product  data from mongodb
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: sring ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: data is deleted
 */
router.delete("/product/:id", async (req, res) => {
  let delProduct = await Product.findByIdAndRemove(req.params.id);
  if (delProduct) {
    res.status(200).json({ sucess: true, message: "succesfullly deleted" });
  } else {
    res.status(404).json({ sucess: false, message: "not such category" });
  }
});

module.exports = router;
