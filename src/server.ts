import dotenv from "dotenv";
import http from "http";
import mongose from "mongoose";
import app from "./app";
import db from "./config/database";

dotenv.config();

mongose
  .connect(db.url)
  .then(() => console.log("Connected to Database"))
  .catch((err) => {
    console.log("Failed to connect to Database", err);
    process.exit();
  });

const PORT = process.env.PORT;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
