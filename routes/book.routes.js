module.exports = (app) => {
  const auth = require("../middleware/auth.middleware");
  const book = require("../controllers/book.controllers");
  const router = require("express").Router();

  // Create book
  router.post("/create", auth, book.createBook);

  // Get all books
  router.get("/view", auth, book.getAllBooks);

  // Get book by id
  router.get("/view/:id", auth, book.getBookById);

  //  Update book by id
  router.put("/update/:id", auth, book.updateBook);

  // Delete book by id
  router.delete("/delete/:id", auth, book.deletOneBook);

  // Delete all books
  router.delete("/delete", auth, book.deleteAllBooks);

  app.use("/books", router);
};
