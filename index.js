const express = require("express");
const socket = require("socket.io");
var printLog = require("./printLog");
let connectCounter = 0;

const port = 4000;

//  app set up

const app = express();

//  listen to port number

const server = app.listen(port, () => {});

// Static files

app.use(express.static("public"));

// Socket set up for server side
// 1. Use the instance of socket module
// 2. Create a socket for a specific server ( serving files on a specific port )

const io = socket(server);

/**  3. Create a connection when an event 'connection' is being fired from the client . When a connection is made, a socket object with socket
 * details is being passed to the callback*/

io.on("connection", socket => {
  connectCounter++;

  // Listening to chat sent
  socket.on("chat", data => {
    printLog(data.message);
    console.log("Client", io.sockets.clients.length, "is connected");
    if (data.message.trim() === "Hello") {
      data.message = "Websockets!";
      io.sockets.emit("chat", data);
    }
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
