const socketMain = (io) => {
  io.on("connection", (socket) => {
    /* ... */
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
      io.to("reactClient").emit("perfData", data);
    });
  });
};

module.exports = { socketMain };
