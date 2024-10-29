const Book = require("../models/book.models");

// Create book
exports.createBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;

    // Check if book already exists
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res.status(400).send({ message: "Book already exists!" });
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
      .send({ message: "Book successfully added!", book: newBook });
  } catch (error) {
    res.status(400).send({ message: "error", error: error });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send({ message: "Below is the book data!", books });
  } catch (error) {
    res.status(400).send({ message: "error", error: error });
  }
};

// Get book by id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).send({ message: "Book found!", book });
  } catch (error) {
    res.status(400).send({ message: "error", error: error });
  }
};

// Update book by id
exports.updateBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id },
      { title, author, year },
      { new: true }
    );
    res.status(200).send({ message: "Book updated!", book });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete book by id
exports.deletOneBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Book deleted!", book });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete all book
exports.deleteAllBooks = async (req, res) => {
  try {
    const books = await Book.deleteMany();
    res.status(200).send({ message: "All books deleted!", books });
  } catch (error) {
    res.status(400).send(error);
  }
};
