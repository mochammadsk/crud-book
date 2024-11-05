import { Request, Response } from 'express';
import Book from '../models/book.models';

// Create book
export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Check if book already exists
    const existingBook = await Book.findOne({ title: req.body.title });
    if (existingBook) {
      res.status(400).json({ message: 'Book already exists!' });
      return;
    }
    // Create new book
    const newBook = new Book(req.body);
    await newBook.save();
    res
      .status(201)
      .json({ message: 'Book successfully added!', book: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error });
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
      res.status(404).json({ message: 'No books found!' });
      return;
    }

    res.status(200).json({ message: 'Below is the book data!', books });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// Get book by id
export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: 'Book not found!' });
      return;
    }

    res.status(200).json({ message: 'Book found!', book });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
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
    res.status(200).json({ message: 'Book updated!', book });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// Delete book by id
export const deleteOneBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted!', book });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// Delete all book
export const deleteAllBooks = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const books = await Book.deleteMany();
    res.status(200).json({ message: 'All books deleted!', books });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
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
