const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const route = require("./routes/index.js");
const server = express();

server.use(bodyParser.json({ limit: "50mb" }));
server.use("/", route);
server.use(morgan("dev"));

module.exports = server;
