import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  user: string;
}

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log(token);
    res.status(401).send({ message: 'Unauthorized!' });
    return;
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid token!' });
  }
};

export default auth;
