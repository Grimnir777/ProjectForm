import app from "./app";
import { open } from "inspector";
var http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;
var listModules = [1,2,3,4,5,6];
var openedChannels = [];
var nsp = io.of("/QCMs");
nsp.on("connection", (socket) => {

  socket.on("openModule", module=>{
    let newModule = {
      moduleID : module,
      nbStudents : 0,
      responsable : socket.id,
      students : []
    }
    openedChannels.push(newModule);
    console.log("NEW MODULE");
    console.log("module ID : " + newModule.moduleID);
    console.log("resonsable ID : " + newModule.responsable);

    socket.join(module);
  });

  socket.on("closeModule", module=>{
    let index = openedChannels.findIndex(function(element){
      return element.moduleID == module;
    });
    openedChannels.splice(index,1);
    socket.leave(module);
    console.log("closed module  : ");
  });

  socket.on("joinModule", module => {
    console.log("Joining module...: " + module);
    //if (listModules.includes(module)) {
    socket.join(module);

    let index = openedChannels.findIndex(function(element){
      return element.moduleID == module;
    });
    openedChannels[index].nbStudents++;
    openedChannels[index].students.push(socket.id);

    console.log(openedChannels[index].students);

    console.log("New User Connected on " + module + " NBStudentsOnline : " + openedChannels[index].nbStudents);

    nsp.to(module).emit("NBStudentsOnline",openedChannels[index].nbStudents);

     // return io.emit("success", "Valid module Name: " + module);
   // } else {
     //return io.emit("err", "Invalid module Name: " + module);
    //}
  });
  
  socket.on("quitModule", module => {
    console.log("Quit module...: " + module);

    let index = openedChannels.findIndex(function(element){
      return element.moduleID == module;
    });

    let indexStudent = openedChannels[index].students.findIndex(function(element){
      return element == socket.id;
    });

    openedChannels[index].nbStudents--;
    openedChannels[index].students.splice(indexStudent,1);
    console.log(openedChannels[index].students);
    
    
    console.log("User deconnected on " + module + " NBStudentsOnline : " + openedChannels[index].nbStudents);
    nsp.to(module).emit("NBStudentsOnline",openedChannels[index].nbStudents);

    socket.leave(module);

    //Stil present in module
    io.of('/QCMs').in(module).clients((error, clients) => {
      if (error) throw error;
      console.log(clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
    });
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
    console.log("Infos about response : ");
    console.log(response);
    let index = openedChannels.findIndex(function(element){
      return element.moduleID == module;
    });
    nsp.clients[openedChannels[index].responsable].send("newResponse",response);
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