const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "*");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

server = http.createServer(app);

const port = process.env.PORT;
const uri = process.env.MONGO_URI;

server.listen(port, (req, res) => {
  console.log(`Server Running on Port ${port}`);
});

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(() => console.log("Failed to Connect To MongoDB"));
