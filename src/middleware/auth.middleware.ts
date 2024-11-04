import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

interface UserPayload {
  // Sesuaikan dengan payload JWT yang Anda gunakan
  id: string;
  // Tambahkan properti lain yang diperlukan
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Menambahkan tipe untuk req.user
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).send({ message: "Unauthorized!" });
    return;
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserPayload;
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token!" });
  }
};

export default auth;
