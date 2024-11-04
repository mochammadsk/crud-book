import { Application, Router, Request, Response } from "express";
import auth from "../middleware/auth.middleware";
import { signin } from "../controllers/auth.controllers";

export default (app: Application): void => {
  const router = Router();

  // Login
  router.post("/signin", auth, async (req: Request, res: Response) => {
    try {
      signin(req, res);
    } catch (err: any) {
      res.status(400).json({
        message: err.message,
      });
    }
  });

  app.use("/", router);
};
