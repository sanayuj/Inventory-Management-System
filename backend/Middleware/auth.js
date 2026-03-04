const jwt = require('jsonwebtoken')
const userModel=require("../Model/user")

module.exports = async (req, res, next) => {
  console.log("Admmin")
  try {
    const authHeader = req.headers.authorization
    console.log(authHeader,"AU")
    const authtoken = authHeader.replace(/^Bearer\s+/i, '');
    console.log(authtoken,"AUUTH")
    //if there is no token
    if (!authtoken) return res.json({ loginfail: true, status: false, message: "NO auth token" })

    //decodin the token
    const decoded = jwt.verify(authtoken, process.env.JWT_SECRETE_KEY)
    //checking whether user exist or not
    const admin = await userModel.findOne({ _id: decoded.id })
    console.log(admin,"USer")
    if (!admin) return res.json({ loginfail: true, status: false, message: "Unauthorized token" })
    req.admin = admin

    next()

  } catch (error) {
    console.log(error,"Err")
    return res.json({ loginfail: true, status: false, message: "Unauthorized" })
  }
}