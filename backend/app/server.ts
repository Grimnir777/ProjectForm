import app from "./app";
import { open } from "inspector";
var http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;
var openedChannels = {};
var nsp = io.of("/QCMs");
nsp.on("connection", (socket) => {
  socket.emit('connected', "");

  socket.on("openModule", module=>{

    let newModule = {
      nbStudents : 0,
      responsable : socket.id,
      students : []
    }
    openedChannels[module] = newModule;
    console.log("NEW MODULE");
    console.log("module ID : " + module);
    console.log("resonsable ID : " + newModule.responsable);

    socket.join(module);
  });

  socket.on("closeModule", module=>{
    delete openedChannels[module];
    socket.leave(module);
    console.log("closed module  : ");
  });

  socket.on("joinModule", module => {
    console.log("Joining module...: " + module);
    socket.join(module);

    openedChannels[module].nbStudents++;
    openedChannels[module].students.push(socket.id);

    console.log("New User Connected on " + module + " NBStudentsOnline : " + openedChannels[module].nbStudents);
    nsp.to(module).emit("NBStudentsOnline",openedChannels[module].nbStudents);

  });


  
  socket.on("quitModule", module => {
    console.log("Quit module...: " + module);

    let indexStudent = openedChannels[module].students.findIndex(function(element){
      return element == socket.id;
    });

    openedChannels[module].nbStudents--;
    openedChannels[module].students.splice(indexStudent,1);
    
    console.log("User deconnected on " + module + " NBStudentsOnline : " + openedChannels[module].nbStudents);
    nsp.to(module).emit("NBStudentsOnline",openedChannels[module].nbStudents);

    socket.leave(module);

    //Stil present in module
    /*
    io.of('/QCMs').in(module).clients((error, clients) => {
      if (error) throw error;
      console.log(clients);
    });
    */
  });

  socket.on("startSession", (module) =>{
    nsp.to(module).emit("startSession","");
  });

  socket.on("stopSession", (module) =>{
    nsp.to(module).emit("stopSession","");
  });


  //Nouvelle question
  socket.on("newQuestion", newQuestion => {
    console.log("newQuestion Received: ");
    console.log(newQuestion);
    socket.broadcast.emit("newQuestion",  newQuestion );
  });

  //Affichage bonnes réponses question
  socket.on("printResponseQuestion", questionID => {
    console.log("Ask for print response for : ");
    console.log(questionID);
    socket.broadcast.emit("printResponseQuestion",  questionID);
  });

  //Envoi d'une réponse au professeur
  socket.on("newResponse", (response,module, questionPos) => {
    socket.broadcast.to(openedChannels[module].responsable).emit('newResponse', {response: response, questionPos: questionPos});
  });

});

http.listen(PORT, () => {
  console.log('Running on localhost TEST: ' + PORT);
});