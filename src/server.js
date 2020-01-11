const express = require("express");
const moongose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors);

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  socket.on("connectRoom", box => {
    socket.join(box);
  });
});

app.use((req, res, next) => {
  req.io = io;

  return next();
});

moongose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-kcuo2.mongodb.net/omnistack?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require("./routes"));

server.listen(3333);
