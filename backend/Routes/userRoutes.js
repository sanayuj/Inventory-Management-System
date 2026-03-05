const { getAllProducts, createProduct, deleteProduct, updateProduct } = require("../Controllers/productController");
const { userLogin, logoutUser, checkAuthUser } = require("../Controllers/userController");
const auth = require("../Middleware/auth");

const router=require("express").Router()

router.post("/login",userLogin)
router.get("/fetchAllProduct",auth ,getAllProducts)
router.post("/addproduct",auth,createProduct)
router.delete("/deleteproduct/:id",auth,deleteProduct)
router.put("/updateproduct/:id",auth,updateProduct)
router.post("/logout",logoutUser)
router.get("/checkAuth",checkAuthUser)
module.exports = router;