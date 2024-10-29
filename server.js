const app = require("./app");
const db = require("./config/database");
const dotenv = require("dotenv");
const http = require("http");
const mongose = require("mongoose");

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
