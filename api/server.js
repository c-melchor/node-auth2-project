const express = require("express");
const server = express();
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");

server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

module.exports = server;
