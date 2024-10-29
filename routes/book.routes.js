module.exports = (app) => {
  const book = require("../controllers/book.controllers");
  const router = require("express").Router();

  // Create book
  router.post("/create", book.createBook);

  // Get all books
  router.get("/view", book.getAllBooks);

  // Get book by id
  router.get("/view/:id", book.getBookById);

  //  Update book by id
  router.put("/update/:id", book.updateBook);

  // Delete book by id
  router.delete("/delete/:id", book.deletOneBook);

  // Delete all books
  router.delete("/delete", book.deleteAllBooks);

  app.use("/books", router);
};
