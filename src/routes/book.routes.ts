import { Application, Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import book from '../controllers/book.controllers';

export default (app: Application): void => {
  const router = Router();

  // Create book
  router.post('/create', auth, book.createBook);

  // Get all books
  router.get('/', book.getAllBooks);

  // Get book by id
  router.get('/:id', book.getBookById);

  //  Update book by id
  router.put('/update/:id', auth, book.updateBook);

  // Delete all books
  router.delete('/delete', auth, book.deleteAllBooks);

  // Delete book by id
  router.delete('/delete/:id', auth, book.deleteOneBook);

  app.use('/books', router);
};
