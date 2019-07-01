const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const userAuthRouter = require("../routers/userAuthRouter");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/", (req, res) => {
  res.json({ message: "The random act generator api is up and running!" });
});

server.use("/", userAuthRouter);
module.exports = server;
