const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const srever = http.createServer(app);

const io = new Server(srever);

//Socket.io

io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

srever.listen(9000, () => console.log("server started at port 9000"));
