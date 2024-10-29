const cors = require("cors");
const express = require("express");
const session = require("express-session");
const swaggerConfig = require("./config/swagger");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const swaggerSpec = swaggerJSDoc(swaggerConfig);

// Middleware CORS & Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// Middleware Session
app.use(
  session({
    secret: "ProductZilla",
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware Logger
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Call Routes
require("./routes/auth.routes")(app);
require("./routes/book.routes")(app);

module.exports = app;
