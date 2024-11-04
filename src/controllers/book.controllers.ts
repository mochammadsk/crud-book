import { Request, Response } from 'express';
import Book from '../models/book.models';

// Create book
export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, author, year } = req.body;

    // Check if book already exists
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      res.status(400).send({ message: 'Book already exists!' });
      return;
    }

    // Create new book
    const newBook = new Book({
      title,
      author,
      year,
    });

    await newBook.save();
    res
      .status(200)
      .send({ message: 'Book successfully added!', book: newBook });
  } catch (error) {
    res.status(400).send({ message: 'error', error: error });
  }
};

// Get all books
export const getAllBooks = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      res.status(404).send({ message: 'No books found!' });
      return;
    }

    res.status(200).send({ message: 'Below is the book data!', books });
  } catch (error) {
    res.status(500).send({ message: 'error', error: error });
  }
};

// Get book by id
export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(200).send({ message: 'Book found!', book });
  } catch (error) {
    res.status(404).send({ message: 'error', error: error });
  }
};

// Update book by id
export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, author, year } = req.body;
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id },
      { title, author, year },
      { new: true }
    );
    res.status(200).send({ message: 'Book updated!', book });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete book by id
export const deleteOneBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Book deleted!', book });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete all book
export const deleteAllBooks = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const books = await Book.deleteMany();
    res.status(200).send({ message: 'All books deleted!', books });
  } catch (error) {
    res.status(400).send(error);
  }
};

export default {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteAllBooks,
  deleteOneBook,
};
