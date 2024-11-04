const mongoose = require("mongoose");
const User = require("../models/auth.models");

mongoose
  .connect("mongodb://localhost:27017/crud")
  .then(async () => {
    console.log("Connected to Database");

    await User.deleteMany({});

    const user = new User({
      name: "Syahrul",
      password: "123",
    });

    await user.save();
    console.log("User created");

    mongoose.disconnect();
  })
  .catch((err) => {
    console.log("Failed to connect to Database", err);
  });
