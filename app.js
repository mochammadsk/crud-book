const express = require("express");
const cors = require("cors");
const { AutoEncryptionLoggerLevel } = require("mongodb");

const app = express();

const corsOption = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  method: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: false,
};

app.use(cors(corsOption));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-API-Key"
  );
  next();
});

module.exports = app;
