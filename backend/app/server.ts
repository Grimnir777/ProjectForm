import app from "./app";
import { open } from "inspector";
var http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;
var listModules = [1,2,3,4,5,6];
var openedChannels = {};
var nsp = io.of("/QCMs");
nsp.on("connection", (socket) => {
  socket.emit('connected', "");

  socket.on("openModule", module=>{
    module = module.toString();

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
    module = module.toString();
    delete openedChannels[module];
    socket.leave(module);
    console.log("closed module  : ");
  });

  socket.on("joinModule", module => {
    module = module.toString();
    console.log("Joining module...: " + module);
    //if (listModules.includes(module)) {
    socket.join(module);

    
    openedChannels[module].nbStudents++;
    openedChannels[module].students.push(socket.id);

    console.log(openedChannels[module].students);

    console.log("New User Connected on " + module + " NBStudentsOnline : " + openedChannels[module].nbStudents);

    nsp.to(module).emit("NBStudentsOnline",openedChannels[module].nbStudents);

     // return io.emit("success", "Valid module Name: " + module);
   // } else {
     //return io.emit("err", "Invalid module Name: " + module);
    //}
  });


  
  socket.on("quitModule", module => {
    module = module.toString();
    console.log("Quit module...: " + module);


    let indexStudent = openedChannels[module].students.findIndex(function(element){
      return element == socket.id;
    });

    openedChannels[module].nbStudents--;
    openedChannels[module].students.splice(indexStudent,1);
    console.log(openedChannels[module].students);
    
    
    console.log("User deconnected on " + module + " NBStudentsOnline : " + openedChannels[module].nbStudents);
    nsp.to(module).emit("NBStudentsOnline",openedChannels[module].nbStudents);

    socket.leave(module);

    //Stil present in module
    io.of('/QCMs').in(module).clients((error, clients) => {
      if (error) throw error;
      console.log(clients);
    });
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

  //Envoi d'une réponse au créateur
  socket.on("newResponse", (response,module) => {
    module = module.toString();
    console.log("Infos about response : ");
    console.log(response);
    nsp.clients[openedChannels[module].responsable].send("newResponse",response);
  });

/*

  //Nouvelle question
  socket.on("newQuestion", newQuestion => {
    console.log("newQuestion Received: " + newQuestion);
    io.broadcast.emit("newQuestion", { type: "newQuestion", text: newQuestion });
  });

  //Affichage bonnes réponses question
  socket.on("printResponseQuestion", questionID => {
    console.log("Ask for print response for : " + questionID);
    io.broadcast.emit("printResponseQuestion",  {questionID : questionID});
  });

  //Envoi d'une réponse au créateur
  socket.on("newResponse", response => {
    console.log("Infos about response : " + response);
    io.clients[creator].send("newResponse",response);
  });

  //Fermeture manuelle du socket
  socket.on("closeSocket", () => {
    //TODO
    console.log('socket closed');
    //io.close();
  });
*/

});

http.listen(PORT, () => {
  console.log('Running on localhost TEST: ' + PORT);
});

/*
methodes du websocket

démarrage d'une session

**diffusion d'une question par le professeur (professeur -> back -> eleve)

**affichage des bonnes réponses d'une question (professeur -> back -> eleves)

**envoi réponse et infos à propose de l'utilisateur + (% bonnes réponses pour eleves : fait en local) + 1er eleve à répondre (eleve -> back -> professeur)

**fermeture d'une session (par timer ou manuelle) (professeur -> back -> eleves)

A ajouter : namespace et rooms
*/