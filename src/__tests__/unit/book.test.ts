import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import server from '../../app';
import book from '../../models/book.models';

const app = server;

const mockBook = {
  title: 'test-title',
  author: 'test-author',
  year: 2024,
};

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await book.deleteMany({});
  await book.create(mockBook);
});

describe('getAllBooks', () => {
  it('if book exists, return response 200', async () => {
    const response = await supertest(app).get('/books');
    expect(response.status).toBe(200);
  });
  it('if book does not exist, return response 404', async () => {
    await book.deleteMany({});
    const response = await supertest(app).get('/books');
    expect(response.status).toBe(404);
  });
});

describe('GetBookById', () => {
  it('if book does not exist, return response 404', async () => {
    const _id = '12345';
    const response = await supertest(app).get(`/books/${_id}`);
    expect(response.status).toBe(404);
  });
});
