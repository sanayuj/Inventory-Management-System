const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: "1d",
  });
};

const userLogin = async (req, res) => {
  try {
console.log("controller!!!",req.body);

    const { email, password } = req.body;

    // check user exists
    const user = await User.findOne({ email });
    console.log(user);
    
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // generate JWT token
    const token = createToken(user._id)
 
console.log(token,"#####");

      res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax"
    });
    res.status(200).json({
      message: "Login successful",
      success:true,
      token,


      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = { userLogin };