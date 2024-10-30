module.exports = (app) => {
  const auth = require("../middleware/auth.middleware");
  const router = require("express").Router();
  const book = require("../controllers/book.controllers");

  // Create book
  router.post("/create", auth, book.createBook);

  // Get all books
  router.get("/view", book.getAllBooks);

  // Get book by id
  router.get("/view/:id", book.getBookById);

  //  Update book by id
  router.put("/update/:id", auth, book.updateBook);

  // Delete all books
  router.delete("/delete", auth, book.deleteAllBooks);

  // Delete book by id
  router.delete("/delete/:id", auth, book.deletOneBook);

  app.use("/books", router);
};
