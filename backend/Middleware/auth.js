const jwt = require("jsonwebtoken");
const userModel = require("../Model/user");

module.exports = async (req, res, next) => {
  console.log("Admin middleware running");

  try {
    // Get token from cookie
    const token = req.cookies?.token; // requires cookie-parser
    console.log(token, "TOKEN from cookie");

    if (!token) {
      return res.status(401).json({
        loginfail: true,
        status: false,
        message: "No auth token",
      });
    }

    // Decode and verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);
    console.log(decoded, "Decoded JWT");

    // Check if user exists
    const admin = await userModel.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({
        loginfail: true,
        status: false,
        message: "Unauthorized token",
      });
    }

    // Attach user to request object
    req.admin = admin;
    next();
  } catch (error) {
    console.error(error, "Auth middleware error");

    // Clear invalid token from cookies (optional)
    res.clearCookie("token");

    return res.status(401).json({
      loginfail: true,
      status: false,
      message: "Unauthorized",
    });
  }
};