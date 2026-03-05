const { getAllProducts, createProduct, deleteProduct, updateProduct } = require("../Controllers/productController");
const { userLogin, logoutUser, checkAuthUser } = require("../Controllers/userController");
const auth = require("../Middleware/auth");

const router=require("express").Router()

router.post("/login",userLogin)
router.post("/logout",logoutUser)
router.post("/addproduct",auth,createProduct)


router.get("/fetchAllProduct",auth ,getAllProducts)
router.get("/checkAuth",checkAuthUser)

router.delete("/deleteproduct/:id",auth,deleteProduct)

router.put("/updateproduct/:id",auth,updateProduct)


module.exports = router;