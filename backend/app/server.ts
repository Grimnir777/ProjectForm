import app from "./app";
var http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;
var NBStudentsOnline = 0;
var creator;
var listModules = [1,2,3,4,5,6];
var openedChannels = [];

io.of("/QCMs").on("connection", (socket) => {

  socket.on("openModule", module=>{
    let newModule = {
      moduleID : module,
      nbStudents : 0,
      responsable : socket.id
    }
    openedChannels.push(newModule);
    console.log("created module  : " + newModule);
    socket.join(module);
  });


  /*
var found = openedChannels.find(function(element) {
  return element.moduleID == module;
});

  */
  socket.on("joinModule", module => {
    console.log("Joining module...: " + module);
    if (listModules.includes(module)) {
      socket.join(module);
      var found = openedChannels.find(function(element) {
        return element.moduleID == module;
      });
      found.nbStudents++;
      console.log("New User Connected on " + module + " NBStudentsOnline : " + NBStudentsOnline);
      return io.emit("success", "Valid module Name: " + module);
    } else {
     return io.emit("err", "Invalid module Name: " + module);
    }
  });
  
  socket.on("quitModule", module => {
    console.log("Quit module...: " + module);
    var found = openedChannels.find(function(element) {
      return element.moduleID == module;
    });
    console.log(found)
    found.nbStudents--;
    console.log("New User deconnected on " + module + " NBStudentsOnline : " + NBStudentsOnline);
    socket.leave(module);
  });


  socket.on("closeModule", module=>{

    console.log("closed module  : ");
  });



/*
  if(!creator){
    creator = socket.id;
    console.log('first ! : ' + creator);
  }
 
  NBStudentsOnline++;
  console.log("New User Connected / NBStudentsOnline : " + NBStudentsOnline);
  io.emit("NBStudentsOnline",NBStudentsOnline);

  socket.on("disconnect", function() {
    NBStudentsOnline--;
    if(NBStudentsOnline==0){
      //TODO
      //io.close();
    }
    console.log("One User deconnected / NBStudentsOnline : " + NBStudentsOnline);
    io.emit("NBStudentsOnline",NBStudentsOnline);
  });

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