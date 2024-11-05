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
    res.status(401).json({ message: 'Unauthorized!' });
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
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Unauthorized! Invalid token.' });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ message: 'Unauthorized! Token has expired.' });
    }
    return res.status(500).json({ message: 'Internal server error.', error });
  }
};

export default auth;
