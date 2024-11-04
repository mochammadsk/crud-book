import mongoose, { Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  year: number;
}

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("book", bookSchema);
