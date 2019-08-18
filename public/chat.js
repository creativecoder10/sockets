const ws = new WebSocket('ws://localhost:4000')

// Query DOM
const message = document.getElementById("message");
const output = document.getElementById("output");
const btn = document.getElementById("send");
const feedback = document.getElementById("feedback");


ws.onopen = () => {
  console.log('ws opened on browser')
  ws.send('Hello');

  btn.addEventListener("click", () => {
    ws.send(message.value);
  });   
}



ws.onmessage = (message) => {
  console.log(`message received`, message.data);
  output.innerHTML += "<p><strong>" + message.data+ ":</strong>" ;

}
