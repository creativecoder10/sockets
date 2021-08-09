const express = require("express");
const http = require("http");
const WebSocket = require("ws");

var printlog = require("./printLog");

const app = express();

//initialize a simple http server
const server = http.createServer(app);


//start our server
server.listen(4000, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});

// Static files
app.use(express.static('public'));


//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  //connection is up, let's add a simple simple event
  ws.on("message", (message) => {

//log the received message and send it back to the client
    printlog(message+"Client "+wss.clients.size+" connected");
    
// If Hello passed, return Websockets
    if (message.trim()==='Hello'){
      ws.send('Websockets');
    }
   });
});

