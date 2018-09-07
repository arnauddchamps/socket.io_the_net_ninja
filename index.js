const express = require("express");
const socket = require("socket.io");

//App setup
const app = express();
const server = app.listen(4000, function() {
  console.log("listening to request on port 4000");
});

app.use(express.static("public"));

// Socket setup
const io = socket(server);

// Etablir la connexion
io.on("connection", function(socket) {
  console.log("made socket connection", socket.id);

  //récuper les messages
  socket.on("chat", function(data) {
    //renvoyer les messages du serveur à tous les clients
    io.sockets.emit("chat", data);
  });

  //
  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});
