const http = require("http");
const app = require("./app");
const connectDB = require("./database");
const initializeSocket = require("./utils/socket");

const port = process.env.PORT || 8000;
const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database connection established !!");
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Problem in database connection...", err);
    process.exit(1);
  });
