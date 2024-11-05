import mongoose from 'mongoose';
import Book from '../src/models/book.models';

const bookData = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: '1960 ',
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    year: '1951',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: '1813',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: '1925',
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
    year: '1851',
  },
];

mongoose
  .connect('mongodb://localhost:27017/crud')
  .then(async () => {
    console.log('Connected to Database');

    await Book.deleteMany({});

    await Book.insertMany(bookData);
    console.log('Books created');

    mongoose.disconnect();
  })
  .catch((err) => {
    console.log('Failed to connect to Database', err);
  });
