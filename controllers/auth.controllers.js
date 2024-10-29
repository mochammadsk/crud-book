const User = require("../models/user.models");

exports.signin = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(404).send({ message: "Wrong password" });
    }

    res.status(200).send({ messages: "Login Succesful!", name: user.name });
  } catch (error) {
    res.status(400).send(error);
  }
};
