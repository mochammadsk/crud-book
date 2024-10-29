const User = require("../models/auth.models");
const bcrypt = require("bcrypt");

// Login user
exports.signin = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    res.status(200).send({ messages: "Login Succesful!", name: user.name });
  } catch (error) {
    res.status(400).send(error);
  }
};
