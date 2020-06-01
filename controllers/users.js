const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

//@desc Register new user
//@eoutr GET /api/users
//@acess Public
exports.addUser = async (req, res, next) => {
  // res.send("Resgiter");
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ msg: "Please enter all fields" });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exist" });
    user = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = jwt.sign({ id: user.id }, config.get("jwtSecret"));

    res.header("x-auth-token", token).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
    // const token = jwt.sign({ id: user.id }, config.get("jwtSecret"));

    // res.header("x-auth-token", token).json({
    //   token,
    //   user: { id: user.id, name: user.name, email: user.email },
    // });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        sucess: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
};
