const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

// Login user
exports.signin = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send({ message: "Invalid password!" });
    }

    // Generate token
    const token = jwt.sign(
      {
        user: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .header(`Authorization`, `Bearer ${token}`)
      .status(200)
      .send({ messages: "Login Succesful!", token });
  } catch (error) {
    res.status(400).send(error);
  }
};
