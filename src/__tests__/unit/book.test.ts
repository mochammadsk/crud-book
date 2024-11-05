import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Book, { IBook } from '../../models/book.models';
import User from '../../models/user.models';
import server from '../../app';

const app = server;

let token: string;

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  await User.create({
    name: 'test-user',
    password: 'test-password',
  });

  const userRespose = await supertest(app).post('/signin').send({
    name: 'test-user',
    password: 'test-password',
  });
  token = userRespose.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe('bookData', () => {
  const mockBook: Partial<IBook> = {
    title: 'tes-title',
    author: 'test-author',
    year: 2024,
  };

  beforeEach(async () => {
    await Book.deleteMany({});
  });

  describe('POST /books/create', () => {
    it('if book exists', async () => {
      await Book.create(mockBook);

      const response = await supertest(app)
        .post('/books/create')
        .set('Authorization', `Bearer ${token}`)
        .send(mockBook);

      expect(response.status).toBe(400);
    });

    it('if book does not exist', async () => {
      const response = await supertest(app)
        .post('/books/create')
        .set('Authorization', `Bearer ${token}`)
        .send(mockBook);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Book successfully added!');
      expect(response.body.book.title).toBe(mockBook.title);
      expect(response.body.book.author).toBe(mockBook.author);
      expect(response.body.book.year).toBe(mockBook.year);
    });
  });

  describe('GET /books', () => {
    it('if book does not exist', async () => {
      await Book.deleteMany({});
      const response = await supertest(app).get('/books');

      expect(response.status).toBe(404);
    });

    it('if book exists', async () => {
      await Book.create(mockBook);
      const response = await supertest(app).get('/books');

      expect(response.status).toBe(200);
    });
  });

  describe('GET /books/:id', () => {
    it('if book does not exist', async () => {
      const fakedId = new mongoose.Types.ObjectId().toString();
      const book = await Book.findById(fakedId);
      const response = await supertest(app).get(`/books/${fakedId}`);

      expect(book).toBeNull();
      expect(response.status).toBe(404);
    });

    it('if book exists', async () => {
      const bookData = await Book.create(mockBook);
      const found = new mongoose.Types.ObjectId().toString();
      const response = await supertest(app).get(`/books/${bookData._id}`);

      expect(found).toBeDefined();
      expect(response.status).toBe(200);
    });

    it('catch error', async () => {
      await expect(Book.findById('invalid-id')).rejects.toThrow();
    });
  });

  describe('PUT /books/update/:id', () => {
    it('if book exists', async () => {
      const bookData = await Book.create(mockBook);

      const newBook = {
        title: 'new-title',
        author: 'new-author',
        year: 2025,
      };

      const response = await supertest(app)
        .put(`/books/update/${bookData._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newBook);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Book updated!');
      expect(response.body.book.title).toBe(newBook.title);
      expect(response.body.book.author).toBe(newBook.author);
      expect(response.body.book.year).toBe(newBook.year);
    });
  });

  describe('DELETE /books/delete/:id', () => {
    it('if book does not exist', async () => {
      const fakedId = new mongoose.Types.ObjectId().toString();
      const response = await supertest(app)
        .delete(`/books/delete/${fakedId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it('if book exists', async () => {
      const bookData = await Book.create(mockBook);

      const response = await supertest(app)
        .delete(`/books/delete/${bookData._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });

  describe('DELETE /books/delete', () => {
    it('if book does not exist', async () => {
      const response = await supertest(app)
        .delete(`/books/delete`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it('if book exists', async () => {
      await Book.create(mockBook);

      const response = await supertest(app)
        .delete(`/books/delete`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });
});
