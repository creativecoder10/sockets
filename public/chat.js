// chat.js handle the socket communication at client side

// Make connection from client side
// Create socket for the frontend
const socket = io.connect("http://localhost:4000");

// io is default object provided by the socket.io library
// Remember on server side - we have an event called 'connection'

// Query DOM
const message = document.getElementById("message");
const handle = document.getElementById("handle");
const output = document.getElementById("output");
const btn = document.getElementById("send");
const feedback = document.getElementById("feedback");

// Emitting events

// Sending the communication chat on press of button

btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
});

// Sending the event that a person is typing

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value + " typing..");
});

// Respond to the communication back from server by listening to chat
socket.on("chat", data => {
 print
  output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message;

  // Receive the event of typing from server
  //Listening to typing message
  socket.on("typing", data => {
    feedback.innerHTML = "<p><em>" + data + "</em></p>";
  });
});
