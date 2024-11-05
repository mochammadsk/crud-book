import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/user.models';
import dotenv from 'dotenv';

dotenv.config();

// Login user
export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
      res.status(404).json({ message: 'User not found!' });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: 'Invalid password!' });
      return;
    }

    // Generate token
    const token = jwt.sign(
      {
        user: user.name,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res
      .set(`Authorization`, `Bearer ${token}`)
      .status(200)
      .json({ messages: 'Login Succesful!', token });
    return;
  } catch (error) {
    res.status(500).json({ messages: 'Server eror', error: error });
  }
};

export default signin;
