const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const router = require("./router.js")

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

const server = http.createServer(app);

server.listen(8001, () => console.log("start backend"));
