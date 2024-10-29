module.exports = (app) => {
  const user = require("../controllers/auth.controllers");
  const router = require("express").Router();

  // Login
  router.post("/signin", async (req, res) => {
    try {
      await user.signin(req, res);
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  });

  app.use("/", router);
};
