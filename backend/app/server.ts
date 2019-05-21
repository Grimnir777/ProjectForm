 import app from "./app";
var http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;

io.on("connection", socket => {
  console.log("user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("message", message => {
    console.log("Message Received: " + message);
    io.emit("message", { type: "new-message", text: message });
  });
},
error=>{
  console.log('error')
});

http.listen(PORT, () => {
  console.log('Running on localhost TEST: ' + PORT);
});

