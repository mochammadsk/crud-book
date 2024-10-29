const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token!" });
  }
};

module.exports = auth;
