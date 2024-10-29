module.exports = (app) => {
  const user = require("../controllers/user.controllers");
  const router = require("express").Router();

  // Login
  router.post("/user/login");

  app.use("/", router);
};
