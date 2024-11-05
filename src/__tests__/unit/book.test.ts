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
  console.log('Token: ', token);
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
    it('if book exists, return response 400', async () => {
      await Book.create(mockBook);

      const response = await supertest(app)
        .post('/books/create')
        .set('Authorization', `Bearer ${token}`)
        .send(mockBook);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Book already exists!');
    });

    it('if book does not exist, return response 200', async () => {
      const response = await supertest(app)
        .post('/books/create')
        .set('Authorization', `Bearer ${token}`)
        .send(mockBook);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Book successfully added!');
      expect(response.body.book.title).toBe(mockBook.title);
      expect(response.body.book.author).toBe(mockBook.author);
      expect(response.body.book.year).toBe(mockBook.year);
    });
  });

  describe('GET /books', () => {
    it('if book exists, return response 200', async () => {
      await Book.create(mockBook);
      const response = await supertest(app).get('/books');
      expect(response.status).toBe(200);
    });

    it('if book does not exist, return response 404', async () => {
      await Book.deleteMany({});
      const response = await supertest(app).get('/books');
      expect(response.status).toBe(404);
    });
  });

  describe('GET /books/:id', () => {
    it('if book exists, return response 200', async () => {
      const bookData = await Book.create(mockBook);

      const response = await supertest(app).get(`/books/${bookData._id}`);
      expect(response.status).toBe(200);
    });

    it('if book does not exist, return response 404', async () => {
      const invalidId = new mongoose.Types.ObjectId();

      const response = await supertest(app).get(`/books/${invalidId}`);
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /books/update/:id', () => {
    it('if book exists, return response 200', async () => {
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
});
