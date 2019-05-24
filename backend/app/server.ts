import app from "./app";
import { open } from "inspector";
var http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;
var openedChannels = {};
var nsp = io.of("/QCMs");
nsp.on("connection", (socket) => {

  socket.emit('connected', "");

  socket.on("openModule", (module,teacher)=>{
    console.log('try to open new module ',module)
    let newModule = {
      nbStudents : 0,
      responsable : {
        id : socket.id,
        name : teacher.nom
      },
      students : []
    }
    openedChannels[module] = newModule;
    console.log("[MODULE]");
    console.log("module ID : " + module);
    console.log("resonsable ID : " + newModule.responsable.id);

    socket.join(module);
  });

  socket.on("closeModule", module=>{
    if(openedChannels[module]) {
      delete openedChannels[module];
      socket.leave(module);
      console.log("[MODULE]");
      console.log("closed module  : " + module );
    }
  });

  socket.on("joinModule", (module,student) => {
    socket.join(module);
    openedChannels[module].nbStudents++;
    openedChannels[module].students.push({
      id :socket.id,
      name : student.nom
    });

    nsp.to(module).emit("NBStudentsOnline",openedChannels[module].nbStudents);
    nsp.to(module).emit("userConnected",student.nom);
    
    console.log("[USERS] New User Connected on " + module + " NBStudentsOnline : " + openedChannels[module].nbStudents);
  });


  
  socket.on("quitModule", (module,student) => {
    if(openedChannels[module]) {
    let indexStudent = openedChannels[module].students.findIndex(function(element){
      return element.id == socket.id;
    });

    openedChannels[module].nbStudents--;
    openedChannels[module].students.splice(indexStudent,1);
    
    nsp.to(module).emit("NBStudentsOnline",openedChannels[module].nbStudents);
    nsp.to(module).emit("userDeconnected",student.nom);
    
    socket.leave(module);
    
    console.log("[USER] User deconnected on " + module + " NBStudentsOnline : " + openedChannels[module].nbStudents);
  }
  });

  socket.on("startSession", (module) =>{
    nsp.to(module).emit("startSession","");
  });

  socket.on("stopSession", (module) =>{
    nsp.to(module).emit("stopSession","");
  });


  //Nouvelle question
  socket.on("newQuestion", (module,newQuestion) => {
    //console.log("newQuestion Received: ");
    console.log(newQuestion);
    nsp.to(module).emit("newQuestion",  newQuestion );
  });

  //Affichage bonnes réponses question
  socket.on("printResponseQuestion", (module) => {
    nsp.to(module).emit("printResponseQuestion",);
  });

  //Envoi d'une réponse au professeur
  socket.on("newResponse", (response,module, questionPos) => {
    socket.broadcast.to(openedChannels[module].responsable.id).emit('newResponse', {response: response, questionPos: questionPos});
  });

});

http.listen(PORT, () => {
  console.log('Running on localhost TEST: ' + PORT);
});