module.exports = (app) => {
  const auth = require("../controllers/auth.controllers");
  const router = require("express").Router();

  // Login
  router.post("/signin", async (req, res) => {
    try {
      await auth.signin(req, res);
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  });

  app.use("/", router);
};
