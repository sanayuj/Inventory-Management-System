const { getAllProducts, createProduct, deleteProduct } = require("../Controllers/productController");
const { userLogin } = require("../Controllers/userController");

const router=require("express").Router()

router.post("/login",userLogin)
router.get("/fetchAllProduct",getAllProducts)
router.post("/addproduct",createProduct)
router.delete("/deleteproduct/:id",deleteProduct)

module.exports = router;