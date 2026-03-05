const jwt = require("jsonwebtoken");
const userModel = require("../Model/user");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies?.token; 

    if (!token) {
      return res.status(401).json({
        loginfail: true,
        status: false,
        message: "No auth token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);
    console.log(decoded, "Decoded JWT");

    const admin = await userModel.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({
        loginfail: true,
        status: false,
        message: "Unauthorized token",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error(error, "Auth middleware error");

    res.clearCookie("token");

    return res.status(401).json({
      loginfail: true,
      status: false,
      message: "Unauthorized",
    });
  }
};