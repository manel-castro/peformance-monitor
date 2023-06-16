const socketMain = (io) => {
  io.on("connection", (socket) => {
    let machineMacA;

    const auth = socket.handshake.auth;

    if (auth.token === "asdfañlskdjglk12") {
      // valid nodeclient
      socket.join("nodeClient");
    } else if (auth.token === "asdfasdggas14") {
      // valid react client
      socket.join("reactClient");
    } else {
      socket.disconnect();
      console.log("You have been disconnected!");
    }
    console.log(auth.token);
    socket.emit("welcome", "hello world");
    socket.on("perfData", (data) => {
      if (!machineMacA) {
        machineMacA = data.macA;
        io.to("reactClient").emit("connectedOrNot", {
          machineMacA,
          isAlive: true,
        });
      }
      io.to("reactClient").emit("perfData", data);
    });
    socket.on("disconnect", (reason) => {
      // A node client has disconected, let the front-end know;
      io.to("reactClient").emit("connectedOrNot", {
        machineMacA,
        isAlive: false,
      });
    });
  });
};

module.exports = { socketMain };
