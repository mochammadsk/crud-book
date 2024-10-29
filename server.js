const mongose = require("mongoose");
const http = require("http");
const db = require("./config/database");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

mongose
  .connect(db.url, db.mongoseConfig)
  .then(() => console.log("Connected to Database"))
  .catch((err) => {
    console.log("Failed to connect to Database", err);
    process.exit();
  });

const PORT = process.env.PORT;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
