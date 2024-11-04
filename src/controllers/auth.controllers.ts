import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User, { IUser } from "../models/user.models";
import dotenv from "dotenv";

dotenv.config();

// Login user
export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
      res.status(404).send({ message: "User not found!" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).send({ message: "Invalid password!" });
      return;
    }

    // Generate token
    const token = jwt.sign(
      {
        user: user.name,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res
      .set(`Authorization`, `Bearer ${token}`)
      .status(200)
      .send({ messages: "Login Succesful!", token });
    return;
  } catch (error) {
    res.status(400).send(error);
  }
};

export default signin;
