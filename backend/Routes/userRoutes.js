const { userLogin } = require("../Controllers/userController");

const router=require("express").Router()

router.post("/login",userLogin)

module.exports = router;