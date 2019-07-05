const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

// const userAuthRouter = require("../routers/UserAuthRouter.js");
const userRouter = require("../routers/UserRouter.js");
// const contactRouter = require("../routers/ContactsRouter.js");
// const kindActRouter = require("../routers/KindActsRouter.js");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/", (req, res) => {
  res
    .status(201)
    .json({ message: "The random act generator api is up and running!" });
});

// server.use("/", userAuthRouter);
server.use("/user", userRouter);
// server.use("/contact", contactRouter);
// server.use("/kindAct", kindActRouter);
module.exports = server;
